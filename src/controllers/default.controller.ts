import { GET, route } from 'awilix-express';
import { Request, Response } from 'express';
import { DateService } from '../services/date.service';
@route('/')
export class DefaultController {
  public constructor(private readonly dateService: DateService) {}

  @GET()
  public index(req: Request, res: Response): void {
    res.send({
      controller: 'default controller',
    });
  }
  @route('date')
  @GET()
  public date(req: Request, res: Response): void {
    res.send({
      date: this.dateService.get(),
    });
  }
}
