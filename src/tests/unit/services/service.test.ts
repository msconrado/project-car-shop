import Sinon from 'sinon';
import { carCreateMock } from './../mocks/carMocks';
import { expect } from 'chai';

import CarServices from "../../../services/CarServices";

describe('Car Services', () => {
  let carServices = new CarServices();

  describe('Create', () => {
    before(() => {
      Sinon.stub(carServices.model, 'create').resolves(carCreateMock);
    });

    after(() => {
      Sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carServices.create(carCreateMock);
      expect(car).to.deep.equal(carCreateMock);
    });
  });
});
