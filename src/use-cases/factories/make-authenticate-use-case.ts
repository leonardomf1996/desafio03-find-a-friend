import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { AuthenticateUseCase } from '../organization/auth';
import { BcryptAdapter } from '@/utils/criptography/bcrypt-adapter';

export function makeAuthenticateUseCase() {
   const organizationsRepository = new PrismaOrganizationsRepository();
   const bcryptAdapter = new BcryptAdapter(6);
   const authenticateUseCase = new AuthenticateUseCase(organizationsRepository, bcryptAdapter);

   return authenticateUseCase;
}