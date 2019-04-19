<template>
  <div>
    <template v-if="ready">
      <gmap-map
        :center="center"
        :zoom="zoom"
        style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :label="m.label"
          @click="center=m.position; showInfoWindow(m)"
        ></gmap-marker>

        <gmap-info-window
          @closeclick="infoWinOpen=false"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          :options="{
            pixelOffset: {
              width: 0,
              height: -45
            }
          }"
        >
          <strong>{{infoContent}}</strong>
        </gmap-info-window>

        <gmap-polyline v-bind:path.sync="path"
                       v-bind:options="{strokeColor:'#008000'}">
        </gmap-polyline>
      </gmap-map>
    </template>
  </div>
</template>

<script>

export default {
  name: 'GoogleMap',
  props: ['geoLocation'],
  data () {
    return {
      center: null,
      zoom: null,
      // center: 'sydney',
      locations: this.geoLocation,
      markers: [],
      bounds: [],
      path: [],
      clientWidth: '',
      ready: false,
      infoWinOpen: false,
      infoWindowPos: {lat: 0, lng: 0},
      infoContent: ''
    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.geolocate()
  },
  methods: {
    async load () {
      await this.addMarker()
      await this.addPath()
      await this.setCenter()
      // if (this.center && this.markers && this.path) {
      this.ready = true
      // }
    },
    setCenter () {
      let maxLat = this.locations[0].location.lat
      let maxLng = this.locations[0].location.lng
      let minLat = this.locations[0].location.lat
      let minLng = this.locations[0].location.lng
      for (let i = 0; i < this.locations.length; i++) {
        maxLat = Math.max(maxLat, this.locations[i].location.lat)
        maxLng = Math.max(maxLng, this.locations[i].location.lng)
        minLat = Math.min(minLat, this.locations[i].location.lat)
        minLng = Math.min(minLng, this.locations[i].location.lng)
        if (i === this.locations.length - 1) {
          let angle2 = maxLat - minLat
          let angle = maxLng - minLng
          this.center = {
            lat: minLat + angle2 / 2,
            lng: minLng + angle / 2
          }
          this.zoom = this.getBoundsZoomLevel(maxLat, minLat, maxLng, minLng)
        }
      }
    },
    getBoundsZoomLevel (maxLat, minLat, maxLng, minLng) {
      let WORLD_DIM = { height: 256, width: 256 }
      let ZOOM_MAX = 21
      this.clientWidth = `${document.documentElement.clientWidth}`
      // console.log(this.clientWidth)
      function latRad (lat) {
        let sin = Math.sin(lat * Math.PI / 180)
        let radX2 = Math.log((1 + sin) / (1 - sin)) / 2
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
      }

      function zoom (mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
      }

      let ne = {lat: maxLat, lng: maxLng}
      let sw = {lat: minLat, lng: minLng}

      let latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI

      let lngDiff = ne.lng - sw.lng
      let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360

      let latZoom = zoom(400, WORLD_DIM.height, latFraction)
      let lngZoom = zoom(this.clientWidth, WORLD_DIM.width, lngFraction)

      return Math.min(latZoom, lngZoom, ZOOM_MAX)
    },
    addMarker () {
      // let contentString = '<div id="conten">' +
      //   '<h1>Description: </h1>' +
      //   '<p>{{trackInfo.StatusDescription}}</p>' +
      //   '<h1>Details: </h1>' +
      //   '<p>{{trackInfo.Details}}</p>' +
      //   '</div>'

      for (let i = 0; i < this.locations.length; i++) {
        let place = this.locations[i]
        this.markers.push({
          position: {lat: place.location.lat, lng: place.location.lng},
          label: {
            text: place.index.toString(),
            color: '#000000',
            fontSize: '16px',
            fontWeight: 'bold'
          },
          title: place.location.address,
          zIndex: place.index
        })
      }
    },
    showInfoWindow (marker) {
      this.infoWindowPos = {lat: marker.position.lat, lng: marker.position.lng}
      this.infoContent = marker.title
      console.log(this.infoContent)
      this.infoWinOpen = true
    },
    addPath () {
      let temp = this.locations
      temp.sort(function (a, b) {
        return a.index - b.index
      })
      for (let i = 0; i < temp.length; i++) {
        this.path.push({lat: temp[i].location.lat, lng: temp[i].location.lng})
      }
    },
    geolocate: function () {
      this.clientWidth = `${document.documentElement.clientWidth}`
    }
  }
}
</script>

<style scoped>

</style>
