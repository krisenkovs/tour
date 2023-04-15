import express, { Application, NextFunction, Request, Response } from 'express';
import { OrderController } from './OrderController';
import { TourController } from './TourController';
import { HotelController } from './HotelController';
import { CountryController } from './CountryController';
import { AuthMiddleware } from './AuthMiddleware';
import { AuthController } from './AuthController';
import bodyParser from 'body-parser';
import { AppDataSource } from './DataSource';
import path from "path";

const app: Application = express();

AppDataSource.initialize()
  .then(() => {
    console.log(JSON.stringify({ scope: 'application', message: 'Data Source has been initialized!' }));
    const authMiddleware = new AuthMiddleware();
    const authController = new AuthController();
    const countryController = new CountryController();
    const hotelController = new HotelController();
    const tourController = new TourController();
    const orderController = new OrderController();

    app.use(bodyParser.json());
		app.use(express.static(path.join(__dirname, 'public')));

		app.use('/api/*', (req: Request, res: Response, next: NextFunction) => authMiddleware.check(req, res, next));

    app.post('/login', (req, res) => authController.login(req, res));
    app.post('/logout', (req, res) => authController.logout(req, res));
    app.post('/tours/find', (req, res) => tourController.find(req, res));
    app.get('/country', (req, res) => countryController.get(req, res));
    app.post('/order/create', (req, res) => orderController.create(req, res));

    app.get('/api/country', (req: Request, res: Response) => countryController.get(req, res));
    app.post('/api/country', (req: Request, res: Response) => countryController.create(req, res));
    app.put('/api/country/:id', (req: Request, res: Response) => countryController.save(req, res));
    app.delete('/api/country/:id', (req: Request, res: Response) => countryController.delete(req, res));

    app.get('/api/hotel', (req: Request, res: Response) => hotelController.get(req, res));
    app.post('/api/hotel', (req: Request, res: Response) => hotelController.create(req, res));
    app.put('/api/hotel/:id', (req: Request, res: Response) => hotelController.save(req, res));
    app.delete('/api/hotel/:id', (req: Request, res: Response) => hotelController.delete(req, res));

    app.get('/api/tour', (req: Request, res: Response) => tourController.get(req, res));
    app.post('/api/tour', (req: Request, res: Response) => tourController.create(req, res));
    app.put('/api/tour/:id', (req: Request, res: Response) => tourController.save(req, res));
    app.delete('/api/tour/:id', (req: Request, res: Response) => tourController.delete(req, res));

    app.get('/api/order', (req: Request, res: Response) => orderController.get(req, res));
    app.post('/api/order/:id/check', (req: Request, res: Response) => orderController.check(req, res));

    app.listen(process.env.PORT || 3100, () => {
      console.log(
        JSON.stringify({ scope: 'application', message: `application started on ${process.env.PORT || 3100} post` }),
      );
    });
  })
  .catch((err) => {
    console.log(JSON.stringify({ scope: 'application', message: err }));
  });
