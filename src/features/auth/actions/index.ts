'use server'

import bcrypt from 'bcryptjs'

import { loginSchema } from "../schema";
import { signJwt } from '@/lib/jose/sign';
import { setCookie } from '@/lib/helpers';

export const loginInAction = async (payload: { email: string; password: string; }) => {

    try {
        const validation = loginSchema.safeParse(payload)

        if (!validation.success) return false

        const existUser: { id: string; email: string; password: string; role: 'owner' | 'father' | 'mother' | 'sister' | 'wife' | 'son' | 'daughter' } = await new Promise(res => ({ id: '1', email: 'example@em' }))

        if (!existUser) return false

        const isPwMatch = await bcrypt.compare(validation.data.password, existUser.password)

        if (!isPwMatch) return false

        const { id, email,  role } = existUser
        const accessToken = await signJwt({ id, email, role }, { secret: process.env.ACCESS_TOKEN_SECRET! })
        const refreshToken = await signJwt({ id, email, role }, { secret: process.env.REFRESH_TOKEN_SECRET! })

        setCookie('access_token',accessToken)
        setCookie('refresh_token',refreshToken)



    } catch (error) {

    }

}