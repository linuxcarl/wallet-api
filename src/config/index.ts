import * as dotenv from 'dotenv';
import { Iapi } from './interfaces/api.interface';
dotenv.config();
export class Config {
  private static instance: Config;
  private constructor() {
    return Config.instance || new Config();
  }
  public static api(): Iapi {
    return {
      port: process.env.PORT || 3000,
      cors: process.env.CORS || '*',
    };
  }
}
