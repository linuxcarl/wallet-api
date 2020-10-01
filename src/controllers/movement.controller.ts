import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { MovementDto } from '../dtos/movement.dto';
import { MovementService } from '../services/movement.service';

@route('/movements')
export class MovementController extends BaseController {
  public constructor(private readonly movementService: MovementService) {
    super();
  }
  @GET()
  public async all(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.movementService.all());
    } catch (error) {
      this.handlerException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      res.send(await this.movementService.find(Number(id)));
    } catch (error) {
      this.handlerException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.movementService.store({
        ...req.body,
      } as MovementDto);
      res.send({
        id: result,
      });
    } catch (error) {
      this.handlerException(error, res);
    }
  }
}
