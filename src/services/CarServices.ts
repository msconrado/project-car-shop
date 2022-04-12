import { Car as ICar } from '../interfaces/CarInterface';
import CarModels from '../models/CarModels';
import MongoServices from './MongoServices';

class CarServices extends MongoServices<ICar> {
  constructor(public model = new CarModels()) {
    super(model);
  }
}

export default CarServices;
