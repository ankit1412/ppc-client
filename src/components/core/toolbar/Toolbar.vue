<template>
  <div>
    <v-toolbar
      app
      dark
      flat
      color="primary"
      clipped-left
    >
      <v-toolbar-side-icon
        @click.stop="$store.commit('toggleDrawer')"
      >
      </v-toolbar-side-icon>

      <!-- App brand and title -->
      <span
        class=" title hidden-sm-and-down"
      >
        <v-tooltip open-delay="800" bottom>
          <span>Home (Dashboard)</span>
          <a slot="activator" @click="$router.push({ name: 'Dashboard' })">
            <img
              src="@/assets/logo.png"
              alt="Pushup Tools logo"
              width="60%"
            >
          </a>
        </v-tooltip>
      </span>
      <!-- Search bar; md and up -->
      <search-bar></search-bar>

      <v-spacer></v-spacer>

      <!-- Search button; sm and down -->
      <search></search>

      <!-- Fullscreen; md and up -->
      <fullscreen></fullscreen>

      <!-- Create new data menu -->
      <create-new-data></create-new-data>

      <!-- Master data menu -->
      <master-data></master-data>

      <!-- Notifications list -->
      <notifications></notifications>

      <!-- Profile menu -->
      <profile></profile>
    </v-toolbar>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import Search from './Search.vue';
import Fullscreen from './Fullscreen.vue';
import MasterData from './MasterData.vue';
import CreateNewData from './CreateNewData.vue';
import Notifications from './Notifications.vue';
import Profile from './Profile.vue';

export default {
  name: 'AppToolbar',
  components: {
    SearchBar,
    Search,
    Fullscreen,
    MasterData,
    CreateNewData,
    Notifications,
    Profile,
  },
};
</script>
