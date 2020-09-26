import * as dotenv from 'dotenv';
import { Iapi } from './interfaces/api.interface';
import { Idb } from './interfaces/db.interface';
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
  public static db(): Idb {
    return {
      db_mysql_host: process.env.db_mysql_host,
      db_mysql_user: process.env.db_mysql_user,
      db_mysql_password: process.env.db_mysql_password,
      db_mysql_database: process.env.db_mysql_database,
    };
  }
}
