'use server'

import { failureResponse } from "@/lib/helpers/send-response"
import { familyLoanCreateFormSchema } from "../../schema/loan"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "../../../../services/family/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getOnlyActiveFamilyLoanProviderByIdAndFamilyId } from "../../../../services/family/loan-provider/get-loan-provider"
import { getOnlyActiveFamilyBankAccountByIdAndFamilyId } from "../../../../services/family/bank-account"
import { loanType } from "@/drizzle/schema-helpers"
import { db } from "@/drizzle/db"
import { loanGiveTransaction, loanTakeTransaction } from "../../../../services/family/loan"

export const familyLoanCreateAction = async (payload: unknown) => {
    try {
        const validation = familyLoanCreateFormSchema.safeParse(payload)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const {
            amount,
            familyLoanProviderId,
            loanDate,
            loanType,
            description,
            loanReceiveBankId,
            loanSourceBankId
        } = validation.data

        const formattedAmount = Number(amount)

        if (!loanReceiveBankId && !loanSourceBankId) return failureResponse('Please select a bank!')

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        if (loanType === 'GIVE') {
            if (!loanSourceBankId) return failureResponse('Select source bank!')

            const existFamilySourceBank = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(loanSourceBankId, existFamily.id)

            if (!existFamilySourceBank) return failureResponse('Inactive Source Bank!')

            const deductedAmount = Number(existFamilySourceBank.balance) - formattedAmount

            return await loanGiveTransaction({
                amount,
                loanType,
                description,
                loanDate: new Date(loanDate),
                loanStatus: 'DUE',
                familyId: existFamily.id,
                familySourceBankId:existFamilySourceBank.id
            },
                deductedAmount,
                existFamilySourceBank.id,
            )

        }



        if (!loanReceiveBankId) return failureResponse('Select receive bank!')

        const existFamilyReceiveBank = await getOnlyActiveFamilyBankAccountByIdAndFamilyId(loanReceiveBankId, existFamily.id)

        if (!existFamilyReceiveBank) return failureResponse('Inactive Receive Bank!')

        const existFamilyLoanProvider = await getOnlyActiveFamilyLoanProviderByIdAndFamilyId(familyLoanProviderId, existFamily.id)

        if (!existFamilyLoanProvider) return failureResponse('Loan Provider not found!')

        const addedAmount = Number(existFamilyReceiveBank.balance) + formattedAmount
        const providerTotalDebt = Number(existFamilyLoanProvider.totalDebt) + formattedAmount

        return await loanTakeTransaction({
            amount,
            loanType,
            loanDate: new Date(loanDate),
            loanStatus: 'DUE',
            familyId: existFamily.id,
            description,
            familyLoanProviderId:existFamilyLoanProvider.id,
            familyReceiveBankId:existFamilyReceiveBank.id
        },
            addedAmount,
            providerTotalDebt,
            existFamilyReceiveBank.id
        )





    } catch (error) {
        return failureResponse('failed to insert loan!', error)
    }
}
