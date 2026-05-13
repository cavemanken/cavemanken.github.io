<template>
  <base-card
    ><h2>Welcome to cmk63.org!</h2>
    <a href="bucket-list.html">Bucket List</a>
    <br />
    <a href="campsite-reviews.html">Campsite Reviews</a>
    <br />
    <a href="expense-tracker.html">Expense Tracker</a>
    <br />
    <a href="game-tracker.html">Game Tracker</a>
    <br />
    <a href="pre-haul-checklist.html">Pre-Haul Checklist </a>
    <br />
    <a href="family-tree.html">Family Tree</a>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      test: 'frontend',
      title: 'Home',
    };
  },
  //   mounted() {
  //     console.log('mounted home page xxxxx');
  //     const proxyUrl = 'https://api.allorigins.win/get';
  //     this.fetchRSSWithProxy(proxyUrl, 'https://www.crossway.org/articles/rss/');
  //   },
  //   methods: {
  //     async fetchRSSWithProxy(proxyUrl, rssUrl) {
  //       try {
  //         const response = await fetch(
  //           `${proxyUrl}?url=${encodeURIComponent(rssUrl)}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const rssText = await response.text();
  //         console.log('asoneuh');
  //         console.log(rssText);
  //         const rssData = JSON.parse(rssText);
  //         console.log('Parsed RSS data:', rssData);
  //       } catch (error) {
  //         console.error('Error fetching RSS feed through proxy:', error);
  //       }
  //     },
  //   },
};
</script>
