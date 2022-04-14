import {
  carCreateMock,
  carIdCreateMock,
  carIdFindMock,
  carIdUpdateMock,
  id,
  idInvalid,
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
    describe('CREATE', () => {
      describe('sucesso', () => {
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
            expect(response.status).to.deep.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.deep.equal(carIdCreateMock);
        });
      });

      describe('error "Required"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'create').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error { nomeChave: ["Required"] } ', async () => {
          const response = await chai.request(app).post('/cars').send({});
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.model[0]).to.deep.equal('Required');
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'create').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai
            .request(app)
            .post('/cars')
            .send(carCreateMock);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });

  describe('rota GET /cars', () => {
    describe('FIND', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon.stub(carModels.model, 'find').resolves(carIdFindMock as any[]);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um array com todos os carros no BD', async () => {
          const response = await chai.request(app).get('/cars');
          expect(response.status).to.deep.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body).to.deep.equal(carIdFindMock);
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'find').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai.request(app).get('/cars');
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });

  describe('rota GET /cars/:id', () => {
    describe('FINDONE', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findOne')
            .resolves(carIdCreateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados do carro daquele respectivo id', async () => {
          const response = await chai.request(app).get(`/cars/${id}`);
          expect(response.status).to.deep.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(carIdCreateMock);
        });
      });

      describe('error" Object not found" e "Id must have 24 hexadecimal characters', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findOne').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar a mensagem de error "Object not found"', async () => {
          const response = await chai.request(app).get(`/cars/${idInvalid}`);
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

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findOne').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai.request(app).get(`/cars/${id}`);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });

  describe('rota PUT /cars/:id', () => {
    describe('UPDATE', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findByIdAndUpdate')
            .resolves(carIdUpdateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados atualizados do carro daquele respectivo id', async () => {
          const response = await chai
            .request(app)
            .put(`/cars/${id}`)
            .send(carIdUpdateMock);
          expect(response.status).to.deep.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(carIdUpdateMock);
        });
      });

      describe('error" Object not found" e "Id must have 24 hexadecimal characters', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndUpdate').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar a mensagem de error "Object not found"', async () => {
          const response = await chai
            .request(app)
            .put(`/cars/${idInvalid}`)
            .send(carIdUpdateMock);
          expect(response.status).to.deep.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Object not found');
        });

        it('deve retornar a mensagem de error "Id must have 24 hexadecimal characters"', async () => {
          const response = await chai
            .request(app)
            .put('/cars/6255')
            .send(carIdUpdateMock);
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal(
            'Id must have 24 hexadecimal characters'
          );
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndUpdate').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai
            .request(app)
            .put(`/cars/${id}`)
            .send(carIdUpdateMock);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
      describe('error "Required"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndUpdate').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error { nomeChave: ["Required"] } ', async () => {
          const response = await chai.request(app).put(`/cars/${id}`).send({});
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.model[0]).to.deep.equal('Required');
        });
      });
    });
  });

  describe('rota DELETE /cars/:id', () => {
    describe('DELETE', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findByIdAndDelete')
            .resolves(carIdCreateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto vazio', async () => {
          const response = await chai.request(app).delete(`/cars/${id}`);
          expect(response.status).to.deep.equal(204);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal({});
        });
      });

      describe('error" Object not found" e "Id must have 24 hexadecimal characters', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndDelete').resolves();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar a mensagem de error "Object not found"', async () => {
          const response = await chai.request(app).delete(`/cars/${idInvalid}`);
          expect(response.status).to.deep.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Object not found');
        });

        it('deve retornar a mensagem de error "Id must have 24 hexadecimal characters"', async () => {
          const response = await chai.request(app).delete('/cars/6255');
          expect(response.status).to.deep.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal(
            'Id must have 24 hexadecimal characters'
          );
        });
      });

      describe('error "Server"', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndDelete').throws();
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar o error "Internal Server Error"', async () => {
          const response = await chai.request(app).delete(`/cars/${id}`);
          expect(response.status).to.deep.equal(500);
          expect(response.body).to.be.an('object');
          expect(response.body.error).to.deep.equal('Internal Server Error');
        });
      });
    });
  });
});
