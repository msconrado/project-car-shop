import { ZodError } from 'zod';
import { Response, Request } from 'express';
import MongoControllers, {
  RequestWithBody,
  ResponseError,
} from './MongoControllers';
import CarServices from '../services/CarServices';
import CarSchema, { Car as ICar } from '../interfaces/CarInterface';

class CarControllers extends MongoControllers<ICar> {
  constructor(protected service = new CarServices()) {
    super(service, '/cars');
  }

  create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;

      CarSchema.parse(body);

      const car = await this.service.create(body);

      return res.status(201).json(car);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.flatten().fieldErrors });
      }

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (id.length < 24) throw new Error();

      const car = await this.service.readOne(id);

      return car
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: this.errors.idMust });
      }

      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarControllers;
