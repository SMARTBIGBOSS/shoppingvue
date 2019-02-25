<template>
  <div id="signin">
    <!--<v-app>-->
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
        <v-card id="signinCard" flat>
          <v-card-title class="display-1 pl-5 pt-5">Sign In</v-card-title>
          <!--<v-layout align-start justify-space-around fill-height>-->
          <v-card-text>
          <form @submit.prevent="submit">
            <!--<v-layout id="signinFrom">-->
            <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required
                          @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
            <v-text-field type="password" v-model="password" :error-messages="passwordErrors" :counter="30" label="Password" required
                          @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
            <!--<v-select v-model="role" :items="items" :error-messages="roleErrors" label="Roles" required-->
              <!--@change="$v.role.$touch()"-->
              <!--@blur="$v.role.$touch()">-->
              <!--&lt;!&ndash;<option value="Seller">Seller</option>&ndash;&gt;-->
              <!--&lt;!&ndash;<option value="Customer">Customer</option>&ndash;&gt;-->
            <!--</v-select>-->
              <v-radio-group v-model="role" :mandatory="false" row>
                <v-radio label="Customer" value="customer"></v-radio>
                <v-radio label="Seller" value="seller"></v-radio>
                <v-radio label="Administrator" value="admin"></v-radio>
              </v-radio-group>

            <v-btn @click="submit">submit</v-btn>
            <p class="typo__p red--text" v-if="submitStatus === 'ERROR'">Please sign in your account correctly.</p>
            <p class="typo__p red--text" v-if="isLogged === 'NO'">{{message}}</p>
            <p class="typo__p green--text" v-if="isLogged === 'YES'">{{message}}</p>
            <p class="typo__p orange--text" v-if="submitStatus === 'PENDING'"> Jumping to the Home page ...</p>

            <!--</div>-->
          </form>
          <!--</v-layout>-->
          </v-card-text>
        </v-card>
        </v-flex>
      </v-layout>
    <!--</v-app>-->
  </div>
</template>

<script>
import adminService from '@/services/adminServices'
import sellerService from '@/services/sellerServices'
import customerService from '@/services/customerServices'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

Vue.use(Vuelidate)

export default {
  name: 'SignIn',
  // mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(30) }
    // role: { required }
  },
  computed: {
    // roleErrors () {
    //   const errors = []
    //   if (!this.$v.role.$dirty) return errors
    //   !this.$v.role.required && errors.push('Role is required')
    //   return errors
    // },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Password must be at most 30 characters long')
      !this.$v.password.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  data () {
    return {
      email: '',
      password: '',
      role: 'customer',
      submitStatus: null,
      isLogged: null,
      message: ''
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        let user = {'username': this.email, 'password': this.password}
        if (this.role === 'customer') {
          customerService.postSignin(user).then(response => {
            if (response.data.data === null) {
              this.message = ''
              this.message = response.data.message
              this.isLogged = 'NO'
            } else {
              this.isLogged = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              setTimeout(() => {
                this.$router.go(0)
              }, 1000)
              this.$router.push({path: '/', query: {id: response.data.data._id, userName: response.data.data.name, role: this.role}})
            }
          })
        } else if (this.role === 'seller') {
          sellerService.postSignin(user).then(response => {
            console.log(response.data)
            if (response.data.data === null) {
              this.isLogged = 'NO'
              this.message = ''
              this.message = response.data.message
            } else {
              this.isLogged = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'
              // setTimeout(() => {
              //   this.$router.go(0)
              // }, 1000)
              this.$router.go(0)
              this.$router.replace('/seller_home')
            }
          })
        } else if (this.role === 'admin') {
          adminService.postSignin(user).then(response => {
            if (response.data.data === null) {
              this.isLogged = 'NO'
              this.message = ''
              this.message = response.data.message
            } else {
              this.isLogged = 'YES'
              this.message = ''
              this.message = response.data.message
              this.submitStatus = 'PENDING'

              // this.$router.push('/')
              // setTimeout(() => {
              this.$router.go(0)
              // this.$router.go(-2)
              // }, 1000)
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
#signinCard {
  /*justify-content: space-around;*/
  min-width: 500px;
  /*margin-top: 10px;*/
}

</style>
