<template>
  <div id="accountinfo">
    <v-container fluid>
      <v-layout row>
        <v-flex xs6 sm4>
          <div id="navigation">
            <v-navigation-drawer stateless value="true">
        <v-list>
          <v-list-group v-if="isCustomer" v-for="item in itemsC" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="editInfo(subItem.index)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group v-if="!isCustomer" v-for="item in itemsS" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="editInfo(subItem.index)">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
          </div>
        </v-flex>
        <v-flex xs6 sm8>
          <div id="detailinfo">
            <template v-if="showBasicInfo">
              <v-card>
                <v-card-text>
                  <div>
                  <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                      <v-flex xs4 offset-xs4>
                        <img :src="logoURL" class="image" width="100%" height="100%">
                      </v-flex>
                    </v-layout>
                  </v-container>
                  </div>
                  <div class="display-1 font-weight-thin">Name: {{userName}}</div>
                  <div class="display-1 font-weight-thin">Email: {{userEmail}}</div>
                </v-card-text>
                <v-card-actions>
                  <v-layout justify-center row>
                  <v-btn depressed color="primary" flat @click="editUser">Edit Account</v-btn>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </template>

            <template v-if="isEditAccount">
              <edit-account-form :user="user" :isCustomer="isCustomer" :isAdmin="isAdmin" @user-is-updated="updateAccount"></edit-account-form>
            </template>

            <template v-if="isUploadLogo">
              <edit-logo-form :originalLogo="logoURL" @logo-is-updated="updataLogo"></edit-logo-form>
            </template>

            <template v-if="showAddress">
              <v-card>
                <v-card-title>
                  Shipping Address
                  <v-spacer></v-spacer>
                  <v-btn color="blue lighten-2" dark @click="addAddress">Add</v-btn>
                </v-card-title>
                <v-data-table :headers="addressHeaders" :items="addresses" fix-header>
                  <template slot="items" slot-scope="props">
                    <tr>
                    <td>{{ props.item.firstName }} {{props.item.lastName}}</td>
                    <td class="text-xs-right">{{ props.item.address }}<br>{{ props.item.city }}, {{ props.item.province }}<br>{{ props.item.country }}</td>
                    <td class="text-xs-right">{{ props.item.contact_num }}</td>
                    <td class="text-xs-right">{{ props.item.email }}</td>
                    <td class="text-xs-right">{{ props.item.post_code }}</td>
                    <td class="justify-center layout px-0">
                      <v-icon small class="mr-2" @click="editAddress(props.item._id)">edit</v-icon>
                      <v-icon small @click="deleteAddressDialog(props.item._id)">delete</v-icon>
                    </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </template>

            <template v-if="isAddAddress">
              <add-address-form :oneAddress="oneAddress" :isAddAddress="isAddAddress" @address-is-added="createAddress"></add-address-form>
            </template>

            <template v-if="isEditAddress">
              <edit-address-form :oneAddress="oneAddress" :isEditAddress="isEditAddress" @address-is-updated="updateAddress"></edit-address-form>
            </template>

            <template v-if="isDeleteAddress">
              <v-layout row justify-center>
                <v-dialog v-model="isDeleteAddress" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">Delete Shipping Address</v-card-title>
                    <v-card-text>Are you sure to remove this address?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="cancelDialog">Cancel</v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="removeAddress">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </template>
          </div>
        </v-flex>
  </v-layout>
    </v-container>
  </div>
</template>

<script>
import EditAccount from '@/components/EditAccount'
import EditAddress from '@/components/EditAddress'
import CustomerService from '@/services/customerServices'
import SellerService from '@/services/sellerServices'
import AdminServices from '@/services/adminServices'
import UploadLogo from '@/components/UploadLogo'

