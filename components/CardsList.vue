<template>
  <div>
    <v-card v-for="(item, index) in list" :key="index" class="card mt-5">
      <v-card-title v-text="item.title" />
      <v-card-subtitle>
        <span class="success--text text-subtitle-1">
          <v-icon color="success">mdi-timer</v-icon>
          Opened Now
        </span>
        <span class="work-time ml-2 text-subtitle-1">23:00 pm - 23:00 am</span>
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
            :value="item.stars"
          ></v-rating>
          <span class="text-h6 rate-count" v-text="item.gradeCount" />
        </div>
      </v-card-subtitle>
      <v-card-text class="text-subtitle-1"
        >The v-card component is a versatile component that can be used for
        anything from a panel to a static image. The card component has numerous
        helper components to make markup as easy as possible. Components that
        have no listed options use Vue’s functional component option for faster
        rendering and serve as markup sugar to make building easier. Try out an
        interactive screencast on how</v-card-text
      >
      <div class="tags">
        <v-icon>mdi-heart</v-icon>
        <v-icon>mdi-home</v-icon>
      </div>
      <v-card-actions>
        <v-btn block>
          <v-icon>mdi-map-marker</v-icon>
          show on map
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: '24 hour Crisis Line',
          isOpened: true,
          stars: 3.2,
          gradeCount: 3.2,
          description:
            'A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is ',
          lastEdited: '10/30/2021',
          tags: ['HEALTH'],
        },
        {
          title: 'Abundant Life Preschool',
          isOpened: false,
          stars: 5,
          gradeCount: 5,
          description:
            'A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is ',
          lastEdited: '10/30/2021',
          tags: ['HEALTH', 'EDUCATION'],
        },
        {
          title: '24 hour Crisis Line Crisis Line',
          isOpened: true,
          stars: 3,
          gradeCount: 3.1,
          description:
            'A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is A 24 hr crisis line. If you, or someone you know, is having an urgent mental health situation, there is ',
          lastEdited: '10/30/2021',
          tags: ['HEALTH'],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.rate-count {
  padding: 5px;
  color: var(--v-primary-base);
}
.tags {
  padding: 10px;
  display: flex;
  justify-content: center;
  i {
    padding: 0 5px;
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
