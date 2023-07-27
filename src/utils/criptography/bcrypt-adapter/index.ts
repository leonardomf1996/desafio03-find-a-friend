import { IEncrypter } from '../IEncrypter';
import bcryptjs from 'bcryptjs';

export class BcryptAdapter implements IEncrypter {
   constructor(
      private readonly salt: number
   ) { }

   async encrypt(value: string): Promise<string> {
      const hash = await bcryptjs.hash(value, this.salt)
      return hash;
   }

}