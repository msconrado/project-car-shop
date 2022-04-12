import { carIdCreateMock } from './../mocks/carMocks';
import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModels from '../../../models/CarModels';

describe('Car Models, rota /cars', () => {
  let carModels = new CarModels();

  describe('Create', () => {
    before(async () => {
      sinon.stub(carModels.model, 'create').resolves(carIdCreateMock);
    });

    after(() => {
      sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carModels.create(carIdCreateMock);
      expect(car).to.deep.equal(carIdCreateMock);
    });
  });
});
