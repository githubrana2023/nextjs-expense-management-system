import { ReuseableTab } from '@/components'
import { REDIRECT_TO } from '@/constant'
import {
  FamilyTrxNameDetailsTabContent,
  FamilyTrxNameUpdateTabContent,
  FamilyTrxNameAssignTabContent,
} from '@/features/family/components/trx-name'
import { TabType } from '@/interface/tab'
import { currentFamily } from '@/lib/current-family'
import { Info, SquarePen, Cable } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type TrxNameDetailsPageProp = {
  params: Promise<{ familyId: string, trxNameId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TrxNameDetailsPage = async ({ params, searchParams }: TrxNameDetailsPageProp) => {
  const loggedFamily = await currentFamily()
  if (!loggedFamily) redirect(REDIRECT_TO.LOGIN_PAGE)
  const searchParam = await searchParams

  return (
    <ReuseableTab
      removeKeyOfValues={['assign','details','update']}
      defaultValue={(searchParam.tab as TabType) || 'details'}
      items={[
        {
          value: 'details',
          label: 'Details',
          Icon: <Info />,
          content: <FamilyTrxNameDetailsTabContent />
        },
        {
          value: 'update',
          label: 'Update',
          Icon: <SquarePen />,
          content: <FamilyTrxNameUpdateTabContent/>
        },
        {
          value: 'assign',
          label: 'Assign',
          Icon: <Cable />,
          content: <FamilyTrxNameAssignTabContent/>
        },
      ]}
    />
  )
}

export default TrxNameDetailsPage