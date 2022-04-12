import { Car as ICar } from '../interfaces/CarInterface';
import CarModel from '../models/CarModels';
import MongoServices from './MongoServices';

class CarServices extends MongoServices<ICar> {
  constructor(public model = new CarModel()) {
    super(model);
  }
}

export default CarServices;
