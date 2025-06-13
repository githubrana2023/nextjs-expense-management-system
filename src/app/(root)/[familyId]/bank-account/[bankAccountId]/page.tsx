import { ReuseableTab } from "@/components"
import { familyTab } from "@/constant/tab"
import { FamilyBankAccountDetailsTabContents, FamilyBankAccountUpdateTabContents } from "@/features/family/components/bank-account"
import { formatLabel } from "@/lib/word-formatter"
import { Info, SquarePen } from "lucide-react"

const FamilyBankAccountPage = async ({ params }: { params: Promise<{ familyId: string, bankAccountId: string }> }) => {

    const {defaultActive}=familyTab.familyDynamicBank
    const param = await params

    return (
        <ReuseableTab
        items={[
            {
                value:defaultActive.details,
                label:formatLabel(defaultActive.details),
                Icon:<Info/>,
                content:<FamilyBankAccountDetailsTabContents/>
            },
            {
                value:defaultActive.update,
                label:formatLabel(defaultActive.update),
                Icon:<SquarePen/>,
                content:<FamilyBankAccountUpdateTabContents/>
            },
        ]}
        />
    )

}

export default FamilyBankAccountPage