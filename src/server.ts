import express from 'express';
import { Config } from './config';
import helmet from 'helmet';
import cors from 'cors';

export class Server {
  #port: number = Number(Config.api().port);
  #app!: express.Application;

  public constructor() {
    this.createApp();
    this.configApp();
    this.runServer();
  }

  public getApp(): express.Application {
    return this.#app;
  }
  private createApp(): void {
    this.#app = express();
  }
  private configApp(): void {
    this.#app.use(express.json);
    this.#app.use(cors());
    this.#app.use(helmet());
  }
  private runServer(): void {
    this.#app.listen(this.#port, () =>
      console.log(`Server running in the port ${this.#port}`)
    );
  }
}
