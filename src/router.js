import Vue from 'vue';
import Router from 'vue-router';
import { AUTH_TOKEN } from './plugins/vue-apollo';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/complete-signup',
      name: 'CompleteSignup',
      component: () => import(/* webpackChunkName: "completeSignup" */ './views/CompleteSignup.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import(/* webpackChunkName: "Settings" */ './views/Settings.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem(AUTH_TOKEN);
  const publicRoute = to.matched.some(record => record.meta.public);
  const redirect = to.matched.some(record => record.meta.redirect);
  if (!publicRoute) {
    if (auth === null) {
      next({ name: 'Signin' });
    }
  } else if (redirect) {
    if (auth !== null) {
      next({ name: 'Dashboard' });
    }
  }
  next();
});

export default router;
