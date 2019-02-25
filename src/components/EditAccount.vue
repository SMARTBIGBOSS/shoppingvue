<template>
  <div id="signup">
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" id="signupCard">
          <v-card-title class="display-1 pl-5 pt-5">Edit Account</v-card-title>
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

          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn color="primary" flat @click="submit">Update</v-btn>
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
export default {
  name: 'EditAccount'
}
</script>

<style scoped>

</style>
