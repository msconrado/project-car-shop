import * as sinon from 'sinon';
import { carIdCreateMock, carIdFindMock } from './../mocks/carMocks';
import { expect } from 'chai';

import CarServices from '../../../services/CarServices';

describe('Car Services', () => {
  let carServices = new CarServices();
  describe('rota POST /cars', () => {
    describe('create', () => {
      before(async () => {
        sinon.stub(carServices.model, 'create').resolves(carIdCreateMock);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados do carro criado', async () => {
        const car = await carServices.create(carIdCreateMock);
        expect(car).to.be.an('object');
        expect(car).to.deep.equal(carIdCreateMock);
      });
    });
  });

  describe('rota GET /cars', () => {
    describe('read', () => {
      before(async () => {
        sinon.stub(carServices.model, 'read').resolves(carIdFindMock);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um array com todos os carros no BD', async () => {
        const car = await carServices.read();
        expect(car).to.be.an('array');
        expect(car).to.deep.equal(carIdFindMock);
      });
    });
  });

  describe('rota GET /cars/:id', () => {
    describe('readOne quando existe o documento', () => {
      before(async () => {
        sinon.stub(carServices.model, 'readOne').resolves(carIdCreateMock);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto com os dados do carro do id enviado', async () => {
        const car = await carServices.readOne('6255f38761dc2797fbbd5495');
        expect(car).to.be.an('object');
        expect(car).to.deep.equal(carIdCreateMock);
      });
    });
  });
  describe('readOne quando não existe o documento', () => {
    before(async () => {
      sinon.stub(carServices.model, 'readOne').resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carServices.readOne('6255f38761dc2797fbbd5492');
      expect(car).to.be.null;
    });
  });
});