export default {
  name: 'AccountInformation',
  components: {
    'edit-account-form': EditAccount,
    'edit-logo-form': UploadLogo,
    'edit-address-form': EditAddress,
    'add-address-form': EditAddress
  },
  data () {
    return {
      user: {},
      addresses: {},
      oneAddress: {},
      itemsC: [
        {
          index: '0',
          action: 'local_activity',
          title: 'Account',
          items: [
            {title: 'Basic Information', index: '00'},
            {title: 'User Logo', index: '01'}]
        },
        {
          index: '1',
          action: 'airport_shuttle',
          title: 'Shipping Address',
          items: [
            {title: 'Address', index: '11'}
          ]
        }
      ],
      itemsS: [
        {
          index: '0',
          action: 'local_activity',
          title: 'Account',
          items: [
            {title: 'Basic Information', index: '00'},
            {title: 'User Logo', index: '01'}]
        }
      ],
      addressHeaders: [
        {text: 'Consignee', value: 'consignee', width: '10%'},
        {text: 'Address', align: 'left', sortable: false, value: 'address', width: '50%'},
        {text: 'Contact Number', value: 'contact_num', sortable: false, width: '10%'},
        {text: 'Email', value: 'email', sortable: false, width: '10%'},
        {text: 'Post Code', value: 'post_code', sortable: false, width: '10%'},
        {text: 'Action', value: 'action', sortable: false, width: '10%'}
      ],
      showBasicInfo: true,
      showAddress: false,
      isCustomer: false,
      isAdmin: false,
      isAddAddress: false,
      isEditAddress: false,
      isUploadLogo: false,
      isEditAccount: false,
      isDeleteAddress: false,
      user_id: '',
      userName: '',
      userEmail: '',
      logoURL: null,
      address_id: '',
      avatar: null,
      saving: false,
      saved: false
    }
  },
  created () {
    this.getUser()
    this.getAddress()
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
    getUser () {
      this.user_id = sessionStorage.getItem('id')
      // console.log(this.user_id)

      this.user_role = sessionStorage.getItem('role')
      if (this.user_role === 'customer') {
        this.isCustomer = true
        this.isAdmin = false
        CustomerService.fetchCustomer(this.user_id).then(response => {
          this.user = response.data.data
          this.userName = this.user.name
          this.userEmail = this.user.username
        })
        CustomerService.fetchLogo(this.user_id).then(response => {
          this.logoURL = response.data.data
          console.log(this.logoURL)
        })
        console.log(this.logoURL)
      } else if (this.user_role === 'seller') {
        this.isCustomer = false
        this.isAdmin = false
        SellerService.fetchSeller(this.user_id).then(response => {
          this.user = response.data.data
          console.log(this.user)
          this.userName = this.user.name
          this.userEmail = this.user.username
        })
        SellerService.fetchLogo(this.user_id).then(response => {
          this.logoURL = response.data.data
          console.log(this.logoURL)
        })
      } else if (this.user_role === 'admin') {
        this.isCustomer = false
        this.isAdmin = true
        AdminServices.fetchAdmin(this.user_id).then(response => {
          this.user = response.data.data
          console.log(this.user)
          this.userName = this.user.name
          this.userEmail = this.user.username
        })
      }
    },
    getAddress () {
      // this.user_id = sessionStorage.getItem('id')
      CustomerService.fetchAddresses(this.user_id).then(response => {
        this.addresses = response.data.data
      })
    },
    editInfo (index) {
      if (index === '00') {
        this.isAddAddress = false
        this.isUploadLogo = false
        this.isDeleteAddress = false
        this.isEditAccount = false
        this.isEditAddress = false
        this.showAddress = false
        this.showBasicInfo = true
      } else if (index === '01') {
        this.isAddAddress = false
        this.isDeleteAddress = false
        this.isEditAccount = false
        this.isEditAddress = false
        this.showBasicInfo = false
        this.showAddress = false
        this.isUploadLogo = true
        // this.router.push('/uploadLogo')
      } else if (index === '11') {
        this.isAddAddress = false
        this.isUploadLogo = false
        this.isDeleteAddress = false
        this.isEditAccount = false
        this.isEditAddress = false
        this.showBasicInfo = false
        this.showAddress = true
      }
    },
    editUser () {
      this.showAddress = false
      this.isAddAddress = false
      this.isEditAddress = false
      this.isDeleteAddress = false
      this.showBasicInfo = false
      this.isUploadLogo = false
      this.isEditAccount = true
    },
    updateAccount: function (user, withoutpass) {
      if (this.user_role === 'customer') {
        if (withoutpass) {
          CustomerService.putCustomerWithoutPass(this.user._id, user).then(response => {
            // console.log(response.data.data)
            // // if (response.data.data !== null) {
            // //   this.errmsg = response.data.errmsg
            // // }
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
            // this.$router.push('/showAccount')
            }
          })
        } else {
          CustomerService.putCustomerWithPass(this.user._id, user).then(response => {
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        }
      } else if (this.user_role === 'seller') {
        if (withoutpass) {
          SellerService.putSellerWithoutPass(this.user._id, user).then(response => {
            // console.log(response.data.data)
            // // if (response.data.data !== null) {
            // //   this.errmsg = response.data.errmsg
            // // }
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        } else {
          SellerService.putSellerWithPass(this.user._id, user).then(response => {
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        }
      } else if (this.user_role === 'admin') {
        if (withoutpass) {
          AdminServices.putEditWithoutPass(this.user._id, user).then(response => {
            // console.log(response.data.data)
            // // if (response.data.data !== null) {
            // //   this.errmsg = response.data.errmsg
            // // }
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        } else {
          AdminServices.putEditWithPass(this.user._id, user).then(response => {
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.editInfo('00')
              // this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        }
      }
    },
    updataLogo: function (formData) {
      CustomerService.postLogo(sessionStorage.getItem('id'), formData).then(response => {
        if (response.data.data) {
          this.$router.go(0)
        }
      })
    },
    addAddress () {
      this.oneAddress = {
        // customer_id: this.user_id,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        province: '',
        country: '',
        contact_num: '',
        post_code: ''
      }
      this.showAddress = false
      this.isUploadLogo = false
      this.isEditAddress = false
      this.showAddress = false
      this.isEditAddress = false
      this.isDeleteAddress = false
      this.isAddAddress = true
    },
    createAddress (address) {
      console.log(address)
      CustomerService.postAddress(this.user_id, address).then(response => {
        console.log(response.data)
        if (response.data.data !== null) {
          // this.editInfo('11')
          this.$router.go(0)
        }
      })
    },
    editAddress (id) {
      CustomerService.fetchOneAddress(id).then(response => {
        if (response.data.data != null) {
          this.oneAddress = {
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            address: response.data.data.address,
            city: response.data.data.city,
            province: response.data.data.province,
            country: response.data.data.country,
            contact_num: response.data.data.contact_num,
            post_code: response.data.data.post_code
          }
          this.address_id = response.data.data._id
          console.log(this.address_id)
          this.showAddress = false
          this.isUploadLogo = false
          this.isEditAddress = false
          this.showAddress = false
          this.isAddAddress = false
          this.isDeleteAddress = false
          this.isEditAddress = true
        }
      })
    },
    updateAddress (address) {
      console.log(address)
      CustomerService.putAddress(this.user_id, this.address_id, address).then(response => {
        console.log(response.data)
        if (response.data.data !== null) {
          // this.editInfo('11')
          this.$router.go(0)
        }
      })
    },
    deleteAddressDialog (id) {
      this.address_id = id
      this.showAddress = false
      this.isUploadLogo = false
      this.isEditAddress = false
      this.showAddress = false
      this.isAddAddress = false
      this.isEditAddress = false
      this.isDeleteAddress = true
    },
    removeAddress () {
      CustomerService.deleteAddress(this.address_id).then(response => {
        console.log(response.data)
        if (response.data.data !== null) {
          // this.editInfo('11')
          this.$router.go(0)
        }
      })
    },
    cancelDialog () {
      this.showAddress = false
      this.isUploadLogo = false
      this.isEditAddress = false
      this.showAddress = true
      this.isAddAddress = false
      this.isEditAddress = false
      this.isDeleteAddress = false
    }
  }
}
</script>

<style scoped>

</style>
