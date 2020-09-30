import { MovementTypes } from '../common/enums/movement-types';

export interface MovementDto {
  user_id: number;
  type: MovementTypes;
  amount: number;
}
