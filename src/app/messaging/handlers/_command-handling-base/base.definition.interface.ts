export interface BaseCommandDefinition {
   name: any;
   description: any;
   type: any;
   isEphemeral: boolean;
   allowedRoles: any;
   data: any;
   execute: any;
}