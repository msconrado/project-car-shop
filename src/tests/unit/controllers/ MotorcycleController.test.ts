import {
  id,
  idInvalid,
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
          const response = await chai
            .request(app)
            .post('/motorcycles')
            .send({});
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

  describe('rota GET /motorcycles/:id', () => {
    describe('FINDONE', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon
            .stub(motorcycleModels.model, 'findOne')
            .resolves(motorcycleIdCreateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados da moto daquele respectivo id', async () => {
          const response = await chai.request(app).get(`/motorcycles/${id}`);
          expect(response.status).to.deep.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(motorcycleIdCreateMock);
        });
      });

      describe('error" Object not found" e "Id must have 24 hexadecimal characters', () => {
        before(async () => {
          sinon.stub(motorcycleModels.model, 'findOne').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar a mensagem de error "Object not found"', async () => {
          const response = await chai
            .request(app)
            .get(`/motorcycles/${idInvalid}`);
          expect(response.status).to.deep.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Object not found');
        });

        it('deve retornar a mensagem de error "Id must have 24 hexadecimal characters"', async () => {
          const response = await chai.request(app).get('/motorcycles/6255');
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal(
            'Id must have 24 hexadecimal characters'
          );
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(motorcycleModels.model, 'findOne').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai.request(app).get(`/motorcycles/${id}`);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });
});
