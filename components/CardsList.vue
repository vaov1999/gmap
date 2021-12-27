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
      >
        <v-card-title
          style="cursor: pointer"
          @click="() => $store.commit('setActiveOrganization', index)"
          v-text="item.business_name"
        />
        <v-card-subtitle>
          <span class="success--text text-subtitle-1">
            <v-icon color="success">mdi-timer</v-icon>
            Opened Now
          </span>
          <span class="work-time ml-2 text-subtitle-1"
            >23:00 pm - 23:00 am</span
          >
          <div
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
              size="30"
              :value="0"
            ></v-rating>
            <span class="text-h6 rate-count" v-text="item.gradeCount" />
          </div>
        </v-card-subtitle>
        <v-card-text
          :id="`description-organization-${index}`"
          class="short-description description text-subtitle-1"
          v-html="item.short_description"
        />
        <div
          style="display: grid; grid-template-columns: auto 1fr; grid-gap: 20px"
        >
          <button
            class="ml-4 read-more"
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
            >
              {{ defineCategory(category) }}
            </v-icon>
          </div>
        </div>
        <v-card-actions>
          <v-btn block @click="showOnMap(index)">
            <v-icon>mdi-map-marker</v-icon>
            show on map
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
    showOnMap(orgIndex) {
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
  padding: 10px;
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
    -webkit-line-clamp: 3;
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
