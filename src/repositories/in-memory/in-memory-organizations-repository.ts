import { Prisma, Organizations as Organization } from '@prisma/client';
import { IOrganizationsRepository } from "../IOrganizations-repository";
import { randomUUID } from 'node:crypto';

export class InMemoryOrganizationsRepository implements IOrganizationsRepository {   
   public items: Organization[] = [];

   async create(data: Prisma.OrganizationsCreateInput): Promise<Organization> {
      const organization = {
         id: randomUUID(),
         responsibleName: data.responsibleName,
         mail: data.mail,
         postalCode: data.postalCode,
         fullAddress: data.fullAddress,
         phone: data.phone,
         passwordHashed: data.passwordHashed,
         createdAt: new Date()
      }

      this.items.push(organization);

      return organization;
   }

   async findByEmail(mail: string): Promise<Organization | null> {
      const user = this.items.find(item => item.mail === mail);

      return user ?? null;
   }
}