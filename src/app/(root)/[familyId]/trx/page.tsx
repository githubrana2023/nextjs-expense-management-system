import { ReuseableTab } from '@/components/reuseable-tab'
import { familyTab } from '@/constant/tab'
import { TrxNameTabContent } from '@/features/family/components/trx-name'
import { TrxTab } from '@/features/family/components/trx-tab-content'
import {getOnlyActiveFamilyTrxNameByFamilyId } from '@/services/family/trx-name'
import { TrxTabType } from '@/interface/tab'
import { formatLabel } from '@/lib/word-formatter'
import React from 'react'
import { AssignFamilyReceiveBank, AssignFamilySourceBank, FamilyBankAccount, FamilyTrxName } from '@/drizzle/type'

type TrxPageProps = {
  params: Promise<{ familyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const TrxPage = async ({ params, searchParams }: TrxPageProps) => {

  const { familyId } = await params
  const searParam = await searchParams
  const { familyTrx } = familyTab
  
  const familyTrxNames = await getOnlyActiveFamilyTrxNameByFamilyId(familyId,{
    with:{
      assignFamilyReceiveBanks:{
        with:{
          familyReceiveBank:true
        }
      },
      assignFamilySourceBanks:{
        with:{
          familySourceBank:true
        }
      }
    }
  }) as (FamilyTrxName & {
          assignFamilyReceiveBanks: (AssignFamilyReceiveBank & {
              familyReceiveBank: FamilyBankAccount
          })[],
          assignFamilySourceBanks: (AssignFamilySourceBank & {
              familySourceBank: FamilyBankAccount
          })[],
      })[]

      

  return (
    <ReuseableTab
      removeKeyOfValues={[familyTrx.defaultActive.transaction, familyTrx.defaultActive.trxName]}
      defaultValue={(searParam.tab as TrxTabType) ||familyTrx.defaultActive.transaction }
      items={
        [
          {
            value: familyTrx.defaultActive.transaction,
            label: formatLabel(familyTrx.defaultActive.transaction),
            content: <TrxTab familyTrxNames={familyTrxNames}/>
          },
          {
            value: familyTrx.defaultActive.trxName,
            label: formatLabel(familyTrx.defaultActive.trxName),
            content: <TrxNameTabContent familyTrxNames={familyTrxNames} />
          },
        ] as const}
    />
  )
}

export default TrxPage