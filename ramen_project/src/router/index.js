import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Top from '@/views/Top'
import CreatePosts from '@/views/CreatePosts'
import CreateUsers from '@/views/CreateUsers'
import DetailPost from '@/views/DetailPost'
import UpdatePost from '@/views/UpdatePost'
import DetailUser from '@/views/DetailUser'
import UpdateUser from '@/views/UpdateUser'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts/create',
    name: 'CreatePosts',
    component: CreatePosts,
    meta: { requiredAuth: true }
  },
  {
    path: '/users/create',
    name: 'CreateUsers',
    component: CreateUsers
  },
  {
    path: '/posts/:postId',
    name: 'DetailPost',
    component: DetailPost,
    meta: { requiredAuth: true }
  },
  {
    path: '/posts/:postId/update',
    name: 'UpdatePost',
    component: UpdatePost,
    meta: { requiredAuth: true }
  },
  {
    path: '/users/:userId',
    name: 'DetailUser',
    component: DetailUser,
    meta: { requiredAuth: true }
  },
  {
    path: '/users/:userId/update',
    name: 'UpdateUser',
    component: UpdateUser,
    meta: { requiredAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
