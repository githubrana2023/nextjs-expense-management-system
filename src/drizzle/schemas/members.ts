import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, memberRelation, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";


export const membersTable = pgTable('family_members', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').unique().notNull(),
    password: text('password').notNull(),
    relation: text('relation', { enum: memberRelation }).notNull(),
    role: text('role', { enum: role }).notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt,
})

export const membersRelation = relations(membersTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [membersTable.familyId],
        references: [familyTable.id]
    }),
    trxNames: many(memberTrxNameTable),
    bankAccounts: many(memberBankAccountsTable)
}))