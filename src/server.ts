import { Car as ICar } from './interfaces/CarInterface';
import { Motorcycle as IMotorcycle } from './interfaces/MotorcycleInterface';
import App from './app';
import CustomRouter from './routes/route';
import CarController from './controllers/CarControllers';
import MotorcycleControllers from './controllers/MotorcycleControllers';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleControllers();

const CarRouter = new CustomRouter<ICar>();
CarRouter.addRoute(carController);
const MotorcycleRouter = new CustomRouter<IMotorcycle>();
MotorcycleRouter.addRoute(motorcycleController);

server.addRouter(CarRouter.router);
server.addRouter(MotorcycleRouter.router);

export default server;
