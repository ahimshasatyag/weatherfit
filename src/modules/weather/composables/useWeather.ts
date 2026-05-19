import { ref } from 'vue'

export function useWeather() {
    const loading = ref(false)

    const getWeather = async (city: string) => {
        loading.value = true

        try {
            console.log(city)

        } catch (error) {
            console.error(error)

        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        getWeather,
    }
}