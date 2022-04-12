import MongoModels from '../models/MongoModels';

abstract class MongoServices<T> {
  constructor(protected model: MongoModels<T>) {}

  public async create(obj: T): Promise<T> {
    const car = await this.model.create(obj);
    return car;
  }

  public async read(): Promise<T[]> {
    const cars = await this.model.read();
    return cars;
  }
}

export default MongoServices;
