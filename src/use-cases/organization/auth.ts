import { IOrganizationsRepository } from '@/repositories/IOrganizations-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { compare } from 'bcryptjs';
import { Organizations as Organization } from '@prisma/client';

interface AuthenticateUseCaseRequest {
   mail: string
   password: string
}

interface AuthenticateUseCaseResponse {
   organization: Organization
}

export class AuthenticateUseCase {
   constructor(
      private organizationsRepository: IOrganizationsRepository
   ) { }

   async execute({ mail, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
      const organization = await this.organizationsRepository.findByEmail(mail);
      
      if (!organization) {
         throw new InvalidCredentialsError();
      }

      const doesPasswordMatches = await compare(password, organization.passwordHashed);

      if (doesPasswordMatches) {
         throw new InvalidCredentialsError();
      }

      return {
         organization
      };
   }
}