import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, loanType, updatedAt } from "../schema-helpers";
import { memberLoanProviderTable } from "./member-loan-provider";


export const memberTakeLoansTable = pgTable('member_take_loans', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberLoanProviderId: uuid('member_loan_provider_id').notNull().references(() => memberLoanProviderTable.id),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description:text('description'),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})



export const memberTakeLoansRelation = relations(memberTakeLoansTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [memberTakeLoansTable.familyId],
        references: [familyTable.id]
    }),
    memberLoanProvider: one(memberLoanProviderTable, {
        fields: [memberTakeLoansTable.memberLoanProviderId],
        references: [memberLoanProviderTable.id]
    })
}))




export const memberGiveLoansTable = pgTable('member_give_loans', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberLoanProviderId: uuid('member_loan_provider_id').notNull().references(() => memberLoanProviderTable.id),
    loanType: text('loan_type', { enum: loanType }).notNull(),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description:text('description'),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})