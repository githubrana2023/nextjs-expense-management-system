import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { membersTable } from "./members";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { assignMemberReceiveBankTable } from "./assign-member-receive-bank";
import { assignMemberSourceBankTable } from "./assign-member-source-bank";
import { memberTrxTable } from "./member-trx";

export const memberBankAccountsTable = pgTable('member_bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    lbn: text('local_bank_number').notNull().unique(),
    isDeleted: boolean("is_deleted").default(false),
    description: text('description'),
    createdAt,
    updatedAt,
})



export const memberBankAccountsRelation = relations(memberBankAccountsTable, ({ one, many }) => ({

}))