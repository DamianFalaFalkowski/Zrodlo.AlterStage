# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

`zrodlo.alterstage.discordappts` is a **Discord bot** written in **TypeScript**,
built on **discord.js v14**, with persistence via **Sequelize + SQLite**. It
powers an equipment-rental community (DJ equipment rental), plus payment/transfer
helpers, user action logging, and message-tag features.

The project uses a **bespoke modular architecture** with strict module
boundaries; modules communicate **only** through typed "Integrations". Read the
Architecture section before adding code — the patterns here are deliberate and
heavily repeated.

> **Language note:** The codebase is bilingual. Inline comments, command
> descriptions, user-facing reply strings, and commit messages are mostly in
> **Polish**. Identifiers are English (often with consistent typos — see
> "Spelling conventions"). When adding code, match the surrounding language:
> keep user-facing Discord text in Polish, and preserve existing identifier
> spellings exactly rather than "correcting" them.

## Commands

```bash
# Build (TypeScript -> ./.dist, CommonJS)
npm run build          # alias: npm run b   (runs `tsc`)

# Tests (Jest) — note: there are currently no active tests (all commented out)
npm test               # alias: npm run t   (runs `jest`)

# Run in dev (tsx watch, hot reload) — the real entry point is the host startup:
npm run d_opt-host     # tsx watch src/startup/host-only.startup.ts -app-host

# Run compiled build (after `npm run build`):
npm run opt-host       # node .dist/...-app-host

# Reload/republish specific slash commands (dev):
npm run d_opt-adm-cmd-reload_gen-transfer-msg
npm run d_opt-adm-cmd-reload_tag-create
```

There is no linter script wired into `package.json`, but ESLint is configured
(`eslint.config.mjs`, flat config with `typescript-eslint` recommended). Run it
ad hoc with `npx eslint .` if needed.

## Entry points

- **`src/startup/host-only.startup.ts`** — the **actual working bootstrap**.
  It wires every module together in dependency order:
  1. `appDataModule()` opens the SQLite connection and initializes the `app`
     schema (version, templates, tags).
  2. `hostModule.SetUpClient(...)` logs into Discord; the `ready` callback then:
  3. initializes data modules (`RentalDataModule`, `UsersDataModule`) and syncs
     their schemas,
  4. registers + publishes slash commands (`rentalModule(...).RegisterRentalCommands()`,
     `paymentModule(...).RegisterPaymentCommands()`),
  5. refreshes rental forum channels, and registers the `interactionCreate`
     handler.
- **`src/index.ts`** — a thin terminal-arg dispatcher
  (`TerminalInputService.ReadInputAndStartOperation`). Note: the imported
  `terminal-input.service(TODO_redesign)` file is **not present** in the tree —
  `index.ts` is mid-refactor. Prefer the startup file above for running the bot.

## Directory layout (actual)

```
src/
  index.ts                     # terminal dispatcher (WIP / TODO_redesign)
  startup/                     # runnable bootstraps (host-only.startup.ts)
  app/                         # APPLICATION (infrastructure) modules
    app.module.ts              # AppModule base class (root of all modules)
    app.modules/
      host.module/             # Discord client/REST/command publishing + forum/template integrations
      app-data.module/         # (see app.data) app DB module providing templates/tags/context
    app.data/                  # app-schema DB pieces (sch.app: templates, tags) + _base entities
    app.errors/                # ApplicationError + EntityNotFound* errors
  data/                        # FUNCTIONAL data layer (Sequelize)
    modules/                   # rental-data.module, users-data.module (data modules + view-models)
    model/
      sch.rental/              # entities / repositories / enums / hash-tables for the rental schema
      sch.users/               # entities / repositories / enums for the users schema
  discord/                     # discord.js extensions & command-handling base
    _command-handling-base/    # BaseCommand / BaseCommandResponse / base.handler / ICommandDefinition
    find-command-handlers-definitions.util.ts  # CommandHandlersUtil (scan/load/publish)
    client.type-map.ts         # augments discord.js Client with `.commands`
  modules/                     # FUNCTIONAL (feature) modules
    rental.module/             # rent items, offers, forum channel sync
    payment.module/            # gen-transfer-msg command
    users.module/              # user info, action logging
    messaging.module/          # message/tag handlers + raw dc-commands
  utils/                       # __logger, sleep, ftp upload, type helpers, etc.
examples/                      # template fixtures
project-notes/                 # free-form developer notes (Polish)
readme.txt                     # original Polish design doc (partly aspirational; see below)
```

> **`readme.txt` is partly aspirational.** It describes folders like
> `src/app/app.data` and `src/app/app/modules` and a few names that don't match
> the current tree. `tsconfig.json`'s `include` also lists some paths that no
> longer exist (e.g. `src/app/messaging/...`, `src/.discord/...`). Treat the
> actual file tree as source of truth; the build still works because `tsconfig`
> globs `./src/**/...` broadly.

