export class OrganizationAlreadyExists extends Error {
   constructor() {
      super('Mail already exists');
   }
}