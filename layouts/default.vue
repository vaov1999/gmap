<template>
  <v-app>
    <v-navigation-drawer
      v-model="leftDrawer"
      fixed
      app
      class="left-drawer"
      width="320px"
    >
      <div v-show="activeOrganization" class="pa-2">
        <v-btn
          fab
          class="close-button close-button--active-organization"
          @click="() => $store.commit('setActiveOrganization', null)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h1 v-if="activeOrganization">
          {{ activeOrganization.business_name }}
        </h1>
      </div>
      <div v-show="!activeOrganization" class="pa-2">
        <v-btn
          v-if="leftDrawer"
          fab
          class="close-button"
          @click.stop="leftDrawer = !leftDrawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <img
          class="left-logo"
          src="@/assets/images/logo_without_name.png"
          alt=""
        />
        <div
          class="mt-3"
          style="display: grid; grid-template-columns: 1fr auto; grid-gap: 15px"
        >
          <v-btn block class="gb-button-wrap text-caption">
            <v-icon left> mdi-phone </v-icon>
            Need assistance call <br />
            928-832-2324
          </v-btn>
          <v-btn height="100%" min-width="0">
            <v-icon dense> mdi-content-copy </v-icon>
          </v-btn>
        </div>
        <div
          style="
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 15px;
          "
          class="mt-3 mb-3"
        >
          <v-btn height="100%" class="text-caption">
            <v-icon left dense> mdi-filter </v-icon>
            Filter
          </v-btn>
          <v-btn class="gb-button-wrap text-caption">
            <v-icon left dense>mdi-timer</v-icon>
            Show visible only
          </v-btn>
        </div>
        <p class="text-subtitle-2 mt-5 mb-1">Show only:</p>
        <div
          style="
            display: grid;
            grid-template-columns: auto auto auto auto auto;
            grid-gap: 15px;
          "
        >
          <v-tooltip
            v-for="(category, index) in categoriesOrganization"
            :key="index"
            bottom
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="pa-0"
                v-on="on"
                style="min-width: 1px"
              >
                <v-icon dense> {{ category.icon }} </v-icon>
              </v-btn>
            </template>
            Search for local {{ category.name }} organizations
          </v-tooltip>
        </div>
        <p class="text-subtitle-2 mt-5 mb-0">Business list:</p>
        <CardsList></CardsList>
      </div>
    </v-navigation-drawer>
    <v-app-bar fixed app dense>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            @click="leftDrawer = !leftDrawer"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        {{ leftDrawer ? 'Hide' : 'Show' }} left filer panel
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
        <v-list-item v-for="(item, i) in items" :key="i" class="pl-2 pr-2">
          <v-list-item-action class="ml-1 mr-3">
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2" v-text="item.title" />
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

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      leftDrawer: true,
      rightDrawer: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-youtube',
          title: 'Watch Tutorial',
          to: '/watch-tutorial',
        },
        {
          icon: 'mdi-information-variant',
          title: 'info',
          to: '/Legal-disclaimer',
        },
        {
          icon: 'mdi-plus-circle-outline',
          title: 'listening',
          to: '/add-a-listing',
        },
        {
          icon: 'mdi-information-outline',
          title: 'Learn More',
          to: '/learn-more',
        },
        {
          icon: 'mdi-login-variant',
          title: 'Sign Up',
          to: '/sign-up',
        },
        {
          icon: 'mdi-login',
          title: 'Log In',
          to: '/log-in',
        },
      ],
    }
  },
  computed: {
    ...mapState(['activeOrganization', 'categoriesOrganization']),
  },
  created() {
    this.$store.dispatch('getOrganizations')
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

@media (max-width: 500px) {
  .left-logo {
    display: block;
  }
  .close-button {
    display: flex;
  }
  .left-drawer {
    width: 100% !important;
  }
}
</style>
