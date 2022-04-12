import { ZodError } from 'zod';
import { Response } from 'express';
import MongoController, {
  RequestWithBody,
  ResponseError,
} from './MongoController';
import CarServices from '../services/CarServices';
import CarSchema, { Car as ICar } from '../interfaces/CarInterface';

class CarController extends MongoController<ICar> {
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
}

export default CarController;
