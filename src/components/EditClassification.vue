<template>
  <div id="editclassi">
    <v-card>
      <v-card-title class="headline">Classification Information
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation dark>
          <v-select v-model="type" :items="class_typeItems" :rules="[v => !!v || 'This field is required']" label="Classification Type" required></v-select>

          <v-text-field v-model="title"  :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>

          <v-text-field v-model="subtitle" :rules="[v => !!v || 'Subtitle is required']" label="Subtitle" required></v-text-field>

          <v-checkbox v-model="active" label="Is it active?"></v-checkbox>

          <v-btn color="indigo lighten-2" :disabled="!valid" @click="updateClassi">Submit</v-btn>
          <!--<div class="display-1 font-weight-thin red&#45;&#45;text">{{errmsg}}</div>-->
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'EditClassification',
  props: ['oneClassification', 'isAddClassi', 'isEditClassi'],
  data () {
    return {
      valid: true,
      admin_id: this.oneClassification.admin_id,
      type: this.oneClassification.type,
      title: this.oneClassification.title,
      subtitle: this.oneClassification.subtitle,
      active: this.oneClassification.active,
      class_typeItems: [
        {text: 'Region', value: 'Region'},
        {text: 'Category', value: 'Category'}
      ],
      isAdd: this.isAddClassi,
      isEdit: this.isEditClassi
    }
  },

  methods: {
    updateClassi () {
      console.log(this.type)
      if (this.type === '' || this.title === '' || this.subtitle === '' || this.active === '') {
        this.valid = false
      } else {
        let newClassi = {
          admin_id: this.admin_id,
          type: this.type,
          title: this.title,
          subtitle: this.subtitle,
          active: this.active
        }
        if (this.isAdd) {
          this.$emit('classification-is-added', newClassi)
          this.valid = false
        } else if (this.isEdit) {
          this.$emit('classification-is-updated', newClassi)
          this.valid = false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
