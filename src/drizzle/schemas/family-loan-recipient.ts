import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";


export const familyLoanRecipientTable = pgTable('family_loan_recipient', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    isDeleted: boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const familyLoanRecipientRelation = relations(familyLoanRecipientTable, ({ }) => ({}))