<template>
  <div id="editclassi">
    <v-card>
      <v-card-title>Classification Information
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation dark>
          <v-text-field v-model="title"  :rules="[v => !!v || 'Title is required']" label="Title" required></v-text-field>

          <v-text-field v-model="subtitle" :rules="[v => !!v || 'Subtitle is required']" label="Subtitle" required></v-text-field>

          <v-checkbox v-model="active" label="Is it active?" required></v-checkbox>

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
  props: ['oneClassification'],
  data () {
    return {
      valid: true,
      title: this.oneClassification.title,
      subtitle: this.oneClassification.subtitle,
      active: this.oneClassification.active
    }
  },
  methods: {
    updateClassi () {

    }
  }
}
</script>

<style scoped>

</style>
