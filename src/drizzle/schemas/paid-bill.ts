import { numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { shopkeepersTable } from "./shopkeeper";
import { createdAt, updatedAt } from "../schema-helpers";
import { loanProvidersTable } from "./loan-provider";
import { relations } from "drizzle-orm";

export const paymentBillShopkeeper = pgTable('payment_bill_shopkeeper', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    shopkeeperId: uuid('shopkeeper_id').notNull().references(() => shopkeepersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfPayment: timestamp('date_of_payment', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const paymentBillShopkeeperRelation = relations(paymentBillShopkeeper, ({ one }) => ({
    family: one(familyTable, {
        fields: [paymentBillShopkeeper.familyId],
        references: [familyTable.id]
    }),
    shopkeeper: one(shopkeepersTable, {
        fields: [paymentBillShopkeeper.shopkeeperId],
        references: [shopkeepersTable.id]
    }),
}))

export const paymentBillLoanProvider = pgTable('payment_bill_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    loanProviderId: uuid('loanProvider_id').notNull().references(() => loanProvidersTable.id),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    dateOfPayment: timestamp('date_of_payment', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const paymentBillLoanProviderRelation = relations(paymentBillLoanProvider, ({ one }) => ({
    family: one(familyTable, {
        fields: [paymentBillLoanProvider.familyId],
        references: [familyTable.id]
    }),
    loanProvider: one(loanProvidersTable, {
        fields: [paymentBillLoanProvider.loanProviderId],
        references: [loanProvidersTable.id]
    }),
}))