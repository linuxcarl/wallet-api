import { Response } from 'express';
import { ApplicationException } from '../exceptions/application.exception';
export abstract class BaseController {
  handlerException(err: any, res: Response) {
    if (err instanceof ApplicationException) {
      res.status(400);
      res.send();
    } else {
      throw new Error(err);
    }
  }
}
