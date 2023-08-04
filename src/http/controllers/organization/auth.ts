import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function auth(request: FastifyRequest, reply: FastifyReply) {
   const authenticateBodySchema = z.object({
      mail: z.string().email(),
      password: z.string().min(6),
   });

   const { mail, password } = authenticateBodySchema.parse(request.body);

   try {
      const authenticateUseCase = makeAuthenticateUseCase();

      const { organization } = await authenticateUseCase.execute({ mail, password });

      const token = await reply.jwtSign(
         {},
         {
            sign: {
               sub: organization.id,
               expiresIn: '7d'
            }
         });

      const refreshToken = await reply.jwtSign(
         {},
         {
            sign: {
               sub: organization.id
            }
         });

      return reply
         .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
         })
         .status(200)
         .send({ token });

   } catch (error) {
      if (error instanceof InvalidCredentialsError) {
         return reply.status(400).send({ message: error.message });
      }

      throw error;
   }

}