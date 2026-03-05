<template>
  <base-button @click="toggleDetails" :class="{ active: viewDetails }"
    >Details</base-button
  >{{ desc }}
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

<style scoped>
button.active {
  /* color: #f1a80a; */
  color: #fff;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
