import React from 'react'
import { ReuseableTab } from '@/components/reuseable-tab'
import { familyTab } from '@/constant/tab'
import { formatLabel } from '@/lib/word-formatter'
import { Store, ScrollText } from 'lucide-react'
import { ShopkeeperTabContent } from '@/features/family/components/shopkeeper'
import { getAllShopkeepersByFamilyId } from '@/features/family/db/shopkeeper'
import { ShopkeeperWithFamilyIdAndName } from '@/interface/shopkeeper'
import { ShopkeeperBillContents } from '@/features/family/components/shopkeeper/shopkeeper-bill-tab-contents'

type ShopkeeperPageProps = {
  params: Promise<{ familyId: string }>
}

const ShopkeeperPage = async ({ params }: ShopkeeperPageProps) => {
  const param = await params

  const familyShopkeepers = await getAllShopkeepersByFamilyId(param.familyId, {
    with: {
      family: {
        columns: {
          id: true,
          name: true
        }
      }
    }
  }) as ShopkeeperWithFamilyIdAndName[]


  const {
    shopkeeper,
    shopkeeperBill,
    purchaseDue
  } = familyTab.familyShopkeeper.defaultActive



  return (
    <ReuseableTab

      items={[
        {
          value: shopkeeper,
          label: formatLabel(shopkeeper),
          Icon: <Store />,
          content: <ShopkeeperTabContent familyShopkeepers={familyShopkeepers} />
        },
        {
          value: shopkeeperBill,
          label: formatLabel(shopkeeperBill),
          Icon: <ScrollText />,
          content: <ShopkeeperBillContents />
        },
        {
          value: purchaseDue,
          label: formatLabel(purchaseDue),
          Icon: <ScrollText />,
          content: <ShopkeeperBillContents />
        }
      ] as const}
    />
  )
}

export default ShopkeeperPage