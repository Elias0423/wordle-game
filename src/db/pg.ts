import { Pool } from 'pg';

export default new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: 5432,
  user: process.env.DB_USERNAME ?? 'wordle',
  password: process.env.DB_USERPWD ?? 'wordle',
  database: process.env.DB_NAME ?? 'wordle',
});
