import { randomUUID } from 'node:crypto';

import { Organizations as Organization } from '@prisma/client'
import { IOrganizationsRepository } from '@/repositories/IOrganizations-repository';
import { IEncrypter } from '@/utils/criptography/IEncrypter';
import { OrganizationAlreadyExists } from '../errors/organization-already-exists';

interface CreateOrganizationHttpRequest {
   responsibleName: string,
   mail: string,
   postalCode: string,
   fullAddress: string,
   phone: string,
   password: string,
}

interface OrganizationHttpResponse {
   organization: Organization
}

export class CreateUseCase {
   constructor(
      private organizationsRepository: IOrganizationsRepository,
      private readonly encrypter: IEncrypter,
   ) { }

   async execute({ responsibleName, mail, postalCode, fullAddress, phone, password }: CreateOrganizationHttpRequest): Promise<OrganizationHttpResponse> {      
      const password_hash = await this.encrypter.encrypt(password);

      const organizationAlreadyExists = await this.organizationsRepository.findByEmail(mail);

      if (organizationAlreadyExists) {
         throw new OrganizationAlreadyExists();
      }

      const organization = await this.organizationsRepository.create({
         id: randomUUID(),
         responsibleName,
         mail,
         postalCode,
         fullAddress,
         phone,
         passwordHashed: password_hash,
         createdAt: new Date(),
      })

      return { organization };
   }
}
