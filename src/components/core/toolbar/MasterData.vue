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
              Master Data
            </span>
            <v-icon medium slot="activator">
              {{ menuItem.icon }}
            </v-icon>
          </v-tooltip>
        </v-btn>
        <v-card width="700px" v-if="$vuetify.breakpoint.mdAndUp">
          <v-card-text class="pa-0">
            <v-layout row wrap>
              <v-flex v-for="(cols, colIndex) in menuItems" :key="colIndex" xs4>
                <v-list class="pa-0">
                  <template v-for="item in cols">
                    <v-subheader v-if="item.header" :key="item.header">
                      {{ item.header }}
                    </v-subheader>
                    <v-list-tile
                      v-else
                      ripple
                      :key="item.name"
                      :to="{ name: `${item.name}` }"
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
                  <v-divider vertical></v-divider>
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
import { masterDataItems } from '@/data/toolbar-menu-items';

export default {
  data() {
    return {
      menuItem: masterDataItems,
      menu: false,
    };
  },
  computed: {
    menuItems() {
      const items = masterDataItems.children;
      let menuCount = 1;
      let breakCount = 0;
      const filteredItems = [];
      items.forEach((item) => {
        if (item.divider) {
          menuCount += 1;
        }
      });
      for (let i = 0; i < menuCount; i += 1) {
        const temp = [];
        for (let j = 0; j <= breakCount; j += 1) {
          if (items[breakCount].divider) {
            breakCount += 1;
            break;
          }
          temp[j] = items[breakCount];
          breakCount += 1;
          if (breakCount === items.length) {
            break;
          }
        }
        filteredItems[i] = temp;
      }
      return filteredItems;
    },
  },
  methods: {
    toggleMenu() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.menu = !this.menu;
      } else {
        this.$store.commit('toggleMasterDataDrawer');
      }
    },
  },
};
</script>
