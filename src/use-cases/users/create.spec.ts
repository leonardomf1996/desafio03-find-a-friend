import { expect, describe, it, beforeEach, vi } from 'vitest'
import { CreateUseCase } from './create'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs';
import { BcryptAdapter } from '@/utils/criptography/bcrypt-adapter';
import { UserAlreadyExists } from '../errors/user-already-exists';

let usersRepository: InMemoryUsersRepository;
let bcryptAdapter: BcryptAdapter;
let sut: CreateUseCase;

describe('Create user use case', () => {
   beforeEach(() => {
      usersRepository = new InMemoryUsersRepository();
      bcryptAdapter = new BcryptAdapter(6);
      sut = new CreateUseCase(usersRepository, bcryptAdapter);
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

   it('should hash user password upon registration', async () => {
      const { user } = await sut.execute({
         name: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      const isPasswordCorrectlyHashed = await compare('abc123', user.passwordHashed);

      expect(isPasswordCorrectlyHashed).toBe(true);
   });

   it('should call Encrypter with correct password', async () => {
      const encryptSpy = vi.spyOn(bcryptAdapter, 'encrypt');

      await sut.execute({
         name: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      })

      expect(encryptSpy).toHaveBeenCalledWith('abc123');
   });

   it('should not be able to register with same email twice', async () => {
      const mail = 'john@mail.com';

      await sut.execute({
         name: 'John Doe',
         mail,
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      await expect(() => {
         return sut.execute({
            name: 'John Doe',
            mail,
            fullAddress: 'full address, 30',
            phone: '14999999999',
            postalCode: '88888888',
            password: 'abc123',
         });
      }).rejects.toBeInstanceOf(UserAlreadyExists);
   });
})