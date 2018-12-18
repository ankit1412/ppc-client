<template>
  <CardContainer title="Add machine">
    <div slot="text">
      <v-layout v-if="loading" column justify-center align-center>
        <Spinner color="primary"/>
      </v-layout>
      <div v-else>
        <v-text-field
          v-model="machine.name"
          name="name"
          label="Name*"
          type="text"
          id="name"
          data-vv-as="machine name"
          v-validate="`required`"
          :errors="errors.has('name')"
          :error-messages="errors.first('name')"
        ></v-text-field>

        <v-text-field
          v-model="machine.code"
          name="code"
          label="Code*"
          :counter="5"
          type="text"
          id="code"
          data-vv-as="code"
          v-validate="`required|min:5|max:5`"
          :errors="errors.has('code')"
          :error-messages="errors.first('code')"
        ></v-text-field>

        <v-text-field
          v-model="machine.description"
          name="description"
          label="Description*"
          :counter="50"
          type="text"
          id="description"
          data-vv-as="description"
          v-validate="`required|max:50`"
          :errors="errors.has('description')"
          :error-messages="errors.first('description')"
        ></v-text-field>

        <v-autocomplete
          v-model="machine.operators"
          :items="operators"
          label="Operators"
          item-text="code"
          item-value="id"
          multiple
        ></v-autocomplete>
      </div>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="closeDialog" :disabled="addLoading">Cancel</v-btn>
      <v-btn
        color="primary"
        flat
        :disabled="loading"
        :loading="addLoading"
      >
        Add machine
      </v-btn>
    </div>
  </CardContainer>
</template>

<script>
export default {
  name: 'AddMachine',
  created() {
    this.machine = this.initializeMachine();
  },
  data() {
    return {
      machine: null,
      loading: false,
      addLoading: false,
      operators: [],
    };
  },
  methods: {
    initializeMachine() {
      return {
        name: '',
        code: '',
        description: '',
        operators: [],
      };
    },
    async clear() {
      this.machine = this.initializeMachine();
    },
    closeDialog() {
      this.clear().then(() => this.$validator.reset());
      this.$emit('onCancel');
    },
  },
};
</script>

<style>
#name, #code {
  text-transform: uppercase;
}
</style>
