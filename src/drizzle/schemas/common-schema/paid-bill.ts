import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { familyTable } from "../family-schema/family";
import { shopkeepersTable } from "../family-schema/shopkeeper";
import { createdAt, updatedAt } from "../../schema-helpers";
import { loanProvidersTable } from "./loan-provider";
import { relations } from "drizzle-orm";

export const paymentBillShopkeeperTable = pgTable('payment_bill_shopkeeper', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    shopkeeperId: uuid('shopkeeper_id').notNull().references(() => shopkeepersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfPayment: timestamp('date_of_payment', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const paymentBillShopkeeperRelation = relations(paymentBillShopkeeperTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [paymentBillShopkeeperTable.familyId],
        references: [familyTable.id]
    }),
    shopkeeper: one(shopkeepersTable, {
        fields: [paymentBillShopkeeperTable.shopkeeperId],
        references: [shopkeepersTable.id]
    }),
}))

export const paymentBillLoanProviderTable = pgTable('payment_bill_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanProviderId: uuid('loanProvider_id').notNull().references(() => loanProvidersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfPayment: timestamp('date_of_payment', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const paymentBillLoanProviderRelation = relations(paymentBillLoanProviderTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [paymentBillLoanProviderTable.familyId],
        references: [familyTable.id]
    }),
    loanProvider: one(loanProvidersTable, {
        fields: [paymentBillLoanProviderTable.loanProviderId],
        references: [loanProvidersTable.id]
    }),
}))