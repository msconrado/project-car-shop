import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/route';
import App from './app';
import CarController from './controllers/CarController';

const server = new App();

const carController = new CarController();

const CarRouter = new CustomRouter<Car>();
CarRouter.addRoute(carController);

server.addRouter(CarRouter.router);

export default server;
