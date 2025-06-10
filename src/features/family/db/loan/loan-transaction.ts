'use server'

import { db } from "@/drizzle/db"
import { familyBankAccountsTable, familyLoanProviderTable, familyLoansTable } from "@/drizzle/schema"
import { FamilyLoanInsert } from "@/drizzle/type"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"
import { and, eq } from "drizzle-orm"

export const loanGiveTransaction = async (
    loanValues: Omit<FamilyLoanInsert, 'familyLoanProviderId'>,
    deductedAmount: number,
    sourceBankId: string,
) => {
    return await db.transaction(
        async (tx) => {

            const [newLoan] = await tx.insert(familyLoansTable).values(loanValues).returning()

            const [updatedBank] = await tx.update(familyBankAccountsTable)
                .set({
                    balance: deductedAmount.toString()
                })
                .where(
                    and(
                        eq(familyBankAccountsTable.id, sourceBankId),
                        eq(familyBankAccountsTable.familyId, loanValues.familyId),
                        eq(familyBankAccountsTable.isDeleted, false),
                    )
                )
                .returning()

            if (!newLoan || !updatedBank) {
                tx.rollback()
                return failureResponse('Failed to give loan!')
            }

            return successResponse('Loan successfully given!', { newLoan, updatedBank })
        }
    )
}

export const loanTakeTransaction = async (
    loanValues: FamilyLoanInsert,
    addedAmount: number,
    providerTotalDebt: number,
    receiveBankId: string,
) => {

    if (!loanValues.familyLoanProviderId) return failureResponse('Loan Provider id is missing!')

    const loanProviderId = loanValues.familyLoanProviderId

    return await db.transaction(
        async (tx) => {

            const [newLoan] = await tx.insert(familyLoansTable).values(loanValues).returning()

            const [updatedBank] = await tx.update(familyBankAccountsTable)
                .set({
                    balance: addedAmount.toString()
                })
                .where(
                    and(
                        eq(familyBankAccountsTable.id, receiveBankId),
                        eq(familyBankAccountsTable.familyId, loanValues.familyId),
                        eq(familyBankAccountsTable.isDeleted, false),
                    )
                )
                .returning()

            const [updatedLoanProvider] = await tx.update(familyLoanProviderTable)
                .set({
                    totalDebt: providerTotalDebt.toString()
                })
                .where(
                    and(
                        eq(familyLoanProviderTable.id, loanProviderId),
                        eq(familyLoanProviderTable.familyId, loanValues.familyId),
                        eq(familyLoanProviderTable.isDeleted, false),
                    )
                )
                .returning()

            if (!newLoan || !updatedBank || !updatedLoanProvider) {
                tx.rollback()
                return failureResponse('Failed to take loan!')
            }

            return successResponse('Loan successfully taken!', { newLoan, updatedBank })
        }
    )
}