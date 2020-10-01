import { Movement } from '../../movement';
import { IMovementReposirtory } from '../movement.respository';
import connector from '../../../../../common/persistence/mysql.persistence';
import { MovementDto } from '../../../../../dtos/movement.dto';

export class MovementMysqlRepository implements IMovementReposirtory {
  private readonly now: Date = new Date();
  public async all(): Promise<Movement[]> {
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_movement ORDER BY id DESC'
    );
    return rows as Movement[];
  }
  public async find(id: number): Promise<Movement | []> {
    const [
      rows,
    ]: any = await connector.execute(
      'SELECT * FROM wallet_movement WHERE id =?',
      [id]
    );
    return rows as Movement;
  }
  public async store(entry: MovementDto): Promise<number> {
    const { user_id, type, amount } = entry;
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'INSERT INTO wallet_movement(user_id,type,amount,created_at) VALUE(?,?,?,?)',
      [user_id, type, amount, this.now]
    );
    return ResultSetHeader.insertId;
  }
  public async update(entry: MovementDto): Promise<number> {
    const { user_id, type, amount } = entry;
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'UPDATE wallet_movement SET user_id=?,type=?,amount=?, updated_at=?',
      [user_id, type, amount, this.now]
    );
    return ResultSetHeader.affectedRows;
  }
  public async remove(id: number): Promise<number> {
    const [
      ResultSetHeader,
    ]: any = await connector.execute(
      'DELETE FROM wallet_movement WHERE id = ?',
      [id]
    );
    return ResultSetHeader.affectedRows;
  }
}
