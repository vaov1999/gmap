<template>
  <div style="height: 100%; width: 100%" id="map"></div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'

export default {
  name: 'IndexPage',
  mounted() {
    let map = null
    new Loader({
      apiKey: 'AIzaSyASG9nSuUnqELk4s9BGVJCcc4evXxUOlqs',
      version: 'weekly',
    })
      .load()
      .then((google) => {
        map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        })
      })

    console.log(map)
  },
}
</script>
