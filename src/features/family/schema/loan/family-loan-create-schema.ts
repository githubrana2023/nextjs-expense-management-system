import {  loanType } from "@/drizzle/schema-helpers"
import { z } from "zod"


export const familyLoanCreateFormSchema = z.object(
    {
        amount: z.string(),
        familyLoanProviderId: z.string(),
        loanType: z.enum(loanType),
        loanDate: z.string().date(),
        description: z.string().optional(),
        loanReceiveBankId: z.string().uuid().optional(),
        loanSourceBankId: z.string().uuid().optional(),
    }
)

export type FamilyLoanCreateFormValue = z.infer<typeof familyLoanCreateFormSchema>