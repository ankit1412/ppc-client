<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="inputValue"
    app
    light
    right
    temporary
  >
    <v-list>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header" class="grey--text">
          {{ item.header }}
        </v-subheader>
        <v-divider light v-else-if="item.divider" :key="index">
        </v-divider>
        <v-list-tile
          v-else
          :key="item.name"
          :to="{ name: item.name }"
          exact
          ripple
        >
          <v-list-tile-action class="body-2">
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
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { createNewDataItems } from '@/data/toolbar-menu-items';

export default {
  data() {
    return {
      items: createNewDataItems.children,
    };
  },
  computed: {
    ...mapGetters(['createNewDataDrawer']),
    inputValue: {
      get() {
        return this.createNewDataDrawer;
      },
      set(val) {
        this.setCreateNewDataDrawer(val);
      },
    },
  },
  methods: {
    ...mapMutations(['setCreateNewDataDrawer']),
  },
};
</script>
