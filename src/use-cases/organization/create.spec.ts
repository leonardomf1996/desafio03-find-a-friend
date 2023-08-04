import { expect, describe, it, beforeEach, vi } from 'vitest'
import { CreateUseCase } from './create'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs';
import { BcryptAdapter } from '@/utils/criptography/bcrypt-adapter';
import { OrganizationAlreadyExists } from '../errors/organization-already-exists';

let organizationsRepository: InMemoryOrganizationsRepository;
let bcryptAdapter: BcryptAdapter;
let sut: CreateUseCase;

describe('Create user use case', () => {
   beforeEach(() => {
      organizationsRepository = new InMemoryOrganizationsRepository();
      bcryptAdapter = new BcryptAdapter(6);
      sut = new CreateUseCase(organizationsRepository, bcryptAdapter);
   });

   it('should be able to create a org', async () => {
      const { organization } = await sut.execute({
         responsibleName: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      expect(organization.id).toEqual(expect.any(String));
   });

   it('should hash org password upon registration', async () => {
      const { organization } = await sut.execute({
         responsibleName: 'John Doe',
         mail: 'john@mail.com',
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      const isPasswordCorrectlyHashed = await compare('abc123', organization.passwordHashed);

      expect(isPasswordCorrectlyHashed).toBe(true);
   });

   it('should call Encrypter with correct password', async () => {
      const encryptSpy = vi.spyOn(bcryptAdapter, 'encrypt');

      await sut.execute({
         responsibleName: 'John Doe',
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
         responsibleName: 'John Doe',
         mail,
         fullAddress: 'full address, 30',
         phone: '14999999999',
         postalCode: '88888888',
         password: 'abc123',
      });

      await expect(() => {
         return sut.execute({
            responsibleName: 'John Doe',
            mail,
            fullAddress: 'full address, 30',
            phone: '14999999999',
            postalCode: '88888888',
            password: 'abc123',
         });
      }).rejects.toBeInstanceOf(OrganizationAlreadyExists);
   });
})