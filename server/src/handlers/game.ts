import { Hono } from 'hono';
import { db } from '../index';
import { gamesTable, insertGame } from '../db/schema';
import { lordsGamesTable } from '../db/schema';
import { eq } from 'drizzle-orm';

const gameRouter = new Hono();

export const getGamesByLordId = async (lordId: string) => {
    try {
        const games = await db.select().from(gamesTable).leftJoin(lordsGamesTable, eq(lordsGamesTable.gameId,gamesTable.id)).where(eq(lordsGamesTable.lordId, lordId));
        return games;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get games');
    }
}

const getGame = async (id: string) => {
    try {
        const game = await db.select().from(gamesTable).where(eq(gamesTable.id, id));
        return game;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get game');
    }
}

const createGame = async (game: insertGame) => {
    try {
        const newGame = await db.insert(gamesTable).values(game);
        return newGame;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create game');
    }
}


gameRouter.get('games/:id', async (c) => {
    const id = c.req.param('id');
    const game = await getGame(id);
    return c.json(game);
});

gameRouter.post('games', async (c) => {
    const game = await createGame(await c.req.json());
    return c.json(game);
});

export { gameRouter };


