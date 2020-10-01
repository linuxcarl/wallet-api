import { Server } from './server';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';

const app = new Server().getApp();

loadContainer(app);
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));

export { app };
