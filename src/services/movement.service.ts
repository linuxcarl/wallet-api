import { MovementTypes } from '../common/enums/movement-types';
import { ApplicationException } from '../common/exceptions/application.exception';
import { BalanceDto } from '../dtos/balance.dto';
import { MovementDto } from '../dtos/movement.dto';
import { Balance } from './repositories/domain/balance';
import { IBalanceReposirtory } from './repositories/imp/balance.respository';
import { IMovementReposirtory } from './repositories/imp/movement.respository';
import { Movement } from './repositories/domain/movement';

export class MovementService {
  public constructor(
    private readonly movementRepository: IMovementReposirtory,
    private readonly balanceRepository: IBalanceReposirtory
  ) {}

  public async find(id: number): Promise<Movement | []> {
    return await this.movementRepository.find(id);
  }
  public async all(): Promise<Movement[] | []> {
    return await this.movementRepository.all();
  }

  public async store(entry: MovementDto): Promise<number> {
    const { user_id, type } = entry;

    const balance: Balance | [] = await this.balanceRepository.findByUserId(
      user_id
    );

    let result = 0;

    if (Number(type) === Number(MovementTypes.income)) {
      result = await this.income(entry, balance);
    } else if (Number(type) === Number(MovementTypes.outcome)) {
      result = await this.outcome(entry, balance);
    } else {
      throw new ApplicationException('Invalid movement type supplied');
    }
    return result;
  }

  private async income(entry: MovementDto, balance: Balance | []) {
    const { user_id, amount } = entry;

    const { id }: any = balance;
    if (!id) {
      await this.balanceRepository.store({
        amount,
        user_id,
      } as BalanceDto);
    } else {
      let { amount: balanceAmount }: any = balance;
      balanceAmount += amount;
      await this.balanceRepository.update({
        id,
        user_id,
        amount: balanceAmount,
      } as BalanceDto);
    }
    return await this.movementRepository.store(entry as Movement);
  }
  private async outcome(entry: MovementDto, balance: Balance | []) {
    const { user_id, type, amount } = entry;
    let { amount: balanceAmount }: any = balance;
    if (![balance].length || balanceAmount < amount) {
      throw new ApplicationException('User does not have enough balance');
    } else {
      balanceAmount -= amount;
      await this.balanceRepository.update({
        user_id,
        amount: balanceAmount,
      } as Balance);
      return await this.movementRepository.store(entry as Movement);
    }
  }
}
