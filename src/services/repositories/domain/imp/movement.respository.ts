import { Movement } from '../movement';

export interface IMovementReposirtory {
  all(): Promise<Movement[]>;
  find(id: number): Promise<Movement | []>;
  store(entry: Movement): Promise<void>;
  update(entry: Movement): Promise<void>;
  remove(id: number): Promise<void>;
}
