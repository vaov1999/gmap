import { Loader } from '@googlemaps/js-api-loader'
import {
  googleMapThemeDark,
  googleMapThemeLight,
  categoriesOrganization,
} from '~/assets/constants.js'

export default {
  state: () => ({
    organizations: null,
    activeOrganization: null,
    googleInstance: null,
    categoriesOrganization,
    filter: {
      categories: [],
    },
    interface: {
      leftDrawer: null,
      googleMapThemeDark,
      googleMapThemeLight,
    },
  }),
  mutations: {
    setLeftDrawer(state) {
      state.interface.leftDrawer = !state.interface.leftDrawer
    },
    setOrganizations(state, orgs) {
      state.organizations = orgs
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
            zoom: 9,
            styles: state.googleMapThemeLight,
          })
          return { google, map }
        })
        .then((props) => {
          const { google, map } = props
          state.organizations.forEach((org, index) => {
            const marker = new google.maps.Marker({
              position: {
                lat: Number(org.address.lat),
                lng: Number(org.address.lng),
              },
              map,
              title: org.business_name,
            })

            marker.addListener('click', () => {
              this.commit('setActiveOrganization', index)
            })
          })
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
    setActiveCategories(state, name) {
      const searchResult = state.filter.categories.indexOf(name)

      if (searchResult === -1) state.filter.categories.push(name)
      else state.filter.categories.splice(searchResult, 1)
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
