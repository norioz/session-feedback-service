<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/test-game-logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Please rate your match
        </h1>
        <v-rating
          v-model="rating"
          bg-color="orange-lighten-1"
          color="blue"
          size="100"
        />
        <v-row
          class="mt-6"
          align="center"
          justify="center"
        >
          <v-textarea
            outlined
            style="max-width:500px;"
            name="input-7-4"
            label="Comment"
            v-model="comment"
          />
        </v-row>
        <v-row
          class="mt-6"
          align="center"
          justify="center"
        >
          <v-btn
            @click="submit"
            color="primary"
            elevation="2"
            large
          >
            Submit
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from "vue";
  export default {
    name: 'Feedback',
    data: () => ({
      gameId: "client-test-game-id",
      userId: "client-test-game-user-id",
      playSessionId: "playSessionId",
      rating: 1,
      comment: "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    }),
    methods: {
      submit: function() {
        Vue.axios({
          method: "post",
          url: "http://localhost:3000/feedback",
          data: {
            gameId: this.gameId,
            userId: this.userId,
            playSessionId: this.playSessionId,
            rating: this.rating,
            comment: this.comment
          }
        })
      }
    }
  }
</script>
