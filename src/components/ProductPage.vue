<template>
  <div id="productpage">
    <v-container fluid grid-list-md>
      <v-layout column>
        <v-layout row wrap>
          <v-flex xs12 sm10 wrap>
            <v-card v-if="isload">
              <v-layout wrap>
              <v-flex xs12 md5>
                <v-carousel height="100%" hide-controls flat>
                  <v-carousel-item v-for="(item,i) in details" :key="i">
                    <img :src="item" style="width:80%; height:100%;" />
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
              <v-flex xs12 md6 offset-md1>
                <v-card-text>
                  <v-layout column align-start>
                    <div class="headline mb-3">{{product.name}}</div>
                    <div class="subheading">Price: €{{product.price}}</div>
                    <div class="subheading">Stock: {{product.stock}}</div>
                    <div class="subheading">Seller: {{product.seller_id.name}}</div>
                    <div class="subheading">Type: {{product.class_type_id.subtitle}} -> {{product.catalogue_id.name}}</div>
                    <div class="subheading">Region: {{product.class_region_id.subtitle}}</div>
                    <div class="subheading">Quantity:
                          <v-icon @click="subtractQuantity" middle>remove_circle</v-icon>
                          <v-chip label>{{quantity}}</v-chip>
                          <v-icon @click="addQuantity" middle>add_circle</v-icon>
                    </div>
                    <div class="subheading">Shipping Price: €{{product.shipping_price}}</div>
                    <div>
                      <v-btn class="text-none" color="blue lighten-2" @click="orderProduct">Buy Now</v-btn>
                      <v-btn class="text-none" color="blue lighten-2">Add to Bucket</v-btn>
                    </div>
                  </v-layout>
                </v-card-text>
              </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 sm2>
            <v-card>
              <v-card-title>Contact Seller</v-card-title>
            </v-card>
          </v-flex>
        </v-layout>

        <v-flex xs12>
          <v-card>
            <!--<v-layout align-center column>-->

            <v-card-title class="headline">Product Detail</v-card-title>
            <v-flex xs10 offset-xs1 md8 offset-md2>
                <v-img :src="product.body_id.path[0]" v-if="product.body_id"/>
              </v-flex>
            <!--</v-layout>-->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductService from '@/services/productServices'

export default {
  name: 'ProductPage',
  data () {
    return {
      isload: false,
      details: [],
      product: '',
      quantity: 1
      // transaction: null,
      // img: null
    }
  },
  created () {
    this.loadProduct()
  },
  methods: {
    loadProduct () {
      ProductService.fetchOneProduct(this.$router.params).then(response => {
        if (response.data.data) {
          this.details = response.data.data.detail_id.path
          this.product = response.data.data
          // console.log(this.product)
          this.isload = true
        }
      })
    },
    addQuantity () {
      if (this.quantity < parseInt(this.product.stock)) {
        this.quantity += 1
      }
    },
    subtractQuantity () {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    orderProduct () {
      // let transaction = {
      //   product_id: this.product._id,
      //   product_name: this.product.name,
      //   product_price: this.product.price,
      //   shipping_prica: this.product.shipping_price,
      //   seller_id: this.product.seller_id._id,
      //   type: this.product.class_type_id._id,
      //   region: this.product.class_region_id._id
      // }
      // this.img = this.details[0]
      // this.$router.push({path: '/product/:id/transaction', params: {id: this.product._id}})
      // let q = this.quantity
      // console.log('product page' + this.product._id)
      this.$router.push({name: 'Transaction', params: {productId: this.product._id, img: this.details[0], quantity: this.quantity.toString()}})
    }
  }
}
</script>

<style scoped>

</style>
