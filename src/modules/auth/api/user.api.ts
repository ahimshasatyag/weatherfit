import axios from 'axios'

// Ganti baseURL ini dengan URL backend/API sebenarnya yang Anda gunakan untuk autentikasi & user
export const userApi = axios.create({
    baseURL: 'https://api.example.com/api', // Ubah URL ini
    headers: {
        'Content-Type': 'application/json'
    }
})

// Anda bisa menambahkan interceptor di sini jika membutuhkan token (misalnya Authorization: Bearer token)
userApi.interceptors.request.use((config) => {
    // Contoh mengambil token dari localStorage
    const token = localStorage.getItem('token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Contoh endpoint untuk mendapatkan profil user
export const getUserProfile = async () => {
    try {
        const response = await userApi.get('/user/profile')
        return response.data
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}

// Contoh endpoint untuk login user
export const loginUser = async (credentials: any) => {
    try {
        const response = await userApi.post('/login', credentials)
        return response.data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}
