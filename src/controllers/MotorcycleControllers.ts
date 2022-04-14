import { ZodError } from 'zod';
import { Response, Request } from 'express';
import MongoControllers, {
  RequestWithBody,
  ResponseError,
} from './MongoControllers';
import motorcycleSchema, {
  Motorcycle as IMotorcycle,
} from '../interfaces/MotorcycleInterface';
import MotorcycleServices from '../services/MotorcycleServices';

class MotorcycleControllers extends MongoControllers<IMotorcycle> {
  constructor(protected service = new MotorcycleServices()) {
    super(service, '/motorcycles');
  }

  create = async (
    req: RequestWithBody<IMotorcycle>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;

      motorcycleSchema.parse(body);

      const moto = await this.service.create(body);

      return res.status(201).json(moto);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.flatten().fieldErrors });
      }

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.idMust });
      }

      const moto = await this.service.readOne(id);

      return moto
        ? res.status(200).json(moto)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { params: { id }, body } = req;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.idMust });
      }

      motorcycleSchema.parse(body);

      const moto = await this.service.update(id, body);

      return moto ? res.status(200).json(moto)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.flatten().fieldErrors });
      }

      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<object | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.idMust });
      }

      const moto = await this.service.delete(id);

      return moto
        ? res.status(204).json({})
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleControllers;
