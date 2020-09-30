import { Balance } from '../balance';

export interface IBalanceReposirtory {
  all(): Promise<Balance[]>;
  find(id: number): Promise<Balance | []>;
  findByUserId(id: number): Promise<Balance | []>;
  store(entry: Balance): Promise<void>;
  update(entry: Balance): Promise<void>;
  remove(id: number): Promise<void>;
}
