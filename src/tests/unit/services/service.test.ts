import * as sinon from 'sinon';
import { carIdCreateMock } from './../mocks/carMocks';
import { expect } from 'chai';

import CarServices from "../../../services/CarServices";

describe('Car Services, rota /cars', () => {
  let carServices = new CarServices();

  describe('Create', () => {
    before(async () => {
      sinon.stub(carServices.model, 'create').resolves(carIdCreateMock);
    });

    after(() => {
      sinon.restore();
    });

    it('deve retornar um objeto de Car', async () => {
      const car = await carServices.create(carIdCreateMock);
      expect(car).to.deep.equal(carIdCreateMock);
    });
  });
});
