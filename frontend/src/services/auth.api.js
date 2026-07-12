import axios from "axios";
const authApiInstance= axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true

})


export async function registerAPI(fullname, email, password, contact, isSeller){
    try {
        const response=await authApiInstance.post("/register",{
            fullname,
            email,
            password,
            contact,
            isSeller
        })
        return response.data
    } catch (error) {
        throw error.response.data.message
    }
}

export async function loginAPI(email, password) {
    try {
        const response = await authApiInstance.post("/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
}