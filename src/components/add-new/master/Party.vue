<template>
  <CardContainer :title="`Add ${partyType}`">
    <div slot="text">
      <v-text-field
        v-model="party.companyName"
        name="companyName"
        label="Company name*"
        type="text"
        id="companyName"
        data-vv-as="company name"
        v-validate="`required`"
        :error="errors.has('companyName')"
        :error-messages="errors.first('companyName')"
      ></v-text-field>

      <v-layout row wrap>
        <v-flex xs6 pr-2>
          <v-text-field
            v-model="party.contactName"
            name="contactName"
            label="Contact name*"
            type="text"
            id="contactName"
            data-vv-as="contact name"
            v-validate="`required`"
            :error="errors.has('contactName')"
            :error-messages="errors.first('contactName')"
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            v-model="party.email"
            name="email"
            label="Email"
            type="email"
            id="email"
            data-vv-as="email"
            v-validate="`email`"
            :error="errors.has('email')"
            :error-messages="errors.first('email')"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 pr-2>
          <v-text-field
            v-model="party.phone"
            name="phone"
            label="Phone"
            type="tel"
            id="phone"
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            v-model="party.gstNo"
            name="gstNo"
            label="GST"
            type="text"
            id="gstNo"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-textarea
        v-model="party.address.addressLine"
        name="address"
        label="Address"
        type="text"
        id="address"
        rows="2"
        no-resize
        single-line
      ></v-textarea>

      <v-layout row wrap>
        <v-flex xs6 pr-2>
          <v-text-field
            v-model="party.address.city"
            name="city"
            label="City"
            type="text"
            id="city"
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            v-model="party.address.state"
            name="state"
            label="State"
            type="text"
            id="state"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 pr-2>
          <v-text-field
            v-model="party.address.postalCode"
            name="postalCode"
            label="Postal code"
            type="number"
            id="postalCode"
          ></v-text-field>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            v-model="party.address.country"
            name="country"
            label="Country*"
            type="text"
            id="country"
            data-vv-as="country"
            v-validate="`required`"
            :error="errors.has('country')"
            :error-messages="errors.first('country')"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 pr-2>
          <currency
            v-model="currency"
            name="currency"
            data-vv-as="currency"
            v-validate="`required`"
            :error="errors.first('currency')"
          ></currency>
        </v-flex>

        <v-flex xs6>
          <v-text-field
            v-model="party.fileNo"
            name="fileNo"
            label="File no"
            type="text"
            id="fileNo"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6>
          <v-checkbox
            v-model="party.isActive"
            label="Is active"
            id="isActive"
          ></v-checkbox>
        </v-flex>

        <v-flex xs6 v-if="partyType === 'supplier'">
          <v-radio-group v-model="party.supplies">
            <v-radio
              v-for="(item, index) in supplies"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </div>
    <div slot="actions-primary">
      <v-btn flat @click="closeDialog">Cancel</v-btn>
      <v-btn color="primary" flat>Add party</v-btn>
    </div>
  </CardContainer>
</template>

<script>
import Currency from '@/components/input/Currency.vue';

export default {
  name: 'AddParty',
  props: {
    partyType: String,
  },
  components: {
    Currency,
  },
  created() {
    this.party = this.initializeParty();
  },
  data() {
    return {
      party: null,
      currency: null,
      supplies: [
        {
          label: 'Consumable',
          value: 'consumable',
        },
        {
          label: 'Raw Material',
          value: 'raw material',
        },
      ],
    };
  },
  methods: {
    initializeParty() {
      return {
        partyType: this.partyType,
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: {
          addressLine: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        gstNo: '',
        fileNo: '',
        currency: '',
        isActive: true,
        supplies: 'consumable',
      };
    },
    async clear() {
      this.party = this.initializeParty();
      this.currency = null;
    },
    closeDialog() {
      this.clear().then(() => this.$validator.reset());
      this.$emit('onCancel');
    },
  },
};
</script>

<style>
#companyName {
  text-transform: uppercase;
}
</style>
