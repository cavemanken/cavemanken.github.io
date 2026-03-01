<!-- To make changes and push to my web site:
  1) Make changes to the code and test ("npm run serve")
  2) Use github desktop to commit AND push your code changes
  3) To update the website with the new changes:
    a) run "npm run build" to create new dist directory
    b) Use github desktop to commit and push changes again
    c) Run "npm run deploy" to push dist changes to the gh-pages branch
  ---- OR ----
    a) run "npm run build-and-deploy" to do steps a-c above in one step  

  ---- OR ----

  To push all code changes and build changes at the same time:
  4) run "npm run build-and-deploy" to do all of the above in one step

  -------------------
  5) gh-pages branch will automatically deploy to the website
   -->

<template>
  <!-- <the-header title="cmk63.org"></the-header> -->
  <!-- <is-authenticated></is-authenticated> -->
  <the-navigation></the-navigation>
  <router-view></router-view>
</template>

<script>
// import TheHeader from './components/layouts/TheHeader.vue';
import TheNavigation from './components/TheNavigation/TheNavigation.vue';
// import IsAuthenticated from './components/IsAuthenticated.vue';

export default {
  components: {
    // TheHeader,
    TheNavigation,
    // IsAuthenticated,
  },
  data() {
    return {};
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
