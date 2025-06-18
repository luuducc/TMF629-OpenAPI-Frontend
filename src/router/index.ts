import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { CreateView, DetailView, HomeView, NotFoundView, UpdateView } from '@/views'

const routes: RouteRecordRaw[] = [
  { path: '/customers', component: HomeView },
  { path: '/customers/create', component: CreateView },
  { path: '/customers/:id', component: DetailView },
  { path: '/customers/:id/edit', component: UpdateView },
  { path: '/', redirect: '/customers' },
  { path: '/create', redirect: '/customers/create' },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
