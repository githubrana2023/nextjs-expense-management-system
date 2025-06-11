import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { memberTrxNameTable } from "./member-trx-name";
import { memberBankAccountsTable } from "./member-bank-account";

export const assignMemberSourceBankTable = pgTable('assign_member_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    memberTrxNameId:uuid('member_trx_name_id').notNull().references(()=>memberTrxNameTable.id),
    memberSourceBankId:uuid('member_source_bank_id').notNull().references(()=>memberBankAccountsTable.id),
    createdAt,
    updatedAt,
})

export const assignMemberSourceBankRelation = relations(assignMemberSourceBankTable, ({ one, many }) => ({
  memberTrxName:one(memberTrxNameTable,{
    fields:[assignMemberSourceBankTable.memberTrxNameId],
    references:[memberTrxNameTable.id],
    relationName:'assignMemberSourceBank',
  }),
  memberSourceBank:one(memberBankAccountsTable,{
    fields:[assignMemberSourceBankTable.memberSourceBankId],
    references:[memberBankAccountsTable.id],
  }),
}))