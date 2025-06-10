import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, loanType, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyBankAccountsTable } from "./family-bank-account";


export const familyLoansTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanProviderId: uuid('family_loan_provider_id').references(() => familyLoanProviderTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    loanType: text('loan_type', { enum: loanType }).notNull(),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    familySourceBankId: uuid('family_source_bank_id').references(() => familyBankAccountsTable.id),
    familyReceiveBankId: uuid('family_receive_bank_id').references(() => familyBankAccountsTable.id),
    createdAt,
    updatedAt
})


export const familyLoansRelation = relations(familyLoansTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyLoansTable.familyId],
        references: [familyTable.id]
    }),
    familyLoanProvider: one(familyLoanProviderTable, {
        fields: [familyLoansTable.familyLoanProviderId],
        references: [familyLoanProviderTable.id]
    }),
    familyLoanProviderBills: many(familyLoanProviderBillsTable),

    familySourceBank: one(familyBankAccountsTable, {
        fields: [familyLoansTable.familySourceBankId],
        references: [familyBankAccountsTable.id],
        relationName:'familyLoanSource'
    }),
    familyReceiveBank: one(familyBankAccountsTable, {
        fields: [familyLoansTable.familyReceiveBankId],
        references: [familyBankAccountsTable.id],
        relationName:'familyLoanReceive'
    }),
}))