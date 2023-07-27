export class UserAlreadyExists extends Error {
   constructor() {
      super('Mail already exists');
   }
}