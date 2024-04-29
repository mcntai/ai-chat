import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host:         process.env.MYSQL_HOST,
  port:         process.env.MYSQL_PORT,
  username:     process.env.MYSQL_USERNAME,
  password:     process.env.MYSQL_PASSWORD,
  database:     process.env.MYSQL_DATABASE,
  synchronize:  process.env.MYSQL_SYNCHRONIZE,
  logging:      process.env.MYSQL_LOGGING,
  entitiesPath: process.env.MYSQL_ENTITIES_PATH,
}));