import { pgTable, uuid } from "drizzle-orm/pg-core";
import { bankAccountsTable } from "./bank-account";
import { trxsNameTable } from "./trx-name";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";

export const assignReceiveBank = pgTable('assign_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    receiveBankId: uuid('bank_id').notNull().references(() => bankAccountsTable.id),
    trxNameId: uuid('trx_name_id').notNull().references(() => trxsNameTable.id),
    createdAt,
    updatedAt,
})

export const assignReceiveBankRelation = relations(assignReceiveBank, ({ one }) => ({
    receiveBankAccount: one(bankAccountsTable, {
        fields: [assignReceiveBank.receiveBankId],
        references: [bankAccountsTable.id],
        relationName:'receiveTrxNamesUnderBank'
    }),
    
    trxName: one(trxsNameTable, {
        fields: [assignReceiveBank.trxNameId],
        references: [trxsNameTable.id],
        relationName:'assignReceiveBanksUnderTrxName'
    })
}))