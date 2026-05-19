import axios from 'axios'

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: import.meta.env.VITE_WEATHER_API_KEY
    }
})

// Debug: Menampilkan URL asli yang dipanggil ke console browser
weatherApi.interceptors.request.use(config => {
    console.log('🌍 Mengirim request ke OpenWeatherMap...');
    console.log('URL Lengkap:', config.baseURL + (config.url || ''));
    console.log('Parameter yang dikirim:', config.params);
    return config;
});