import { Request, Response } from 'express';
import ControllerErrors from '../enum/erros';
import MongoServices from '../services/MongoServices';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

class MongoControllers<T> {
  protected errors = ControllerErrors;

  constructor(protected service: MongoServices<T>, public route: string) { }

  public create = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;

      const car = await this.service.create(body);

      return res.status(201).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MongoControllers;
