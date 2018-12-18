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
      component: () => import(/* webpackChunkName: "signin" */ './views/user/Signin.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/user/Signup.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/complete-signup',
      name: 'CompleteSignup',
      component: () => import(/* webpackChunkName: "completeSignup" */ './views/user/CompleteSignup.vue'),
      meta: {
        public: true,
        redirect: true,
      },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue'),
    },
    {
      path: '/a',
      name: 'Account',
      component: () => import(/* webpackChunkName: "account" */ './views/user/account/Index.vue'),
      children: [{
        path: 'general',
        name: 'GeneralSettings',
        component: () => import(/* webpackChunkName: "general" */ './views/user/account/General.vue'),
      }, {
        path: 'notifications',
        name: 'Notifications',
        component: () => import(/* webpackChunkName: "notifications" */ './views/user/account/Notifications.vue'),
      }, {
        path: 'bookmarks',
        name: 'Bookmarks',
        component: () => import(/* webpackChunkName: "bookmarks" */ './views/user/account/Bookmarks.vue'),
      }, {
        path: 'search-history',
        name: 'SearchHistory',
        component: () => import(/* webpackChunkName: "searchHistory" */ './views/user/account/SearchHistory.vue'),
      }, {
        path: 'activity-log',
        name: 'ActivityLog',
        component: () => import(/* webpackChunkName: "activityLog" */ './views/user/account/ActivityLog.vue'),
      }],
    },
    {
      path: '/s',
      name: 'Settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings/Index.vue'),
      children: [{
        path: 'users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users" */ './views/Settings/Users.vue'),
      }, {
        path: 'plants',
        name: 'Plants',
        component: () => import(/* webpackChunkName: "plants" */ './views/Settings/Plants.vue'),
      }, {
        path: 'currencies',
        name: 'Currencies',
        component: () => import(/* webpackChunkName: "currencies" */ './views/Settings/Currencies.vue'),
      }, {
        path: 'units',
        name: 'Units',
        component: () => import(/* webpackChunkName: "units" */ './views/Settings/Units.vue'),
      }, {
        path: 'attributes',
        name: 'Attributes',
        component: () => import(/* webpackChunkName: "attributes" */ './views/Settings/Attributes.vue'),
      }],
    },
    {
      path: '/m/parties/customers',
      name: 'Customers',
      component: () => import(/* webpackChunkName: "customers" */ './views/master/party/PartyList.vue'),
    },
    {
      path: '/m/parties/suppliers',
      name: 'Suppliers',
      component: () => import(/* webpackChunkName: "suppliers" */ './views/master/party/PartyList.vue'),
    },
    {
      path: '/m/parties/vendors',
      name: 'Vendors',
      component: () => import(/* webpackChunkName: "vendors" */ './views/master/party/PartyList.vue'),
    },
    {
      path: '/m/materials/consumables',
      name: 'Consumables',
      component: () => import(/* webpackChunkName: "consumables" */ './views/master/material/MaterialList.vue'),
    },
    {
      path: '/m/materials/finished-materials',
      name: 'FinishedMaterials',
      component: () => import(/* webpackChunkName: "finishedMaterials" */ './views/master/material/MaterialList.vue'),
    },
    {
      path: '/m/materials/raw-materials',
      name: 'RawMaterials',
      component: () => import(/* webpackChunkName: "rawMaterials" */ './views/master/material/MaterialList.vue'),
    },
    {
      path: '/m/materials/semi-finished-materials',
      name: 'SemiFinishedMaterials',
      component: () => import(/* webpackChunkName: "semiFinishedMaterials" */ './views/master/material/MaterialList.vue'),
    },
    {
      path: '/m/machines',
      name: 'Machines',
      component: () => import(/* webpackChunkName: "machines" */ './views/master/machine/MachineList.vue'),
    },
    {
      path: '/m/operators',
      name: 'Operators',
      component: () => import(/* webpackChunkName: "operators" */ './views/master/operator/OperatorList.vue'),
    },
    {
      path: '/m/processes',
      name: 'Processes',
      component: () => import(/* webpackChunkName: "processes" */ './views/master/process/ProcessList.vue'),
    },
    {
      path: '/create-job-card',
      name: 'CreateJobCard',
      component: () => import(/* webpackChunkName: "createJobCard" */ './views/job-card/CreateJobCard.vue'),
    },
    {
      path: '/job-cards',
      name: 'JobCards',
      component: () => import(/* webpackChunkName: "jobCards" */ './views/job-card/JobCardList.vue'),
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
