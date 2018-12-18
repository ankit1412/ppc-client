<template>
  <div>
    <CardContainer title="Account details">
      <div slot="text">
        <v-layout v-if="loading" column justify-center align-center>
          <Spinner color="primary"/>
        </v-layout>
        <v-layout v-else row wrap>
          <v-flex xs5 sm3 md2 lg1>
            <Avatar :user="user" size="84px">
            </Avatar>
          </v-flex>
          <v-flex xs7 sm9 md10 lg11>
            <div class="body-2">{{ name }}</div>
            <div class="body-2">{{ company }}</div>
            <div class="body-2">{{ plant }}</div>
            <div class="body-2">{{ role }}</div>
          </v-flex>
        </v-layout>
        <v-tabs color="transparent">
          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            :to="{ name: tab.href }"
          >
            {{tab.name}}
          </v-tab>
        </v-tabs>
        <router-view />
      </div>
    </CardContainer>
  </div>
</template>

<script>
import Avatar from '@/components/core/Avatar.vue';
import USER from '@/api/user/User.gql';

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      user: null,
      loading: false,
      tabs: [
        { name: 'General', href: 'GeneralSettings' },
        { name: 'Notifications', href: 'Notifications' },
        { name: 'Bookmarks', href: 'Bookmarks' },
        { name: 'Search history', href: 'SearchHistory' },
        { name: 'Activity log', href: 'ActivityLog' },
      ],
    };
  },
  apollo: {
    user: {
      query: USER,
      watchLoading(isLoading) {
        if (isLoading) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      },
    },
  },
  computed: {
    name() {
      if (this.user) {
        return `${this.user.firstName} ${this.user.lastName}`;
      }
      return '';
    },
    company() {
      if (this.user) {
        return this.user.meta.company.name;
      }
      return '';
    },
    plant() {
      if (this.user) {
        return `${this.user.meta.plant.name} | ${this.user.meta.plant.code}`;
      }
      return '';
    },
    role() {
      if (this.user) {
        return this.user.role;
      }
      return '';
    },
  },
};
</script>
