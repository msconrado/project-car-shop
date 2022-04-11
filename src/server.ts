import router from './routes/route';
import App from './app';

// import exampleController from './controllers/controller-example';

// import { example } from './interfaces/ExampleInterface';

const server = new App();

// const exampleController = new exampleController();

// const exampleRouter = new CustomRouter<Car>();
server.addRouter(router);

// server.addRouter(exampleRouter.router);

export default server;
