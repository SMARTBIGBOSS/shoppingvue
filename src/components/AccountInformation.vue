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
                        <img :src="`https://randomuser.me/api/portraits/men/22.jpg`" class="image" alt="lorem" width="100%" height="100%">
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
              <edit-account-form :user="user" :isCustomer="isCustomer" @user-is-updated="updateAccount"></edit-account-form>
            </template>

            <template v-if="showAddress">
              <v-card>
                <v-card-title>
                  Shipping Address
                  <v-spacer></v-spacer>
                  <v-btn color="blue lighten-2" dark @click="addProduct">Add</v-btn>
                </v-card-title>
                <!--<v-data-table :headers="productHeaders" :items="products">-->
                  <!--<template slot="items" slot-scope="props" v-if="isShowData">-->
                    <!--<td class="justify-center layout px-0">-->
                      <!--<v-avatar :size="40">-->
                        <!--<img :src="props.item.imgPath" v-if="props.item.imgPath !== ''">-->
                      <!--</v-avatar>-->
                    <!--</td>-->
                    <!--<td>{{ props.item.name }}</td>-->
                    <!--<td class="text-xs-right">{{ props.item.price }}</td>-->
                    <!--<td class="text-xs-right">{{ props.item.stock }}</td>-->
                    <!--<td class="text-xs-right">{{ props.item.class_region_id }}</td>-->
                    <!--<td class="text-xs-right">{{ props.item.class_type_id }}</td>-->
                    <!--&lt;!&ndash;<td class="text-xs-right">{{ props.item.catalogue_id }}</td>&ndash;&gt;-->
                    <!--<td class="text-xs-right">{{ props.item.isShow }}</td>-->
                    <!--<td class="justify-center layout px-0">-->
                      <!--<v-icon small class="mr-2" @click="editProduct(props.item._id)">edit</v-icon>-->
                      <!--<v-icon small @click="deleteProduct(props.item._id)">delete</v-icon>-->
                    <!--</td>-->
                    <!--<td>-->
                      <!--<v-btn color="blue lighten-2" dark @click="uploadImg">Upload Image</v-btn>-->
                    <!--</td>-->
                  <!--</template>-->
                  <!--&lt;!&ndash;<v-alert slot="no-results" :value="true" color="error" icon="warning">&ndash;&gt;-->
                  <!--&lt;!&ndash;Your search for "{{ search }}" found no results.&ndash;&gt;-->
                  <!--&lt;!&ndash;</v-alert>&ndash;&gt;-->
                <!--</v-data-table>-->
              </v-card>
            </template>

            <template v-if="isEditAddress">
              <edit-address-form :address="address" @address-is-updated="updateAddress"></edit-address-form>
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

export default {
  name: 'AccountInformation',
  components: {
    'edit-account-form': EditAccount,
    'edit-address-form': EditAddress
  },
  data () {
    return {
      user: {},
      address: {},
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
          action: 'school',
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
      showBasicInfo: true,
      showAddress: false,
      isCustomer: false,
      isEditAddress: false,
      isEditAccount: false,
      user_id: '',
      userName: '',
      userEmail: ''
    }
  },
  created () {
    this.getUser()
    this.getAddress()
  },
  methods: {
    getUser () {
      this.user_id = sessionStorage.getItem('id')
      // console.log(this.user_id)

      this.user_role = sessionStorage.getItem('role')
      if (this.user_role === 'customer') {
        this.isCustomer = true
        CustomerService.fetchCustomer(this.user_id).then(response => {
          this.user = response.data.data
          this.userName = this.user.name
          this.userEmail = this.user.username
          // console.log(this.user.name)
        })
      } else if (this.user_role === 'seller') {
        this.isCustomer = false
        SellerService.fetchSeller(this.user_id).then(response => {
          this.user = response.data.data
          console.log(this.user)
          this.userName = this.user.name
          this.userEmail = this.user.username
        })
      }
    },
    getAddress () {

    },
    editInfo (index) {
      if (index === '00') {
        this.isEditAccount = false
        this.isEditAddress = false
        this.showAddress = false
        this.showBasicInfo = true
      } else if (index === '01') {
        this.router.push('/uploadLogo')
      } else if (index === '11') {
        this.isEditAccount = false
        this.isEditAddress = false
        this.showBasicInfo = false
        this.showAddress = true
      }
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
              this.$router.go(0)
            // this.$router.push('/showAccount')
            }
          })
        } else {
          CustomerService.putCustomerWithPass(this.user._id, user).then(response => {
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.$router.go(0)
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
              this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        } else {
          SellerService.putSellerWithPass(this.user._id, user).then(response => {
            if (response.data.data !== null) {
              sessionStorage.setItem('name', user.name)
              this.$router.go(0)
              // this.$router.push('/showAccount')
            }
          })
        }
      }
    },
    updateAddress () {

    },
    editUser () {
      this.showBasicInfo = false
      this.isEditAccount = true
    },
    editAddress () {
      this.showAddress = false
      this.isEditAddress = true
    }
  }
}
</script>

<style scoped>

</style>
