import {Pool, PoolConfig} from "pg";
import * as dotenv from 'dotenv';

dotenv.config();  // Env load environment variables

const config: PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT as string) || 5432,
};

const db = new Pool(config);

export default db;
