import { db } from "./db";
import {
    familyTable,
    familyTrxNameTable,
    familyTrxTable,
    familyBankAccountsTable,
    assignFamilyMemberReceiveBankTable,
    assignFamilyMemberSourceBankTable,
    assignFamilyReceiveBankTable,
    assignFamilySourceBankTable,
    familyLoanProviderBillsTable,
    familyLoanProviderTable,
    familyLoansTable,
    familyMemberBankAccountsTable,
    familyMemberLoanProviderBillsTable,
    familyMemberLoanProviderTable,
    familyMemberLoansTable,
    familyMemberTrxNameTable,
    familyMemberTrxTable,
    familyMembersTable,
    familyShopkeeperBillsTable,
    familyShopkeepersTable,
} from "./schema";

export type Family = typeof familyTable.$inferSelect
export type FamilyTrxName = typeof familyTrxNameTable.$inferSelect
export type InsertFamilyTrxName = typeof familyTrxNameTable.$inferInsert
export type FamilyTrx = typeof familyTrxTable.$inferSelect
export type FamilyBankAccount = typeof familyBankAccountsTable.$inferSelect
export type AssignMemberReceiveBank = typeof assignFamilyMemberReceiveBankTable.$inferSelect
export type AssignMemberSourceBank = typeof assignFamilyMemberSourceBankTable.$inferSelect
export type AssignFamilyReceiveBank = typeof assignFamilyReceiveBankTable.$inferSelect
export type AssignFamilySourceBank = typeof assignFamilySourceBankTable.$inferSelect
export type FamilyLoanProviderBill = typeof familyLoanProviderBillsTable.$inferSelect
export type FamilyLoanProvider = typeof familyLoanProviderTable.$inferSelect
export type FamilyLoan = typeof familyLoansTable.$inferSelect
export type FamilyLoanInsert = typeof familyLoansTable.$inferInsert
export type MemberBankAccount = typeof familyMemberBankAccountsTable.$inferSelect
export type MemberLoanProviderBills = typeof familyMemberLoanProviderBillsTable.$inferSelect
export type MemberLoanProvider = typeof familyMemberLoanProviderTable.$inferSelect
export type MemberLoan = typeof familyMemberLoansTable.$inferSelect
export type MemberTrxName = typeof familyMemberTrxNameTable.$inferSelect
export type MemberTrx = typeof familyMemberTrxTable.$inferSelect
export type Member = typeof familyMembersTable.$inferSelect
export type familyShopkeeperBill = typeof familyShopkeeperBillsTable.$inferSelect
export type Shopkeeper = typeof familyShopkeepersTable.$inferSelect
export type ShopkeeperInsert = typeof familyShopkeepersTable.$inferInsert




export type DbQuery = typeof db.query
export type DbQueryKey = keyof DbQuery
export type DbFindFirst<Key extends DbQueryKey> = Parameters<DbQuery[Key]['findFirst']>[number]
export type DbFindMany<Key extends DbQueryKey> = Parameters<DbQuery[Key]['findMany']>[number]

export type DbFindFirstReturnType<Key extends DbQueryKey> = ReturnType<DbQuery[Key]['findFirst']>
export type DbFindManyReturnType<Key extends DbQueryKey> = ReturnType<DbQuery[Key]['findMany']>
