import { db } from "./db";
import {
    familyTable,
    familyTrxNameTable,
    familyTrxTable,
    familyBankAccountsTable,
    assignMemberReceiveBankTable,
    assignMemberSourceBankTable,
    assignFamilyReceiveBankTable,
    assignFamilySourceBankTable,
    familyLoanProviderBillsTable,
    familyLoanProviderTable,
    familyLoansTable,
    memberBankAccountsTable,
    memberLoanProviderBillsTable,
    memberLoanProviderTable,
    memberLoansTable,
    memberTrxNameTable,
    memberTrxTable,
    membersTable,
    familyShopkeeperBillsTable,
    familyShopkeepersTable,
} from "./schema";

export type Family = typeof familyTable.$inferSelect
export type FamilyInsert = typeof familyTable.$inferInsert

export type FamilyTrxName = typeof familyTrxNameTable.$inferSelect
export type FamilyTrxNameInsert = typeof familyTrxNameTable.$inferInsert

export type FamilyTrx = typeof familyTrxTable.$inferSelect
export type FamilyTrxInsert = typeof familyTrxTable.$inferInsert

export type FamilyBankAccount = typeof familyBankAccountsTable.$inferSelect
export type FamilyBankAccountInsert = typeof familyBankAccountsTable.$inferInsert

export type AssignMemberReceiveBank = typeof assignMemberReceiveBankTable.$inferSelect
export type AssignMemberReceiveBankInsert = typeof assignMemberReceiveBankTable.$inferInsert

export type AssignMemberSourceBank = typeof assignMemberSourceBankTable.$inferSelect
export type AssignMemberSourceBankInsert = typeof assignMemberSourceBankTable.$inferInsert

export type AssignFamilyReceiveBank = typeof assignFamilyReceiveBankTable.$inferSelect
export type AssignFamilyReceiveBankInsert = typeof assignFamilyReceiveBankTable.$inferInsert

export type AssignFamilySourceBank = typeof assignFamilySourceBankTable.$inferSelect
export type AssignFamilySourceBankInsert = typeof assignFamilySourceBankTable.$inferInsert

export type FamilyLoanProviderBill = typeof familyLoanProviderBillsTable.$inferSelect
export type FamilyLoanProviderBillInsert = typeof familyLoanProviderBillsTable.$inferInsert

export type FamilyLoanProvider = typeof familyLoanProviderTable.$inferSelect
export type FamilyLoanProviderInsert = typeof familyLoanProviderTable.$inferInsert

export type FamilyLoan = typeof familyLoansTable.$inferSelect
export type FamilyLoanInsert = typeof familyLoansTable.$inferInsert

export type MemberBankAccount = typeof memberBankAccountsTable.$inferSelect
export type MemberBankAccountInsert = typeof memberBankAccountsTable.$inferInsert

export type MemberLoanProviderBills = typeof memberLoanProviderBillsTable.$inferSelect
export type MemberLoanProviderBillsInsert = typeof memberLoanProviderBillsTable.$inferInsert

export type MemberLoanProvider = typeof memberLoanProviderTable.$inferSelect
export type MemberLoanProviderInsert = typeof memberLoanProviderTable.$inferInsert

export type MemberLoan = typeof memberLoansTable.$inferSelect
export type MemberLoanInsert = typeof memberLoansTable.$inferInsert

export type MemberTrxName = typeof memberTrxNameTable.$inferSelect
export type MemberTrxNameInsert = typeof memberTrxNameTable.$inferInsert

export type MemberTrx = typeof memberTrxTable.$inferSelect
export type MemberTrxInsert = typeof memberTrxTable.$inferInsert

export type Member = typeof membersTable.$inferSelect
export type MemberInsert = typeof membersTable.$inferInsert

export type familyShopkeeperBill = typeof familyShopkeeperBillsTable.$inferSelect
export type familyShopkeeperBillInsert = typeof familyShopkeeperBillsTable.$inferInsert

export type Shopkeeper = typeof familyShopkeepersTable.$inferSelect
export type ShopkeeperInsert = typeof familyShopkeepersTable.$inferInsert





export type DbQuery = typeof db.query
export type DbQueryKey = keyof DbQuery
export type DbFindFirst<Key extends DbQueryKey> = Parameters<DbQuery[Key]['findFirst']>[number]
export type DbFindMany<Key extends DbQueryKey> = Parameters<DbQuery[Key]['findMany']>[number]

export type DbFindFirstReturnType<Key extends DbQueryKey> = ReturnType<DbQuery[Key]['findFirst']>
export type DbFindManyReturnType<Key extends DbQueryKey> = ReturnType<DbQuery[Key]['findMany']>
