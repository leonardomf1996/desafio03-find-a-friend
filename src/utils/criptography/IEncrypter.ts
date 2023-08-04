export interface IEncrypter {
   encrypt(value: string): Promise<string>;
   compare(password:string, passwordHashed: string): Promise<boolean>
}