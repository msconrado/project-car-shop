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

  constructor(protected service: MongoServices<T>, public route: string) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}

export default MongoControllers;
