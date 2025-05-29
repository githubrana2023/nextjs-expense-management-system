import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { familyTrxNameTable } from "./family-trx-name";
import { familyBankAccountsTable } from "./family-bank-account";

export const assignFamilySourceBankTable = pgTable('assign_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyTrxNameId:uuid('family_trx_name_id').notNull().references(()=>familyTrxNameTable.id),
    familySourceBankId:uuid('family_source_bank_id').notNull().references(()=>familyBankAccountsTable.id),
    createdAt,
    updatedAt,
})

export const assignFamilySourceBankRelation = relations(assignFamilySourceBankTable, ({ one, many }) => ({
  family:one(familyTable,{
    fields:[assignFamilySourceBankTable.familyId],
    references:[familyTable.id]
  }),
  familyTrxName:one(familyTrxNameTable,{
    fields:[assignFamilySourceBankTable.familyTrxNameId],
    references:[familyTrxNameTable.id]
  }),
  familySourceBank:one(familyBankAccountsTable,{
    fields:[assignFamilySourceBankTable.familySourceBankId],
    references:[familyBankAccountsTable.id],
    relationName:'assignFamilySourceBank'
  }),
}))