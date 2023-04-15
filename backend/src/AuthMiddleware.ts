import { NextFunction, Request, Response } from 'express';
import {  MoreThan } from 'typeorm';
import { TokenEntity } from './TokenEntity';
import { AppDataSource } from './DataSource';

export class AuthMiddleware {

  constructor() {
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const token = `${req.headers.authorization}`.split(' ')?.[1];

      const checkToken = await AppDataSource.manager.findOne(TokenEntity, {
        where: [{ token, expire: MoreThan(new Date().toJSON()) }],
      });
      if (!checkToken) {
        return res.status(401).json();
      }
      return next();
    } catch (e) {
      res.status(500).json({ message: 'system error', code: 'system-error' });
    }
  }
}
