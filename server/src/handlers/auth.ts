import { Hono } from 'hono';
import { db } from '..';
import { lordsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { pbkdf2, randomBytes} from 'crypto';
import {promisify} from 'util';

const pbkdf2Async = promisify(pbkdf2);

const authRouter = new Hono();

const DEFAULT_HASH_SETTINGS = {
    iterations: 310000,
    keyLength: 64,
    digest: 'sha512',
    saltSize: 16
}

const login = async (email: string, password: string) => {
    try {
        const lord = await db.select().from(lordsTable).where(eq(lordsTable.email, email)).limit(1);
        if (!lord[0]) {
            throw new Error('Invalid credentials');
        }
        const hashedPassword = await hashPassword(password);
        if (lord[0].password !== hashedPassword) {
            throw new Error('Invalid credentials');
        }
        return {...lord[0], password: undefined};
    } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
    }
}


export const hashPassword = async (password: string, settings: {iterations: number, keyLength: number, digest: string, saltSize: number} = DEFAULT_HASH_SETTINGS): Promise<string> => {
    try {
        const salt = randomBytes(settings.saltSize)
        const hash = await pbkdf2Async(password, salt, settings.iterations, settings.keyLength, settings.digest);
        const saltBase64 = salt.toString('base64');
        const hashBase64 = hash.toString('base64');
        const paramsString = `digest=${settings.digest},iter=${settings.iterations}`;
        return `$pbkdf2$${paramsString}$${saltBase64}$${hashBase64}`;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to hash password');
    }
}

const register = async (email: string, password: string, name: string) => {
    try {
        const existingLord = await db.select().from(lordsTable).where(eq(lordsTable.email, email)).limit(1);
        if (existingLord[0]) {
            throw new Error('User already exists');
        }
        const hashedPassword = await hashPassword(password);
        const lord = await db.insert(lordsTable).values({ email, password: hashedPassword, name }).returning({id: lordsTable.id, email: lordsTable.email, name: lordsTable.name});
        return lord;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to register');
    }
}

authRouter.post('/login', async (c) => {
    try {
        const { email, password } = await c.req.json();
        const lord = await login(email, password);
        return c.json(lord);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Failed to login' }, 500);
    }
})

authRouter.post('/register', async (c) => {
    try {
        const { email, password, name } = await c.req.json();
        const lord = await register(email, password, name);
        return c.json(lord);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Failed to register' }, 500);
    }
})

export { authRouter };
