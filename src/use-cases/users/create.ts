import { randomUUID } from 'node:crypto';
import { hash } from 'bcryptjs';

import { Users as User } from '@prisma/client'
import { IUsersRepository } from '@/repositories/IUsers-repository';
import { IEncrypter } from '@/utils/criptography/IEncrypter';

interface CreateUserHttpRequest {
   name: string,
   mail: string,
   postalCode: string,
   fullAddress: string,
   phone: string,
   password: string,
}

interface UserHttpResponse {
   user: User
}

export class CreateUseCase {
   constructor(
      private usersRepository: IUsersRepository,
      private readonly encrypter: IEncrypter,
   ) { }

   async execute({ name, mail, postalCode, fullAddress, phone, password }: CreateUserHttpRequest): Promise<UserHttpResponse> {      
      const password_hash = await this.encrypter.encrypt(password);

      const user = await this.usersRepository.create({
         id: randomUUID(),
         name,
         mail,
         postalCode,
         fullAddress,
         phone,
         passwordHashed: password_hash,
         createdAt: new Date(),
      })

      return { user };
   }
}
