<template>
  <v-toolbar-items>
    <v-menu
      v-model="menu"
      offset-y
      class="elelvation-1"
      :nudge-bottom="6"
      left
      origin="right top"
      transition="scale-transition"
    >
      <!-- Avatar menu button -->
      <v-btn
        slot="activator"
        @click.stop="toggleMenu"
        @keyup.enter.prevent="toggleMenu"
        flat
        fab
      >
        <v-tooltip open-delay="800" bottom>
          <span>
            <div class="font-weight-bold">
              {{ fullName }}
            </div>
            <div>
              {{ email }}
            </div>
          </span>
          <Avatar slot="activator" :user="user">
          </Avatar>
        </v-tooltip>
      </v-btn>
      <!-- Profile menu Card -->
      <v-card light width="290">
        <v-layout>
          <v-flex xs4>
            <Avatar class="ma-1 ml-2 mt-3" :user="user" size="74px">
            </Avatar>
          </v-flex>
          <v-flex xs9>
            <v-card-title primary-title>
              <v-flex xs12 class="text-xs-left font-weight-bold">
                {{ fullName }}
              </v-flex>
              <v-flex xs12 class="text-xs-left email-wrap">
                {{ email }}
              </v-flex>
              <v-flex xs12 class="text-xs-left">
                <a href="#">Account</a>
              </v-flex>
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-divider light>
        </v-divider>

        <v-card-actions class="pa-1">
          <v-btn flat @click="$router.push({ name: 'Settings' })" v-if="showSettings">
            Settings
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="signout">
            Sign out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-toolbar-items>
</template>

<script>
import Avatar from '@/components/core/Avatar.vue';
import USER from '@/api/user/User.gql';
import { AUTH_TOKEN } from '@/plugins/vue-apollo';

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      menu: false,
      user: null,
    };
  },
  apollo: {
    user: {
      query: USER,
      skip() {
        return localStorage.getItem(AUTH_TOKEN) === null;
      },
    },
  },
  computed: {
    showSettings() {
      if (this.user) {
        return this.user.role === 'OWNER'
          || this.user.role === 'ADMIN';
      }
      return null;
    },
    fullName() {
      if (this.user) {
        return `${this.user.firstName} ${this.user.lastName}`;
      }
      return '';
    },
    email() {
      if (this.user) {
        return this.user.email;
      }
      return '';
    },
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },
    async signout() {
      this.$store.dispatch('signoutUser');
      this.$store.commit('setAlert', {
        show: true,
        type: 'success',
        message: 'Signout successful.',
      });
    },
  },
};
</script>


<style>
.email-wrap {
  word-wrap: break-word;
}
</style>
