import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, loanType, updatedAt } from "../schema-helpers";
import { memberLoanProviderTable } from "./member-loan-provider";


export const memberLoansTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberLoanProviderId: uuid('family_member_loan_provider_id').notNull().references(() => memberLoanProviderTable.id),
    loanType: text('loan_type', { enum: loanType }).notNull(),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description:text('description'),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const memberLoansRelation = relations(memberLoansTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [memberLoansTable.familyId],
        references: [familyTable.id]
    }),
    memberLoanProvider: one(memberLoanProviderTable, {
        fields: [memberLoansTable.memberLoanProviderId],
        references: [memberLoanProviderTable.id]
    })
}))