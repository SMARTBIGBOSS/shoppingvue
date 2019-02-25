<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <template v-if="childDataLoaded">
        <v-card>
          <v-card-title>
            {{messagetitle}}
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <edit-product-form :product="product" @product-is-added-updated="updataProduct"></edit-product-form>
          </v-card-text>
        </v-card>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProductService from '@/services/productServices'
import ProductForm from '@/components/ProductForm'
export default {
  name: 'EditProduct',
  data () {
    return {
      product: {},
      messagetitle: 'Edit Product',
      childDataLoaded: false
    }
  },
  components: {
    'edit-product-form': ProductForm
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct: function () {
      ProductService.fetchOneProduct(this.$router.params).then(response => {
        this.product = response.data.data
        this.childDataLoaded = true
        // console.log(this.product)
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updataProduct: function (product) {
      let user = '5c6339630516b0316085e10f'
      let id = this.product._id
      ProductService.putProduct(user, id, product).then(response => {
        // console.log(response.data)
        this.product = product
      })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }

  }
}
</script>

<style scoped>

</style>
