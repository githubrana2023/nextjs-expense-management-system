import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { createdAt, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { assignSourceBank } from "./assign-source-bank";
import { assignReceiveBank } from "./assign-receive-bank";
import { trxsTable } from "./trx";

export const bankAccountsTable = pgTable('bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    userId: uuid('user_id').notNull().references(() => usersTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    lastDigit: text('last_digit'),
    expireIn: timestamp('expire_in'),
    createdAt,
    updatedAt,
})


export const BankAccountsRelation = relations(bankAccountsTable, ({ one,many }) => ({
    user: one(usersTable, {
        fields: [bankAccountsTable.userId],
        references: [usersTable.id]
    }),
    
    sourceTrxNames:many(assignSourceBank,{relationName:'sourceTrxNamesUnderBank'}),
    receiveTrxNames:many(assignReceiveBank,{relationName:'receiveTrxNamesUnderBank'}),

    sourceTrxs : many(trxsTable,{relationName:'trxFromSourceBank'}),
    receiveTrxs : many(trxsTable,{relationName:'trxToReceiveBank'}),
}))