import { asClass, createContainer } from 'awilix';
import { DateService } from './services/date.service';
import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMysqlRepository } from './services/repositories/domain/imp/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),

    subscriptionService: asClass(SubscriptionService).scoped(),
    dateService: asClass(DateService).scoped(),
  });

  app.use(scopePerRequest(container));
};
