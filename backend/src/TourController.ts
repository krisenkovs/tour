import { Request, Response } from 'express';
import { TourService } from './TourService';

export class TourController {
  private tourService: TourService;

  constructor() {
    this.tourService = new TourService();
  }

  find(req: Request, res: Response) {
    console.log('find');
    this.tourService.find(req.body).then((result) => {
      res.status(200).json(result);
    });
  }

  get(req: Request, res: Response) {
    this.tourService.get().then((result) => {
      res.status(200).json(result);
    });
  }

  create(req: Request, res: Response) {
    this.tourService.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  }

  save(req: Request, res: Response) {
    const id = req?.params?.id;
    this.tourService
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
    this.tourService
      .delete(id)
      .then(() => {
        res.status(200).json();
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }
}
