import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { scenarioRouter } from './handlers/scenario';
import { lordRouter } from './handlers/lord';
import { authRouter } from './handlers/auth';

const dbClient = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client: dbClient });


const app = new Hono()

app.use('*', logger())
// app.use('*', cors({
//   origin: '*',
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

app.route('/scenario', scenarioRouter)
app.route('/lord', lordRouter)
app.route('/auth', authRouter)
app.get('/', (c) => {
  return c.text('Hello Cabinet!')
})


export const handler = handle(app)


// TODO:
// - Add global error handler - theo's way
// - Add a way to get a lord's scenarios
// - Add a way to get a scenario's lords