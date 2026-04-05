import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomePage from '@/pages/HomePage.vue'
import NewPage from '@/pages/NewPage.vue'
import MinePage from '@/pages/MinePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ChangePasswordPage from '@/pages/ChangePasswordPage.vue'
import CommentPage from '@/pages/CommentPage.vue'
import ArticlePage from '@/pages/ArticlePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import WelcomePage from '@/pages/WelcomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage,
    },
    {
      path: '/home',
      component: HomePage,
    },
    {
      path: '/New',
      component: NewPage,
    },
    {
      path: '/Mine',
      component: MinePage,
    },
    {
      path: '/Login',
      component: LoginPage,
    },
    {
      path: '/Register',
      component: RegisterPage,
    },
    {
      path: '/ChangePassword',
      component: ChangePasswordPage,
    },
    {
      path: '/article:articleId',
      name:'article',
      component: ArticlePage,
    },
        {
      path: '/article:articleId/comment:commentId',
      name:'comment',
      component: CommentPage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
