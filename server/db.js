/* Postgres ORM */

import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT, //5432 default
});

export default pool;
