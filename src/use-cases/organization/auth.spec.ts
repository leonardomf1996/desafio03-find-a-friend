import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './auth';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', async () => {
   beforeEach(() => {
      organizationsRepository = new InMemoryOrganizationsRepository();
      sut = new AuthenticateUseCase(organizationsRepository);
   });

   it('should be able to authenticate', async () => {
      await organizationsRepository.create({
         responsibleName: 'John Doe',
         mail: 'john@mail.com.br',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         passwordHashed: '123456',
      });

      const { organization } = await sut.execute({
         mail: 'john@mail.com.br',
         password: '123456',
      });

      expect(organization.id).toEqual(expect.any(String));
   });

   it('should not be able to authenticate with wrong email', async () => {
      await expect(() =>
         sut.execute({
            mail: 'john@mail.com.br',
            password: '123456',
         })
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
   });

   it('should not be able to authenticate with wrong password', async () => {
      await organizationsRepository.create({
         responsibleName: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         passwordHashed: 'abc123',
      });

      await expect(() =>
         sut.execute({
            mail: 'john@mail.com.br',
            password: 'abc123',
         })
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
   });
});

