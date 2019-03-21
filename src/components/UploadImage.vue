<template>
<div id="uploadimage">
  <v-card flat>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title primary-title="">
            <div class="headline">Product Detail Image</div>
            <span class="orange--text">You can upload multiple images as showing product's detail.</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Select Image" @click='pickDetailFile' prepend-icon='attach_file' v-model="tip"
                          :append-icon="imagesURL.length ? 'send' : ''" @click:append="sendDetailImages">
            </v-text-field>
            <input type="file" style="display: none" ref="detailImage" accept="image/*"
                   name="productDetails" @change="onDetailPicked($event.target.name, $event.target.files)">
            <!--<v-container fluid>-->
              <v-layout row wrap>
                <v-flex v-for="item in detailImageNames" :key="item" v-if="detailImageNames">
                  <v-chip small close @input="removeDetail(item)">{{item}}</v-chip>
                </v-flex>
                <v-spacer></v-spacer>
              </v-layout>
            <!--</v-container>-->
            <v-container fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex v-for="url in imagesURL" :key="url" v-if="imagesURL" xs4>
                  <img :src="url" width="100%" height="100%"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  <v-card>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title primary-title="">
            <div class="headline">Product Body Image</div>
            <span class="orange--text">You can only upload one images as explaining product.</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Select Image" @click='pickBodyFile' prepend-icon='attach_file' v-model="tip"
                          :append-icon="imageURL ? 'send' : ''" @click:append="sendBodyImage">
            </v-text-field>
            <input type="file" style="display: none" ref="bodyImage" accept="image/*"
                   name="productBody" @change="onBodyPicked($event.target.name, $event.target.files)">
            <!--<v-container fluid>-->
            <v-layout row wrap>
              <v-flex v-if="bodyImageName">
                <v-chip small close @input="removeBody()">{{bodyImageName}}</v-chip>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
            <!--</v-container>-->
            <v-container fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex v-if="imageURL" xs4>
                  <img :src="imageURL" width="100%" height="100%"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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
</div>
</template>

<script>
export default {
  name: 'UploadImage',
  props: ['message'],
  data () {
    return {
      numDetailImage: null,
      numBodyImage: null,
      tip: '',
      fieldName: null,
      images: [],
      bodyImg: null,
      detailImageNames: [],
      bodyImageName: null,
      imagesURL: [],
      imageURL: null,
      maxSize: 1024,
      errorDialog: null,
      errorText: '',
      successMsg: this.message
    }
  },
  methods: {
    pickDetailFile () {
      this.$refs.detailImage.click()
    },
    pickBodyFile () {
      this.$refs.bodyImage.click()
    },
    onDetailPicked (fieldName, files) {
      const { maxSize } = this
      // this.imageFile = files[0]
      // this.fieldName = fieldName
      if (files.length > 0) {
        let size = files[0].size / maxSize / maxSize
        if (!(files[0].type.match('image.jpeg') || files[0].type.match('image.png'))) {
          // check whether the upload is an image
          this.errorDialog = true
          this.errorText = 'Please choose an jpeg/png file'
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true
          this.errorText = 'Your file is too big! Please select an image under 1MB'
        } else {
          this.numImage += 1
          this.setTip(this.numImage)
          this.fieldName = fieldName
          this.images.push(files[0])
          this.imagesURL.push(URL.createObjectURL(files[0]))
          this.detailImageNames.push(files[0].name)
          console.log(this.images)
        }
      }
    },
    onBodyPicked (fieldName, files) {
      const { maxSize } = this
      if (files.length > 0) {
        let size = files[0].size / maxSize / maxSize
        if (!(files[0].type.match('image.jpeg') || files[0].type.match('image.png'))) {
          // check whether the upload is an image
          this.errorDialog = true
          this.errorText = 'Please choose an jpeg/png file'
        } else if (size > 5) {
          // check whether the size is greater than the size limit
          this.errorDialog = true
          this.errorText = 'Your file is too big! Please select an image under 5MB'
        } else {
          this.numBodyImage = 1
          this.setTip(this.numImage)
          this.fieldName = fieldName
          this.bodyImg = files[0]
          this.imageURL = URL.createObjectURL(files[0])
          this.bodyImageName = files[0].name
          // console.log(this.images)
        }
      }
    },
    removeDetail (item) {
      let index = this.detailImageNames.indexOf(item)
      this.detailImageNames.splice(index, 1)
      this.imagesURL.splice(index, 1)
      this.numImage -= 1
      this.setTip(this.numImage)
    },
    removeBody () {
      this.bodyImageName = null
      this.imageURL = null
      this.numBodyImage = 0
      this.setTip(this.numBodyImage)
    },
    sendDetailImages () {
      let formData = new FormData()
      for (let i = 0; i < this.images.length; i++) {
        formData.append(this.fieldName, this.images[i])
      }
      // formData.append(this.fieldName, this.images)
      this.$emit('image-is-added', formData, 'detail')
    },
    sendBodyImage () {
      let formData = new FormData()
      formData.append(this.fieldName, this.bodyImg)
      // formData.append(this.fieldName, this.images)
      this.$emit('image-is-added', formData, 'body')
    },
    setTip (number) {
      this.tip = number + ' image(s) chose'
    }
  }
}
</script>

<style scoped>

</style>
