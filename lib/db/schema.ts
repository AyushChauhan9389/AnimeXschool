import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
    primaryKey,
    varchar,
    uniqueIndex,
    index, boolean
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    roleId: integer('role').references(() => roles.roleId).notNull()
});

export const roles = pgTable('roles', {
    roleId: serial('roleId').primaryKey(),
    roleName: text('roleName').notNull()
});