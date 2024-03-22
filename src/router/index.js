import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth/login',
            name: 'auth',
            component: () => import('../views/auth.vue')
        },
        {
            path: '/',
            name: 'dashboard',
            component: () => import('../views/index.vue')
        },
        {
            path: '/consultations',
            name: 'consultations',
            component: () => import('../views/consultation.vue')
        },
        {
            path: '/vaccinations',
            name: 'vaccinations',
            component: () => import('../views/vaccination.vue')
        },
    ]
})

export default router