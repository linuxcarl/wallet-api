import { MovementService } from './movement.service';
import { BalanceMockRepository } from './repositories/imp/mocks/balance.repository';
import { MovementMockRepository } from './repositories/imp/mocks/movement.repository';
import db from '../common/persistence/mock.persistence';
const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository()
);

describe('Test by movement services', () => {
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
