import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoansTable } from "./family-loan";
import { memberLoanReceipientTable } from "./member-loan-receipient";
import { memberGiveLoansTable } from "./member-loan";


export const memberLoanReceipientPaymentTable = pgTable('member_loan_receipient_payment', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberLoanReceipientId: uuid('member_loan_receipient_id').notNull().references(() => memberLoanReceipientTable.id),
    memberLoanId: uuid('member_loan_give_id').notNull().references(() => memberGiveLoansTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const memberLoanProviderBillsRelation = relations(memberLoanReceipientPaymentTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [memberLoanReceipientPaymentTable.familyId],
        references: [familyTable.id]
    }),
    memberLoanReceipient: one(familyLoanProviderTable, {
        fields: [memberLoanReceipientPaymentTable.memberLoanReceipientId],
        references: [familyLoanProviderTable.id]
    }),
    familyLoan: one(familyLoansTable, {
        fields: [memberLoanReceipientPaymentTable.memberLoanId],
        references: [familyLoansTable.id]
    }),
}))