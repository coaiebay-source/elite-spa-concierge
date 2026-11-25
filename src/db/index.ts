import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { DEMO_DDL } from "./demo-ddl";

type Db = NodePgDatabase<typeof schema>;

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __demoDb?: Promise<Db>;
};

async function createDemoDb(): Promise<Db> {
  // No DATABASE_URL: run on an embedded in-memory Postgres (demo mode).
  // Data resets when the serverless instance recycles.
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle: drizzlePglite } = await import("drizzle-orm/pglite");
  const client = await PGlite.create();
  await client.exec(DEMO_DDL);
  return drizzlePglite(client, { schema }) as unknown as Db;
}

export const pool: Pool | undefined = databaseUrl
  ? (globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({ connectionString: databaseUrl }))
  : undefined;

if (pool && process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db: Db = pool
  ? drizzle(pool, { schema })
  : await (globalForDb.__demoDb ??= createDemoDb());
