import { Prisma, Users as User } from "@prisma/client";
import { prisma } from '@/lib/prisma';
import { IUsersRepository } from "../IUsers-repository";

export class PrismaUsersRepository implements IUsersRepository {
   async create({ name, mail, fullAddress, passwordHashed, phone, postalCode }: Prisma.UsersCreateInput) {
      const user = await prisma.users.create({
         data: {
            name,
            mail,
            fullAddress,
            passwordHashed,
            phone,
            postalCode
         }
      });

      return user;
   }

   async findByEmail(mail: string): Promise<User | null> {
      return prisma.users.findUnique({
         where: {
            mail
         }
      });
   }
}