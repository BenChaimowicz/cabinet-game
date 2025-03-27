import {  Hono } from 'hono';
import { db } from '../index';
import { scenariosTable, insertScenario } from '../db/schema';
import { eq } from 'drizzle-orm';

const scenarioRouter = new Hono();

const getScenario = async (id: string) => {
    try {
        const scenario = await db.select().from(scenariosTable).where(eq(scenariosTable.id, id));
        return scenario;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get scenario');
    }
}

const createScenario = async (scenario: insertScenario) => {
    try {
        console.log('database url: ', process.env.DATABASE_URL);
        const newScenario = await db.insert(scenariosTable).values(scenario);
        return newScenario;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create scenario');
    }
}

scenarioRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const scenario = await getScenario(id);
    return c.json(scenario);
});
scenarioRouter.post('/', async (c) => {
    const scenario = await createScenario(await c.req.json());
    return c.json(scenario);
});

export { scenarioRouter };