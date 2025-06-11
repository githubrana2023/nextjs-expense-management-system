import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanRecipientTable } from "./family-loan-recipient";


export const familyLoansTakenTable = pgTable('family_taken_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    takenBy: uuid('family_id').notNull().references(() => familyTable.id),
    loanProvidedBy: uuid('loan_provider_id').references(() => familyLoanProviderTable.id),
    receiveBankId: uuid('receive_bank_id').references(() => familyBankAccountsTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanTakenDate: timestamp('loan_taken_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const familyLoansTakenRelation = relations(familyLoansTakenTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyLoansTakenTable.takenBy],
        references: [familyTable.id]
    }),
    familyLoanProvider: one(familyLoanProviderTable, {
        fields: [familyLoansTakenTable.loanProvidedBy],
        references: [familyLoanProviderTable.id]
    }),
    familyLoanProviderBills: many(familyLoanProviderBillsTable),

    receiveBank: one(familyBankAccountsTable, {
        fields: [familyLoansTakenTable.receiveBankId],
        references: [familyBankAccountsTable.id],
    }),

}))


export const familyGivenLoansTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    givenBy: uuid('family_id').notNull().references(() => familyTable.id),
    receivedBy: uuid('family_loan_recipient').references(() => familyLoanRecipientTable.id),
    sourceBankId: uuid('source_bank_id').references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const familyGivenLoansRelation = relations(familyGivenLoansTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyGivenLoansTable.givenBy],
        references: [familyTable.id]
    }),
    familyLoanProvider: one(familyLoanProviderTable, {
        fields: [familyGivenLoansTable.receivedBy],
        references: [familyLoanProviderTable.id]
    }),
    familyLoanProviderBills: many(familyLoanProviderBillsTable),

    familySourceBank: one(familyBankAccountsTable, {
        fields: [familyGivenLoansTable.sourceBankId],
        references: [familyBankAccountsTable.id],
    }),
}))