import { apiClient } from '../../../lib/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  },

  signup: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/signup', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password })
  },
}
