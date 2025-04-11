'use server'

import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string) => {

    const cookie = await cookies()

    return cookie.set(key, value, {
        httpOnly: true,
    })
}

export const getCookie = async (key: string) => {
    const cookie = await cookies()
    return cookie.get(key)
}

export const hasCookie= async (key:string) => {
    const cookie = await cookies()
    return cookie.has(key)
}

export const deleteCookie= async (key:string) => {
    const cookie = await cookies()
    return cookie.delete(key)
}
