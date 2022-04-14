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
    describe('create', () => {
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

  describe('rota GET /cars', () => {
    describe('read', () => {
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

  describe('rota GET /cars/:id', () => {
    describe('readOne, quando existe o documento', () => {
      before(async () => {
        sinon.stub(carModels.model, 'findOne').resolves(carIdCreateMock as any);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados do carro do id enviado', async () => {
        const car = await carModels.readOne(id);
        expect(car).to.be.an('object');
        expect(car).to.deep.equal(carIdCreateMock);
      });
    });

    describe('readOne, quando não existe o documento', () => {
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

  describe('rota PUT /cars/:id', () => {
    describe('update, quando existe o documento', () => {
      before(async () => {
        sinon
          .stub(carModels.model, 'findByIdAndUpdate')
          .resolves(carIdUpdateMock as any);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados atualizados do carro do id enviado', async () => {
        const car = await carModels.update(id, carIdUpdateMock);
        expect(car).to.be.an('object');
        expect(car).to.deep.equal(carIdUpdateMock);
      });
    });

    describe('update, quando não existe o documento', () => {
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
