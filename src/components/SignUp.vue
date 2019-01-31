<template>
  <div id="signup">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="signupCard">
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required',
                       () => !!name && name.length <= 30 || 'Name must be less than 30 characters'
                       ]"
              label="Name"
              placeholder="Shopping"
              required
            ></v-text-field>
            <v-text-field
              ref="email"
              :rules="[
                () => !!email || 'This field is required',
                emailCheck
              ]"
              v-model="email"
              label="Email Address"
              placeholder="shopping@gmail.com"
              required
            ></v-text-field>
            <v-text-field
              ref="password"
              :rules="[
                () => !!password || 'This field is required',
                () => !!password && password.length <= 16 && password.length >= 8 || 'Password must be betweeen 8 to 16 characters',
                passwordCheck
              ]"
              v-model="password"
              label="Password"
              placeholder="At least a number, lowercase letter, capital letter and special character"
              required
            ></v-text-field>
            <v-autocomplete
              ref="role"
              :rules="[() => !!role || 'This field is required']"
              :items="roles"
              v-model="role"
              label="Role"
              placeholder="Select..."
              required
            ></v-autocomplete>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn flat>Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                left
              >
                <v-btn
                  slot="activator"
                  icon
                  class="my-0"
                  @click="resetForm"
                >
                  <v-icon>refresh</v-icon>
                </v-btn>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn color="primary" flat @click="submit">Submit</v-btn>

          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data: () => ({
    roles: ['Customer', 'Seller', 'Administrator'],
    errorMessages: '',
    name: null,
    email: null,
    password: null,
    role: null,
    formHasErrors: false
  }),

  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      }
    }
  },

  watch: {
    name () {
      this.errorMessages = ''
    }
  },

  methods: {
    emailCheck () {
      let checker = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      this.errorMessages = checker.test(this.email) ? '' : 'Must be valid e-mail'

      return this.errorMessages
    },
    passwordCheck () {
      let checker = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/
      this.errorMessages = checker.test(this.password) ? '' : 'At least a number, lowercase letter, capital letter and special character'

      return this.errorMessages
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      if (this.formHasErrors === false){

      }
    }
  }
}
</script>

<style scoped>
#signupCard {
  min-width: 500px;
  margin-top: 100px;
}
</style>
