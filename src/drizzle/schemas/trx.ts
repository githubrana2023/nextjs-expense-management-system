import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { trxsNameTable } from "./trx-name";
import { bankAccountsTable } from "./bank-account";


export const trxsTable = pgTable('transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    name:text('trx_name').unique().notNull(),
    amount:numeric('amount',{precision:7,scale:2}).notNull(),
    description:text('description'),
    trxNameId:uuid('trx_name_id').notNull().references(()=>trxsNameTable.id),
    sourceBankId:uuid('source_bank_id').references(()=>bankAccountsTable.id),
    receiveBankId:uuid('receive_bank_id').references(()=>bankAccountsTable.id),
    createdAt,
    updatedAt,
})

export const trxsRelation = relations(trxsTable, ({ one, many }) => ({
    trxName : one(trxsNameTable,{
        fields:[trxsTable.trxNameId],
        references:[trxsNameTable.id],
    }),

    sourceBank:one(bankAccountsTable,{
        fields:[trxsTable.sourceBankId],
        references:[bankAccountsTable.id],
        relationName:'trxFromSourceBank'
    }),

    receiveBank:one(bankAccountsTable,{
        fields:[trxsTable.receiveBankId],
        references:[bankAccountsTable.id],
        relationName:'trxToReceiveBank'
    }),
}))