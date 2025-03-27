import { Hono } from 'hono';
import { db } from '../index';
import { lordsTable, insertLord } from '../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from './auth';
const lordRouter = new Hono();

const getLord = async (id: string) => {
    try {
        const lord = await db.select().from(lordsTable).where(eq(lordsTable.id, id));
        return lord;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get lord');
    }
}

const createLord = async (lord: insertLord) => {
    try {
        const newLord = await db.insert(lordsTable).values({...lord, password: await hashPassword(lord.password)});
        return newLord;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create lord');
    }
}

lordRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const lord = await getLord(id);
    return c.json(lord);
});

lordRouter.post('/', async (c) => {
    const lord = await createLord(await c.req.json());
    return c.json(lord);
});

export { lordRouter };
