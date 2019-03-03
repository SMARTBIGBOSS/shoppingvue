<template>
    <div>
      <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
          <v-card>
            <v-card-title>
              {{messagetitle}}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <add-product-form :product="product" @product-is-added-updated="addProduct"></add-product-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
import ProductService from '@/services/productServices'
import ProductForm from '@/components/ProductForm'
export default {
  name: 'AddProduct',
  data () {
    return {
      product: {},
      messagetitle: 'Add Product'
    }
  },
  components: {
    'add-product-form': ProductForm
  },
  // created () {
  //   this.getProduct()
  // },
  methods: {
    // getProduct: function () {
    //   ProductService.getProductByCatalog(this.$router.params).then(response => {
    //     this.product = response.data()
    //     console.log(this.product)
    //   })
    // },
    addProduct: function (product) {
      let user = sessionStorage.getItem('id')
      ProductService.postProduct(user, product).then(response => {
        // console.log(response.data)
      })
        .catch(error => {
          this.errors.push(error)
          // console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
