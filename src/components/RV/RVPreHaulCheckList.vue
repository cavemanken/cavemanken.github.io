<template>
  <header>
    <h2>RV Pre-Haul Checklist</h2>
  </header>
  <section id="checklist">
    <ul>
      <li v-for="item in checklist" :key="item">
        <input type="checkbox" :id="item" />
        <label :for="item">{{ item }}</label>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checklist: [
        'Connect battery',
        'Secure TV',
        'Close bathroom vent',
        'Close all windows',
        'Clear countertop',
        'Close all cupboards and drawers',
        'Raise stabilizers',
        'Raise stairs',
        'Turn off propane tanks',
        'Check tires',
        'Connect to Sequoia',
        'Check lights',
        'Remove wheel chocks',
        'Get dump station stuff ready',
      ],
    };
  },
};
</script>

<style scoped>
header {
  margin-left: 30px;
}
ul {
  list-style: none;
}
li {
  margin: 10px;
}
section {
  font-size: 24px;
}
</style>
