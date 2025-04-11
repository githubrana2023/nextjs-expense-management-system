import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyTrxNameTable } from "./family-trx-name";

export const assignFamilyReceiveBankTable = pgTable('assign_receive_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyReceiveBankId: uuid('family_receive_bank_id').notNull().references(() => familyBankAccountsTable.id),
    familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
    createdAt,
    updatedAt,
})

export const assignFamilyReceiveBankTableRelation = relations(assignFamilyReceiveBankTable, ({ one }) => ({
    familyReceiveBankAccount: one(familyBankAccountsTable, {
        fields: [assignFamilyReceiveBankTable.familyReceiveBankId],
        references: [familyBankAccountsTable.id],
    }),
    familyTrxName: one(familyTrxNameTable, {
        fields: [assignFamilyReceiveBankTable.familyTrxNameId],
        references: [familyTrxNameTable.id],
    })
}))