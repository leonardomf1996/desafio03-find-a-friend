import { Users as User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { randomUUID } from 'node:crypto';

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
   async execute({ name, mail, postalCode, fullAddress, phone, password }: CreateUserHttpRequest): Promise<UserHttpResponse> {
      const user = await prisma.users.create({
         data: {
            id: randomUUID(),
            name,
            mail,
            postalCode,
            fullAddress,
            phone,
            passwordHashed: password,
            createdAt: new Date(),
         }
      })

      return { user };
   }
}
