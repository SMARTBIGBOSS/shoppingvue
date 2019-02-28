<template>
  <div id="editaddress">
      <v-card>
        <v-card-title>Shipping Address
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation dark>
            <v-text-field v-model="consignee" :rules="[() => !!consignee || 'This field is required']" label="Consignee" required></v-text-field>

            <v-text-field v-model="address" :rules="[() => !!address || 'This field is required']" label="Address" required></v-text-field>

            <v-text-field v-model="city" :rules="[() => !!city || 'This field is required']" label="City/Town" required></v-text-field>

            <v-text-field v-model="province" :rules="[() => !!province || 'This field is required']" label="Province/Territory/County/State" required></v-text-field>

            <v-select v-model="country" :items="countries" :rules="[() => !!country || 'This field is required']" label="Country" required></v-select>

            <v-text-field v-model="contact_num" :rules="[() => !!contact_num || 'This field is required']" label="Contact Number" required></v-text-field>

            <v-text-field v-model="post_code" :rules="[() => !!post_code || 'This field is required']" label="Post Code" required></v-text-field>

            <v-btn color="indigo lighten-2" :disabled="!valid" @click="submitAddress">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'EditAddress',
  props: ['oneAddress', 'isAddAddress', 'isEditAddress'],
  data () {
    return {
      valid: true,
      consignee: this.oneAddress.consignee,
      address: this.oneAddress.address,
      city: this.oneAddress.city,
      province: this.oneAddress.province,
      country: this.oneAddress.country,
      contact_num: this.oneAddress.contact_num,
      post_code: this.oneAddress.post_code,
      countries: [
        'China',
        'Ireland'
      ],
      isAdd: this.isAddAddress,
      isEdit: this.isEditAddress
    }
  },
  methods: {
    submitAddress () {
      if (this.consignee === '' || this.address === '' || this.city === '' || this.province === '' || this.country === '' || this.contact_num === '' || this.post_code === '') {
        this.valid = false
      } else {
        console.log(this.isEdit)
        console.log(this.isAdd)
        let newAddress = {
          // customer_id: this.oneAddress.customer_id,
          consignee: this.consignee,
          address: this.address,
          city: this.city,
          province: this.province,
          country: this.country,
          contact_num: this.contact_num,
          post_code: this.post_code
        }
        if (this.isAdd) {
          console.log(this.isEdit)
          this.$emit('address-is-added', newAddress)
        }
        if (this.isEdit) {
          this.$emit('address-is-updated', newAddress)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
