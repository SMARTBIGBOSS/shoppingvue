<template>
  <div class="homepage">
    <v-container fluid grid-list-md>
    <v-layout column>
      <v-layout row wrap>
        <v-flex xs6 sm4 md2>
        <div id="Asia">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >Asia</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
        <div id="Africa">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >Africa</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
        <div id="Europe">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >Europe</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
        <div id="NorthAmerica">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >North America</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
        <div id="SouthAmerica">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >South America</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
        <div id="Oceania">
          <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
            <v-btn slot="activator" color="success" >Oceania</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="searchByRegion">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 sm5 md3>
        <div id="toolbar">
          <v-navigation-drawer permanent>
            <v-toolbar flat class="green lighten-4">
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">Category</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <v-list-tile v-for="(category,i) in categories" :key="i" @click="searchByCategory">
                <v-list-tile-content>{{category.title}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </div>
        </v-flex>

        <v-flex xs6 sm7 md9>
            <div id="advertise">
              <v-carousel height="400px">
                <v-carousel-item v-for="(item,i) in items" :key="i">
                  <img :src="item" style="width:100%; height:100%;">
                </v-carousel-item>
              </v-carousel>
            </div>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="product in products" :key="product._id" v-bind="{['xs3']: true}">
                <v-card>
                  <v-img :src="product.detail_id.path[0]" height="200px" :aspect-ratio="1" contain/>
                  <v-card-actions>
                    <v-btn flat class="text-none" @click="viewProduct(product._id)">{{product.name}}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import ClassificationService from '@/services/classificationServices'
import ProductService from '@/services/productServices'

export default {
  name: 'HomePage',
  data () {
    return {
      items: ['/static/advertise/1.jpg', '/static/advertise/2.jpg', '/static/advertise/3.jpg',
        '/static/advertise/4.jpg', '/static/advertise/5.jpg', '/static/advertise/6.jpg'
      ],
      categories: [],
      products: []
    }
  },
  created () {
    this.getCategory()
    this.getProducts()
  },
  methods: {
    getCategory () {
      ClassificationService.fetchActiveClasByType('Category').then(response => {
        if (response.data.data !== null) {
          let temp = response.data.data
          // console.log(temp)
          for (let i = 0; i < temp.length; i++) {
            // console.log(temp[i].title)
            for (let j = i + 1; j < temp.length; j++) {
              // console.log(temp[j].title)
              if (temp[i].title === temp[j].title) {
                ++i
              }
            }
            this.categories.push(temp[i])
          }
          // console.log(this.categories)
        }
      })
    },
    getProducts () {
      ProductService.fetchAllProducts().then(response => {
        if (response.data.data) {
          this.products = response.data.data
        }
      })
    },
    viewProduct (id) {
      this.$router.params = id
      this.$router.push('/product')
    },
    serachByRegion () {

    },
    searchByCategory () {

    },
    searchByRegion () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
