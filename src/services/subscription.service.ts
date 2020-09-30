import { promises } from 'fs';
import { SubscriptionCreateDto } from '../dtos/subscription.dto';
import { ISubscriptionReposirtory } from './repositories/domain/imp/subscription.respository.interface';
import { Subscription } from './repositories/domain/subscription';

export class SubscriptionService {
  public constructor(
    private readonly subscriptionRepository: ISubscriptionReposirtory
  ) {}
  public async find(id: number): Promise<Subscription | []> {
    return await this.subscriptionRepository.find(id);
  }
  public async all(): Promise<Subscription[]> {
    return await this.subscriptionRepository.all();
  }
  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const { user_id, code } = entry;
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(
      user_id,
      code
    );
  }
  public async update(entry: any): Promise<void> {
    this.subscriptionRepository.update(entry);
  }
  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}
