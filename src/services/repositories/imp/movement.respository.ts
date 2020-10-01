import { MovementDto } from '../../../dtos/movement.dto';
import { Movement } from '../domain/movement';

export interface IMovementReposirtory {
  all(): Promise<Movement[]>;
  find(id: number): Promise<Movement | []>;
  store(entry: MovementDto): Promise<number>;
  update(entry: MovementDto): Promise<number>;
  remove(id: number): Promise<number>;
}
