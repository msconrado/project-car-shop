import { carIdFindMock } from './../mocks/carMocks';
import { carIdCreateMock } from '../mocks/carMocks';
import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModels from '../../../models/CarModels';
import { Car } from '../../../interfaces/CarInterface';

interface CarId {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  seatsQty: number;
  doorsQty: number;
}
describe('Car Models', () => {
  let carModels = new CarModels();
  describe('rota POST /cars', () => {
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

  describe(' rota GET /cars', () => {
    describe('Read', () => {
      before(async () => {
        sinon.stub(carModels.model, 'find').resolves(carIdFindMock as any[]);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um array de Cars', async () => {
        const cars = await carModels.read();
        expect(cars).to.deep.equal(carIdFindMock);
      });
    });
  });

  describe(' rota GET /cars/:id', () => {
    describe('ReadOne', () => {
      before(async () => {
        sinon.stub(carModels.model, 'findOne').resolves(carIdCreateMock as any);
      });

      after(() => {
        sinon.restore();
      });

      it('deve retornar um objeto de Cars', async () => {
        const cars = await carModels.readOne('6255f38761dc2797fbbd5495');
        expect(cars).to.deep.equal(carIdCreateMock);
      });
    });
  });
});
