<template>
  <div>

    <v-dialog
      v-model="inviteUsersDialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <InviteUsers @onCancel="inviteUsersDialog = false"></InviteUsers>
    </v-dialog>

    <v-dialog
      v-model="addUsersDialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <AddUsers @onCancel="addUsersDialog = false"></AddUsers>
    </v-dialog>

    <CardContainer flat transparent>
      <div slot="text">
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 md4 lg3>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="users"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.role }}</td>
            <td>
              <v-icon>mdi-pencil</v-icon>
              &nbsp;
              <v-icon color="error">mdi-lock</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </CardContainer>

    <v-speed-dial
      fixed
      dark
      fab
      bottom
      right
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
        fab
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn
        color="secondary"
        fab
        dark
        small
        @click="inviteUsersDialog = true"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn
        color="secondary"
        fab
        dark
        small
        @click="addUsersDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import USERS from '@/api/user/Users.gql';
import InviteUsers from '@/components/add-new/settings/user/InviteUsers.vue';
import AddUsers from '@/components/add-new/settings/user/AddUsers.vue';

export default {
  title() {
    return 'Settings - Users';
  },
  components: {
    InviteUsers,
    AddUsers,
  },
  data() {
    return {
      users: [],
      search: null,
      loading: false,
      addUsersDialog: false,
      inviteUsersDialog: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Email', align: 'left', value: 'email' },
        { text: 'Role', align: 'left', value: 'role' },
        { text: 'Actions', sortable: false, value: '' },
      ],
    };
  },
  apollo: {
    users: {
      query: USERS,
      variables() {
        return {
          filter: {
            status: '',
            firstName: '',
            lastName: '',
          },
        };
      },
      result({ data }) {
        if (data.users.length) {
          this.users = data.users.map((user) => {
            user.name = `${user.firstName} ${user.lastName}`;
            return user;
          });
        }
      },
      watchLoading(isLoading) {
        if (isLoading) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      },
    },
  },
};
</script>
