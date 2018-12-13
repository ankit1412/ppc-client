import Vue from 'vue';
import Vuex from 'vuex';
import { PLANT_ID, onSignout } from './plugins/vue-apollo';
import app from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plantId: localStorage.getItem(PLANT_ID),
    appDrawer: null,
    masterDataDrawer: null,
    createNewDataDrawer: null,
    alert: {
      show: false,
      type: '',
      message: '',
    },
  },
  mutations: {
    toggleDrawer: (state) => {
      state.appDrawer = !state.appDrawer;
    },
    setAppDrawer: (state, payload) => {
      state.appDrawer = payload;
    },
    toggleMasterDataDrawer: (state) => {
      state.masterDataDrawer = !state.masterDataDrawer;
    },
    setMasterDataDrawer: (state, payload) => {
      state.masterDataDrawer = payload;
    },
    toggleCreateNewDataDrawer: (state) => {
      state.createNewDataDrawer = !state.createNewDataDrawer;
    },
    setCreateNewDataDrawer: (state, payload) => {
      state.createNewDataDrawer = payload;
    },
    setAlert: (state, { ...payload }) => {
      state.alert = { ...payload };
    },
  },
  actions: {
    signoutUser: async () => {
      await onSignout(app.$apolloProvider.defaultClient);
      localStorage.removeItem(PLANT_ID);
      app.$router.push({ name: 'Signin' });
    },
  },
  getters: {
    appDrawer: state => state.appDrawer,
    masterDataDrawer: state => state.masterDataDrawer,
    createNewDataDrawer: state => state.createNewDataDrawer,
    alert: state => state.alert,
  },
});
