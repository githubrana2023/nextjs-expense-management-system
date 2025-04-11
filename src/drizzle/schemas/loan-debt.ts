import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { shopkeepersTable } from "./shopkeeper";
import { createdAt, updatedAt } from "../schema-helpers";
import { loanProvidersTable } from "./loan-provider";
import { relations } from "drizzle-orm";

export const shopkeeperDebtTable = pgTable('shopkeeper_debt', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    shopkeeperId: uuid('shopkeeper_id').notNull().references(() => shopkeepersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfDebt: timestamp('date_of_debt', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const shopkeeperDebtRelation = relations(shopkeeperDebtTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [shopkeeperDebtTable.familyId],
        references: [familyTable.id]
    }),
    shopkeeper: one(shopkeepersTable, {
        fields: [shopkeeperDebtTable.shopkeeperId],
        references: [shopkeepersTable.id]
    }),
}))

export const loanTable = pgTable('loan', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanProviderId: uuid('loanProvider_id').notNull().references(() => loanProvidersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfLoan: timestamp('date_of_loan', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const loanTableRelation = relations(loanTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [loanTable.familyId],
        references: [familyTable.id]
    }),
    loanProvider: one(loanProvidersTable, {
        fields: [loanTable.loanProviderId],
        references: [loanProvidersTable.id]
    }),
}))