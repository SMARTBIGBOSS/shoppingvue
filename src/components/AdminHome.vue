<template>
  <div id="adminhome">
    <v-container fluid>
      <v-layout row>
        <v-flex xs6 sm4>
          <div id="navigation">
            <v-navigation-drawer stateless value="true">
              <v-list>
                <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="showInfo(subItem.index, subItem.title)">
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
          <div id="classiinfo">
            <template v-if="showDetail">
              <v-card>
                <v-card-title>
                  {{titlemessage}}
                  <v-spacer></v-spacer>
                  <v-btn color="blue lighten-2" dark @click="addClassi">Add</v-btn>
                </v-card-title>
                <v-data-table :headers="classiHeaders" :items="classification" fix-header>
                  <template slot="items" slot-scope="props">
                    <!--<tr>-->
                    <!--<td class="text-xs-right">{{ props.item.type }}</td>-->
                    <td class="text-xs-center">{{ props.item.title }}</td>
                    <td class="text-xs-center">{{ props.item.subtitle }}</td>
                      <td class="text-xs-center">{{ props.item.active }}</td>
                      <td class="justify-center layout px-0">
                        <v-icon small class="mr-2" @click="editClassi(props.item)">edit</v-icon>
                        <v-icon small @click="deleteClassiDialog(props.item._id)">delete</v-icon>
                      </td>
                  </template>
                </v-data-table>
              </v-card>
            </template>

            <template v-if="isAddClassi">
              <add-classification-form :oneClassification="oneClassification" :isAddClassi="isAddClassi" @classification-is-added="createClassi"></add-classification-form>
            </template>

            <template v-if="isEditClassi">
              <edit-classification-form :oneClassification="oneClassification" :isEditClassi="isEditClassi" @classification-is-updated="updateClassi"></edit-classification-form>
            </template>

            <template v-if="isDeleteClassi">
              <v-layout row justify-center>
                <v-dialog v-model="isDeleteClassi" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">Delete Classification</v-card-title>
                    <v-card-text>Are you sure to remove this classification?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="cancelDialog">Cancel</v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="removeClassi">Delete</v-btn>
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
import ClassificationServices from '../services/classificationServices'
import EditClassification from '@/components/EditClassification'

export default {
  name: 'AdminHome',
  components: {
    'add-classification-form': EditClassification,
    'edit-classification-form': EditClassification
  },
  data () {
    return {
      items: [
        {
          index: '0',
          action: 'local_activity',
          title: 'Classification',
          items: [
            {title: 'Region', index: '00'},
            {title: 'Category', index: '01'}
          ]
        }
      ],
      classiHeaders: [
        {text: 'Title', align: 'center', value: 'title', width: '20%'},
        {text: 'Subtitle', align: 'center', value: 'subtitle', width: '40%'},
        {text: 'Active', align: 'center', value: 'active', width: '20%'},
        {text: 'Action', align: 'center', value: 'action', sortable: false, width: '20%'}
      ],
      titlemessage: '',
      classification: [],
      oneClassification: {},
      classiId: '',
      showDetail: false,
      isAddClassi: false,
      isEditClassi: false,
      isDeleteClassi: false
    }
  },
  methods: {
    showInfo (index, title) {
      if (index === '00') {
        ClassificationServices.fetchClasByType(sessionStorage.getItem('id'), title).then(response => {
          this.classification = response.data.data
        })
        console.log(this.classification)
        this.titlemessage = 'Region'
        this.isAddClassi = false
        this.isEditClassi = false
        this.isDeleteClassi = false
        this.showDetail = true
      } else if (index === '01') {
        ClassificationServices.fetchClasByType(sessionStorage.getItem('id'), title).then(response => {
          this.classification = response.data.data
        })
        this.titlemessage = 'Type'
        this.isAddClassi = false
        this.isEditClassi = false
        this.isDeleteClassi = false
        this.showDetail = true
      }
    },
    addClassi () {
      this.oneClassification = {
        admin_id: sessionStorage.getItem('id'),
        type: '',
        title: '',
        subtitle: '',
        active: ''
      }
      this.showDetail = false
      this.isEditClassi = false
      this.isDeleteClassi = false
      this.isAddClassi = true
    },
    editClassi (item) {
      this.oneClassification = item
      this.classiId = item._id
      this.showDetail = false
      this.isAddClassi = false
      this.isDeleteClassi = false
      this.isEditClassi = true
    },
    deleteClassiDialog (id) {
      this.classiId = id
      this.showDetail = false
      this.isAddClassi = false
      this.isEditClassi = false
      this.isDeleteClassi = true
    },
    createClassi (classi) {
      console.log(classi.type)
      ClassificationServices.postClassification(sessionStorage.getItem('id'), classi).then(responds => {
        if (responds.data.data !== null) {
          if (classi.type === 'Region') {
            this.showInfo('00', 'Region')
          } else if (classi.type === 'Category') {
            this.showInfo('01', 'Category')
          }
          // this.$router.go(0)
        }
      })
    },
    updateClassi (classi) {
      ClassificationServices.putClassification(sessionStorage.getItem('id'), this.classiId, classi)
        .then(response => {
          if (response.data.data !== null) {
            if (classi.type === 'Region') {
              this.showInfo('00', 'Region')
            } else if (classi.type === 'Category') {
              this.showInfo('01', 'Category')
            }
          }
        })
    },
    removeClassi () {
      ClassificationServices.deleteClassification(sessionStorage.getItem('id'), this.classiId).then(response => {
        if (response.data.data !== null) {
          this.isDeleteClassi = false
          if (response.data.data.type === 'Region') {
            this.showInfo('00', 'Region')
          } else if (response.data.data.type === 'Category') {
            this.showInfo('01', 'Category')
          }
        }
      })
    },
    cancelDialog () {
      this.isEditClassi = false
      this.isAddClassi = false
      this.isDeleteClassi = false
      this.showDetail = true
    }
  }
}
</script>

<style scoped>

</style>
