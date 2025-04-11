import { pgTable, uuid } from "drizzle-orm/pg-core";
import { bankAccountsTable } from "./bank-account";
import { trxsNameTable } from "./trx-name";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";

export const assignSourceBank = pgTable('assign_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    sourceBankId: uuid('bank_id').notNull().references(() => bankAccountsTable.id),
    trxNameId: uuid('trx_name_id').notNull().references(() => trxsNameTable.id),
    createdAt,
    updatedAt,
})

export const assignSourceBankRelation = relations(assignSourceBank, ({ one, many }) => ({
    sourceBankAccount: one(bankAccountsTable, {
        fields: [assignSourceBank.sourceBankId],
        references: [bankAccountsTable.id],
        relationName:'sourceTrxNamesUnderBank'
    }),
    trxName: one(trxsNameTable, {
        fields: [assignSourceBank.trxNameId],
        references: [trxsNameTable.id],
        relationName:'assignSourceBanksUnderTrxName'
    })
}))