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

  public async readOne(id: string): Promise<T | null> {
    const car = await this.model.readOne(id);
    return car;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const car = await this.model.update(id, obj);
    return car;
  }
}
export default MongoServices;
