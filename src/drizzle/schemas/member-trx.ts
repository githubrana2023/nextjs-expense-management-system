import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";


export const memberTrxTable = pgTable('family_member_member_transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: text('trx_name').unique().notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    memberTrxNameId: uuid('family_member_trx_name_id').notNull().references(() => memberTrxNameTable.id),
    memberSourceBankId: uuid('family_member_source_bank_id').references(() => memberBankAccountsTable.id),
    memberReceiveBankId: uuid('family_member_receive_bank_id').references(() => memberBankAccountsTable.id),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt,
})

export const memberTrxRelation = relations(memberTrxTable, ({ one }) => ({
    memberTrxName: one(memberTrxNameTable, {
        fields: [memberTrxTable.memberTrxNameId],
        references: [memberTrxNameTable.id],
    }),

    memberSourceBank: one(memberBankAccountsTable, {
        fields: [memberTrxTable.memberSourceBankId],
        references: [memberBankAccountsTable.id],
        relationName: 'memberTrxFromSourceBank'
    }),

    receiveBank: one(memberBankAccountsTable, {
        fields: [memberTrxTable.memberReceiveBankId],
        references: [memberBankAccountsTable.id],
        relationName: 'memberTrxToReceiveBank'
    }),
}))