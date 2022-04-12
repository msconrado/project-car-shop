import { Model as MModel, Document } from 'mongoose';
import { Model as IModel } from '../interfaces/ModelInterface';

abstract class MongoModels<T> implements IModel<T> {
  constructor(protected model: MModel<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  update = async (id: string, obj: T): Promise<T | null> =>
    this.model.findByIdAndUpdate({ _id: id }, { ...obj });

  delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}

export default MongoModels;
