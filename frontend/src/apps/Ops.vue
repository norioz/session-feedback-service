<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Game Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/test-game-logo.png')"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Game Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          :src="require('@/assets/test-game-name-dark.png')"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://unity.com"
        target="_blank"
        text
      >
        <span class="mr-2">Hosted by Unity</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Ops />
    </v-main>
  </v-app>
</template>

<script>
import Ops from "@/components/Ops";

export default {
  name: 'OpsApp',
  components: {
    Ops,
  },
  data: () => ({
    //
  }),
};
</script>
