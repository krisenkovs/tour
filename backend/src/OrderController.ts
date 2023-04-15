import { Request, Response } from 'express';
import { OrderService } from './OrderService';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  check(req: Request, res: Response) {
    const id = req.params?.id;
    this.orderService.check(id).then((result) => {
      res.status(200).json(result);
    });
  }

  get(req: Request, res: Response) {
    this.orderService.get().then((result) => {
      res.status(200).json(result);
    });
  }

  create(req: Request, res: Response) {
    this.orderService.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  }
}
