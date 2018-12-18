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
      <AddAttribute @onCancel="dialog = false"></AddAttribute>
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
          :items="materialAttributes"
          hide-actions
          :loading="loading"
          :search="search"
          :no-results-text="`Your search for ${search} found no results`"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.value }}</td>
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
import ATTRIBUTES from '@/api/settings/attribute/Attributes.gql';
import AddAttribute from '@/components/add-new/settings/Attribute.vue';

export default {
  title() {
    return 'Settings - Attribute';
  },
  components: {
    AddAttribute,
  },
  data() {
    return {
      materialAttributes: [],
      search: null,
      loading: false,
      dialog: false,
      headers: [
        { text: 'Attribute', align: 'left', value: 'value' },
      ],
    };
  },
  methods: {
    addNew() {
      this.dialog = true;
    },
  },
  apollo: {
    materialAttributes: {
      query: ATTRIBUTES,
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
