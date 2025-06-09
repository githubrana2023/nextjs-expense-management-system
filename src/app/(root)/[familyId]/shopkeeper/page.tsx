import React from 'react'
import { ReuseableTab } from '@/components/reuseable-tab'
import { familyTab } from '@/constant/tab'
import { formatLabel } from '@/lib/word-formatter'
import { Store, ScrollText } from 'lucide-react'
import { ShopkeeperTabContent } from '@/features/family/components/shopkeeper'
import { getAllShopkeepersByFamilyId } from '@/features/family/db/shopkeeper'
import { ShopkeeperWithFamilyIdAndName } from '@/interface/shopkeeper'

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
          content: <div>shopkeeper bill</div>
        }
      ] as const}
    />
  )
}

export default ShopkeeperPage