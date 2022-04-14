import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleModels from '../models/MotorcycleModels';
import MongoServices from './MongoServices';

class MotorcycleServices extends MongoServices<IMotorcycle> {
  constructor(public model = new MotorcycleModels()) {
    super(model);
  }
}

export default MotorcycleServices;
