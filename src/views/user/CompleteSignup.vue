<template>
  <v-app id="completeSignup" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="border pa-3">
              <v-form @submit.prevent="completeSignup()">
                <v-card-text>
                  <v-layout column align-center>
                    <img src="@/assets/logo.png" alt="Logo" class="responsive-image" />
                    <v-flex class="my-4 secondary--text">
                      <h1 class="headline" v-if="!error && status !== 'ACTIVE'">
                        Hello, {{name}}.
                      </h1>
                      <h1 class="headline" v-if="status === 'ACTIVE'">
                        Hello, {{name}}. Your Registration is complete.
                      </h1>
                    </v-flex>
                  </v-layout>
                  <v-alert type="error" :value="!!error" class="text-xs-left">
                    {{error}}
                  </v-alert>
                  <br v-if="!!error">
                  <v-text-field
                    v-if="status !== 'ACTIVE'"
                    v-model="user.username"
                    name="username"
                    label="Username*"
                    type="text"
                    id="username"
                    prepend-inner-icon="mdi-account-check"
                    v-validate="'required'"
                    :error="errors.has('username')"
                    :error-messages="errors.first('username')"
                  >
                  </v-text-field>
                  <v-text-field
                    v-if="status !== 'ACTIVE'"
                    ref="password"
                    v-model="user.password"
                    name="password"
                    label="Password*"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    prepend-inner-icon="mdi-lock-question"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="toggleDisplayPassword"
                    v-validate="'required'"
                    :error="errors.has('password')"
                    :error-messages="errors.first('password')"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  Existing user?
                  <v-btn :disabled="loading" color="primary" flat @click="goSignin">
                    Sign In
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="status !== 'ACTIVE'"
                    :loading="loading"
                    type="submit"
                    color="primary"
                  >
                    Complete Sign Up
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
import VERIFY_USER from '@/api/user/VerifyUser.gql';
import COMPLETE_SIGNUP from '@/api/user/CompleteSignup.gql';

export default {
  title() {
    return 'Complete sign up';
  },
  data() {
    return {
      user: {
        email: this.$route.query.email,
        username: '',
        password: '',
      },
      name: null,
      status: null,
      showPassword: false,
      error: null,
      loading: false,
    };
  },
  created() {
    this.verifyUser();
  },
  methods: {
    goSignin() {
      this.$router.push({ name: 'Signin' });
    },
    toggleDisplayPassword() {
      this.showPassword = !this.showPassword;
    },
    verifyUser() {
      this.error = null;
      const { email } = this.user;

      this.$apollo.mutate({
        mutation: VERIFY_USER,
        variables: { username: email },
      })
        .then(async ({ data: { verifyUser } }) => {
          const { user, errors } = verifyUser;
          if (errors) {
            errors.forEach((e) => {
              this.error = e.message;
            });
          } else {
            this.name = user.firstName;
            this.status = user.status;
          }
        })
        .catch(() => {});
    },
    completeSignup() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = null;
          this.loading = true;
          const { user } = this;
          this.user = {};
          this.$validator.reset();

          this.$apollo.mutate({
            mutation: COMPLETE_SIGNUP,
            variables: {
              email: user.email,
              username: user.username,
              password: user.password,
            },
          })
            .then(({ data: { completeSignup } }) => {
              this.loading = false;
              const { errors } = completeSignup;
              if (errors) {
                this.user = user;
                errors.forEach((e) => {
                  this.error = e.message;
                });
              } else {
                this.$store.commit('setAlert', {
                  show: true,
                  type: 'success',
                  message: 'Registration complete. Please sign in.',
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

#completeSignup {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  }
</style>
