import { Loader } from '@googlemaps/js-api-loader'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

import {
  categoriesOrganization,
  googleMapThemeDark,
  googleMapThemeLight,
} from '~/assets/constants.js'

export default {
  state: () => ({
    markers: [],
    renderedOrganizations: [],
    organizations: null,
    activeOrganization: null,
    googleInstance: null,
    categoriesOrganization,
    filter: {
      searchString: '',
      categories: [],
    },
    interface: {
      leftDrawer: null,
      googleMapThemeDark,
      googleMapThemeLight,
    },
  }),
  mutations: {
    setSearchString(state, str) {
      state.filter.searchString = str

      state.organizations.forEach((i) => {
        i.iternal.isVisibleCard = i.business_name
          .toLocaleLowerCase()
          .includes(str)
      })
    },
    setLeftDrawer(state) {
      state.interface.leftDrawer = !state.interface.leftDrawer
    },
    setOrganizations(state, orgs) {
      state.organizations = orgs
      // state.organizations = orgs.map((i) => {
      //   return {
      //     ...i,
      //     iternal: {
      //       isVisibleCard: true,
      //       isEqualCategory: true,
      //       isRendered: false,
      //     },
      //   }
      // })
    },
    setActiveOrganization(state, organizationId) {
      if (organizationId === null) {
        state.activeOrganization = null
      } else {
        state.activeOrganization = state.organizations[Number(organizationId)]
      }
    },
    setGoogleInstance(state) {
      state.googleInstance = new Loader({
        apiKey: 'AIzaSyASG9nSuUnqELk4s9BGVJCcc4evXxUOlqs',
        version: 'weekly',
      })
        .load()
        .then((google) => {
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 35.2067563, lng: -111.6066842 },
            zoom: 12,
            styles: state.interface.googleMapThemeLight,
          })
          return { google, map }
        })
        .then((props) => {
          const { google, map } = props
          const markers = []

          state.organizations.forEach((org, index) => {
            const marker = new google.maps.Marker({
              position: {
                lat: Number(org.address.lat),
                lng: Number(org.address.lng),
              },
              map,
              title: org.business_name,
              categories: org.category.category,
            })

            marker.addListener('click', () => {
              this.commit('setActiveOrganization', index)
            })
            markers.push(marker)
          })

          // console.log(map)
          // console.log(mapData)
          // map.data.addGeoJson(mapData)
          //
          // map.data.addListener('click', function (event) {
          //   map.data.overrideStyle(event.feature, { fillColor: 'red' })
          // })

          const flightPlanCoordinates = [
            { lat: 35.2280802, lng: -111.6553596 },
            { lat: 35.2022815, lng: -111.6668546 },
            { lat: 35.1933061, lng: -111.6961926 },
            { lat: 35.1724065, lng: -111.6910456 },
            { lat: 35.1481337, lng: -111.6795506 },
            { lat: 35.1505192, lng: -111.650041 },
            { lat: 35.178719, lng: -111.6466096 },
            { lat: 35.1872753, lng: -111.6316833 },
            { lat: 35.2034034, lng: -111.632198 },
            { lat: 35.2181263, lng: -111.6352862 },
            { lat: 35.2280802, lng: -111.6553596 },
          ]

          const flightPath = new google.maps.Polyline({
            clickable: false,
            path: flightPlanCoordinates,
          })
          map.data.setStyle({
            strokeOpacity: 0.5,
            fillColor: 'green',
            strokeWeight: 3,
          })
          flightPath.setMap(map)

          const clusters = new MarkerClusterer({ markers, map })
          return { google, map, markers, clusters }
        })
    },
    setAppTheme(state) {
      const theme = globalThis.$nuxt.$root.$vuetify.theme
      theme.dark = !theme.dark

      const currentTheme = theme.dark
        ? state.interface.googleMapThemeDark
        : state.interface.googleMapThemeLight

      state.googleInstance.then((props) => {
        props.map.setOptions({ styles: currentTheme })
      })
    },
    setActiveCategories(state, category) {
      const equalCategoryIndex = state.filter.categories.indexOf(category)

      if (equalCategoryIndex === -1) {
        state.filter.categories.push(category)
      } else {
        state.filter.categories.splice(equalCategoryIndex, 1)
      }

      state.organizations.forEach((i) => {
        i.iternal.isVisibleCard =
          !state.filter.searchString.length &&
          (!state.filter.categories.length ||
            state.filter.categories.includes(i.category.category[0]))
      })

      state.googleInstance.then(function ({ markers }) {
        markers.forEach((i, index) => {
          if (state.organizations[index].iternal.isVisibleCard) {
            i.setVisible(true)
          } else {
            i.setVisible(false)
          }
        })
      })
    },
  },
  actions: {
    async nuxtServerInit({ commit }, { $axios }) {
      await $axios
        .get('https://flagstaffresources.com/api/business')
        .then((business) => commit('setOrganizations', business.data))
    },
  },
}
