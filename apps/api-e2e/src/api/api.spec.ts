import * as pactum from 'pactum';
import { faker } from '@faker-js/faker';

describe('api e2e', () => {
  describe('Auth Controller', () => {
    const user = {
      username: faker.internet.userName(),
      password: '132Na+lm3Bx@',
      email: faker.internet.email(),
    };
    console.log(user);
    describe('Register', () => {
      it('should register Successfully Return ', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(user)
          .expectStatus(201);
      });
      // TODO should test all the fialed Cases
    });
    describe('Login', () => {
      it('should login Successfully Return ', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ email: user.email, password: user.password })
          .expectStatus(200);
      });
      // TODO should test all the fialed Cases
    });
  });
});
