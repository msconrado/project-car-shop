import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

const carSchema = vehicleSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export type Car = z.infer<typeof carSchema>;

export default carSchema;
