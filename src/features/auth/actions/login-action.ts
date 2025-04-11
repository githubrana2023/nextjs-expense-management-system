'use server'

import bcrypt from 'bcryptjs'

import { loginSchema } from "../schema";
import { signJwt } from '@/lib/jose/sign';
import { setCookie, tryCatchFn } from '@/lib/helpers';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/drizzle/schema';

export const loginInAction = async (payload: { email: string; password: string; }) => await tryCatchFn(async () => {
    const validation = loginSchema.safeParse(payload)

    if (!validation.success) return false

    const existUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, validation.data.email)
    })

    if (!existUser) return false

    const isPwMatch = await bcrypt.compare(validation.data.password, existUser.password)

    if (!isPwMatch) return false

    const { id, email } = existUser
    const accessToken = await signJwt({ id, email }, { secret: process.env.ACCESS_TOKEN_SECRET! })
    const refreshToken = await signJwt({ id, email }, { secret: process.env.REFRESH_TOKEN_SECRET! })

    setCookie('access_token', accessToken)
    setCookie('refresh_token', refreshToken)


}
)
