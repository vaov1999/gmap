<template>
  <v-app>
    <v-navigation-drawer
      v-model="leftDrawer"
      :clipped="clipped"
      fixed
      app
      class="left-drawer"
    >
      <div class="pa-3">
        <div style="display: grid; grid-template-columns: 1fr auto; grid-gap: 15px">
          <v-btn block class="gb-button-wrap">
            <v-icon left> mdi-phone </v-icon>
            Need assistance call 928-832-2324
          </v-btn>
          <v-btn>
            <v-icon> mdi-content-copy </v-icon>
          </v-btn>
        </div>

        <div
          style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 15px;
            margin-top: 10px;
          "
        >
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn class="gb-button-wrap" v-bind="attrs" v-on="on">
                <v-icon left> mdi-heart </v-icon>
                Health
              </v-btn>
            </template>
            Search for local Health organizations
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="gb-button-wrap">
                <v-icon left> mdi-food </v-icon>
                Food
              </v-btn>
            </template>
            Search for local food organizations
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="gb-button-wrap">
                <v-icon left> mdi-home </v-icon>
                Housing
              </v-btn>
            </template>
            Search for local ???
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn class="gb-button-wrap" v-bind="attrs" v-on="on" >
                <v-icon left> mdi-school </v-icon>
                Education
              </v-btn>
            </template>
            Search for local education organizations
          </v-tooltip>
        </div>
        <div
          style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 15px"
          class="mt-3 mb-3"
        >
          <v-btn>
            <v-icon> mdi-filter </v-icon>
            Filter
          </v-btn>
          <v-btn class="gb-button-wrap">
            <v-icon>mdi-timer</v-icon>
            Show visible only
          </v-btn>
        </div>

        <!--        <div class="d-flex mt-2 justify-space-between">-->
        <!--          <v-tooltip bottom>-->
        <!--            <template #activator="{ on, attrs }">-->
        <!--              <v-btn class="ma-3" fab large v-bind="attrs" v-on="on">-->
        <!--                <v-icon dark> mdi-filter </v-icon>-->
        <!--              </v-btn>-->
        <!--            </template>-->
        <!--            Filter items-->
        <!--          </v-tooltip>-->
        <!--          <v-tooltip bottom>-->
        <!--            <template #activator="{ on, attrs }">-->
        <!--              <v-btn class="ma-3" fab large v-bind="attrs" v-on="on">-->
        <!--                <v-icon dark> mdi-youtube </v-icon>-->
        <!--              </v-btn>-->
        <!--            </template>-->
        <!--            Watch tutorial-->
        <!--          </v-tooltip>-->
        <!--          <v-tooltip bottom>-->
        <!--            <template #activator="{ on, attrs }">-->
        <!--              <v-btn class="ma-3" fab large v-bind="attrs" v-on="on">-->
        <!--                <v-icon dark> mdi-login-variant </v-icon>-->
        <!--              </v-btn>-->
        <!--            </template>-->
        <!--            Sign Up-->
        <!--          </v-tooltip>-->
        <!--          <v-tooltip bottom>-->
        <!--            <template #activator="{ on, attrs }">-->
        <!--              <v-btn class="ma-3" fab large v-bind="attrs" v-on="on">-->
        <!--                <v-icon dark> mdi-login </v-icon>-->
        <!--              </v-btn>-->
        <!--            </template>-->
        <!--            Log In-->
        <!--          </v-tooltip>-->
        <!--        </div>-->
        <CardsList></CardsList>
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" />
      <v-toolbar-title v-text="title" />
      <!--      <v-spacer />-->
      <v-text-field
        append-icon="mdi-magnify"
        placeholder="Search your place"
        class="ma-7"
      />
      <v-btn @click.stop="miniVariant = !miniVariant">
        Menu
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'left' : 'right'}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      width="300"
      right
    >
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          link
        >
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
            </template>
            <span v-text="item.title"></span>
          </v-tooltip>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>Copyright © Flagstaff Resources HUB. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      leftDrawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-magnify',
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
          title: 'Legal disclaimer',
          to: '/Legal-disclaimer',
        },
        {
          icon: 'mdi-plus-circle-outline',
          title: 'ADD A LISTING',
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
      miniVariant: true,
      right: true,
      rightDrawer: true,
      title: 'Flagstaff',
    }
  },
  mounted() {
    console.log(this.$vuetify)
  },
}
</script>

<style lang="scss">
@import 'assets/main';
.left-drawer {
  width: 450px !important;
  //.v-btn__content {
  //  width: 100%;
  //  white-space: normal;
  //}
}
</style>
