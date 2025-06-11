'use server'

import { TOKEN_KEY } from "@/constant/token-constant"
import { db } from "@/drizzle/db"
import { familyLoanProviderBillsTable } from "@/drizzle/schema"
import { familyLoanProviderBillCreateSchema } from "@/features/family/schema/loan-provider-bill"
import { currentFamily } from "@/lib/current-family"
import { deleteCookie } from "@/lib/helpers"
import { failureResponse } from "@/lib/helpers/send-response"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "@/services/family/bank-account"
import { getFamilyById } from "@/services/family/get-family"
import { getDueFamilyTokenLoanByIdAndFamilyIdAndProviderId } from "@/services/family/loan"
import { getFamilyLoanProviderByIdAndFamilyId, getOnlyActiveFamilyLoanProviderByIdAndFamilyId } from "@/services/family/loan-provider"

export const familyLoanProviderBillCreateAction = async (payload: unknown) => {
    try {
        const validation = familyLoanProviderBillCreateSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            amount,
            familyLoanProviderId,
            familyTakenLoanId,
            paymentDate,
            sourceBankId,
            description
        } = validation.data

        const formattedAmount = Number(amount)

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        const existFamilySourceBank = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(sourceBankId, existFamily.id)

        if (!existFamilySourceBank) return failureResponse('Inactive Bank Account!')

        const existFamilyLoanProvider = await getOnlyActiveFamilyLoanProviderByIdAndFamilyId(familyLoanProviderId, existFamily.id)

        if (!existFamilyLoanProvider) return failureResponse('Inactive Loan Provider!')

        const existFamilyTakenLoan = await getDueFamilyTokenLoanByIdAndFamilyIdAndProviderId(
            familyTakenLoanId,
            existFamily.id,
            existFamilyLoanProvider.id
        )

        if (!existFamilyTakenLoan) return failureResponse('Family taken loan not found!')

        const balance = Number(existFamilySourceBank.balance)
        const providerTotalDebt = Number(existFamilyLoanProvider.totalDebt)
        const remaining = Number(existFamilyTakenLoan.remaining)

        const isBalanceLessThanAmount = balance < formattedAmount
        const isProviderTotalDebtLessThanAmount = providerTotalDebt < formattedAmount
        const isRemainingLessThanAmount = remaining < formattedAmount

        
        if (isBalanceLessThanAmount
            || isProviderTotalDebtLessThanAmount
            || isRemainingLessThanAmount
        ) return failureResponse(
            isBalanceLessThanAmount
            ? "Insufficient Balance!"
            : isProviderTotalDebtLessThanAmount
            ? 'Due loan is less than you are paying!'
            : 'Remaining loan is less than your are paying!'
        )
        
        const deductedBalance = balance - formattedAmount
        const deductedProviderTotalDebt = providerTotalDebt - formattedAmount
        const deductedRemaining = remaining - formattedAmount

        return await db.transaction(
            async (tx) => {
                const newFamilyLoanProviderBill = await tx.insert(familyLoanProviderBillsTable).values(
                    {
                        amount,
                        description,
                        familyId:existFamily.id,
                        familyLoanProviderId:existFamilyLoanProvider.id,
                        sourceBankId:existFamilySourceBank.id,
                        familyTakenLoanId:existFamilyTakenLoan.id,
                        paymentDate: new Date(paymentDate),
                        remaining:deductedRemaining.toString(),
                    }
                ).returning()

                
            }
        )



    } catch (error) {

    }
}