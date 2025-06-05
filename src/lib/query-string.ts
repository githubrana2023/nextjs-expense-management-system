
import { useRouter, useSearchParams } from "next/navigation"
import qs from 'query-string'


export const useQueryString = () => {
    const router = useRouter()
    const rowSearchParams = useSearchParams().toString()
    const parsedSearchParams = qs.parse(rowSearchParams)

    const searchQuery = { ...parsedSearchParams }

    return (key: string, value: string | (string | null)[] | null,removeKeyOfValues:string[]=[]) => {

        if (parsedSearchParams[key]||removeKeyOfValues.includes(value as string)) {
            searchQuery[key] = null
        } else {
            searchQuery[key] = value
        }
        const stringifyParams = qs.stringifyUrl({ url: window.location.href, query: searchQuery }, { skipNull: true })
        router.push(stringifyParams)
    }
}