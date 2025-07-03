import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, updatedAt } from "../schema-helpers";
import { memberLoanProviderTable } from "./member-loan-provider";
import { memberBankAccountsTable } from "./member-bank-account";
import { membersTable } from "./members";
import { memberLoanRecipientTable } from "./member-loan-recipient";
import { memberLoanProviderBillsTable } from "./member-loan-provider-bill";


export const memberTakenLoanTable = pgTable('member_take_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanTakenBy: uuid('member_id').notNull().references(() => membersTable.id),
    loanProvidedBy: uuid('member_loan_provider_id').notNull().references(() => memberLoanProviderTable.id),
    memberReceiveBankId: uuid('member_receive_bank_id').notNull().references(() => memberBankAccountsTable.id),

    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanTakenDate: timestamp('loan_taken_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),

    createdAt,
    updatedAt
})



export const memberTakenLoanRelation = relations(memberTakenLoanTable, ({ one, many }) => ({

}))




export const memberGivenLoanTable = pgTable('member_given_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanGivenBy: uuid('member_id').notNull().references(() => membersTable.id),
    loanRecipientBy: uuid('member_loan_recipient_id').notNull().references(() => memberLoanRecipientTable.id),
    memberSourceBankId: uuid('member_source_bank_id').notNull().references(() => memberBankAccountsTable.id),

    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanGivenDate: timestamp('loan_given_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const memberGivenLoanRelation = relations(memberGivenLoanTable, ({ one, many }) => ({

}))