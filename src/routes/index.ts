import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { isLoggedIn } from '../auth'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        meta: { guest: true }
    },
    {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
    meta: { guest: true }
},
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/products/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products/create',
        name: 'products-create',
        component: () => import('../views/products/create.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products/edit/:id',
        name: 'products-edit',
        component: () => import('../views/products/edit.vue'),
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard
router.beforeEach((to) => {
    if (to.meta.requiresAuth && !isLoggedIn.value) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
    if (to.meta.guest && isLoggedIn.value) {
        return { name: 'products' }
    }
})

export default router