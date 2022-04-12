import MongoModels from '../models/MongoModels';

class MongoServices<T> {
  constructor(protected model: MongoModels<T>) {}

  public async create(obj: T): Promise<T> {
    const car = await this.model.create(obj);
    return car;
  }
}

export default MongoServices;
