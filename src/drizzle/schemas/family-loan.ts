import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanRecipientTable } from "./family-loan-recipient";
import { familyLoanRecipientPaymentTable } from "./family-loan-recipient-payment";


export const familyTakenLoanTable = pgTable('family_taken_loan', {
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


export const familyTakenLoanRelation = relations(familyTakenLoanTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyTakenLoanTable.takenBy],
        references: [familyTable.id]
    }),
    familyLoanProvider: one(familyLoanProviderTable, {
        fields: [familyTakenLoanTable.loanProvidedBy],
        references: [familyLoanProviderTable.id]
    }),
    takenLoanPayments: many(familyLoanProviderBillsTable),

    receiveBank: one(familyBankAccountsTable, {
        fields: [familyTakenLoanTable.receiveBankId],
        references: [familyBankAccountsTable.id],
    }),

}))






export const familyGivenLoanTable = pgTable('family_given_loan', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanRecipientId: uuid('family_loan_recipient').references(() => familyLoanRecipientTable.id),
    familySourceBankId: uuid('source_bank_id').references(() => familyBankAccountsTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    remaining: numeric('total_remaining', { precision: 7, scale: 2 }).notNull(),
    createdAt,
    updatedAt
})


export const familyGivenLoanRelation = relations(familyGivenLoanTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyGivenLoanTable.familyId],
        references: [familyTable.id]
    }),
    familyLoanRecipient: one(familyLoanProviderTable, {
        fields: [familyGivenLoanTable.familyLoanRecipientId],
        references: [familyLoanProviderTable.id]
    }),
    familyLoanRecipientPayments: many(familyLoanRecipientPaymentTable),

    familySourceBank: one(familyBankAccountsTable, {
        fields: [familyGivenLoanTable.familySourceBankId],
        references: [familyBankAccountsTable.id],
    }),
    familyGivenLoanPayments:many(familyLoanRecipientPaymentTable)
}))