import { Document, model as MModel, Schema } from 'mongoose';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MongoModels from './MongoModels';

interface MotorcycleDocument extends IMotorcycle, Document {}

const motorcycleSchema = new Schema<MotorcycleDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    category: { type: String, required: true },
    engineCapacity: { type: Number, required: true },
  },
  { versionKey: false },
);

class MotorcycleModels extends MongoModels<IMotorcycle> {
  constructor(public model = MModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModels;
