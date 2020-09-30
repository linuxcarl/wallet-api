import connector from '../../../../../common/persistence/mysql.persistence';
import { IBalanceReposirtory } from '../balance.respository';
import { Balance } from '../../balance';
import { BalanceDto } from '../../../../../dtos/balance.dto';
export class BalanceMysqlRepository implements IBalanceReposirtory {
  private readonly now: Date = new Date();
  public async all(): Promise<Balance[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_balance ORDER BY id DESC'
    );
    return rows as Balance[];
  }
  public async find(id: number): Promise<Balance> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELECT * FROM wallet_balance WHERE id =?',
      [id]
    );
    return rows[0] as Balance;
  }
  public async findByUserId(id: number): Promise<Balance> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELECT * FROM wallet_balance WHERE id =?',
      [id]
    );
    return rows[0] as Balance;
  }
  public async store(entry: BalanceDto): Promise<number> {
    const { user_id, amount } = entry;
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'INSERT INTO wallet_balance(user_id,amount,created_at) VALUE(?,?,?,?)',
      [user_id, amount, this.now]
    );
    return ResultSetHeader.insertId;
  }
  public async update(entry: BalanceDto): Promise<number> {
    const { user_id, amount } = entry;
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'UPDATE wallet_balance SET user_id=?,amount=?, updated_at=?',
      [user_id, amount, this.now]
    );
    return ResultSetHeader.affectedRows;
  }
  public async remove(id: number): Promise<number> {
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'DELETE FROM wallet_balance WHERE id = ?',
      [id]
    );
    return ResultSetHeader.affectedRows;
  }
}
