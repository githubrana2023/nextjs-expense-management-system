import { z } from 'zod'
export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid Email!' }),
    password: z.string().min(1, { message: 'Password is required!' })
})

export type LoginFormValue = z.infer<typeof loginSchema>