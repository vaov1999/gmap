<template>
  <v-app>
    <v-navigation-drawer
      :value="$store.state.interface.leftDrawer"
      fixed
      app
      class="left-drawer"
      width="340"
      mobile-breakpoint="768"
      @input="setLeftDrawer()"
    >
      <div v-show="activeOrganization" class="pa-2">
        <v-btn @click="$store.commit('setActiveOrganization', null)">
          CLOSE
        </v-btn>
        <h1 v-if="activeOrganization">
          {{ activeOrganization.business_name }}
        </h1>
      </div>
<!--      <div v-show="!activeOrganization" class="pa-2">-->
<!--        <img-->
<!--          class="left-logo"-->
<!--          src="@/assets/images/logo_without_name.png"-->
<!--          alt=""-->
<!--        />-->
<!--        <div-->
<!--          class="mt-3"-->
<!--          style="display: grid; grid-template-columns: 1fr auto; grid-gap: 15px"-->
<!--        >-->
<!--          <v-btn block class="gb-button-wrap text-caption">-->
<!--            <v-icon left> mdi-phone </v-icon>-->
<!--            Need assistance call <br />-->
<!--            928-832-2324-->
<!--          </v-btn>-->
<!--          <v-btn height="100%" min-width="0">-->
<!--            <v-icon dense> mdi-content-copy </v-icon>-->
<!--          </v-btn>-->
<!--        </div>-->
<!--        <div-->
<!--          style="-->
<!--            display: grid;-->
<!--            grid-template-columns: auto auto;-->
<!--            grid-gap: 15px;-->
<!--          "-->
<!--          class="mt-3 mb-3"-->
<!--        >-->
<!--          <v-btn height="100%" class="text-caption">-->
<!--            <v-icon left dense> mdi-filter </v-icon>-->
<!--            Filter-->
<!--          </v-btn>-->
<!--          <v-btn class="gb-button-wrap text-caption">-->
<!--            <v-icon left dense>mdi-timer</v-icon>-->
<!--            Show opened only-->
<!--          </v-btn>-->
<!--        </div>-->
<!--        <p class="text-subtitle-2 mt-5 mb-1">Show only:</p>-->
<!--        <div-->
<!--          style="-->
<!--            display: grid;-->
<!--            grid-template-columns: auto auto auto auto auto;-->
<!--            grid-gap: 15px;-->
<!--          "-->
<!--        >-->
<!--          <v-tooltip-->
<!--            v-for="(category, index) in categoriesOrganization"-->
<!--            :key="index"-->
<!--            bottom-->
<!--          >-->
<!--            <template #activator="{ on, attrs }">-->
<!--              <v-btn-->
<!--                :disabled="$store.state.filter.searchString.length > 0"-->
<!--                v-bind="attrs"-->
<!--                class="pa-0"-->
<!--                :class="{-->
<!--                  primary: $store.state.filter.categories.includes(-->
<!--                    category.name-->
<!--                  ),-->
<!--                }"-->
<!--                style="min-width: 1px"-->
<!--                v-on="on"-->
<!--                @click="$store.commit('setActiveCategories', category.name)"-->
<!--              >-->
<!--                <v-icon dense> {{ category.icon }} </v-icon>-->
<!--              </v-btn>-->
<!--            </template>-->
<!--            Search for local {{ category.name }} organizations-->
<!--          </v-tooltip>-->
<!--        </div>-->
<!--        <p class="text-subtitle-2 mt-5 mb-0">Business list:</p>-->
<!--        <CardsList></CardsList>-->
<!--      </div>-->
    </v-navigation-drawer>
    <v-app-bar fixed app dense>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" @click="setLeftDrawer" v-on="on">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        {{ $store.state.interface.leftDrawer ? 'Hide' : 'Show' }} left filer
        panel
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            class="pa-0"
            @click="$store.commit('setAppTheme')"
            v-on="on"
          >
            <v-icon v-show="$vuetify.theme.dark">mdi-lightbulb-off</v-icon>
            <v-icon v-show="!$vuetify.theme.dark">mdi-lightbulb</v-icon>
          </v-btn>
        </template>
        Toggle app light\dark theme
      </v-tooltip>
      <!--      <img height="100%" src="@/assets/images/logo_without_name.png" alt="" />-->
      <v-text-field
        append-icon="mdi-magnify"
        placeholder="Search your place"
        class="ma-7 ma-sm-2"
        @input="search"
      />
      <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" app right width="150">
      <div class="d-flex justify-center mt-3">
        <img width="80%" src="@/assets/images/logo.png" alt="Flagstaff" />
      </div>
      <v-list>
        <v-list-item
          v-for="(route, i) in routesMenu"
          :key="i"
          class="pl-2 pr-2"
        >
          <v-list-item-action class="ml-1 mr-3">
            <v-icon dense>{{ route.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2" v-text="route.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer style="height: 20px" class="pa-1 justify-center">
      <span style="font-size: 10px; text-align: center"
        >Copyright © Flagstaff Resources HUB. All rights reserved.</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { routesMenu } from '~/assets/constants.js'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      rightDrawer: null,
      routesMenu,
      searchDelayTimer: null,
    }
  },
  computed: {
    ...mapState(['activeOrganization', 'categoriesOrganization']),
  },
  methods: {
    setLeftDrawer(value) {
      if (this.leftDrawer !== value) {
        this.$store.commit('setLeftDrawer')
      }
    },
    search(event) {
      clearTimeout(this.searchDelayTimer)
      const vm = this
      this.searchDelayTimer = setTimeout(function () {
        vm.$store.commit('setSearchString', event.trim().toLowerCase())
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
@import 'assets/main';
.left-logo {
  display: none;
  height: 70px;
}
.close-button {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.close-button--active-organization {
  display: flex;
}

@media (max-width: 400px) {
  .left-drawer {
    width: 80% !important;
  }
}
</style>
