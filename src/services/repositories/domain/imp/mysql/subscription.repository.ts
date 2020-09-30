/*eslint camelcase: "error"*/
import connector from '../../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../subscription';
import { ISubscriptionReposirtory } from '../subscription.respository.interface';
export class SubscriptionMysqlRepository implements ISubscriptionReposirtory {
  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_subscription ORDER BY id DESC'
    );
    return rows as Subscription[];
  }
  public async find(id: number): Promise<Subscription | []> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE id = ?',
      [id]
    );
    return (rows[0] as Subscription) || [];
  }
  public async findByUserAndCode(
    id: number,
    code: string
  ): Promise<Subscription | []> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE id = ? AND code = ?',
      [id, code]
    );
    return (rows[0] as Subscription) || [];
  }

  public async store(entry: Subscription): Promise<void> {
    const now = new Date();
    const { user_id, code, amount, cron }: any = entry;
    await connector.execute(
      'INSERT INTO wallet_subscription (user_id, code, amount, cron, created_at) VALUES (?,?,?,?,?)',
      [user_id, code, amount, cron, now]
    );
  }
  public async update(entry: Subscription): Promise<void> {
    const now = new Date();
    const [user_id, code, amount, cron, id]: any = entry;
    await connector.execute(
      'UPDATE  wallet_subscription SET user_id=?, code=?, amount=?, cron=?, updated_at=? WHERE id=?',
      [user_id, code, amount, cron, now, id]
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute('DELETE FROM wallet_subscription WHERE id = ?', [
      id,
    ]);
  }
}
