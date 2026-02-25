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
