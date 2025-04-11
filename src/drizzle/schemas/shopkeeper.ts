import { pgTable, uuid, text, numeric } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";


export const shopkeepersTable = pgTable('shopkeeper', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    createdAt,
    updatedAt
})


export const shopkeepersRelation = relations(shopkeepersTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [shopkeepersTable.familyId],
        references: [familyTable.id]
    }),
}))