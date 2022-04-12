import { Document, Schema, model as MModel } from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';
import MongoModels from './MongoModels';

interface CarDocument extends ICar, Document {}

const carSchema = new Schema<CarDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  },
  { versionKey: false },
);

class CarModels extends MongoModels<ICar> {
  constructor(public model = MModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModels;
