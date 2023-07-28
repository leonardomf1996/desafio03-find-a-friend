import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUseCase } from '../users/create';
import { BcryptAdapter } from '../../utils/criptography/bcrypt-adapter';

export function createUserFactory() {
   const usersRepository = new PrismaUsersRepository();
   const bcryptAdapter = new BcryptAdapter(6);
   const createUserUseCase = new CreateUseCase(usersRepository, bcryptAdapter);

   return createUserUseCase;
}