## Architecture

### Module categories

- **Application modules** (`src/app/`) — infrastructure the app needs to run
  (e.g. `host.module`, `app-data.module`). These come first and **must not depend
  on functional modules**.
- **Functional modules** (`src/modules/`) — features (`rental`, `payment`,
  `users`, `messaging`).
- **Data modules** (`src/data/modules/`, `src/app/app.data/`) — Sequelize-backed
  persistence, exposed to feature modules via Integrations.

### The 3-layer module pattern (Instance → Builder → Module)

Each module is built from three classes in an inheritance chain, all rooted at
`AppModule` (`src/app/app.modules/app.module.ts`):

1. **`*.instance.ts`** — `XxxInstance extends AppModule`. Holds state, readonly
   config, and `is...SetUp()` status flags. Defines `IXxx` / `IXxxInstance`
   interfaces. Constructor is `protected`.
2. **`*.builder.ts`** — `XxxBuilder extends XxxInstance`. Adds the
   "wiring/build" methods (`SetUp...`, `Register...Commands`, `Update...`) that
   are called in order during startup and return `this` for chaining.
3. **`*.module.ts`** — `XxxModule extends XxxBuilder`. Implements the module's
   public surface **and the Integration interfaces it provides/consumes**. Has a
   static `initialize(...)` factory plus a default-exported factory function
   (e.g. `export default rentalModule`).

Modules are typically used as **chained builders**, e.g.:
`rentalModule(deps...).RegisterRentalCommands().UpdateRentalChannels(cb)`.

### Integrations (the only cross-module communication)

A module never imports another module's internals. Instead, capability is shared
through an **Integration**: a file under `<module>/integrations/` that declares a
base interface and two extending marker interfaces:

```ts
export interface IFooIntegrationConsumer extends IFooIntegration {}
export interface IFooIntegrationProvider extends IFooIntegration {}
interface IFooIntegration { doFoo(...): Promise<...>; }
```

- The **Provider** module's `*.module.ts` `implements IFooIntegrationProvider`.
- The **Consumer** module receives the provider as a generic dependency
  (constrained by `IFooIntegrationConsumer`) in its `initialize(...)` and casts
  it when calling (`(this._dependencyHost as IFooIntegrationConsumer).doFoo()`).

See `src/app/app.modules/host.module/integrations/` for examples
(`post-thread-in-forum-channel`, `fill-template-with-data`, `get-client`, …)
and how `rental.module` consumes them in `rental.module.ts` / `rental.builder.ts`.

## Slash commands: the 4-file convention

Every command lives in its **own folder** under a module's `commands/`
directory, and is split into exactly four files (named `<command>.<role>.ts`):

| File             | Role |
|------------------|------|
| `*.definition.ts` | Exports `definition: ICommandDefinition`. Builds the discord.js `SlashCommandBuilder` (`data`), declares `name`, `description`, `type`, `isEphemeral`, `allowedRoles`, and an `execute(interaction)` that calls `baseHandlerExecute(interaction, createCommand(interaction), handler.handle)`. Uses dynamic `require(\`./${commandName}.command\`)` / `.handler`. |
| `*.command.ts`    | `class XxxCommand extends BaseCommand<XxxResponse>`. Constructor pulls options off the interaction (`interaction.options.getInteger/getString(...)`) into readonly fields, then calls `this.CheckAuthorisationAndValidityBase()`. Exports a `createCommand(interaction)` factory via `module.exports`. |
| `*.handler.ts`    | `module.exports = { async handle(interaction, command) { ... } }`. The business logic: call repositories, then `command.Response.AssignResponseData(...)` and `command.Response.PrepeareSuccessResponseBase()`. |
| `*.response.ts`   | `class XxxResponse extends BaseCommandResponse`. Implements `EnsureReadyAndValid()`, `PrepeareSuccessResponse()`, `PepeareFailureResponse()` to format the Discord reply content/components. |

**Base classes** live in `src/discord/_command-handling-base/`:
- `BaseCommand` — role-based authorization (`allowedRoles` vs the member's role
  names) + validity checks, executed via `CheckAuthorisationAndValidityBase()`.
- `BaseCommandResponse` — guards a reply so it is built exactly once (`IsReady`),
  applies the ephemeral flag, and validates completeness before sending.
- `base.handler.ts` `baseHandlerExecute(...)` — logs, runs the handler, then
  `interaction.reply(command.Response.Reply)`, converting thrown errors into a
  failure response.

### Command discovery & publishing

