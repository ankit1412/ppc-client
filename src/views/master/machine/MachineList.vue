<template>
  <div>

    <AddMachine :dialog="dialog" @onClose="dialog = false"></AddMachine>

    <CardContainer title="Machines">
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
          :items="machines"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.code }}</td>
            <td>{{ props.item.description }}</td>
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
import AddMachine from './AddMachine.vue';

export default {
  title() {
    return 'Master - Machines';
  },
  components: {
    AddMachine,
  },
  data() {
    return {
      dialog: false,
      search: null,
      loading: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Code', align: 'left', value: 'code' },
        { text: 'Description', align: 'left', value: 'description' },
      ],
      machines: [],
    };
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
};
</script>
