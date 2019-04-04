<template>
  <div id="productform">
    <!--<v-app>-->
      <!--<v-layout justify-center>-->
        <!--<v-flex xs12 sm10 md8 lg6>-->
    <template v-if="loadForm">
          <v-form ref="form" v-model="valid" lazy-validation dark>
            <v-text-field v-model="name" :counter="100" :rules="nameRules" label="Name" required></v-text-field>

            <v-text-field v-model="price" :rules="priceRules" prefix="€" label="Price" required></v-text-field>

            <v-text-field v-model="shipping_price" :rules="shippingPriceRules" prefix="€" label="Shipping Price" required></v-text-field>

            <v-text-field v-model="stock" :rules="stockRules" label="Stock" required></v-text-field>

            <v-select v-model="catalogue" :items="catalogueItems" :rules="[v => !!v || 'This field is required']"
                      label="Catalogue" required></v-select>

            <v-select v-model="class_region" :items="class_regionItems" :rules="[v => !!v || 'This field is required']"
                      label="Classification Region" required></v-select>

            <v-select v-model="class_type" :items="class_typeItems" :rules="[v => !!v || 'This field is required']"
                      label="Classification Type" required></v-select>
            <v-layout row>
              <v-checkbox v-model="isShow" label="Is it on sale?" required></v-checkbox>
              <v-layout justify-end>
                <v-btn flat large color="light-blue darken-2" @click="editImage">
                  <v-icon>arrow_right_alt</v-icon>Edit Image
                </v-btn>
              </v-layout>
            </v-layout>

            <v-btn color="indigo lighten-2" @click="submitProduct">Submit</v-btn>

            <v-btn color="indigo lighten-2" @click="cancel">Cancel</v-btn>

          </v-form>
    </template>
    <template v-else>
      <upload-image @image-is-added="uploadImage"></upload-image>

    </template>
    <p>{{detailmsg}}</p>
    <p>{{bodymsg}}</p>
        <!--</v-flex>-->
      <!--</v-layout>-->
    <!--</v-app>-->
  </div>
</template>

<script>
import SellerServices from '../services/sellerServices'
import ClassServices from '../services/classificationServices'
import ProductServices from '../services/productServices'
import UploadImage from '../components/UploadImage'

export default {
  name: 'ProductForm',
  props: ['product'],
  components: {
    'upload-image': UploadImage
  },
  data () {
    return {
      loadForm: true,
      user: sessionStorage.getItem('id'),
      Fproduct: this.product,
      pid: this.product._id,
      valid: true,
      name: this.product.name,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      price: this.product.price,
      priceRules: [
        v => !!v || 'Price is required',
        v => /[0-9]\d*.\d*|0\.\d*[1-9]\d*|[1-9]\d*|0/.test(v) || 'Price must be valid'
      ],
      shipping_price: this.product.shipping_price,
      shippingPriceRules: [
        v => !!v || 'Shipping price is required',
        v => /[0-9]\d*.\d*|0\.\d*[1-9]\d*|[1-9]\d*|0/.test(v) || 'Shipping price must be valid'
      ],
      stock: this.product.stock,
      stockRules: [
        v => !!v || 'Stock is required',
        v => /[0-9]\d*/.test(v) || 'Stock must be valid'
      ],
      catalogueId: this.product.catalogue_id,
      // catalogues: [],
      catalogue: null,
      catalogueItems: [],
      class_region_id: this.product.class_region_id,
      previousClaReg: '',
      class_region: null,
      class_regionItems: [],
      class_type_id: this.product.class_type_id,
      previousClaTyp: '',
      class_type: null,
      class_typeItems: [],
      isShow: false,
      bodymsg: '',
      detailmsg: ''
    }
  },
  created () {
    this.getAllCatalog()
    this.getAllClasType()
    this.getAllClasRegion()
  },
  methods: {
    getAllCatalog () {
      SellerServices.fetchAllCatalog(this.user).then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          // this.catalogues[i] = response.data.data[i]
          // // console.log(this.catalogues[i].name)
          // this.catalogueItems[i] = this.catalogues[i].name
          this.catalogueItems.push({text: response.data.data[i].name, value: response.data.data[i]._id})
        }
        // console.log(this.catalogueItems)
        for (let j = 0; j < this.catalogueItems.length; j++) {
          if (this.catalogueId.toString() === this.catalogueItems[j].value.toString()) {
            this.catalogue = this.catalogueItems[j]
          }
        }
        // console.log(this.catalogueItems)
        // console.log(this.class_regionItems)
        // this.loadForm = true
      })
        .catch(error => {
          this.errors.push(error)
          // console.log(error)
        })
      // console.log(this.catalogueItems)
    },
    getAllClasType () {
      ClassServices.fetchActiveClasByType('Category').then(response => {
        if (response.data.data !== null) {
          for (let i = 0; i < response.data.data.length; i++) {
            this.class_typeItems.push({text: response.data.data[i].subtitle, value: response.data.data[i]._id})
          }
          for (let i = 0; i < this.class_typeItems.length; i++) {
            if (this.class_type_id === this.class_typeItems[i].value) {
              this.class_type = this.class_typeItems[i]
            }
          }
          // console.log(this.class_typeItems)
        }
      })
    },
    getAllClasRegion () {
      ClassServices.fetchActiveClasByType('Region').then(response => {
        if (response.data.data !== null) {
          for (let i = 0; i < response.data.data.length; i++) {
            this.class_regionItems.push({text: response.data.data[i].subtitle, value: response.data.data[i]._id})
          }
          for (let i = 0; i < this.class_regionItems.length; i++) {
            if (this.class_region_id === this.class_regionItems[i].value) {
              this.class_region = this.class_regionItems[i]
            }
          }
          // console.log(this.class_typeItems)
        }
      })
    },
    submitProduct () {
      // for (let i = 0; i < this.catalogues.length; i++) {
      //   if (this.catalogues[i].name === this.catalogue) {
      //     this.catalogueId = this.catalogues[i]._id
      //   }
      // }
      // console.log(this.class_type)
      // console.log(this.catalogueId)
      if (this.$refs.form.validate()) {
        // let user = '5c633960516b0316085e10f'
        let newProduct = {
          name: this.name,
          price: this.price,
          shipping_price: this.shipping_price,
          stock: this.stock,
          class_type_id: this.class_type,
          class_region_id: this.class_region,
          catalogue_id: this.catalogue,
          isShow: this.isShow
        }
        this.Fproduct = newProduct
        this.$emit('product-is-added-updated', this.Fproduct)
        // this.$router.push('/seller_home')
        this.$router.go(-1)
      }
    },
    cancel () {
      this.$refs.form.reset()
      this.$router.go(-1)
    },
    editImage () {
      this.$refs.form.reset()
      this.loadForm = false
    },
    uploadImage (formData, str) {
      if (str === 'detail') {
        ProductServices.putDetailImage(sessionStorage.getItem('id'), this.pid, formData).then(response => {
          if (response.data.data) {
            this.detailmsg = response.data.message
          }
          this.$router.go(-1)
        })
      } else if (str === 'body') {
        ProductServices.putBodyImage(sessionStorage.getItem('id'), this.pid, formData).then(response => {
          // if (response.data.data) {
          //   this.bodymsg = response.data.message
          // }
          this.bodymsg = response.data.message
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
