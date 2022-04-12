import { carCreateMock, carIdCreateMock } from './../mocks/carMocks';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarModels from '../../../models/CarModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car Controllers, rota /cars', () => {
  const app = server.getApp();

  let carModels = new CarModels();

  describe('Create', () => {
    before(async () => {
      sinon.stub(carModels.model, 'create').resolves(carIdCreateMock);
    });

    after(() => {
      sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const response = await chai
        .request(app)
        .post('/cars')
        .send(carCreateMock);

      expect(response.body).to.deep.equal(carIdCreateMock);
    });
  });
});
