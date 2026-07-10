import axios from "axios";
const authApiInstance= axios.create({
    baseURL:"http://localhost:5000/api/auth",
    withCredentials:true

})


export async function registerAPI(name,email,password,contact){
    try {
        const response=await authApiInstance.post("/register",{
            name,
            email,
            password,
            contact
        })
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
}