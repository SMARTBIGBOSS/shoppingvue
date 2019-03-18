<template>
  <div id="editaccount">
    <v-card>
      <v-card-title>Account Information
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form v-if="iscustomer" ref="form" v-model="valid" lazy-validation dark>
          <v-text-field v-model="name" :counter="100" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>

          <v-layout row wrap>
            <v-flex xs8>
          <v-text-field v-model="password" type="password" :rules="passwordRules" label="Password" required :disabled="withoutpass"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn @click="withpass">Change</v-btn>
             <v-btn @click="reset">Reset</v-btn>
            </v-flex>
          </v-layout>
          <v-btn color="indigo lighten-2" :disabled="!valid" @click="updateUser">Update</v-btn>
          <!--<div class="display-1 font-weight-thin red&#45;&#45;text">{{errmsg}}</div>-->
        </v-form>

        <v-form v-if="!isadmin && !iscustomer" ref="form" v-model="valid" lazy-validation dark>
          <v-text-field v-model="name" :counter="100" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>

          <v-layout row wrap>
            <v-flex xs8>
              <v-text-field v-model="password" type="password" :rules="passwordRules" label="Password" required :disabled="withoutpass"></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-btn @click="withpass">Change</v-btn>
              <v-btn @click="reset">Reset</v-btn>
            </v-flex>
          </v-layout>

          <v-text-field v-model="description" :rules="descriptionRules" label="Description" required></v-text-field>

          <v-btn color="indigo lighten-2" :disabled="!valid" @click="updateUser">Update</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'EditAccount',
  props: ['user', 'isCustomer', 'isAdmin'],
  data () {
    return {
      valid: true,
      emailChecker: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      passwordChecker: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/,
      name: this.user.name,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      email: this.user.username,
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && this.emailChecker.test(v)) || 'Must be valid e-mail'
      ],
      password: 'Default-567',
      passwordRules: [
        v => (v && this.passwordChecker.test(v)) || 'At least a number, lowercase letter, capital letter and special character'
      ],
      withoutpass: true,
      description: this.user.description,
      descriptionRules: [
        v => (v && v.length <= 200) || 'description must be less than 200 characters'
      ],
      iscustomer: this.isCustomer,
      isadmin: this.isAdmin
    }
  },
  methods: {
    updateUser () {
      if (this.iscustomer) {
        if (this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        } else if (!this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email,
            password: this.password
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        }
      } else if (!(this.iscustomer || this.isadmin)) {
        if (this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email,
            description: this.description
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        } else if (!this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email,
            password: this.password,
            description: this.description
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        }
      } else if (this.isadmin) {
        if (this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        } else if (!this.withoutpass) {
          let newUser = {
            name: this.name,
            username: this.email,
            password: this.password
          }
          // this.user = newUser
          this.$emit('user-is-updated', newUser, this.withoutpass)
          // this.$router.push('/showAccount')
        }
      }
    },
    withpass () {
      this.password = ''
      this.withoutpass = false
    },
    reset () {
      this.password = 'Default-567'
      this.withoutpass = true
    }
  }
}
</script>

<style scoped>

</style>
