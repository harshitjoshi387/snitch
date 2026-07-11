import { setError, setLoading, setUser } from "@/features/auth/state/auth.slice"
import { useDispatch } from "react-redux"
import { registerAPI } from "@/services/auth.api"

export function useAuth() {
    const dispatch = useDispatch()   

    const handleRegister = async (name, email, password, contact) => {
        try {
            dispatch(setLoading(true))
            const data = await registerAPI(name, email, password, contact)
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.message ?? "Registration failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister }   