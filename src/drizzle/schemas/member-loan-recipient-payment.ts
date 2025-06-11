import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { memberLoanRecipientTable } from "./member-loan-recipient";
import { membersTable } from "./members";
import { memberGivenLoansTable } from "./member-loan";
import { memberLoanProviderTable } from "./member-loan-provider";


export const memberLoanRecipientPaymentTable = pgTable('member_loan_recipient_payment', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    receivedBy: uuid('member_id').notNull().references(() => membersTable.id),
    paidBy: uuid('member_loan_recipient_id').notNull().references(() => memberLoanRecipientTable.id),
    memberGivenLoanId: uuid('member_loan_give_id').notNull().references(() => memberGivenLoansTable.id),

    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    paymentDate: timestamp('payment_date', { withTimezone: true }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt
})


export const memberLoanProviderBillsRelation = relations(memberLoanRecipientPaymentTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [memberLoanRecipientPaymentTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        fields: [memberLoanRecipientPaymentTable.receivedBy],
        references: [membersTable.id]
    }),
    memberLoanRecipient: one(memberLoanProviderTable, {
        fields: [memberLoanRecipientPaymentTable.paidBy],
        references: [memberLoanProviderTable.id]
    }),
    memberGivenLoan: one(memberGivenLoansTable, {
        fields: [memberLoanRecipientPaymentTable.memberGivenLoanId],
        references: [memberGivenLoansTable.id]
    }),
}))