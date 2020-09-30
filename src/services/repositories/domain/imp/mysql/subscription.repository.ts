import connector from '../../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../subscription';
export class SubscriptionRepository {
  public async all(): Promise<Subscription[]> {
    const [rows] = await connector.execute(
      'SELEC * FROM wallet_subscription ORDER BY id DESC'
    );
    return rows as Subscription[];
  }

  public async find(id: number): Promise<Subscription | []> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELEC * FROM wallet_sub scription WHERE id = ?',
      [id]
    );
    return (rows as Subscription) || [];
  }
}
