import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "@/drizzle/schema-helpers";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { familyMembersTable } from "./family-members";

export const familyMemberTrxNameTable = pgTable('family_member_trx_name', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familymemberId: uuid('family_member_id').notNull().references(() => familyMembersTable.id),
    name: text('name').notNull(),
    variant: text('variant', { enum: trxNameVariant }).notNull(),
    createdAt,
    updatedAt
})

export const familyMemberTrxNameRelations = relations(familyMemberTrxNameTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [familyMemberTrxNameTable.familyId],
        references: [familyTable.id]
    })
}))