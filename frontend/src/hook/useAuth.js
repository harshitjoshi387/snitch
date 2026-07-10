import{setError,setLoading,setUser} from "@/features/auth/state/auth.slice"
import {useDispatch} from "react-redux"
import {registerAPI} from "@/services/auth.api"

const dispatch=useDispatch()

const handleRegister=async(name,email,password,contact)=>{
    try {
        dispatch(setLoading(true))
        const data=await registerAPI(name,email,password,contact)
        dispatch(setUser(data))
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error))
        dispatch(setLoading(false))
    }
}   