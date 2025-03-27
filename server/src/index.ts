import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { scenarioRouter } from './handlers/scenario';
import { lordRouter } from './handlers/lord';


const dbClient = postgres(process.env.DATABASE_URL!, {prepare: false});
export const db = drizzle({client: dbClient});


const app = new Hono()

app.use('*', logger())
app.use('*', cors())

app.route('/scenario', scenarioRouter)
app.route('/lord', lordRouter)
app.get('/', (c) => {
  return c.text('Hello Cabinet!')
})


export const handler = handle(app)
