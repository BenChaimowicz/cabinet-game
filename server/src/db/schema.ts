import { uuid,integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm';


// Entity Tables:
export const lordsTable = pgTable('lords', {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    name: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
    email: text().notNull().unique(),
    password: text().notNull(),
});

export const gamesTable = pgTable('games', {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    name: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});

export const scenariosTable = pgTable('scenarios', {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    title: text().notNull(),
    content: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
});

// Many-to-Many:
export const lordsGamesTable = pgTable('lords_games', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    lordId: uuid().references(() => lordsTable.id),
    gameId: uuid().references(() => gamesTable.id),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date()),
});


export type insertLord = typeof lordsTable.$inferInsert;
export type insertGame = typeof gamesTable.$inferInsert;
export type insertScenario = typeof scenariosTable.$inferInsert;
export type insertLordGame = typeof lordsGamesTable.$inferInsert;

export type Lord = typeof lordsTable.$inferSelect;
export type Game = typeof gamesTable.$inferSelect;
export type Scenario = typeof scenariosTable.$inferSelect;
export type LordGame = typeof lordsGamesTable.$inferSelect;



