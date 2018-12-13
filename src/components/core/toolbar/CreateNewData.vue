<template>
  <div>
    <v-toolbar-items>
      <v-menu
        v-model="menu"
        offset-y
        class="elelvation-1"
        attach
        :nudge-bottom="16"
        left
        origin="right top"
        transition="scale-transition"
      >
        <v-btn
          slot="activator"
          @click.stop="toggleMenu"
          @keyup.enter.prevent="toggleMenu"
          flat
          icon
        >
          <v-tooltip open-delay="800" bottom>
            <span>
              Create New Data
            </span>
            <v-icon medium slot="activator">
              {{ menuItems.icon }}
            </v-icon>
          </v-tooltip>
        </v-btn>
        <v-card width="220px" v-if="$vuetify.breakpoint.mdAndUp">
          <v-card-text class="pa-0">
            <v-layout row wrap>
              <v-flex>
                <v-list class="pa-0">
                  <template v-for="(item, index) in menuItems.children">
                    <v-subheader v-if="item.header" :key="item.header">
                      {{ item.header }}
                    </v-subheader>
                    <v-list-tile
                      v-if="!item.header"
                      ripple
                      :key="index"
                      :to="{ name: `${item.name}` }"
                      exact
                    >
                      <v-list-tile-action>
                        <v-icon light>
                          {{ item.icon }}
                        </v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content class="body-2">
                        {{ item.title }}
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-toolbar-items>

  </div>
</template>

<script>
import { createNewDataItems } from '@/data/toolbar-menu-items';

export default {
  data() {
    return {
      menuItems: createNewDataItems,
      menu: false,
    };
  },
  methods: {
    toggleMenu() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.menu = !this.menu;
      } else {
        this.$store.commit('toggleCreateNewDataDrawer');
      }
    },
  },
};
</script>
