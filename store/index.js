import { Loader } from '@googlemaps/js-api-loader'
import {
  googleMapThemeDark,
  googleMapThemeLight,
  categoriesOrganization,
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
      const orgsWithIternalProperties = orgs.map((i) => {
        return { ...i, iternal: { isEqualFilter: true, isRendered: false } }
      })

      state.organizations = orgsWithIternalProperties
      // this.commit('setRenderedOrganizations')
    },
    setRenderedOrganizations(state) {
      // const filteredOrgs = state.organizations.filter((i) => {
      //   if (!i.iternal.isRendered) return true
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
            zoom: 9,
            styles: state.googleMapThemeLight,
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

          return { google, map, markers }
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

      state.googleInstance.then(function ({ google, map, markers }) {
        markers.forEach((i) => {
          if (
            state.filter.categories.length === 0 ||
            state.filter.categories.includes(i.categories[0])
          ) {
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
