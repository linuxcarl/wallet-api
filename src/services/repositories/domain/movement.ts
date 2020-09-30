import { MovementTypes } from '../../../common/enums/movement-types';

export interface Movement {
  id: number;
  user_id: number;
  type: MovementTypes;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
