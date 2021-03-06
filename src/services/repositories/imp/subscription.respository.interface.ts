import { Subscription } from '../domain/subscription';

export interface ISubscriptionReposirtory {
  all(): Promise<Subscription[]>;
  find(id: number): Promise<Subscription | []>;
  findByUserAndCode(id: number, code: string): Promise<Subscription | []>;
  store(entry: Subscription): Promise<void>;
  update(entry: Subscription): Promise<void>;
  remove(id: number): Promise<void>;
}
