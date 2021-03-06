import { Request, Response } from 'express';
import ControllerErrors from '../enum/erros';
import MongoServices from '../services/MongoServices';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class MongoControllers<T> {
  protected errors = ControllerErrors;

  constructor(protected service: MongoServices<T>, public route: string) {}

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();

      return res.json(cars);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}

export default MongoControllers;
