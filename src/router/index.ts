import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
import HomeView from '@/views/HomeView.vue'
import UpdateView from '@/views/UpdateView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/customers', component: HomeView },
  { path: '/customers/create', component: CreateView },
  { path: '/customers/:id', component: DetailView },
  { path: '/customers/:id/edit', component: UpdateView },
  { path: '/', redirect: '/customers' },
  { path: '/create', redirect: '/customers/create' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
