import { promises } from 'fs';
import { ApplicationException } from '../common/exceptions/application.exception';
import { SubscriptionCreateDto } from '../dtos/subscription.dto';
import { SubscriptionUpdateDto } from '../dtos/subscriptionUpdate.dto';
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
    if (!originalEntry) {
      try {
        await this.subscriptionRepository.store(entry as Subscription);
      } catch (error) {
        throw new ApplicationException(error.message);
      }
    } else {
      throw new ApplicationException('User subscription already exists.');
    }
  }
  public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id);

    if (originalEntry) {
      const newEntry = Object.assign(originalEntry, entry);
      try {
        await this.subscriptionRepository.update(newEntry);
      } catch (error) {
        throw new ApplicationException(error.message);
      }
    }
  }
  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}
