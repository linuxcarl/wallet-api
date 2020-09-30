import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import { BaseController } from '../common/controllers/base.controller';
import { SubscriptionCreateDto } from '../dtos/subscription.dto';
import { SubscriptionUpdateDto } from '../dtos/subscriptionUpdate.dto';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  public constructor(
    private readonly subscriptionService: SubscriptionService
  ) {
    super();
  }
  @GET()
  public async all(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.subscriptionService.all());
    } catch (error) {
      this.handlerException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      res.send(await this.subscriptionService.find(Number(id)));
    } catch (error) {
      this.handlerException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      await this.subscriptionService.store({
        ...req.body,
      } as SubscriptionCreateDto);
      res.send();
    } catch (error) {
      this.handlerException(error, res);
    }
  }
  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.subscriptionService.update(Number(id), {
        ...req.body,
      } as SubscriptionUpdateDto);
      res.send();
    } catch (error) {
      this.handlerException(error, res);
    }
  }
  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.subscriptionService.remove(Number(id));
      res.send();
    } catch (error) {
      this.handlerException(error, res);
    }
  }
}
