import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';

describe('Authenticate (e2e)', () => {
   beforeAll(async () => {
      await app.ready();
   })

   afterAll(async () => {
      await app.close();
   })

   it('should be able to authenticate', async () => {
      await request(app.server)
         .post('/organization')
         .send({
            responsibleName: 'John Doe',
            mail: 'john@mail.com',
            fullAddress: 'full address, 30',
            phone: '14999999999',
            postalCode: '88888888',
            password: 'abc123',
         })

      const response = await request(app.server)
         .post('/sessions')
         .send({
            mail: 'john@mail.com',
            password: 'abc123',
         })

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual({
         token: expect.any(String)
      })
   })
});