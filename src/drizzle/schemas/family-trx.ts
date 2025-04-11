import { pgTable, uuid, text, decimal, timestamp } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";

export const familyTrxTable = pgTable('family_trx', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    title: text('title').notNull(),
    description: text('description'),
    amount: decimal('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfTrx: timestamp('date_of_trx', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})

export const familyTrxRelations = relations(familyTrxTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [familyTrxTable.familyId],
        references: [familyTable.id]
    })
}))