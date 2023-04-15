import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { HotelService } from './HotelService';

export class HotelController {
  private hotelService: HotelService;

  constructor() {
    this.hotelService = new HotelService();
  }

  get(req: Request, res: Response) {
    this.hotelService.get().then((result) => {
      res.status(200).json(result);
    });
  }

  create(req: Request, res: Response) {
    this.hotelService.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  }

  save(req: Request, res: Response) {
    const id = req?.params?.id;
    this.hotelService
      .save(id, req.body)
      .then(() => {
        res.status(200).json();
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }

  delete(req: Request, res: Response) {
    const id = req?.params?.id;
    this.hotelService
      .delete(id)
      .then(() => {
        res.status(200).json();
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }
}
