import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
// import ArticleView from '../views/ArticleView.vue'
import SubmitView from '@/views/SubmitView.vue';
import ConstitutionView from '@/views/ConstitutionView.vue';
import MissionView from '@/views/MissionView.vue';
import ArticleNotFoundView from '@/views/ArticleNotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/views/ArticlesView.vue')
    },
    {
      path: '/articles/:articleId',
      name: 'article',
      component: () => import('@/views/SingleArticleView/SingleArticleView.vue')
    },
    {
      path: '/articles/notfound',
      name: 'notfound',
      component: ArticleNotFoundView
    },
    {
      path: '/author/:authorId',
      name: 'author',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: SubmitView
    },
    {
      path: '/constitution',
      name: 'constitution',
      component: ConstitutionView
    },
    {
      path: '/mission',
      name: 'mission statement',
      component: MissionView
    }
  ]
})

export default router
