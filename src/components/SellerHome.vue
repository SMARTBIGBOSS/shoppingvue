<template>
  <div id="sellerhome">
    <!--<v-app>-->
    <v-container fluid>
      <v-layout row>
        <v-flex xs3 sm3 md3>
          <v-navigation-drawer permanent>
          <v-toolbar flat color="green lighten-3">
            <v-toolbar-title>Menu</v-toolbar-title>
            <v-spacer>
              <v-btn small slot="activator" color="blue lighten-2" dark class="mb-2" @click="catalogDialog = true">Add Catalogue</v-btn>
            </v-spacer>
          </v-toolbar>
            <v-divider></v-divider>
          <v-data-table :items="catalogs" class="elevation-1" hide-headers hide-actions>
            <template slot="items" slot-scope="props">
              <!--<td class="text-xs-left">{{ props.item._id }}</td>-->
              <td class="text-xs-left" @click="getProducts(props.item._id)">{{ props.item.name }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editCatalog(props.item)">edit</v-icon>
                <v-icon small @click="deleteCatalog(props.item._id)">delete</v-icon>
              </td>
            </template>
          </v-data-table>
          </v-navigation-drawer>
        </v-flex>

        <v-flex xs7 md6 lg8 >
          <v-card>
            <v-card-title>
              Products
              <v-spacer></v-spacer>
              <v-btn color="blue lighten-2" dark @click="addProduct">Add</v-btn>
            </v-card-title>
            <v-data-table :headers="productHeaders" :items="products">
              <template slot="items" slot-scope="props" v-if="isShowData">
                <td class="justify-center layout px-0">
                  <v-avatar :size="40">
                    <img :src="props.item.imgPath" v-if="props.item.imgPath !== ''">
                  </v-avatar>
                </td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.price }}</td>
                <td class="text-xs-right">{{ props.item.stock }}</td>
                <td class="text-xs-right">{{ props.item.class_region_id }}</td>
                <td class="text-xs-right">{{ props.item.class_type_id }}</td>
                <!--<td class="text-xs-right">{{ props.item.catalogue_id }}</td>-->
                <td class="text-xs-right">{{ props.item.isShow }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editProduct(props.item._id)">edit</v-icon>
                  <v-icon small @click="deleteProduct(props.item._id)">delete</v-icon>
                </td>
                <td>
                  <v-btn color="blue lighten-2" dark @click="uploadImg">Upload Image</v-btn>
                </td>
              </template>
              <!--<v-alert slot="no-results" :value="true" color="error" icon="warning">-->
                <!--Your search for "{{ search }}" found no results.-->
              <!--</v-alert>-->
            </v-data-table>
          </v-card>
        </v-flex>

        <v-dialog v-model="catalogDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedCatalog.name" label="Catalog name" required
                                  :rules="[() => !!editedCatalog.name || 'This field is required']"></v-text-field>
                    <p>{{message}}</p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="submitCatalog">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SellerService from '@/services/sellerServices'
import ProductService from '@/services/productServices'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import VueCookies from 'vue-cookies'

Vue.use(Vuelidate)
Vue.use(VueCookies)

export default {
  name: 'SellerHome',
  validations: {
    editedCatalog: { required }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Catalog' : 'Edit Catalog'
    }
    // cataNameErrors () {
    //   const errors = []
    //   if (!this.$v.editedCatalog.$dirty) return errors
    //   !this.$v.editedCatalog.required && errors.push('Name is required')
    //   return errors
    // }
  },
  data () {
    return {
      catalogs: [],
      catalogId: '',
      catalogDialog: false,
      message: '',
      editedIndex: -1,
      editedCatalog: {name: ''},
      productHeaders: [
        {text: 'Image', value: 'image'},
        {text: 'Name', align: 'left', sortable: false, value: 'name'},
        {text: 'Price', value: 'price'},
        {text: 'Stock', value: 'stock'},
        {text: 'Region', value: 'class_region_id'},
        {text: 'Type', value: 'class_type_id'},
        // {text: 'Catalogue', value: 'catalogue_id'},
        {text: 'onSale', value: 'isShow'},
        {text: 'Action', value: 'action', sortable: false}
      ],
      products: [],
      imgURL: '',
      isShowData: false
    }
  },
  created () {
    this.loadCatalogs()
  },
  methods: {
    loadCatalogs () {
      // let user = this.$cookies.get('user')
      let user = '5c6339630516b0316085e10f'
      SellerService.fetchAllCatalog(user).then(response => {
        this.catalogs = response.data.data
        // console.log(this.catalogs)
      })
    },
    showDialog () {
      this.catalogDialog = true
      this.message = ''
    },
    closeDialog () {
      this.catalogDialog = false
      this.editedCatalog = {name: ''}
      this.editedIndex = -1
      this.message = ''
    },
    editCatalog (item) {
      this.editedIndex = this.catalogs.indexOf(item)
      // console.log(this.editedIndex)
      this.editedCatalog = item
      // console.log(this.editedCatalog)
      this.showDialog()
    },
    deleteCatalog (id) {
      confirm('Are you sure you want to delete this item?') &&
      SellerService.deleteCatalog(id).then(response => {
        this.message = ''
        this.message = response.data.data
        this.loadCatalogs()
      })
    },
    submitCatalog () {
      let newCatalog = {'name': this.editedCatalog.name}
      // console.log(newCatalog)
      let id = this.editedCatalog._id
      // let user = this.cookies.get('user')
      let user = '5c6339630516b0316085e10f'
      if (this.editedIndex > -1) {
        SellerService.putCatalog(user, id, newCatalog).then(response => {
          // console.log(response.data)
          if (response.data.data === null || this.editedCatalog.name === '') {
            // this.message = ''
            this.message = response.data.message
          } else {
            // this.message = ''
            this.message = response.data.message
            this.loadCatalogs()
            this.closeDialog()
          }
        })
      } else {
        SellerService.postAddCatalog(user, newCatalog).then(response => {
          // console.log(response.data)
          if (response.data.data === null) {
            // this.message = ''
            this.message = response.data.message
            // this.catalogDialog = true
          } else {
            // this.message = ''
            this.message = response.data.message
            this.loadCatalogs()
            this.closeDialog()
          }
          // console.log(response.data)
        })
      }
    },
    getProducts (id) {
      let user = '5c6339630516b0316085e10f'
      this.catalogId = id
      // console.log(this.catalogId)
      // this.imgURL = ''
      ProductService.getProductByCatalog(user, id).then(response => {
        this.products = response.data.data
        // console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          let imgId = response.data.data[i]._id
          ProductService.fetchMainImg(response.data.data[i]._id).then(response => {
            if (!response.data.message) {
              this.imgURL = 'http://localhost:3000/seller/product/' + imgId + '/mainImg'
            } else {
              this.imgURL = ''
            }
            console.log(this.imgURL)
            this.products[i].imgPath = this.imgURL
          })
        }
      })
      this.isShowData = true
    },
    addProduct () {
      // this.$router.params = this.catalogId
      // console.log(this.$router.params)
      this.$router.push('/addProduct')
    },
    editProduct (id) {
      this.$router.params = id
      this.$router.push('/editProduct')
    },
    deleteProduct (id) {
      confirm('Are you sure you want to delete this item?') &&
      ProductService.deleteProduct(id).then(response => {
        this.message = ''
        this.message = response.data.data
        this.getProducts(this.catalogId)
      })
    },
    uploadImg (id) {

    }
  }

}
</script>

<style scoped>

</style>
