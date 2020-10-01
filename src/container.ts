import { asClass, createContainer } from 'awilix';
import { DateService } from './services/date.service';
import express from 'express';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMysqlRepository } from './services/repositories/domain/imp/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMysqlRepository } from './services/repositories/domain/imp/mysql/movement.respository';
import { BalanceMysqlRepository } from './services/repositories/domain/imp/mysql/balance.respository';
import { MovementService } from './services/movement.service';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
    movementRepository: asClass(MovementMysqlRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),

    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    dateService: asClass(DateService).scoped(),
  });

  app.use(scopePerRequest(container));
};
