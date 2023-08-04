import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';

describe('Create (e2e)', () => {
   beforeAll(async () => {
      await app.ready();
   })

   afterAll(async () => {
      await app.close();
   })

   it('should be able to create', async () => {
      const response = await request(app.server)
         .post('/users')
         .send({
            name: 'John Doe',
            mail: 'johndoe@example.com',
            password: 'abc123456',
            fullAddress: 'full address, 30',
            phone: '14999999999',
            postalCode: '8888888'
         })

      expect(response.statusCode).toEqual(201)
   })
});