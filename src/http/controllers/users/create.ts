import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists";
import { CreateUseCase } from "@/use-cases/users/create";
import { BcryptAdapter } from "@/utils/criptography/bcrypt-adapter";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
   const createBodySchema = z.object({
      name: z.string(),
      mail: z.string().email(),
      password: z.string().min(6),
      postalCode: z.string().max(8),
      fullAddress: z.string(),
      phone: z.string(),
   });

   const { name, mail, password, postalCode, fullAddress, phone } = createBodySchema.parse(request.body);

   try {
      const usersRepository = new PrismaUsersRepository();
      const bcryptAdapter = new BcryptAdapter(6);
      const createUserUseCase = new CreateUseCase(usersRepository, bcryptAdapter);

      await createUserUseCase.execute({ name, mail, password, postalCode, fullAddress, phone });

   } catch (error) {
      if (error instanceof UserAlreadyExists) {
         return reply.status(409).send({ message: error.message });
      }

      throw error;
   }

   return reply.status(201).send();
}