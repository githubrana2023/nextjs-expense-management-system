import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";


export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').unique().notNull(),
    password: text('password').notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    isTwoFactorEnabled: boolean('is_two_factor_enabled').default(false).notNull(),
    createdAt,
    updatedAt,
})

export const usersRelation = relations(usersTable, ({ one, many }) => ({

}))