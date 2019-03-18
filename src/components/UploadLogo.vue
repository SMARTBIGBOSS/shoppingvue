<template>
  <div>
    <v-container grid-list-xl>
      <!--<image-input v-model="avatar">-->
        <div>
          <!--<v-avatar size="150px" v-ripple v-model="avatar" v-if="!avatar" class="grey lighten-3 mb-3" @click="launchFilePicker()">-->
            <!--<span>Click to add avatar</span>-->
          <!--</v-avatar>-->
          <v-avatar size="150px" v-ripple v-model="avatar" class="mb-3" @click="launchFilePicker()">
            <img :src="imageURL" alt="avatar">
          </v-avatar>
          <p>Click to add avatar</p>
        </div>
      <input type="file" ref="file" :name="uploadFieldName" style="display:none"
             @change="onFileChange($event.target.name, $event.target.files)">
      <!--</image-input>-->
      <v-slide-x-transition>
        <div v-if="avatar && saved == false">
          <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
          <v-btn class="primary" @click="reset" :loading="saving">Reset</v-btn>
        </div>
      </v-slide-x-transition>
      <!-- error dialog displays any potential errors -->
      <v-dialog v-model="errorDialog" max-width="300">
        <v-card>
          <v-card-text class="subheading">{{errorText}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

  </div>
</template>

<script>
// import CustomerService from '@/services/customerServices'
export default {
  name: 'uploadLogo',
  props: ['originalLogo'],
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false,
      errorDialog: null,
      errorText: '',
      uploadFieldName: 'logo',
      imageURL: this.originalLogo,
      maxSize: 1024,
      imageFile: null,
      fieldName: null
    }
  },
  // watch: {
  //   avatar: {
  //     handler: function () {
  //       this.saved = false
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    launchFilePicker () {
      this.$refs.file.click()
    },
    onFileChange (fieldName, files) {
      const { maxSize } = this
      this.imageFile = files[0]
      this.fieldName = fieldName
      // console.log(fieldName)
      // check if user actually selected a file
      if (files.length > 0) {
        this.saving = true
        let size = this.imageFile.size / maxSize / maxSize
        if (!(this.imageFile.type.match('image.jpeg') || this.imageFile.type.match('image.png'))) {
          // check whether the upload is an image
          this.errorDialog = true
          this.errorText = 'Please choose an jpeg/png file'
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true
          this.errorText = 'Your file is too big! Please select an image under 1MB'
        } else {
          // Append file into FormData & turn file into image URL
          this.imageURL = URL.createObjectURL(this.imageFile)
          console.log(this.imageURL)
          this.saved = false
          this.saving = false
          this.avatar = true
        }
      }
    },
    uploadImage () {
      let formData = new FormData()
      formData.append(this.fieldName, this.imageFile)
      this.$emit('logo-is-updated', formData)
    },
    reset () {
      this.imageFile = null
      this.fieldName = null
      this.imageURL = this.originalLogo
      this.saved = false
      this.saving = false
      this.avatar = true
    }
  }
}
</script>

<style scoped>

</style>
