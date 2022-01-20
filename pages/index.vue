<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>

export default {
  name: 'IndexPage',
  mounted() {
    this.$store.commit('setGoogleInstance')
  },
}
</script>
