import { FastifyInstance } from 'fastify';
import { create } from './create';
import { auth } from './auth';

export async function organizationsRoutes(app: FastifyInstance) {
   app.post('/organization', create);

   app.post('/sessions', auth);
}