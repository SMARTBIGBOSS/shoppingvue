<template>
  <div>
    <v-navigation-drawer permanent>
    <v-toolbar flat color="white">
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer>
        <v-btn small slot="activator" color="primary" dark class="mb-2" @click="catalogDialog = true">Add Catalog</v-btn>
      </v-spacer>
    </v-toolbar>
      <v-divider></v-divider>
    <v-data-table :items="catalogs" class="elevation-1" hide-headers hide-actions>
      <template slot="items" slot-scope="props">
        <!--<td class="text-xs-left">{{ props.item._id }}</td>-->
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editCatalog(props.item)">edit</v-icon>
          <v-icon small @click="deleteCatalog(props.item._id)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    </v-navigation-drawer>

    <v-dialog v-model="catalogDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
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

  </div>
</template>

<script>
import SellerService from '@/services/sellerServices'
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
    },
    cataNameErrors () {
      const errors = []
      if (!this.$v.editedCatalog.$dirty) return errors
      !this.$v.editedCatalog.required && errors.push('Name is required')
      return errors
    }
  },
  data () {
    return {
      catalogs: [],
      catalogDialog: false,
      // cataName: '',
      message: '',
      // headers: [
      //   {text: 'ID', sortable: true, value: '_id'},
      //   {text: 'Name', align: 'left', sortable: true, value: 'name'}
      // ],
      editedIndex: -1,
      editedCatalog: {name: ''}
      // defaultItem: {
      //   name: ''
      // }
    }
  },
  created () {
    this.loadCatalogs()
  },
  methods: {
    loadCatalogs () {
      // let user = this.$cookies.get('user')
      let user = '5c561bece1399a34608ba1d4'
      SellerService.getAllCatalog(user).then(response => {
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
      console.log(this.editedIndex)
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
      console.log(newCatalog)
      let id = this.editedCatalog._id
      // let user = this.cookies.get('user')
      let user = '5c561bece1399a34608ba1d4'
      if (this.editedIndex > -1) {
        SellerService.putCatalog(user, id, newCatalog).then(response => {
          console.log(response.data)
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
          console.log(response.data)
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
          console.log(response.data)
        })
      }
    }
  }

}
</script>

<style scoped>

</style>
