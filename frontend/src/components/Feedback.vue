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
          <v-dialog
            transition="dialog-bottom-transition"
            persistent
            max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="submit"
                color="primary"
                elevation="2"
                large
                v-on="on"
                v-bind="attrs"
              >
                Submit
              </v-btn>
            </template>
            <template v-slot:default>
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >Test Game</v-toolbar>
                <v-card-text>
                  <v-col
                    align="center"
                    justify="center"
                  >
                    <div class="text-h2 pa-12">Thank you for your feedback!</div>
                    <div>[DEBUG] Reload the page to submit again.</div>
                  </v-col>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import { v4 as uuidv4 } from "uuid";
  export default {
    name: 'Feedback',
    data: () => ({
      gameId: "client-test-game-id",
      userId: "client-test-game-user-id",
      playSessionId: uuidv4(),
      rating: 1,
      comment: ""
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
    },
    created: function () {
      const url = new URL(location.href);
      const userId = url.searchParams.get('user');
      const gameId = url.searchParams.get('game');
      const playSessionId = url.searchParams.get('session');
      if (userId) this.userId = userId;
      if (gameId) this.gameId = gameId;
      if (playSessionId) this.playSessionId = playSessionId;
    }
  }
</script>
