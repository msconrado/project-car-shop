import { expect } from 'chai';
import Sinon from 'sinon';
import CarModels from '../../../models/CarModels';
import { carCreateMock } from '../mocks/carMocks';

describe('Car Models', () => {
  let carModels = new CarModels();

  describe('Create', () => {
    before(() => {
      Sinon.stub(carModels.model, 'create').resolves(carCreateMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carModels.create(carCreateMock);
      expect(car).to.deep.equal(carCreateMock);
    });
  });
});
