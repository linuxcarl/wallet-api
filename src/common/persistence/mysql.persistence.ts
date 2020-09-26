import { createPool } from 'mysql2/promise';
import { Config } from '../../config';

export default createPool({
  host: Config.db().db_mysql_host,
  user: Config.db().db_mysql_user,
  password: Config.db().db_mysql_password,
  database: Config.db().db_mysql_database,
  decimalNumbers: true,
});
