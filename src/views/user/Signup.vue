<template>
  <v-app id="signup" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="border pa-3">
              <v-form @submit.prevent="signup()">
                <v-card-text>
                  <v-layout column align-center>
                    <img src="@/assets/logo.png" alt="Logo" class="responsive-image" />
                    <v-flex class="my-4 secondary--text">
                      <h1 class="headline">
                        Welcome, Please sign up.
                      </h1>
                    </v-flex>
                  </v-layout>
                  <v-alert type="error" :value="!!error" class="text-xs-left">
                    {{error}}
                  </v-alert>
                  <br v-if="!!error">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-text-field
                        v-model="user.firstName"
                        name="firstName"
                        label="First name*"
                        type="text"
                        id="firstName"
                        prepend-inner-icon="mdi-rename-box"
                        v-validate="'required'"
                        :error="errors.has('firstName')"
                        :error-messages="errors.first('firstName')"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-2">
                      <v-text-field
                        v-model="user.lastName"
                        name="lastName"
                        label="Last name*"
                        type="text"
                        id="lastName"
                        prepend-inner-icon="mdi-rename-box"
                        v-validate="'required'"
                        :error="errors.has('lastName')"
                        :error-messages="errors.first('lastName')"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-text-field
                    v-model="user.email"
                    name="email"
                    label="Email*"
                    id="email"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    v-validate="'required|email'"
                    :error="errors.has('email')"
                    :error-messages="errors.first('email')"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="user.companyName"
                    name="company"
                    label="Company*"
                    id="company"
                    type="text"
                    prepend-inner-icon="mdi-earth"
                    v-validate="'required'"
                    :error="errors.has('company')"
                    :error-messages="errors.first('company')"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="user.city"
                    name="city"
                    label="City*"
                    id="city"
                    type="text"
                    prepend-inner-icon="mdi-city"
                    v-validate="'required'"
                    :error="errors.has('city')"
                    :error-messages="errors.first('city')"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  Existing user?
                  <v-btn :disabled="loading" color="primary" flat @click="goSignin">
                    Sign In
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn :loading="loading" type="submit" color="primary">
                    Sign Up
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
import SIGNUP from '@/api/user/Signup.gql';

export default {
  title() {
    return 'Sign up';
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        city: '',
      },
      error: null,
      loading: false,
    };
  },
  methods: {
    goSignin() {
      this.$router.push({ name: 'Signin' });
    },
    signup() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = null;
          this.loading = true;
          const { user } = this;
          this.user = {};
          this.$validator.reset();

          this.$apollo.mutate({
            mutation: SIGNUP,
            variables: {
              user,
            },
          })
            .then(({ data: { signup } }) => {
              this.loading = false;
              const { errors } = signup;
              if (errors) {
                this.user = user;
                errors.forEach((e) => {
                  this.error = e.message;
                });
              } else {
                this.$store.commit('setAlert', {
                  show: true,
                  type: 'success',
                  message: 'Thank you for registering. Email sent for verification.',
                });
                this.$router.push({ name: 'Signin' });
              }
            })
            .catch(() => {
              this.loading = false;
              this.user = user;
            });
        }
      });
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
  height: auto;
}

#signup {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  }
</style>
