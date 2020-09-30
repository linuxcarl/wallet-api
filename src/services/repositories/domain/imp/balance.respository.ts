import { Balance } from '../balance';

export interface IBalanceReposirtory {
  all(): Promise<Balance[]>;
  find(id: number): Promise<Balance | []>;
  findByUserId(id: number): Promise<Balance | []>;
  store(entry: Balance): Promise<number>;
  update(entry: Balance): Promise<number>;
  remove(id: number): Promise<number>;
}
