import { Car as ICar } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';
import MongoService from './MongoServices';

class CarServices extends MongoService<ICar> {
  constructor(protected model = new CarModel()) {
    super(model);
  }
}

export default CarServices;
