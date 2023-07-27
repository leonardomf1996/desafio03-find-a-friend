import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUseCase } from './create'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository;
let sut: CreateUseCase;

describe('Create user use case', () => {
   beforeEach(() => {
      usersRepository = new InMemoryUsersRepository();
      sut = new CreateUseCase(usersRepository);
   });

   it('should be able to create a user', async () => {
      const { user } = await sut.execute({
         name: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      expect(user.id).toEqual(expect.any(String));
   });
})