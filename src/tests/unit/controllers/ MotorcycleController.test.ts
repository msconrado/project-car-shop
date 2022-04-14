import {
  motorcycleCreateMock,
  motorcycleIdCreateMock,
} from '../mocks/motorcycleMocks';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import MotorcycleModels from '../../../models/MotorcycleModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Motorcycle Controllers', () => {
  const app = server.getApp();

  let motorcycleModels = new MotorcycleModels();

  describe('rota POST /motorcycles', () => {
    describe('CREATE', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon
            .stub(motorcycleModels.model, 'create')
            .resolves(motorcycleIdCreateMock);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados da moto criada', async () => {
          const response = await chai
            .request(app)
            .post('/motorcycles')
            .send(motorcycleCreateMock);
          expect(response.status).to.deep.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(motorcycleIdCreateMock);
        });
      });

      describe('error "Required"', () => {
        before(async () => {
          sinon.stub(motorcycleModels.model, 'create').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error { nomeChave: ["Required"] } ', async () => {
          const response = await chai.request(app).post('/motorcycles').send({});
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.model[0]).to.deep.equal('Required');
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(motorcycleModels.model, 'create').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai
            .request(app)
            .post('/motorcycles')
            .send(motorcycleCreateMock);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });
});
