import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

const motorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500),
});

export type Motorcycle = z.infer<typeof motorcycleSchema>;

export default motorcycleSchema;
