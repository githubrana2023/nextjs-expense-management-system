'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getFamilyTrxNameByNameAndFamilyId = async (name: string, familyId: string) => await db.query.familyTrxNameTable.findFirst({
    where: and(
        eq(familyTrxNameTable.name, name),
        eq(familyTrxNameTable.isDeleted, false),
        eq(familyTrxNameTable.familyId, familyId)
    )
})
export const getFamilyTrxNameByIdAndFamilyId = async (id: string, familyId: string) => await db.query.familyTrxNameTable.findFirst({
    where: and(
        eq(familyTrxNameTable.id, id),
        eq(familyTrxNameTable.familyId, familyId),
    )
})

export const getAllFamilyTrxNameByFamilyId = async (familyId: string) => await db.query.familyTrxNameTable.findMany({
    where: and(
        eq(familyTrxNameTable.familyId, familyId),
    ),
    with:{
        family: true
    }
})