import { pgTable, uuid, text,timestamp } from "drizzle-orm/pg-core";
import { createdAt, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { membersTable } from "./members";
import { assignFamilySourceBankTable } from "./assign-family-source-bank";
import { assignFamilyReceiveBankTable } from "./assign-family-receive-bank";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";
import { familyShopkeeperBillsTable } from "./family-shopkeeper-bill";
import { familyShopkeepersTable } from "./family-shopkeeper";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoansTable } from "./family-loan";
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyTrxNameTable } from "./family-trx-name";
import { familyShopkeeperPurchaseTable } from "./family-shopkeeper-purchase";


export const familyTable = pgTable('family_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: text('family_name').notNull(),
    phone: text('phone').notNull().unique(),
    email: text('email').notNull().unique(),
    password:text('password').notNull(),
    role: text('role', { enum: [role['0']] }).notNull().default('FAMILY'),
    emailVerifiedAt : timestamp('email_verified_at',{withTimezone:true}),
    createdAt,
    updatedAt
})

export const familyRelation = relations(familyTable, ({  many }) => ({
    familyTrxNames:many(familyTrxNameTable),
    familyBanks:many(familyBankAccountsTable),
    members: many(membersTable),
    assignFamilySourceBanks: many(assignFamilySourceBankTable),
    assignFamilyReceiveBanks: many(assignFamilyReceiveBankTable),
    memberTrxNames: many(memberTrxNameTable),
    memberBankAccounts:many(memberBankAccountsTable),
    shopkeepers :many(familyShopkeepersTable),
    shopkeeperPaidBills :many(familyShopkeeperBillsTable),
    loanProviderPaidBills :many(familyLoanProviderBillsTable),
    loanProviders:many(familyLoanProviderTable),
    familyLoans:many(familyLoansTable),
    familyShopkeeperPurchases:many(familyShopkeeperPurchaseTable)
}))