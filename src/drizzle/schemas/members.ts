import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, memberRelation, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";
import { memberTrxTable } from "./member-trx";
import { assignMemberReceiveBankTable } from "./assign-member-receive-bank";
import { assignMemberSourceBankTable } from "./assign-member-source-bank";
import { memberLoanProviderTable } from "./member-loan-provider";
import { memberLoanProviderBillsTable } from "./member-loan-provider-bill";
import { memberLoanRecipientTable } from "./member-loan-recipient";
import { memberLoanRecipientPaymentTable } from "./member-loan-recipient-payment";
import { memberGivenLoanTable, memberTakenLoanTable } from "./member-loan";


export const membersTable = pgTable('members', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').unique().notNull(),
    password: text('password').notNull(),
    relation: text('relation', { enum: memberRelation }).notNull(),
    role: text('role', { enum: role }).default('MEMBER').notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt,

})

export const membersRelation = relations(membersTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [membersTable.familyId],
        references: [familyTable.id]
    }),
    trxNames: many(memberTrxNameTable),
    bankAccounts: many(memberBankAccountsTable),
    transactions: many(memberTrxTable),
    assignedReceiveBanks: many(assignMemberReceiveBankTable),
    assignedSourceBanks: many(assignMemberSourceBankTable),
    givenLoans: many(memberGivenLoanTable),
    takenLoans: many(memberTakenLoanTable),
    providers: many(memberLoanProviderTable),
    providerPayments: many(memberLoanProviderBillsTable),
    recipients: many(memberLoanRecipientTable),
    recipientPayments: many(memberLoanRecipientPaymentTable),
}))