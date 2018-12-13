<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title class="py-2 secondary white--text">
        <h3 class="headline mb-0">Update plant code</h3>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="plant.city"
          name="city"
          label="City*"
          type="text"
          autocomplete="off"
          id="city"
          v-validate="'required'"
          :error="errors.has('city')"
          :error-messages="errors.first('city')"
        >
        </v-text-field>
        <v-text-field
          v-model="plant.name"
          name="name"
          label="Name*"
          type="text"
          autocomplete="off"
          id="name"
          v-validate="'required'"
          :error="errors.has('name')"
          :error-messages="errors.first('name')"
        >
        </v-text-field>
        <v-text-field
          v-model="plant.code"
          name="code"
          label="Code*"
          placeholder="(ex: RT201)"
          type="text"
          autocomplete="off"
          :counter="5"
          id="code"
          v-validate="'required|min:5|max:5'"
          :error="errors.has('code')"
          :error-messages="errors.first('code')"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" flat color="primary" @click="updatePlant">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import USER from '@/api/user/User.gql';
import PLANT from '@/api/plant/Plant.gql';
import UPDATE_PLANT from '@/api/plant/UpdatePlant.gql';
import { AUTH_TOKEN } from '@/plugins/vue-apollo';

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      user: null,
      plant: {
        id: null,
        city: '',
        name: '',
        code: '',
      },
    };
  },
  methods: {
    updatePlant() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true;
          const {
            id,
            name,
            city,
            code,
          } = this.plant;
          const plant = { name, city, code };
          this.plant.id = null;
          this.plant.city = '';
          this.plant.name = '';
          this.plant.code = '';
          await this.$validator.reset();

          this.$apollo.mutate({
            mutation: UPDATE_PLANT,
            variables: {
              id,
              params: { ...plant },
            },
          })
            .then((data) => {
              if (data.plant) {
                this.loading = false;
                this.dialog = false;
                this.$store.commit('setAlert', {
                  show: true,
                  type: 'success',
                  message: 'Plant code updated.',
                });
                this.plant = data.plant;
              }
            })
            .catch(() => {
              this.loading = false;
              this.plant.id = id;
              this.plant.city = plant.city;
              this.plant.name = plant.name;
              this.plant.code = plant.code;
            });
        }
      });
    },
  },
  apollo: {
    user: {
      query: USER,
      skip() {
        return localStorage.getItem(AUTH_TOKEN) === null;
      },
    },
    plant: {
      query: PLANT,
      variables() {
        return {
          id: this.user.meta.plant.id,
        };
      },
      skip() {
        return !this.user || this.plant.code;
      },
      async result({ data }) {
        if (data.plant) {
          this.plant = data.plant;
          await this.$validator.reset();
          this.dialog = this.user
            && this.user.role === 'OWNER'
            && !this.user.meta.plant.code;
        }
      },
    },
  },
};
</script>
