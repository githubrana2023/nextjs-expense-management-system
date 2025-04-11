import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "../schema-helpers";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";

export const familyTrxNameTable = pgTable('family_trx_name', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    variant: text('variant', { enum: trxNameVariant }).notNull(),
    createdAt,
    updatedAt
})

export const familyTrxNameRelations = relations(familyTrxNameTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [familyTrxNameTable.familyId],
        references: [familyTable.id]
    })
}))