import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
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
import { familyBankAccountsTable } from "./family-bank-account";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";
import { familyTrxNameTable } from "./family-trx-name";
import { familyShopkeeperPurchaseTable } from "./family-shopkeeper-purchase";
import { memberTrxTable } from "./member-trx";
import { memberGivenLoansTable, memberTakeLoansTable } from "./member-loan";
import { familyLoansTakenTable } from "./family-loan";


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
    familyTrxNames: many(familyTrxNameTable),
    familyBanks: many(familyBankAccountsTable),
    assignFamilySourceBanks: many(assignFamilySourceBankTable),
    assignFamilyReceiveBanks: many(assignFamilyReceiveBankTable),
    shopkeepers: many(familyShopkeepersTable),
    shopkeeperPaidBills: many(familyShopkeeperBillsTable),
    loanProviderPaidBills: many(familyLoanProviderBillsTable),
    loanProviders: many(familyLoanProviderTable),
    familyTakenLoans: many(familyLoansTakenTable),
    familyShopkeeperPurchases: many(familyShopkeeperPurchaseTable),

    //!member related
    members: many(membersTable),
    memberTrxNames: many(memberTrxNameTable),
    memberTrxs: many(memberTrxTable),

    memberBankAccounts: many(memberBankAccountsTable),
    memberReceivedLoans: many(memberTakeLoansTable),
    memberProvidedLoans: many(memberGivenLoansTable),


}))