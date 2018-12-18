<template>
  <div v-cloak>
    <v-app id="app">
      <vue-progress-bar></vue-progress-bar>
      <template v-if="!$route.meta.public">
        <AppDrawer />
        <MasterDataDrawer />
        <CreateNewDataDrawer />
        <AppToolbar />
        <UpdatePlantCode />
        <v-content>
          <v-container fluid grid-list-lg>
            <!-- <vue-progress-bar></vue-progress-bar> -->
            <transition
              :name="transitionName"
              mode="out-in"
              @beforeLeave="beforeLeave"
              @enter="enter"
            >
              <router-view />
            </transition>
          </v-container>
        </v-content>
      </template>
      <template v-else>
        <transition>
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </template>
      <app-snackbar></app-snackbar>
    </v-app>
  </div>
</template>

<script>
import AppToolbar from '@/components/core/toolbar/Toolbar.vue';
import AppDrawer from '@/components/core/Drawer.vue';
import MasterDataDrawer from '@/components/core/toolbar/MasterDataDrawer.vue';
import CreateNewDataDrawer from '@/components/core/toolbar/CreateNewDataDrawer.vue';
import AppSnackbar from '@/components/core/Snackbar.vue';
import UpdatePlantCode from '@/components/core/UpdatePlantCode.vue';

export default {
  components: {
    AppToolbar,
    AppDrawer,
    MasterDataDrawer,
    CreateNewDataDrawer,
    AppSnackbar,
    UpdatePlantCode,
  },
  data() {
    return {
      prevHeight: 0,
      transitionName: 'slight-left',
    };
  },
  mountd() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      // eslint-disable-next-line no-param-reassign
      element.style.height = this.prevHeight;
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        element.style.height = height;
      });
    },
  },
};
</script>

<style>
[v-cloak] > * {
  display:none;
}

[v-cloak]::before {
  content: "loading...";
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
