import { Prisma, Users as User } from '@prisma/client';

export interface IUsersRepository {
   create(data: Prisma.UsersCreateInput): Promise<User>
   findByEmail(email: string): Promise<User | null>
}