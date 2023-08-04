import { OrganizationAlreadyExists } from "@/use-cases/errors/organization-already-exists";
import { createOrganizationFactory } from "@/use-cases/factories/create-organization-factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
   const createBodySchema = z.object({
      responsibleName: z.string(),
      mail: z.string().email(),
      password: z.string().min(6),
      postalCode: z.string().max(8),
      fullAddress: z.string(),
      phone: z.string(),
   });

   const { responsibleName, mail, password, postalCode, fullAddress, phone } = createBodySchema.parse(request.body);

   try {
      const createOrganizationUseCase = createOrganizationFactory();

      await createOrganizationUseCase.execute({ responsibleName, mail, password, postalCode, fullAddress, phone });

   } catch (error) {
      if (error instanceof OrganizationAlreadyExists) {
         return reply.status(409).send({ message: error.message });
      }

      throw error;
   }

   return reply.status(201).send();
}