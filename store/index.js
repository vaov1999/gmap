export default {
  state: () => ({
    organizations: 0,
  }),
  mutations: {
    setOrganizations(state, items) {
      state.organizations = items
    },
  },
  actions: {
    getOrganizations({ commit }) {
      this.$axios
        .get('https://flagstaffresources.com/api/business')
        .then((business) => commit('setOrganizations', business.data))
    },
  },
}
