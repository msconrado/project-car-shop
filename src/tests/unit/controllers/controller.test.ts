import {
  carCreateMock,
  carIdCreateMock,
  carIdFindMock,
} from './../mocks/carMocks';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarModels from '../../../models/CarModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car Controllers', () => {
  const app = server.getApp();

  let carModels = new CarModels();

  describe('rota POST /cars', () => {
    describe('create sucesso', () => {
      before(async () => {
        sinon.stub(carModels.model, 'create').resolves(carIdCreateMock);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados do carro criado', async () => {
        const response = await chai
          .request(app)
          .post('/cars')
          .send(carCreateMock);
        expect(response.body).to.be.an('object');
        expect(response.body).to.deep.equal(carIdCreateMock);
      });
    });

    describe('create error', () => {
      before(async () => {
        sinon.stub(carModels.model, 'create').resolves();
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um error', async () => {
        const response = await chai.request(app).post('/cars').send({});
        expect(response.status).to.deep.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error.model[0]).to.deep.equal('Required');
      });
    });
  });

  describe('rota GET /cars', () => {
    describe('find', () => {
      before(async () => {
        sinon.stub(carModels.model, 'find').resolves(carIdFindMock as any[]);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um array com todos os carros no BD', async () => {
        const response = await chai.request(app).get('/cars');
        expect(response.body).to.be.an('array');
        expect(response.body).to.deep.equal(carIdFindMock);
      });
    });
  });

  describe('rota GET /cars/:id', () => {
    describe('findOne sucesso', () => {
      before(async () => {
        sinon.stub(carModels.model, 'findOne').resolves(carIdCreateMock as any);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados do carro do id enviado', async () => {
        const response = await chai
          .request(app)
          .get('/cars/6255f38761dc2797fbbd5495');
        expect(response.body).to.be.an('object');
        expect(response.body).to.deep.equal(carIdCreateMock);
      });
    });

    describe('findOne error', () => {
      before(async () => {
        sinon.stub(carModels.model, 'findOne').resolves();
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar a mensagem de error "Object not found"', async () => {
        const response = await chai
          .request(app)
          .get('/cars/6255f38761dc2797fbbd5496');
        expect(response.status).to.deep.equal(404);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.deep.equal('Object not found');
      });

      it('deve retornar a mensagem de error "Id must have 24 hexadecimal characters"', async () => {
        const response = await chai.request(app).get('/cars/6255');
        expect(response.status).to.deep.equal(400);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.deep.equal(
          'Id must have 24 hexadecimal characters'
        );
      });
    });
  });
});
