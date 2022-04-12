import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMock } from './carMock';
describe('Car Models', () => {
  let carModel = new CarModel();

  describe('Create', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(carMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carModel.create(carMock);
      expect(car).to.deep.equal(carMock);
    });
  });
});
