/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/
import db from '../../../../common/persistence/mock.persistence';
import { BalanceDto } from '../../../../dtos/balance.dto';
import { Balance } from '../../domain/balance';
import { IBalanceReposirtory } from '../balance.respository';

export class BalanceMockRepository implements IBalanceReposirtory {
  public async find(id: number): Promise<Balance | []> {
    const table = db.balances as Balance[];
    const result = table.find((x: any) => x.id === id);

    if (result) {
      return Object.assign({ ...result });
    }

    return [];
  }

  public async findByUserId(userId: number): Promise<Balance | []> {
    const table = db.balances as Balance[];
    const result = table.find((x: any) => x.user_id === userId);

    if (result) {
      return Object.assign({ ...result });
    }

    return [];
  }

  public async all(): Promise<Balance[]> {
    const table = db.balances as Balance[];
    return Object.assign([...table]);
  }

  public async store(entry: BalanceDto): Promise<number> {
    const table = db.balances as Balance[];
    const now = new Date();

    db._balanceId += 1;

    table.push(({
      id: db._balanceId,
      amount: entry.amount,
      user_id: entry.user_id,
      created_at: now,
      updated_at: '',
    } as unknown) as Balance);
    return db._balanceId;
  }

  public async update(entry: BalanceDto): Promise<number> {
    const table = db.balances as Balance[];
    const now = new Date();

    const originalEntry = table.find((x: any) => x.id === entry.id);

    if (originalEntry) {
      originalEntry.user_id = entry.user_id;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = now;
    }
    return Number(entry.id);
  }
  public async remove(id: number): Promise<number> {
    let table = db.subscriptions as Balance[];

    table = table.filter((x: any) => x.id !== id);
    return id;
  }
}
