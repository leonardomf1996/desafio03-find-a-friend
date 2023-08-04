import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { CreateUseCase } from '../organization/create';
import { BcryptAdapter } from '../../utils/criptography/bcrypt-adapter';

export function createOrganizationFactory() {
   const organizationsRepository = new PrismaOrganizationsRepository();
   const bcryptAdapter = new BcryptAdapter(6);
   const createOrganizationUseCase = new CreateUseCase(organizationsRepository, bcryptAdapter);

   return createOrganizationUseCase;
}