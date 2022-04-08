/* eslint-disable prettier/prettier */
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthDto } from './../src/auth/dto/auth.dto';
import { AppModule } from './../src/app.module';

let access_token;

describe('App e2e', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.listen(3333)
    await app.init()
  })

  afterAll(() => {
    app.close()
  })

  describe('Registration', () => {
    it('should register', () => {
      const user: AuthDto = {
        email: 'ganesh@sabbar.com', password: 'Ganesh123', fullName: 'Ganesh Kumar'
      }
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(HttpStatus.CREATED)
    })

    it('should not register', () => {
      const user: AuthDto = {
        email: 'ganesh@sabbar.com', password: 'Ganesh123', fullName: 'Ganesh Kumar'
      }

      return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('Login', () => {
    it('should login', () => {
      const user: AuthDto = {
        email: 'ganesh@sabbar.com', password: 'Ganesh123', fullName: 'Ganesh Kumar'
      }

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(HttpStatus.OK)
        .expect(res => {
          access_token = res.body.access_token
        })
    })

    it('should throw exception for email validation', () => {
      const userWithoutEmail: AuthDto = {
        email: '', password: 'Ganesh123', fullName: 'Ganesh Kumar'
      }

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(userWithoutEmail)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('get me', () => {
    it('should return user profile with OK status', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .set({ 'Authorization': 'Bearer ' + access_token })
        .expect(HttpStatus.OK)
    })

    it('should throw unauthorized exception', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .expect(HttpStatus.UNAUTHORIZED)
    })
  })

  describe('get all users', () => {
    it('should list all users with OK status', () => {
      return request(app.getHttpServer())
        .get('/users/')
        .set({ 'Authorization': 'Bearer ' + access_token })
        .expect(HttpStatus.OK)
    })
  })

  describe('update user name', () => {
    it('should update user full name with OK status', () => {
      return request(app.getHttpServer())
        .put('/users/update-profile')
        .set({ 'Authorization': 'Bearer ' + access_token })
        .send({ email: 'ganesh@sabbar.com', fullName: 'G Kumar Kirthiv' })
        .expect(HttpStatus.OK)
    })
  })
})