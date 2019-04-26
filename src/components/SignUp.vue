<template>
  <div id="signup">
    <!--<v-app>-->
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card ref="form" id="signupCard">
            <v-card-title class="display-1 pl-5 pt-5">Sign Up</v-card-title>
            <v-card-text>
              <v-text-field ref="name" v-model="name"
                :rules="[() => !!name || 'This field is required',
                         () => !!name && name.length <= 30 || 'Name must be less than 30 characters']"
                label="Name" placeholder="Shopping" required></v-text-field>
              <v-text-field ref="email" :rules="[() => !!email || 'This field is required', emailCheck]"
                v-model="email" label="Email Address" placeholder="shopping@gmail.com" required></v-text-field>
              <v-text-field ref="password"
                :rules="[() => !!password || 'This field is required',
                         () => !!password && password.length <= 16 && password.length >= 8 || 'Password must be betweeen 8 to 16 characters',
                  passwordCheck]"
                type="password" v-model="password" label="Password" placeholder="At least a number, lowercase letter, capital letter and special character"
                required></v-text-field>

              <v-radio-group v-model="role" :mandatory="false" row>
                <v-radio label="Customer" value="customer"></v-radio>
                <v-radio label="Seller" value="seller"></v-radio>
              </v-radio-group>

              <h3>Please check your email to finish registration after submit the form</h3>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
              <v-btn color="primary" flat @click="submit">Submit</v-btn>
            </v-card-actions>
            <v-card-text>
              <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please sign up your account correctly.</p>
              <p class="typo__p red--text" v-if="isRegister === 'NO'">{{message}}</p>
              <p class="typo__p green--text" v-if="isRegister === 'YES'">{{message}}</p>
              <p class="typo__p orange--text" v-if="submitStatus === 'PENDING' && isRegister === 'YES'"> Jumping to the Home page ...</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    <!--</v-app>-->
  </div>
</template>

<script>
import sellerService from '@/services/sellerServices'
import customerService from '@/services/customerServices'
import Vue from 'vue'
import validate from 'vee-validate'

Vue.use(validate)

export default {
  name: 'SignUp',
  data: () => ({
    roles: ['Customer', 'Seller'],
    errorMessages: '',
    name: null,
    email: null,
    password: null,
    role: 'customer',
    formHasErrors: false,
    submitStatus: null,
    isRegister: null,
    message: ''
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
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        // this.$refs[f].validate(true)
      })

      if (this.formHasErrors === false) {
        let user = {'username': this.email, 'password': this.password, 'name': this.name}
        if (this.role === 'customer') {
          customerService.postSignup(user).then(response => {
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isRegister = 'NO'
            } else {
              this.isRegister = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              this.$router.push('/')
            }
            console.log(response.data)
          })
        } else if (this.role === 'seller') {
          sellerService.postSignup(user).then(response => {
            console.log(response.data)
            if (response.data.data === null) {
              this.isRegister = 'NO'
              this.message = ''
              this.message = response.data.message
            } else {
              this.isRegister = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              this.$router.push('/')
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  #signupCard {
    min-width: 500px;
    /*margin-top: 50px;*/
  }
</style>
