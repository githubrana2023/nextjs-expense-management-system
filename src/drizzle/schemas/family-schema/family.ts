import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { usersTable } from "../user";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyMembersTable } from "./family-members";
import { assignFamilySourceBankTable } from "./assign-family-source-bank";
import { assignFamilyReceiveBankTable } from "./assign-family-receive-bank";


export const familyTable = pgTable('family_table', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    userId: uuid('user_id').notNull().references(() => usersTable.id),
    name: text('family_name').notNull(),
    createdAt,
    updatedAt
})

export const familyRelation = relations(familyTable, ({ one, many}) => ({
    user: one(usersTable, {
        fields: [familyTable.userId],
        references: [usersTable.id]
    }),
    familyMembers : many(familyMembersTable),
    assignFamilySourceBanks : many(assignFamilySourceBankTable),
    assignFamilyReceiveBanks : many(assignFamilyReceiveBankTable),

}))