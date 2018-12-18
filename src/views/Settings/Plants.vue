<template>
  <div>

    <v-dialog
      v-model="dialog"
      scrollable
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <AddPlant @onCancel="dialog = false"></AddPlant>
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
          :items="plants"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.city }}</td>
            <td>{{ props.item.code }}</td>
            <td>
              <v-icon>mdi-pencil</v-icon>
              &nbsp;
              <v-icon color="error">mdi-lock</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </CardContainer>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="primary"
      @click="addNew"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import PLANTS from '@/api/plant/Plants.gql';
import AddPlant from '@/components/add-new/settings/Plant.vue';

export default {
  title() {
    return 'Settings - Plant';
  },
  components: {
    AddPlant,
  },
  data() {
    return {
      plants: [],
      search: null,
      loading: false,
      dialog: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'City', align: 'left', value: 'city' },
        { text: 'Code', align: 'left', value: 'code' },
        { text: 'Actions', sortable: false, value: '' },
      ],
    };
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
  apollo: {
    plants: {
      query: PLANTS,
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
