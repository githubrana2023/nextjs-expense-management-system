import { ReuseableTab } from "@/components"
import { familyTab } from "@/constant/tab"
import {
    ShopkeeperBillContents,
    ShopkeeperDetailsTabContent,
    ShopkeeperPurchaseDueTabContents,
    ShopkeeperUpdateTabContent
} from "@/features/family/components/shopkeeper"
import { } from "@/features/family/components/shopkeeper/shopkeeper-purchase-due-tab-contents"
import { DynamicShopkeeper } from "@/interface/tab"
import { formatLabel } from "@/lib/word-formatter"
import { Info, ScrollText, ShoppingBasket, SquarePen } from "lucide-react"

type ShopkeeperPageProps = {
    params: Promise<{ familyId: string, shopkeeperId: string }>
    searchParams: Promise<{ tab?: string }>
}

const ShopkeeperPage = async ({ params, searchParams }: ShopkeeperPageProps) => {
    const param = await params
    const searchParam = await searchParams
    const { defaultActive } = familyTab.familyDynamicShopkeeper

    console.log(param)

    return (
        <ReuseableTab
            defaultValue={(searchParam.tab as DynamicShopkeeper) || defaultActive.details}
            items={[
                {
                    value: defaultActive.details,
                    label: formatLabel(defaultActive.details),
                    Icon: <Info />,
                    content: <ShopkeeperDetailsTabContent />
                },
                {
                    value: defaultActive.update,
                    label: formatLabel(defaultActive.update),
                    Icon: <SquarePen />,
                    content: <ShopkeeperUpdateTabContent />
                },
                {
                    value: defaultActive.purchaseDue,
                    label: formatLabel(defaultActive.purchaseDue),
                    Icon: <ShoppingBasket />,
                    content: <ShopkeeperPurchaseDueTabContents />
                },
                {
                    value: defaultActive.shopkeeperBill,
                    label: formatLabel(defaultActive.shopkeeperBill),
                    Icon: <ScrollText />,
                    content: <ShopkeeperBillContents />
                }
            ]}
        />
    )
}

export default ShopkeeperPage