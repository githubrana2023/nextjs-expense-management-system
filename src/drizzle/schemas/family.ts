import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { membersTable } from "./members";
import { familyTrxTable } from "./family-trx";
import { familyBankAccountsTable } from "./family-bank-account";

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
    familyBankAccounts: many(familyBankAccountsTable, { relationName: 'relationBetweenFamilyBankAccountAndFamily' })
}))