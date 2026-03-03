<template>
  <base-button @click="toggleDetails">Details</base-button>{{ title }}
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

<style scoped></style>
