import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import NewHomePage from '@/modules/home/pages/HomePage.vue'
import WeatherGeneratorPage from '@/modules/weather/pages/HomePage.vue'
import NotFoundPage from '@/modules/error/pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: NewHomePage,
            },
            {
                path: 'weather',
                name: 'weather-generator',
                component: WeatherGeneratorPage,
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: EmptyLayout,
        children: [
            {
                path: '',
                name: 'not-found',
                component: NotFoundPage,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router