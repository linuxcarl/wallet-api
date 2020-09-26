import { Server } from './server';
import { container } from './container';
import { DateService } from './services/date.service';

const app = new Server().getApp();

const dateService = container.resolve<DateService>('dateService');
console.log('dateService => ', dateService.get());
