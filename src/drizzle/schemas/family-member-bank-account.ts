import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyMembersTable } from "./family-members";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";

export const familyMemberBankAccountsTable = pgTable('family_member_bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyMemberId: uuid('family_member_id').notNull().references(() => familyMembersTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    createdAt,
    updatedAt,
})



export const familyBankAccountsRelation = relations(familyMemberBankAccountsTable, ({ one }) => ({

    family: one(familyTable, {
        fields: [familyMemberBankAccountsTable.familyId],
        references: [familyTable.id]
    }),

    familyMember: one(familyMembersTable, {
        fields: [familyMemberBankAccountsTable.familyMemberId],
        references: [familyMembersTable.id]
    }),
}))