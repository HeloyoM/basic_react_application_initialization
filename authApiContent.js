export const authApiContent = `import { PATCH, POST } from "./api-req"
import { LoginDto } from "./dto/Login.dto"
const API = 'auth'

export const login = async (payload: LoginDto) => {
    try {
        const response = await POST('API/login', payload)

        return response
    } catch (error) {
        throw new Error('Failed to login')
    }
}
    
export const logout = async () => {
    try {
        const response = await PATCH('API/logout', {})

        return response
    } catch (error) {
        throw new Error('Failed to logout')
    }
}`