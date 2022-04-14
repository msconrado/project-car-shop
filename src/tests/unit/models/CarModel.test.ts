import {
  carIdFindMock,
  carIdUpdateMock,
  id,
  idInvalid,
} from './../mocks/carMocks';
import { carIdCreateMock } from '../mocks/carMocks';
import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModels from '../../../models/CarModels';

describe('Car Models', () => {
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
          const car = await carModels.create(carIdCreateMock);
          expect(car).to.be.an('object');
          expect(car).to.deep.equal(carIdCreateMock);
        });
      });
    });
  });

  describe('rota GET /cars', () => {
    describe('READ', () => {
      describe('sucesso', () => {
        before(async () => {
          sinon.stub(carModels.model, 'find').resolves(carIdFindMock as any[]);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um array com todos os carros no BD', async () => {
          const cars = await carModels.read();
          expect(cars).to.be.an('array');
          expect(cars).to.deep.equal(carIdFindMock);
        });
      });
    });
  });

  describe('rota GET /cars/:id', () => {
    describe('READONE', () => {
      describe('quando existe o documento', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findOne')
            .resolves(carIdCreateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados do carro daquele respectivo id', async () => {
          const car = await carModels.readOne(id);
          expect(car).to.be.an('object');
          expect(car).to.deep.equal(carIdCreateMock);
        });
      });

      describe('quando não existe o documento', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findOne').resolves(null);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar null', async () => {
          const car = await carModels.readOne(idInvalid);
          expect(car).to.be.null;
        });
      });
    });
  });

  describe('rota PUT /cars/:id', () => {
    describe('UPDATE', () => {
      describe('quando existe o documento', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findByIdAndUpdate')
            .resolves(carIdUpdateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto com os dados atualizados do carro daquele respectivo id', async () => {
          const car = await carModels.update(id, carIdUpdateMock);
          expect(car).to.be.an('object');
          expect(car).to.deep.equal(carIdUpdateMock);
        });
      });

      describe('quando não existe o documento', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndUpdate').resolves(null);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar null', async () => {
          const car = await carModels.update(idInvalid, carIdUpdateMock);
          expect(car).to.be.null;
        });
      });
    });
  });

  describe('rota DELETE /cars/:id', () => {
    describe('DELETE', () => {
      describe('quando existe o documento', () => {
        before(async () => {
          sinon
            .stub(carModels.model, 'findByIdAndDelete')
            .resolves(carIdCreateMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar um objeto do carro deletado', async () => {
          const car = await carModels.delete(id);
          expect(car).to.be.an('object');
          expect(car).to.deep.equal(carIdCreateMock);
        });
      });

      describe('quando não existe o documento', () => {
        before(async () => {
          sinon.stub(carModels.model, 'findByIdAndDelete').resolves(null);
        });

        after(() => {
          sinon.restore();
        });

        it('deve retornar null', async () => {
          const car = await carModels.delete(idInvalid);
          expect(car).to.be.null;
        });
      });
    });
  });
});
