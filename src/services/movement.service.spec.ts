import { MovementService } from './movement.service';
import { BalanceMockRepository } from './repositories/imp/mocks/balance.repository';
import { MovementMockRepository } from './repositories/imp/mocks/movement.repository';
import db from '../common/persistence/mock.persistence';
import { ApplicationException } from '../common/exceptions/application.exception';
const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository()
);

describe('GET - Test by movement services', () => {
  it('Should be to have object with all records - method all()', async () => {
    const expected = db.movements;
    const result = await movementService.all();

    expect(result).toEqual(expected);
  });
  it('Should be to have object with one record - method find()', async () => {
    const expected = {
      id: expect.any(Number),
      user_id: expect.any(Number),
      amount: expect.any(Number),
      type: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: null,
    };
    const result = await movementService.find(1);

    expect(result).toMatchObject(expected);
  });
});
describe('POST - Test by movement services', () => {
  it('Should be to return inserted id INCOME - method store()', async () => {
    const expected = 0;
    const data = {
      user_id: 2,
      amount: 500,
      type: 0,
    };
    const result = await movementService.store(data);

    expect(result).toBeGreaterThan(expected);
  });

  it('Should be to return inserted id OUTCOME - method store()', async () => {
    const expected = 0;
    const data = {
      user_id: 2,
      amount: 500,
      type: 1,
    };
    const result = await movementService.store(data);

    expect(result).toBeGreaterThan(expected);
  });

  it('Should be to return throw error OUTCOME- method store()', async () => {
    const expected = 'User does not have enough balance';
    const data = {
      user_id: 2,
      amount: 22500,
      type: 1,
    };

    try {
      await movementService.store(data);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });

  it('Should be to return throw error Invalid - method store()', async () => {
    const expected = 'Invalid movement type supplied';
    const data = {
      user_id: 2,
      amount: 22500,
      type: 7,
    };
    try {
      const result = await movementService.store(data);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
});
