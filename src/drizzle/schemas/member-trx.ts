import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";


export const memberTrxTable = pgTable('member_transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: text('trx_name').notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    memberTrxNameId: uuid('member_trx_name_id').notNull().references(() => memberTrxNameTable.id),
    memberSourceBankId: uuid('member_source_bank_id').references(() => memberBankAccountsTable.id),
    memberReceiveBankId: uuid('member_receive_bank_id').references(() => memberBankAccountsTable.id),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt,
})

export const memberTrxRelation = relations(memberTrxTable, ({ one }) => ({

}))