import { z } from 'zod'
export const registerSchema = z.object({
    name: z.string({ required_error: 'Name is required!' }).min(3, { message: 'Name must be atleast 3 characters long!' }),
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid Email!' }),
    password: z.string().min(1, { message: 'Password is required!' }),
    confirmPassword: z.string().min(1, { message: 'Password is required!' }),
})

export type RegisterFormValue = z.infer<typeof registerSchema>