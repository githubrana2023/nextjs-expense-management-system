import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";


export const familyTable = pgTable('family_table', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    userId: uuid('user_id').notNull().references(() => usersTable.id),
    name: text('family_name').notNull(),
    createdAt,
    updatedAt
})

export const familyRelation = relations(familyTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [familyTable.userId],
        references: [usersTable.id]
    })
}))