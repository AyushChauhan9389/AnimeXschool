import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
type database = typeof schema
export const db= drizzle<database>({ client: pool });