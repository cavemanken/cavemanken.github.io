const app = Vue.createApp({
  data() {
    return {
      cbsPrintingLink: "CBS.html",
    };
  },
  computed: {
    readingList() {
      const list = [];
      this.readingPlan.forEach((reading, index) => {
        if (
          index >= this.readingLocation &&
          index <
            parseInt(this.readingLocation) + parseInt(this.readingListSize)
        ) {
          list.push(reading);
        }
      });
      return list;
    },
  },
  methods: {
    buildReadingList(forward) {
      if (forward) {
        this.readingLocation++;
      } else {
        if (this.readingLocation > 0) {
          this.readingLocation--;
        }
      }
      this.updateLocalStorage();
    },
    buttonDisabled(index) {
      if (index === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
});

app.mount("#plan");
