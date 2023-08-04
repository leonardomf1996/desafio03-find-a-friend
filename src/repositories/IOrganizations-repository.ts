import { Prisma, Organizations as Organization } from '@prisma/client';

export interface IOrganizationsRepository {
   create(data: Prisma.OrganizationsCreateInput): Promise<Organization>
   findByEmail(email: string): Promise<Organization | null>
}