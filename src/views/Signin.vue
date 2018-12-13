<template>
  <v-app id="signin" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="border pa-3">
              <v-form @submit.prevent="!user ? verifyUser() : signin()">
                <v-card-text>
                  <v-layout column align-center>
                    <img src="@/assets/logo.png" alt="Logo" class="responsive-image" />
                    <v-flex class="my-4 secondary--text">
                      <h1 class="headline" v-if="!user">
                        Welcome, Please sign in.
                      </h1>
                      <h1 class="headline" v-else>
                        Hello! {{user.firstName}}.
                      </h1>
                    </v-flex>
                  </v-layout>
                  <v-alert type="error" :value="!!error" class="text-xs-left">
                    {{error}}
                  </v-alert>
                  <br v-if="!!error">
                  <v-text-field
                    :readonly="!!user"
                    v-model="username"
                    name="username"
                    label="Username or email"
                    type="text"
                    hint="Username is case sensitive"
                    autocomplete="off"
                    id="username"
                    :prepend-inner-icon="user ? 'mdi-account-check' : 'mdi-account'"
                    v-validate="'required'"
                    :error="errors.has('username')"
                    :error-messages="errors.first('username')"
                  >
                  </v-text-field>
                  <v-text-field
                    autofocus
                    v-if="user"
                    v-model="password"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    v-validate="'required'"
                    :error="errors.has('password')"
                    :error-messages="errors.first('password')"
                  >
                  </v-text-field>
                  <v-select
                    v-if="showPlant"
                    :items="plants"
                    v-model="plantId"
                    label="Plant code"
                    name="plant"
                    id="plant"
                    item-text="code"
                    item-value="id"
                    :loading="loadingPlants"
                    prepend-inner-icon="mdi-factory"
                    v-validate="'required'"
                    :error="errors.has('plant')"
                    :error-messages="errors.first('plant')"
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <span v-if="!user">
                    New user?
                    <v-btn :disabled="loading" color="primary" flat @click="goSignup">
                      Sign Up
                    </v-btn>
                  </span>
                  <span v-else>
                    Not {{user.firstName}} {{user.lastName}}?
                    <v-btn :disabled="loading" color="primary" flat @click="onBack">
                      Back
                    </v-btn>
                  </span>
                  <v-spacer></v-spacer>
                  <v-btn v-if="!user" :loading="loading" type="submit" color="primary">
                    Next
                  </v-btn>
                  <v-btn v-else :loading="loading" type="submit" color="primary">
                    Sign In
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SIGNIN from '@/api/user/Signin.gql';
import VERIFY_USER from '@/api/user/VerifyUser.gql';
import PLANTS from '@/api/plant/Plants.gql';
import { AUTH_TOKEN, PLANT_ID, onSignin } from '@/plugins/vue-apollo';

export default {
  title() {
    return 'PPC Sign in';
  },
  data() {
    return {
      user: null,
      plants: [],
      username: '',
      password: '',
      plantId: null,
      error: null,
      loading: false,
      loadingPlants: false,
    };
  },
  computed: {
    showPlant() {
      return this.user && this.user.role === 'OWNER'
        && this.user.meta.plant.code && this.plants.length > 1;
    },
  },
  methods: {
    async onBack() {
      this.user = null;
      this.username = '';
      this.password = '';
      this.plantId = null;
      this.error = null;
      await this.$validator.reset();
    },
    goSignup() {
      this.$router.push({ name: 'Signup' });
    },
    verifyUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = null;
          this.loading = true;
          const { username } = this;
          this.username = '';
          this.$validator.reset();

          this.$apollo.mutate({
            mutation: VERIFY_USER,
            variables: { username },
          })
            .then(async ({ data: { verifyUser } }) => {
              this.loading = false;
              this.username = username;
              const { user, errors } = verifyUser;
              if (errors) {
                errors.forEach((e) => {
                  this.error = e.message;
                });
              } else {
                this.user = user;
                this.plantId = user.meta.plant.id;
              }
            })
            .catch(() => {
              this.username = username;
              this.loading = false;
            });
        }
      });
    },
    signin() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = null;
          this.loading = true;
          const { username, password, plantId } = this;

          this.username = '';
          this.password = '';
          this.plantId = null;
          this.$validator.reset();

          localStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(PLANT_ID);

          this.$apollo.mutate({
            mutation: SIGNIN,
            variables: {
              username,
              password,
            },
          })
            .then(async ({ data: { signin } }) => {
              this.loading = false;
              const { token, errors } = signin;
              if (errors) {
                this.username = username;
                this.plantId = plantId;
                errors.forEach((e) => {
                  this.error = e.message;
                });
              } else {
                await onSignin(this.$apolloProvider.defaultClient, token);
                if (plantId) localStorage.setItem(PLANT_ID, plantId);
                this.$router.push({ name: 'Dashboard' });
              }
            })
            .catch(() => {
              this.loading = false;
              this.username = username;
              this.password = password;
              this.plantId = plantId;
            });
        }
      });
    },
  },
  apollo: {
    plants: {
      query: PLANTS,
      variables() {
        return {
          userId: this.user.id,
        };
      },
      skip() {
        return !this.user;
      },
      watchLoading(isLoading) {
        if (isLoading) {
          this.loadingPlants = true;
        }
        this.loadingPlants = false;
      },
    },
  },
};
</script>

<style scoped>
.border {
  border-radius: 8px;
  box-shadow: 0 10px 40px -14px rgba(0,0,0,0.25);
}

.responsive-image {
  width: 100%;
}

#signin {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  }
</style>
