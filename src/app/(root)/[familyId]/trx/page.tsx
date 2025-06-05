import { ReuseableTab, TabItem } from '@/components/reuseable-tab'
import { defaultActiveTab } from '@/constant/tab'
import { TrxNameTabContent } from '@/features/family/components/trx-name/family-trx-name-tab-content'
import { TrxTab } from '@/features/family/components/trx-tab-content'
import { getAllFamilyTrxNameByFamilyId } from '@/features/family/db/trx-name/get-family-trx-name'
import { TrxTabType } from '@/interface/tab'
import React from 'react'

type TrxPageProps = {
  params: Promise<{ familyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const TrxPage = async ({ params, searchParams }: TrxPageProps) => {

  const { familyId } = await params
  const searParam = await searchParams
  const { defaultActive } = defaultActiveTab.family.trx
  const familyTrxNames = await getAllFamilyTrxNameByFamilyId(familyId)

  return (
    <ReuseableTab
      removeKeyOfValues={[defaultActive.transaction, defaultActive.trxName]}
      defaultValue={(searParam.tab as TrxTabType) ||defaultActive.trxName }
      items={
        [
          {
            value: defaultActive.transaction,
            label: 'Transaction',
            content: <TrxTab />
          },
          {
            value: defaultActive.trxName,
            label: 'Trx Name',
            content: <TrxNameTabContent familyTrxNames={familyTrxNames} />
          },
        ] as const}
    />
  )
}

export default TrxPage