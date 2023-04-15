import { Request, Response } from 'express';
import { CountryService } from './CountryService';

export class CountryController {
  private countryService: CountryService;

  constructor() {
    this.countryService = new CountryService();
  }

  get(req: Request, res: Response) {
    this.countryService.get().then((result) => {
      res.status(200).json(result);
    });
  }

  create(req: Request, res: Response) {
    this.countryService.create(req.body).then((result) => {
      res.status(200).json(result);
    });
  }

  save(req: Request, res: Response) {
    const id = req?.params?.id || '';
    this.countryService
      .save(id, req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }

  delete(req: Request, res: Response) {
    const id = req?.params?.id;
    this.countryService
      .delete(id)
      .then(() => {
        res.status(202).json();
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }
}
