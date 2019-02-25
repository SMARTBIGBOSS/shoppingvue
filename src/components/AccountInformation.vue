<template>
  <div id="accountinfo">
    <v-container fluid>
      <v-layout row>
    <div id="navigation">
    <v-flex xs4 sm6>
      <v-navigation-drawer stateless value="true">
        <v-list>
          <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
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
    </v-flex>
    </div>
    <div id="detailinfo">
      <v-flex xs8 sm6>
        <template v-if="showBasicInfo">
          <v-card>
            <v-card-title>Account Information
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="submitAccount">
                <div>
                  <v-label>Name</v-label>
                  <v-input></v-input>
                </div>
              </form>
            </v-card-text>
          </v-card>
        </template>
        <template v-if="showAddress">
          <v-card>
            <v-card-title>Shipping Information
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <edit-product-form :product="product" @product-is-added-updated="updataProduct"></edit-product-form>
            </v-card-text>
          </v-card>
        </template>
      </v-flex>
    </div>
  </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AccountInformation',
  data () {
    return {
      items: [
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
      showBasicInfo: true,
      showAddress: false
    }
  },
  methods: {
    editInfo (index) {
      if (index === '00') {
        this.showAddress = false
        this.showBasicInfo = true
      } else if (index === '01') {
        this.router.push('/uploadLogo')
      } else if (index === '11') {
        this.showBasicInfo = false
        this.showAddress = true
      }
    }
  }
}
</script>

<style scoped>

</style>
