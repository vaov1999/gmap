<template>
  <div>
    <div
      v-if="!$store.state.organizations"
      class="d-flex justify-center align-center"
      style="height: 100px"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <template v-else>
      <v-card
        v-for="(item, index) in $store.state.organizations"
        :key="index"
        class="card mt-5"
        v-show="
          $store.state.filter.categories.length === 0 ||
          $store.state.filter.categories.includes(item.category.category[0])
        "
      >
        <v-card-title
          style="cursor: pointer; line-height: 1.4rem"
          class="text-subtitle-1 font-weight-bold"
          @click="() => openOrganization(index)"
          v-text="item.business_name"
        />
        <v-card-subtitle class="pb-0">
          <span class="success--text text-body-2 mr-2 mt-2">
            <v-icon dense color="success">mdi-timer</v-icon>
            Opened Now
          </span>
          <span class="work-time text-body-2 pt-2">23:00 pm - 23:00 am</span>
        </v-card-subtitle>
        <div
          class="pl-3"
          style="
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
            align-items: center;
          "
        >
          <v-rating
            class="rating"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half-full"
            hover
            length="5"
            size="25"
            :value="0"
          ></v-rating>
          <span class="text-h6 rate-count" v-text="item.gradeCount" />
        </div>
        <v-card-text
          :id="`description-organization-${index}`"
          class="pt-0 short-description description text-body-2 font-weight-light"
          v-html="item.short_description"
        />
        <div
          style="display: grid; grid-template-columns: auto 1fr; grid-gap: 20px"
        >
          <button
            class="ml-4 read-more text-body-2"
            style="cursor: pointer"
            @click="
              toggleDescriptionHeight(
                `description-organization-${index}`,
                index
              )
            "
          >
            Read more
          </button>
          <div class="categories">
            <v-icon
              v-for="(category, indexCategory) in item.category.category"
              :key="indexCategory"
              dense
            >
              {{ defineCategory(category) }}
            </v-icon>
          </div>
        </div>
        <v-card-actions>
          <v-btn class="text-body-2" @click="showOnMap(index)">
            <v-icon dense>mdi-map-marker</v-icon>
            show
          </v-btn>
          <v-btn class="text-body-2" @click="() => openOrganization(index)">
            <v-icon dense>mdi-open-in-app</v-icon>
            details
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    focusOnMarker(orgIndex) {
      const org = this.$store.state.organizations[orgIndex]
      this.$store.state.googleInstance.then((props) => {
        const { map } = props
        map.setZoom(17)
        map.setCenter({
          lat: Number(org.address.lat),
          lng: Number(org.address.lng),
        })
      })
    },
    showOnMap(orgIndex) {
      if (window.innerWidth <= 768) {
        this.$store.commit('setLeftDrawer')
      }
      this.focusOnMarker(orgIndex)
    },
    openOrganization(orgIndex) {
      this.focusOnMarker(orgIndex)
      this.$store.commit('setActiveOrganization', orgIndex)
    },
    defineCategory(category) {
      const categories = this.$store.state.categoriesOrganization

      for (const key in categories) {
        if (categories[key].name === category) return categories[key].icon
      }
    },
    toggleDescriptionHeight(idTitle) {
      const descriptionElement = document.getElementById(idTitle)
      if (descriptionElement.classList.contains('short-description')) {
        descriptionElement.classList.remove('short-description')
      } else {
        descriptionElement.classList.add('short-description')
      }
    },
  },
}
</script>
<style lang="scss">
.rate-count {
  padding: 5px;
  color: var(--v-primary-base);
}
.categories {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  i {
    padding: 0 5px;
  }
}
.description {
  p {
    margin-bottom: 0;
  }
}
.read-more {
  cursor: pointer;
  &:hover {
    color: var(--v-primary-base);
    text-decoration: underline;
  }
}
.short-description {
  max-height: 80px;
  overflow: hidden;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}

@media (max-width: $xxs) {
  .rating {
    button {
      padding: 5px !important;
    }
  }
  .work-time {
    display: block;
  }
}
</style>
