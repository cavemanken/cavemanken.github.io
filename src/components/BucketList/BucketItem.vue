<template>
  <base-button @click="toggleDetails">Details</base-button>{{ desc }}
  <div v-if="viewDetails">
    {{ goalDate }}
    {{ completedDate }}
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
    desc: { type: String, required: true, default: '' },
    comments: { type: String, required: false, default: '' },
    goalDate: { type: String, required: true, default: '' },
    completedDate: { type: String, required: false, default: '' },
  },
};
</script>

<style scoped></style>
