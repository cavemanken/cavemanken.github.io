<template>
  <router-link to="/rv/PreHaul">Pre-Haul Checklist</router-link>
  <router-link to="/rv/Winterize">Winterize Checklist</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      rvMenuSubitems: [
        {
          link: 'RVPreHaulChecklist.html',
          linkDesc: 'Pre-haul Checklist',
          target: '_blank',
        },
        {
          link: 'RVWinterizeChecklist.html',
          linkDesc: 'Winterize Steps Checklist',
          target: '_blank',
        },
      ],
    };
  },
};
</script>

<style scoped>
a {
  margin-left: 10px;
  margin-top: 3px;
  border: 1px solid transparent;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  padding: 5px 10px 5px 10px;
  display: inline-block;
  background: gray;
}

a:hover,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
