import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { IndieCampersModule } from './indie-campers.module';
import { IndieCampersService } from './indie-campers.service';

describe('IndieCampersController (e2e)', () => {
  let app: INestApplication;
  let indieCampersService = { 
    listLocations: () => Promise.resolve([{ id: 1, name: 'Location 1' }]),
    listAvailabilities: () => Promise.resolve([{ id: 1, available: true }])
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [IndieCampersModule],
    })
    .overrideProvider(IndieCampersService)
    .useValue(indieCampersService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/indie-campers-list-locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/indie-campers-list-locations')
      .expect(HttpStatus.OK)
      .expect(indieCampersService.listLocations());
  });

  it('/indie-campers-list-availabilities (GET)', () => {
    return request(app.getHttpServer())
      .get('/indie-campers-list-availabilities')
      .query({ from_location: '1', to_location: '2', checkin_date: '2023-10-01', checkout_date: '2023-10-10' })
      .expect(HttpStatus.OK)
      .expect(indieCampersService.listAvailabilities());
  });

  afterAll(async () => {
    await app.close();
  });
});