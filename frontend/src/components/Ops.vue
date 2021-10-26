<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          dense
          :headers="headers"
          :items="reviews"
          item-key="name"
          class="elevation-1"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from "vue";
  export default {
    name: 'Ops',
    data: () => ({
      headers: [
        {
          text: "Rating",
          align: "start",
          sortable: true,
          value: "rating"
        },
        {
          text: "User",
          value: "userId"
        },
        {
          text: "Game",
          value: "gameId"
        },
        {
          text: "Play Session",
          value: "playSessionId"
        },
        {
          text: "Comment",
          value: "comment"
        },
      ],
      reviews: []
    }),
    created() {
      var self = this;
      Vue.axios({
        method: "get",
        url: "http://localhost:3000/feedback"
      }).then(function (response) {
        self.reviews = JSON.parse(response.data);
      });
    }
  }
</script>
