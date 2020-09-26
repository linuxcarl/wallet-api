import { asClass, createContainer } from 'awilix';
import { DateService } from './services/date.service';

const container = createContainer();

container.register({
  dateService: asClass(DateService).scoped(),
});

export { container };
