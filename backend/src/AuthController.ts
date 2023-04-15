import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { AuthService } from './AuthService';

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  }

  login(req: Request, res: Response) {
    this.authService
      .login(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }

  async logout(req: Request, res: Response) {
    const token = `${req.headers.authorization}`.split(' ')?.[1];
    this.authService
      .logout(token)
      .then(() => {
        res.status(202).json();
      })
      .catch((e) => {
        return res.status(400).json({ message: e.message });
      });
  }
}
