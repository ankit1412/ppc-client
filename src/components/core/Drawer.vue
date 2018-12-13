<template>
  <v-navigation-drawer
    id="appDrawer"
    class="grey lighten-5"
    v-model="inputValue"
    clipped
    app
    floating
    width="280"
  >
    <v-toolbar flat dark color="primary" v-if="$vuetify.breakpoint.smAndDown">
      <v-toolbar-side-icon @click.stop="$store.commit('toggleDrawer')">
      </v-toolbar-side-icon>
      <span>
        <v-tooltip open-delay="800" bottom>
          <span>Home (Dashboard)</span>
          <a slot="activator" @click="$router.push({ name: 'Dashboard' })">
            <img src="@/assets/logo.png" alt="Pushup Tools logo" width="100%">
          </a>
        </v-tooltip>
      </span>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list>
        <template v-for="item in items">
          <!-- group with child items -->
          <v-list-group
            v-if="item.children"
            :key="item.name"
            :group="item.group"
            :prepend-icon="item.icon"
          >
            <v-list-tile ripple slot="activator">
              <v-list-tile-content>
                <v-list-tile-title class="body-2">
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!-- child item -->
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="{ name: child.name }"
              exact
              ripple
            >
              <v-list-tile-avatar>
              </v-list-tile-avatar>
              <v-list-tile-action>
                <v-icon>
                  {{ child.icon }}
                </v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-2">
                  {{ child.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <!-- sub header -->
          <v-subheader v-else-if="item.header" :key="item.header" class="grey--text">
            {{ item.header }}
          </v-subheader>
          <!-- divider -->
          <v-divider light v-else-if="item.divider" :key="item.name">
          </v-divider>
          <!-- top level link -->
          <v-list-tile
            v-else
            :key="item.name"
            :to="{ name: item.name }"
            exact
            ripple
          >
            <v-list-tile-action>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import appDrawerItems from '@/data/app-drawer-items';

export default {
  name: 'AppDrawer',
  data() {
    return {
      items: appDrawerItems,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
    };
  },
  computed: {
    ...mapGetters(['appDrawer']),
    inputValue: {
      get() {
        return this.appDrawer;
      },
      set(val) {
        this.setAppDrawer(val);
      },
    },
  },
  methods: {
    ...mapMutations(['setAppDrawer']),
  },
};
</script>

<style scoped>

#appDrawer {
  overflow: hidden;
}

.drawer-menu--scroll {
  height: calc(100vh - 48px);
  overflow: auto;
}

</style>
