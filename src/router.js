import { createRouter, createWebHashHistory } from 'vue-router';
import Print from './components/Printing/Print.vue';
import PrintMenu from './components/Printing/PrintMenu.vue';
import RVCheckLists from './components/RV/RVCheckLists.vue';
import RVPreHaulCheckList from './components/RV/RVPreHaulCheckList.vue';
import RVWinterizeCheckList from './components/RV/RVWinterizeCheckList.vue';
import store from './store/index.js';
import UserAuth from './pages/auth/UserAuth.vue';
import BucketList from './components/BucketList/BucketList.vue';
import BlogList from './components/Blog/BlogList.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/print' },
    {
      path: '/print',
      component: Print,
      children: [
        {
          path: '/print/menu/:mode',
          component: PrintMenu,
          props: true,
        },
      ],
    },
    // { path: '/prog-rummy-rules', component: ProgRummyRules },
    {
      path: '/rv',
      component: RVCheckLists,
      children: [
        { path: '/rv/PreHaul', component: RVPreHaulCheckList },
        { path: '/rv/Winterize', component: RVWinterizeCheckList },
      ],
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    {
      path: '/bucket-list',
      component: BucketList,
      meta: { requiresAuth: true },
    },
    {
      path: '/blog-list',
      component: BlogList,
      meta: { requiresAuth: true },
    },
    { path: '/:notFound(.*)', redirect: '/print' },
  ],

  linkActiveClass: 'active',
});

router.beforeEach(function (to, _, next) {
  console.log(
    'here',
    to.meta.requiresAuth,
    to.meta.requiresUnauth,
    store.getters.isAuthenticated
  );
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/bucket-list');
  } else {
    next();
  }
});

export default router;
