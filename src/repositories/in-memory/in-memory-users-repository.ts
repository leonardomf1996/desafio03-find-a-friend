import { Prisma, Users as User } from '@prisma/client';
import { IUsersRepository } from "../IUsers-repository";
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements IUsersRepository {
   public items: User[] = [];

   async create(data: Prisma.UsersCreateInput): Promise<User> {
      const user = {
         id: randomUUID(),
         name: data.name,
         mail: data.mail,
         postalCode: data.postalCode,
         fullAddress: data.fullAddress,
         phone: data.phone,
         passwordHashed: data.passwordHashed,
         createdAt: new Date()
      }

      this.items.push(user);

      return user;
   }

}