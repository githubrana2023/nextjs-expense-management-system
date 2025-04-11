import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyTrxNameTable } from "./family-trx-name";

export const assignFamilySourceBankTable = pgTable('assign_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familySourceBankId: uuid('family_source_bank_id').notNull().references(() => familyBankAccountsTable.id),
    familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
    createdAt,
    updatedAt,
})

export const assignFamilySourceBankTableRelation = relations(assignFamilySourceBankTable, ({ one }) => ({
    familySourceBankAccount: one(familyBankAccountsTable, {
        fields: [assignFamilySourceBankTable.familySourceBankId],
        references: [familyBankAccountsTable.id],
    }),
    familyTrxName: one(familyTrxNameTable, {
        fields: [assignFamilySourceBankTable.familyTrxNameId],
        references: [familyTrxNameTable.id],
    })
}))