import { setError, setLoading, setUser } from "@/features/auth/state/auth.slice"
import { useDispatch } from "react-redux"
import { registerAPI, loginAPI } from "@/services/auth.api"

export function useAuth() {
    const dispatch = useDispatch()   
    const handleRegister = async (name, email, password, contact,isseller=false) => {
        try {
            dispatch(setLoading(true))
            const data = await registerAPI(name, email, password, contact,isseller)
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.message ?? "Registration failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async (email, password) => {
        try {
            dispatch(setError(null)); // Clear previous errors
            dispatch(setLoading(true));
            const data = await loginAPI(email, password)
            dispatch(setUser(data.user))
            // Save token if needed, or rely on HTTP-only cookies
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
        } catch (error) {
            dispatch(setError(error.message ?? error ?? "Login failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin }  
}