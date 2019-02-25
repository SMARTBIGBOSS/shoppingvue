<template>
  <div id="productform">
    <!--<v-app>-->
      <!--<v-layout justify-center>-->
        <!--<v-flex xs12 sm10 md8 lg6>-->
    <template v-if="loadForm">
          <v-form ref="form" v-model="valid" lazy-validation dark>
            <v-text-field v-model="name" :counter="100" :rules="nameRules" label="Name" required></v-text-field>

            <v-text-field v-model="price" :rules="priceRules" label="Price" required></v-text-field>

            <v-text-field v-model="stock" :rules="stockRules" label="Stock" required></v-text-field>

            <v-select v-model="catalogue" :items="catalogueItems" :rules="[v => !!v || 'This field is required']" label="Catalogue" required></v-select>

            <v-select v-model="class_region" :items="class_regionItems" :rules="[v => !!v || 'This field is required']" label="Classification Region" required></v-select>

            <v-select v-model="class_type" :items="class_typeItems" :rules="[v => !!v || 'This field is required']" label="Classification Type" required></v-select>

            <v-checkbox v-model="isShow" label="Is it on sale?" required></v-checkbox>

            <v-btn color="indigo lighten-2" @click="submitProduct">Submit</v-btn>

            <v-btn color="indigo lighten-2" @click="cancel">Cancel</v-btn>

          </v-form>
    </template>
        <!--</v-flex>-->
      <!--</v-layout>-->
    <!--</v-app>-->
  </div>
</template>

<script>
import SellerServices from '../services/sellerServices'

export default {
  name: 'ProductForm',
  props: ['product'],
  data () {
    return {
      user: '5c6339630516b0316085e10f',
      Fproduct: this.product,
      loadForm: false,
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
      stock: this.product.stock,
      stockRules: [
        v => !!v || 'Stock is required',
        v => /[0-9]\d*/.test(v) || 'Stock must be valid'
      ],
      catalogueId: '',
      catalogues: [],
      catalogue: null,
      catalogueItems: [],
      class_region: null,
      class_regionItems: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      class_type: null,
      class_typeItems: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      isShow: false
    }
  },
  created () {
    this.getCatalog()
  },
  methods: {
    getCatalog () {
      SellerServices.fetchAllCatalog(this.user).then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          this.catalogues[i] = response.data.data[i]
          // console.log(this.catalogues[i].name)
          this.catalogueItems[i] = this.catalogues[i].name
        }
        // console.log(this.catalogueItems)
        // console.log(this.class_regionItems)
        this.loadForm = true
      })
        .catch(error => {
          this.errors.push(error)
          // console.log(error)
        })
      // console.log(this.catalogueItems)
    },
    submitProduct () {
      for (let i = 0; i < this.catalogues.length; i++) {
        if (this.catalogues[i].name === this.catalogue) {
          this.catalogueId = this.catalogues[i]._id
        }
      }
      // console.log(this.catalogueId)
      if (this.$refs.form.validate()) {
        // let user = '5c6339630516b0316085e10f'
        let newProduct = {
          name: this.name,
          price: this.price,
          stock: this.stock,
          class_type_id: this.class_type,
          class_region_id: this.class_region,
          catalogue_id: this.catalogueId,
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
    }
  }
}
</script>

<style scoped>

</style>
