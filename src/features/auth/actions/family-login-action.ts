'use server'


import { familyLoginSchema } from "../schema";
import { signJwt } from '@/lib/jose/sign';
import { setCookie, } from '@/lib/helpers';
import { TOKEN_KEY } from "@/constant/token-constant";
import { JWTPayload } from "jose";

export const familyLoginInAction = async (payload: { email: string; password: string }) => {
  try {

    const existUser:JWTPayload = {
      id:"2",
      name: 'rana miah',
      email: 'rtrana2023@gmail.com',
      role: 'FAMILY',
      phone: '01785585238'
    }

    const validation = familyLoginSchema.safeParse(payload)

    if (!validation.success) return { success: false }

    if (!existUser) return { success: false }

    const familyAccessToken = await signJwt(existUser, { secret: process.env.AUTH_SECRET!,expireIn:'7d' })

    await setCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN, familyAccessToken)

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}