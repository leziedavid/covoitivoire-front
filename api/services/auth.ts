import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'

// Connexion : accepte email OU phoneNumber
export const signIn = async (loginData: Partial<LoginDto>): Promise<BaseResponse<UserAuth>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        })

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const refreshAccessToken = async ( refreshToken: string ): Promise<BaseResponse<RefreshTokenResponse>> => {
    
    try {

        const response = await fetch(`${getBaseUrl()}/auth/refresh`, { method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        })

        return await response.json()

    } catch (error) {

        throw error
    }
}

// Inscription
export const signUp = async (registerData: RegisterDto): Promise<BaseResponse<any>> => {
    try {
        const formData = new FormData()
        Object.entries(registerData).forEach(([key, value]) => {
            if (value) formData.append(key, value)
        })

        const response = await fetch(`${getBaseUrl()}/auth/register`, {
            method: 'POST',
            body: formData,
        })

        return await response.json()
    } catch (error) {
        throw error
    }
}
