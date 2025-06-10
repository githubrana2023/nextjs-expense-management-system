import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { membersTable } from "./members";
import { memberGiveLoansTable } from "./member-loan";


export const memberLoanReceipientTable = pgTable('member_loan_receipient', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    memberId: uuid('member_id').notNull().references(() => membersTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalCredit: numeric('total_credit', { precision: 7, scale: 2 }),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const memberLoanReceipientRelation = relations(memberLoanReceipientTable, ({ one ,many}) => ({
    family: one(familyTable, {
        fields: [memberLoanReceipientTable.familyId],
        references: [familyTable.id]
    }),
    member: one(membersTable, {
        fields: [memberLoanReceipientTable.memberId],
        references: [membersTable.id]
    }),
    reaceivedLoans:many(memberGiveLoansTable),
}))