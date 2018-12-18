<template>
  <CardContainer title="Add process">
    <div slot="text">
      <v-layout v-if="loading" column justify-center align-center>
        <Spinner color="primary"/>
      </v-layout>
      <div v-else>
        <v-text-field
          v-model="process.name"
          name="name"
          label="Name*"
          type="text"
          id="name"
          data-vv-as="process name"
          v-validate="`required`"
          :errors="errors.has('name')"
          :error-messages="errors.first('name')"
        ></v-text-field>

        <v-text-field
          v-model="process.code"
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
          v-model="process.description"
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

        <v-switch
          :label="`Is process vendor specific? ${process.isVendorSpecific ? 'Yes' : 'No'}`"
          v-model="process.isVendorSpecific"
        ></v-switch>

        <v-autocomplete
          v-model="process.vendors"
          :items="machinesAndVendors.vendors"
          label="Vendors"
          item-text="code"
          item-value="id"
          multiple
        ></v-autocomplete>

        <v-autocomplete
          v-if="!process.isVendorSpecific"
          v-model="process.machines"
          :items="machinesAndVendors.machines"
          label="Machines"
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
        Add process
      </v-btn>
    </div>
  </CardContainer>
</template>

<script>
export default {
  name: 'AddProcess',
  created() {
    this.process = this.initializeProcess();
  },
  data() {
    return {
      process: null,
      loading: false,
      addLoading: false,
      machinesAndVendors: {
        vendors: [],
        machines: [],
      },
    };
  },
  methods: {
    initializeProcess() {
      return {
        name: '',
        code: '',
        description: '',
        vendors: [],
        machines: [],
        isVendorSpecific: false,
      };
    },
    async clear() {
      this.process = this.initializeProcess();
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
