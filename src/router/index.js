
import Home from '@/components/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: ()=> import('../components/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../components/Login.vue')
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: ()=> import('../components/Pokemon.vue')
  },
  {
    path: '/pokemon/:name',
    name: 'pokemons',
    component: ()=> import('../views/PokeView.vue')
  },
  ],
})

export default router
