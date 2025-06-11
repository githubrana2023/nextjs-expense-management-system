import { ReuseableTab } from '@/components/reuseable-tab'
import { familyTab } from '@/constant/tab'
import { GiveLoanTabContents, LoanProviderTabContents, LoanRecipientTabContents, TakeLoanTabContents } from '@/features/family/components/loan'
import { formatLabel } from '@/lib/word-formatter'
import { BanknoteArrowDown, BanknoteArrowUp, User } from 'lucide-react'
import React from 'react'

const page = () => {

  const { defaultActive } = familyTab.familyLoan

  return (
    <ReuseableTab
      items={[
        {
          value: defaultActive.give,
          label: formatLabel(defaultActive.give),
          Icon: <BanknoteArrowDown />,
          content: <GiveLoanTabContents />
        },
        {
          value: defaultActive.take,
          label: formatLabel(defaultActive.take),
          Icon: <BanknoteArrowUp />,
          content: <TakeLoanTabContents />
        },
        {
          value: defaultActive.loanProvider,
          label: formatLabel(defaultActive.loanProvider),
          Icon: <User />,
          content: <LoanProviderTabContents />
        },
        {
          value: defaultActive.loanRecipient,
          label: formatLabel(defaultActive.loanRecipient),
          Icon: <User />,
          content: <LoanRecipientTabContents />
        },
      ] as const}
    />
  )
}

export default page