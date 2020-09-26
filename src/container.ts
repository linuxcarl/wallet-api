import { asClass, createContainer } from 'awilix';
import { DateService } from './services/date.service';
import express from 'express';
import { scopePerRequest } from 'awilix-express';

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: 'CLASSIC',
  });

  container.register({
    dateService: asClass(DateService).scoped(),
  });

  app.use(scopePerRequest(container));
};
