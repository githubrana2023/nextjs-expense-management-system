import { Result } from "@/interface";

export const tryCatch = async <T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> => {
    try {
        const data = await promise

        return {
            data,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            data:null,
            error
        }
    }
}