'use client'
import { CardWrapper, DataTable } from "@/components"
import { Button } from "@/components/ui/button"
import { MODAL_TYPE } from "@/constant"
import { Family, FamilyTrxName } from "@/drizzle/type"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { Plus } from "lucide-react"
import { FamilyTrxNameTableColumns } from "./family-trx-name-table-columns"


type TrxNameTabContentProps = {
    familyTrxNames: (FamilyTrxName & { family: Family })[]
}

export const TrxNameTabContent = ({ familyTrxNames }: TrxNameTabContentProps) => {

    const dispatch = useAppDispatch()

    return <CardWrapper
        title="Transaction Name"
        description="Create your transaction"
    >
        <div className="space-y-4">
            <div className="flex items-center gap-1.5">
                <Button className="w-full" onClick={() => {
                    dispatch(onOpen(MODAL_TYPE.F_TRX_NAME))
                }}>
                    <Plus />
                    <span>
                        New
                    </span>
                </Button>
            </div>
            <div>
                <CardWrapper
                    title='Family Transaction Name'
                    description='Family Transaction name'
                >

                    <DataTable data={familyTrxNames} columns={FamilyTrxNameTableColumns} />
                </CardWrapper>
            </div>
        </div>
    </CardWrapper>
}