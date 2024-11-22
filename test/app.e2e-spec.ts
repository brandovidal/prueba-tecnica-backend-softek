import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Challengue works! 🎉!');
  });

  let personId = null;

  it('/api/people/almacenar (POST)', async () => {
    const person = { name: 'test' };

    const response = await request(app.getHttpServer())
      .post('/people/almacenar')
      .send(person);
    console.log(response.body);

    const { id, name } = response.body;

    expect(response.status).toBe(201);
    expect(name).toBe(name);

    personId = id;
  });

  it('/api/people/historial (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/people/historial',
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('/api/people/eliminar/:personId (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/people/eliminar/${personId}`,
    );

    expect(response.status).toBe(200);
  });
});
