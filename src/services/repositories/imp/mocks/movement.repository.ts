/*eslint arrow-parens: ["error", "always"]*/
/*eslint-env es6*/
import db from '../../../../common/persistence/mock.persistence';
import { Movement } from '../../domain/movement';
import { IMovementReposirtory } from '../movement.respository';

export class MovementMockRepository implements IMovementReposirtory {
  public async find(id: number): Promise<Movement | []> {
    const table = db.movements as Movement[];
    const result = table.find((x: any) => x.id === id);

    if (result) {
      return Object.assign({ ...result });
    }

    return [];
  }

  public async all(): Promise<Movement[]> {
    const table = db.movements as Movement[];
    return Object.assign([...table]);
  }

  public async store(entry: Movement): Promise<number> {
    const table = db.movements as Movement[];
    const now = new Date();

    db._movementId += 1;

    table.push(({
      id: db._movementId,
      type: entry.type,
      amount: entry.amount,
      user_id: entry.user_id,
      created_at: now,
      updated_at: null,
    } as unknown) as Movement);
    return db._movementId;
  }

  public async update(entry: Movement): Promise<number> {
    const table = db.movements as Movement[];
    const now = new Date();

    const originalEntry = table.find((x: any) => x.id === entry.id);

    if (originalEntry) {
      originalEntry.type = entry.type;
      originalEntry.user_id = entry.user_id;
      originalEntry.amount = entry.amount;
      originalEntry.updated_at = now;
    }
    return entry.id;
  }

  public async remove(id: number): Promise<number> {
    const table = db.movements as Movement[];
    db.movements = table.filter((x: any) => x.id === id) as any;
    return id;
  }
}
