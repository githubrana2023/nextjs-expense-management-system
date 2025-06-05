import { ReuseableTab } from '@/components/reuseable-tab'
import { TrxNameTabContent} from '@/features/family/components/trx-name/family-trx-name-tab-content'
import { TrxTab } from '@/features/family/components/trx-tab-content'
import { getAllFamilyTrxNameByFamilyId } from '@/features/family/db/get-family-trx-name'
import React from 'react'

const TrxPage = async({params}:{params:Promise<{familyId:string}>}) => {

  const {familyId} = await params

  const familyTrxNames = await getAllFamilyTrxNameByFamilyId(familyId)

  return (
    <ReuseableTab
    defaultValue='trx-name'
      items={
        [
          {
            value: 'Transaction',
            label: 'Transaction',
            content: <TrxTab/>
          },
          {
            value: 'trx-name',
            label: 'Trx Name',
            content: <TrxNameTabContent familyTrxNames={familyTrxNames}/>
          },
        ] as const}
    />
  )
}

export default TrxPage