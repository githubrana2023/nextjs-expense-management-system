import React from 'react'
import { ShopkeeperTable } from '@/features/family/components/shopkeeper'
import { getAllShopkeepersByFamilyId } from '@/services/family/shopkeeper'
import { ShopkeeperWithFamilyIdAndName } from '@/interface/shopkeeper'

type ShopkeepersPageProps = {
  params: Promise<{ familyId: string }>
}

const ShopkeepersPage = async ({ params }: ShopkeepersPageProps) => {
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



  return (
    <ShopkeeperTable familyShopkeepers={familyShopkeepers} />
  )
}

export default ShopkeepersPage