<template>
  <v-toolbar-items>
    <v-menu
      v-model="menu"
      offset-y
      class="elelvation-1"
      attach
      :nudge-bottom="24"
      left
      origin="right top"
      transition="scale-transition"
    >
      <v-btn slot="activator" @click.stop="toggleMenu" @keyup.enter.prevent="toggleMenu" flat icon>
        <!-- TODO: Add notification count badge -->
        <v-badge overlap color="secondary">
          <span slot="badge">
            1
          </span>
          <v-tooltip open-delay="800" bottom>
            <span>
              Notifications
            </span>
            <v-icon medium slot="activator">
              mdi-bell
            </v-icon>
          </v-tooltip>
        </v-badge>
      </v-btn>
      <!-- TODO: Add notification list -->
      <v-card width="350" v-if="$vuetify.breakpoint.mdAndUp">
        <v-card-text class="pa-0">
          <v-layout row wrap>
            <v-flex>
              <v-list class="pa-0">
                <v-subheader>
                  Notifications
                  <v-spacer></v-spacer>
                  <v-tooltip open-delay="800" bottom>
                    <span>
                      Clear all
                    </span>
                    <!-- <v-btn flat icon slot="activator"> -->
                      <v-icon class="pt-2 mt-1" slot="activator">mdi-notification-clear-all</v-icon>
                    <!-- </v-btn> -->
                  </v-tooltip>
                </v-subheader>
                <v-hover>
                  <v-list-tile to="#" ripple slot-scope="{ hover }">
                    <v-list-tile-avatar>
                      <v-icon color="primary">
                        mdi-clipboard-account
                      </v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content class="body-1">
                      JC#RTK92121120180002 is assigned to you by Rajesh.
                    </v-list-tile-content>
                    <v-list-tile-action>
                    <v-list-tile-action-text>just now</v-list-tile-action-text>
                    <v-tooltip open-delay="800" bottom>
                      <span>
                        Clear
                      </span>
                      <!-- <v-btn flat icon slot="activator"> -->
                        <v-icon v-if="hover" slot="activator" small>mdi-close</v-icon>
                      <!-- </v-btn> -->
                    </v-tooltip>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-hover>
                <v-divider light></v-divider>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-1">
          <v-btn
            block flat
            class="pa-1"
            color="primary"
            @click="$router.push({ name: 'Notifications' })"
          >
            See all
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-toolbar-items>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
  },
};
</script>
