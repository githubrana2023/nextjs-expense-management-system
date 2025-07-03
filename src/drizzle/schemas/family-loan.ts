import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanRecipientTable } from "./family-loan-recipient";


export const familyTakenLoanTable = pgTable('family_taken_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanProviderId: uuid('loan_provider_id').notNull().references(() => familyLoanProviderTable.id),
    receiveBankId: uuid('receive_bank_id').notNull().references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanTakenDate: timestamp('loan_taken_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const familyTakenLoanRelation = relations(familyTakenLoanTable, ({ }) => ({

}))






export const familyGivenLoanTable = pgTable('family_given_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanRecipientId: uuid('family_loan_recipient').notNull().references(() => familyLoanRecipientTable.id),
    familySourceBankId: uuid('source_bank_id').notNull().references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const familyGivenLoanRelation = relations(familyGivenLoanTable, ({ }) => ({

}))