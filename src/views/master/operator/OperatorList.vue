<template>
  <div>

    <AddOperator :dialog="dialog" @onClose="dialog = false"></AddOperator>

    <CardContainer title="Operators">
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
          :items="operators"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.code }}</td>
            <td>{{ props.item.phone }}</td>
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
import AddOperator from './AddOperator.vue';

export default {
  title() {
    return 'Master - Operators';
  },
  components: {
    AddOperator,
  },
  data() {
    return {
      dialog: false,
      search: null,
      loading: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Code', align: 'left', value: 'code' },
        { text: 'Phone', align: 'left', value: 'phone' },
      ],
      operators: [],
    };
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
};
</script>
