import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';
import MongoService from './MongoServices';

class CarServices extends MongoService<Car> {
  constructor(protected model = new CarModel()) {
    super(model);
  }
}

export default CarServices;
