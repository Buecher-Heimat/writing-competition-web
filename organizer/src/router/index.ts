import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import pinia from '@/stores'
import LoginViewVue from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginViewVue
    },
    {
      path: '/wettbewerb/erstellen',
      name: 'Erstellen',
      component: () => import('@/views/competition/CreateView.vue')
    },
    {
      path: '/wettbewerb/:competitionId',
      component: () => import('@/views/CompetitionView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/competition/CompetitionHomeView.vue')
        },
        {
          path: 'gewinner',
          component: () => import('@/views/competition/SetWinnerView.vue')
        },
        {
          path: 'texte/angenommen',
          component: () => import('@/views/competition/ApprovedPosts.vue')
        },
        {
          path: 'texte/inbox',
          component: () => import('@/views/competition/ApprovePosts.vue')
        },
        {
          path: 'texte/hinzufuegen',
          component: () => import('@/views/competition/AddPost.vue')
        },
        {
          path: 'texte/:postId/:action',
          component: () => import('@/views/competition/PostView.vue')
        },
      ]
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

const authStore = useAuthStore(pinia)

router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  if (to.name !== 'Login' && to.name !== 'Register' && !authStore.isLoggedIn) {
    // If not, redirect to the login page and add the current path to the query string
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
