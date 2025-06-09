'use client'
import { CardWrapper, DataTable } from "@/components"
import { Button } from "@/components/ui/button"
import { MODAL_TYPE } from "@/constant"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { shopkeeperTableColumns } from "./shopkeeper-table-columns"
import { ShopkeeperWithFamilyIdAndName } from "@/interface/shopkeeper"


type ShopkeeperTabContentProps = {
    familyShopkeepers: ShopkeeperWithFamilyIdAndName[]
}

export const ShopkeeperTabContent = ({ familyShopkeepers }: ShopkeeperTabContentProps) => {

    const dispatch = useAppDispatch()

    return <CardWrapper
        title="Shopkeepers"
        description="Buy now, Pay later!"
        headerElement={
            <Button
                size='sm'
                onClick={
                    () => dispatch(onOpen(MODAL_TYPE.F_SHOPKEEPER))
                }
            >
                New
            </Button>
        }
    >
        <DataTable data={familyShopkeepers} columns={shopkeeperTableColumns} />
    </CardWrapper>
}