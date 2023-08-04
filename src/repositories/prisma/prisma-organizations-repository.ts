import { Prisma, Organizations as Organization } from "@prisma/client";
import { prisma } from '@/lib/prisma';
import { IOrganizationsRepository } from "../IOrganizations-repository";

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
   async create({ responsibleName, mail, fullAddress, passwordHashed, phone, postalCode }: Prisma.OrganizationsCreateInput) {
      const user = await prisma.organizations.create({
         data: {
            responsibleName,
            mail,
            fullAddress,
            passwordHashed,
            phone,
            postalCode
         }
      });

      return user;
   }

   async findByEmail(mail: string): Promise<Organization | null> {
      return prisma.organizations.findUnique({
         where: {
            mail
         }
      });
   }
}