import MongoModel from '../models/MongoModel';

class MongoService<T> {
  constructor(protected model: MongoModel<T>) {}

  public async create(obj: T): Promise<T> {
    const car = await this.model.create(obj);
    return car;
  }
}

export default MongoService;
