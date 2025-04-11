
import { createContext, ReactNode } from 'react'

type Session = { id: string; phone: string; email: string }
type AuthProviderProps = {
    children: ReactNode;
    session: Session | undefined
}
export const AuthContext = createContext<Session | null | undefined>(null)

export const AuthProvider = ({ children, session }: AuthProviderProps) => (
    <AuthContext.Provider value={session}>
        {children}
    </AuthContext.Provider>
)