`CommandHandlersUtil` (`src/discord/find-command-handlers-definitions.util.ts`):
- `FindCommandHandlersInFolders(client, folderPaths)` scans each command folder,
  **skipping any subfolder whose name starts with `_` or `.`**, loads the
  `*.definition.ts`, registers it on `client.commands`, and collects JSON for
  publishing.
- `PublishCommands(...)` PUTs the commands to a **single guild**
  (`Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)`).

Implications when adding a command:
- Place it in a new folder under the owning module's `commands/`.
- Folders prefixed `_` (e.g. `_command-handling-base`) or `.` are intentionally
  ignored. Folders named `todo-*` and `example-command` are scanned, so don't
  leave broken stubs there if you don't want them published.

## Data layer (Sequelize + SQLite)

- **Schemas** are grouped as `sch.<name>` (`sch.rental`, `sch.users`, `sch.app`),
  each with `entities/`, `repositories/`, `enums/`, and `hash-tables/` (join
  tables).
- **Entities** extend `BaseEntity` (`src/app/app.data/_base/_base.entity.ts`),
  which provides `id`, `createdAt`, `updatedAt`, `createdDiscordUserId`,
  `updatedDiscordUserId`, `isDeleted`, plus `getOwnedEntity(...)` for FK lookups.
  Each entity file exports the model class **and** an `XxxAttributes` object (the
  Sequelize column definitions). Copy the boilerplate base columns from the NOTE
  block in `_base.entity.ts`.
- **Repositories** are classes of `static async` methods that wrap
  `Entity.create/findAll/findByPk/...`. Business logic that touches the DB lives
  here, called from command handlers.
- **Foreign-key columns** are named `<SchemaName><Entity>Id` with the **schema
  prefix capitalized** — e.g. `RentalRecievePointId`, `RentalOfferRentItemId`.
  (Documented convention in `readme.txt` §2.1.)
- **View-models** (`src/data/modules/*/view-models/`) are read-shaped DTOs
  surfaced through "get … view-model" integrations.
- Schema sync is gated by `MODULE_<NAME>DATA_FORCESYNC` env flags.

## Conventions & gotchas

- **Globals are prefixed `__`** (readme §2). The main one is `__logger`
  (`src/utils/dc-logger.util.ts`), imported in nearly every file; it writes to a
  log file (path from `LOG_OUTPUT_FILE_PATH`) and to the console.
- **Dynamic `require()`** is used pervasively (command/handler/definition
  loading keyed off `interaction.commandName`). This relies on the CommonJS
  module output and the file-naming convention — keep file names exactly aligned
  with the command `name`.
- **`module.exports = {...}`** (CommonJS) is mixed with ES `import`/`export`
  throughout; follow the style of the file you're editing.
- **Spelling conventions (intentional, do not "fix"):** several identifiers and
  method names carry consistent misspellings that are part of the public API of
  these classes. Match them exactly:
  - `PepeareFailureResponse` / `PepeareFailureResponseBase`
  - `PrepeareSuccessResponse` / `PrepeareSuccessResponseBase`
  - `recieve-point` / `RecievePoint`, `aviablility` / `Aviablility`,
    `applayTags`, `procuctCode`.
- The code is under active development: expect many `// TODO:` comments and
  placeholder `todo-*` / `example-command` folders. Don't treat TODOs as bugs to
  fix unless that's the task.

## Configuration / environment

Secrets and config come from a **`.env`** file (gitignored). `.env_dev` is a
committed template containing only placeholder keys (`TOKEN`, `ZCLIENT_ID`,
`GUILD_ID`). Variables referenced in code include:

- Discord: `TOKEN`, `CLIENT_ID` (note: template uses `ZCLIENT_ID`), `GUILD_ID`
- Database: `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`,
  `DATABASE_DIALECT`, `DATABASE_STORAGE`
- Feature config: `OFFER_TEMPLATE_BID`, `DJ_EQ_RENTAL_CHANNEL_ID`,
  `MODULE_RENTALDATA_FORCESYNC`, `MODULE_USERSDATA_FORCESYNC`
- Logging: `LOG_OUTPUT_FILE_PATH`, `LOG_DEBUG`

TypeScript: `target ES2022`, `module CommonJS`, `strict`,
`experimentalDecorators`, `outDir ./.dist`.

## Git workflow

- Active development branch for this work: **`claude/claude-md-docs-49aghx`**.
  Develop here, commit with clear messages, and push with
  `git push -u origin claude/claude-md-docs-49aghx`. Do **not** push to other
  branches without explicit permission, and do **not** open a PR unless asked.
- The integration branch is `develop`; feature branches follow
  `feature/<slug>` (historically Polish slugs). Commit messages in history are
  short and mostly Polish.
</content>
</invoke>
