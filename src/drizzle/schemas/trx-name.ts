import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { assignSourceBank } from "./assign-source-bank";
import { assignReceiveBank } from "./assign-receive-bank";




export const trxsNameTable = pgTable('transaction_name', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    name:text('trx_name').unique().notNull(),
    variant:text('variant',{enum:trxNameVariant}).notNull(),
    createdAt,
    updatedAt,
})

export const trxsNameRelation = relations(trxsNameTable, ({ one, many }) => ({
assignSourceBanks :many(assignSourceBank,{relationName:'assignSourceBanksUnderTrxName'}),
assignReceiveBanks :many(assignReceiveBank,{relationName:'assignReceiveBanksUnderTrxName'}),
}))