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
        >
          <template v-slot:item.creationDate="{ item }">
            {{ new Date(item.creationDate).toString() }}
          </template>
        </v-data-table>
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
          text: "Date / Time",
          value: "creationDate"
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
          value: "playSessionId",
          sortable: false
        },
        {
          text: "Comment",
          value: "comment",
          sortable: false
        },
      ],
      reviews: []
    }),
    methods: {
      // Requests a list of reviews from the server.
      // Once update has been called, it refreshes automatically.
      update() {
        var self = this;
        Vue.axios({
          method: "get",
          url: "http://localhost:3000/feedback"
        }).then(function (response) {
          self.reviews = JSON.parse(response.data);
          setTimeout(() => {
            self.update();
          }, 5000);
        });
      }
    },
    created() {
      this.update();
    }
  }
</script>
