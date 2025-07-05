import Link from "next/link"
import { currentFamily } from "@/lib/current-family"
import { LogOutButton } from "@/features/auth/components/log-out"
import { TOKEN_KEY } from "@/constant/token-constant"
import { appRoute } from "@/constant"
import { currentMember } from "@/lib/current-member"
import { MobileNav } from "./mobile-nav"
import Image from "next/image"

import logo from '../../public/accounting.png'

export const Navbar = async () => {

    const loggedFamily = await currentFamily()
    const loggedMember = await currentMember()
    const routes = Object.entries(appRoute).map(([key, value]) => {
        if(key==='FAMILY'){
            return {
                href: `/${loggedFamily?.id}`,
                label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
                id:value
            }

        }
        if(key==='MEMBER'){
            return {
                href: `/${loggedFamily?.id}/member/${loggedMember?.id}`,
                label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
                id:value
            }

        }
        return {
            href: value,
            label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
            id:value
        }
    })

    return (
        <nav className="flex items-center justify-between px-6">

            <MobileNav routes={routes}/>

            <ul className="hidden md:flex flex-wrap items-center justify-center gap-4 border py-5 px-4 shadow-sm">
                {
                    routes.map(
                        route => (
                            <li className="border border-indigo-800 px-2 py-1" key={route.id}>
                                <Link href={route.href.toLocaleLowerCase()}>{route.label}</Link>
                            </li>

                        )
                    )
                }
                {
                    loggedFamily && <LogOutButton tokenKey={TOKEN_KEY.FAMILY_ACCESS_TOKEN} redirectTo="/auth/login"/>
                }
                
            </ul>
        </nav>
    )
}
