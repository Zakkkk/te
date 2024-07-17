import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView/HomeView.vue';
// import ArticleView from '../views/ArticleView.vue'
import SubmitView from '@/views/SubmitView.vue';
import ConstitutionView from '@/views/ConstitutionView.vue';
import MissionView from '@/views/MissionView.vue';
import ContactView from '@/views/ContactView.vue';
import ArticleNotFoundView from '@/views/ArticleNotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'The Thought Exchange',
      metaTags: [
        {
          name: "og:title",
          content: "The Thought Exchange"
        },
        {
          name: "og:image",
          content: ""
        }
      ]
    }
  },
  {
    path: '/articles',
    name: 'articles',
    meta: {
      title: 'All Articles On The Thought Exchange',
      metaTags: [
        {
          name: "description",
          content: "All the articles on The Thought Exchange. Filter through articles or adjust search filters."
        }
      ]
    },
    component: () => import('@/views/ArticlesView/ArticlesView.vue')
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
    component: () => import('@/views/AuthorView/AuthorView.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    meta: {
      title: 'Submit an Article To The Thought Exchange'
    },
    component: SubmitView
  },
  {
    path: '/constitution',
    name: 'constitution',
    component: ConstitutionView,
    meta: {
      title: 'Our Constitution | The Thought Exchange'
    }
  },
  {
    path: '/mission',
    name: 'mission statement',
    component: MissionView,
    meta: {
      title: 'Our Mission Statement | The Thought Exchange'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'Contact us | The Thought Exchange'
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // if (!to.includes('#'))
      window.scroll(0,0)

    // document.getElementById('app').scrollIntoView();
    // return savedPosition || { top: 0 };
  },
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
