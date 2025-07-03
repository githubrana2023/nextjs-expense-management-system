import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "@/drizzle/schema-helpers";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { membersTable } from "./members";
import { assignMemberReceiveBankTable } from "./assign-member-receive-bank";
import { assignMemberSourceBankTable } from "./assign-member-source-bank";
import { memberTrxTable } from "./member-trx";

export const memberTrxNameTable = pgTable('member_trx_name', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    name: text('name').notNull(),
    variant: text('variant', { enum: trxNameVariant }).notNull(),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})

export const memberTrxNameRelations = relations(memberTrxNameTable, ({ one, many }) => ({

}))