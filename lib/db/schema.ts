import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
    primaryKey,
    varchar,
    uniqueIndex,
    index,
    boolean,
    json // Added json for ProductData
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

export const address = pgTable('address', {
    addressId: serial('addressId').primaryKey(),
    userId: integer('userId').references(() => users.id).notNull(),
    state: text('state').notNull(),
    addressLine1: text('addressLine1').notNull(),
    addressLine2: text('addressLine2'),
    city: text('city').notNull(),
    country: text('country').notNull(),
    pinCode: text('pinCode').notNull(),
});

export const order = pgTable('order', {
    orderId: serial('orderId').primaryKey(),
    userId: integer('userId').references(() => users.id).notNull(),
    productData: json('productData').array().notNull(),
});