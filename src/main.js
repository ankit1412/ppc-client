import '@babel/polyfill';
import '@mdi/font/css/materialdesignicons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

import App from './App.vue';
import router from './router';
import store from './store';

import { createProvider } from './plugins/vue-apollo';
import titleMixin from './mixins/title';
import Spinner from './components/core/Spinner.vue';
import CardContainer from './components/layout/CardContainer.vue';
import './registerServiceWorker';
import './plugins/vuetify';
import './plugins/vue-progressbar';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.mixin(titleMixin);
Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar);
Vue.component('CardContainer', CardContainer);
Vue.component('Spinner', Spinner);

export default new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
