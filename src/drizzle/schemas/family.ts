import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { membersTable } from "./members";
import { familyTrxTable } from "./family-trx";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoanRecipientPaymentTable } from "./family-loan-recipient-payment";
import { familyLoanRecipientTable } from "./family-loan-recipient";
import { familyGivenLoanTable, familyTakenLoanTable } from "./family-loan";
import { familyShopkeeperBillsTable } from "./family-shopkeeper-bill";
import { familyShopkeeperPurchaseTable } from "./family-shopkeeper-purchase";
import { familyShopkeepersTable } from "./family-shopkeeper";
import { familyTrxNameTable } from "./family-trx-name";

export const familyTable = pgTable('family_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: text('family_name').notNull(),
    phone: text('phone').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role', { enum: [role['0']] }).notNull().default('FAMILY'),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    createdAt,
    updatedAt
})


export const familyRelation = relations(familyTable, ({ many }) => ({
    members: many(membersTable, { relationName: 'relationBetweenFamilyAndMembers', }),
    familyTransactions: many(familyTrxTable, { relationName: 'relationBetweenFamilyAndFamilyTrx' }),
    familyBankAccounts: many(familyBankAccountsTable, { relationName: 'relationBetweenFamilyBankAccountAndFamily' }),
    loanProviderPaidBills: many(familyLoanProviderBillsTable, { relationName: 'relationBetweenFamilyLoanProviderBillAndFamily' }),
    loanProviders: many(familyLoanProviderTable, { relationName: 'relationBetweenFamilyLoanProviderAndFamily' }),
    familyLoanRecipientPayments: many(familyLoanRecipientPaymentTable, { relationName: 'relationBetweenFamilyLoanRecipientPaymentAndFamily' }),
    loanRecipients: many(familyLoanRecipientTable, { relationName: 'relationBetweenFamilyLoanRecipientAndFamily', }),
    takenLoans: many(familyTakenLoanTable, { relationName: 'relationBetweenFamilyTakenToanAndFamily', }),
    givenLoans: many(familyGivenLoanTable, { relationName: 'relationBetweenFamilyGivenLoanAndFamily' }),
    familyShopkeeperBills: many(familyShopkeeperBillsTable, { relationName: 'relationBetweenfamilyshopkeeperBillAndFamily' }),
    shopkeeperPurchases: many(familyShopkeeperPurchaseTable, { relationName: 'relationBetweenfamilyshopkeeperPurchaseAndFamily' }),
    shopkeepers: many(familyShopkeepersTable, { relationName: 'relationBetweenFamilyShopkeeperAndFamily', }),
    familyTransactionsName: many(familyTrxNameTable, { relationName: 'relationBetweenFamilyTransactionNameAndFamily', })
}))