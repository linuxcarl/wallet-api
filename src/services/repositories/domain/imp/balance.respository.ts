import { BalanceDto } from '../../../../dtos/balance.dto';
import { Balance } from '../balance';

export interface IBalanceReposirtory {
  all(): Promise<Balance[]>;
  find(id: number): Promise<Balance | []>;
  findByUserId(id: number): Promise<Balance | []>;
  store(entry: BalanceDto): Promise<number>;
  update(entry: BalanceDto): Promise<number>;
  remove(id: number): Promise<number>;
}
