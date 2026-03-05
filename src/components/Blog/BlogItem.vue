<template>
  <base-button @click="toggleDetails" :class="{ active: viewDetails }"
    >Details</base-button
  >{{ title }}
  <div v-if="viewDetails">
    {{ date }}
    {{ comments }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewDetails: false,
    };
  },
  methods: {
    toggleDetails() {
      this.viewDetails = !this.viewDetails;
    },
  },
  props: {
    itemKey: { type: String, required: true, default: '' },
    title: { type: String, required: true, default: '' },
    comments: { type: String, required: false, default: '' },
    date: { type: String, required: true, default: '' },
  },
};
</script>

<style scoped>
button.active {
  /* color: #f1a80a; */
  color: #fff;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
