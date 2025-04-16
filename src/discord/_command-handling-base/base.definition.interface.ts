// DOKUMENTAJA POLECEN (/): https://discord.com/developers/docs/interactions/application-commands#contexts

export interface ICommandDefinition {
   name: any;
   description: any;
   type: any;
   isEphemeral: boolean;
   allowedRoles: any;
   data: any;
   execute: any;
}