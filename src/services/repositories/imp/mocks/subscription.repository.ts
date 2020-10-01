/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/
import db from '../../../../common/persistence/mock.persistence';
import { Subscription } from '../../domain/subscription';
import { ISubscriptionReposirtory } from '../subscription.respository.interface';

export class SubscriptionMockRepository implements ISubscriptionReposirtory {
  public async find(id: number): Promise<Subscription | []> {
    const table = db.subscriptions as Subscription[];
    const result = table.find((x: any) => x.id === id);

    if (result) {
      return Object.assign({ ...result });
    }

    return [];
  }

  public async findByUserAndCode(
    userId: number,
    code: string
  ): Promise<Subscription | []> {
    const table = db.subscriptions as Subscription[];
    const result = table.find(
      (x: any) => x.user_id === userId && x.code === code
    );

    if (result) {
      return Object.assign({ ...result });
    }

    return [];
  }

  public async all(): Promise<Subscription[]> {
    const table = db.subscriptions as Subscription[];
    return Object.assign([...table]);
  }

  public async store(entry: Subscription): Promise<void> {
    const table = db.subscriptions as Subscription[];
    const now = new Date();

    db._subscriptionId += 1;

    table.push(({
      id: db._subscriptionId,
      code: entry.code,
      amount: entry.amount,
      user_id: entry.user_id,
      cron: entry.cron,
      created_at: now,
      updated_at: [],
    } as unknown) as Subscription);
  }

  public async update(entry: Subscription): Promise<void> {
    const table = db.subscriptions as Subscription[];
    const now = new Date();

    const originalEntry = table.find((x: any) => x.id === entry.id);

    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.user_id = entry.user_id;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      originalEntry.updated_at = now;
    }
  }

  public async remove(id: number): Promise<void> {
    let table = db.subscriptions as Subscription[];

    table = table.filter((x: any) => x.id !== id);
  }
}
