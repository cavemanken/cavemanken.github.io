localStorage.removeItem("readingLocation");
if (localStorage.getItem("bible.readingLocation") == null) {
  localStorage.setItem("bible.readingLocation", -1);
}
var localStorageReadingLocation = parseInt(
  localStorage.getItem("bible.readingLocation")
);

const app = Vue.createApp({
  data() {
    return {
      readingPlan: readings,
      readingLocation: localStorageReadingLocation,
      readingListSize: 20,
    };
  },
  computed: {
    readingList() {
      const list = [];
      this.readingPlan.forEach((reading, index) => {
        if (
          index >= this.readingLocation &&
          index < this.readingLocation + this.readingListSize
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
    updateLocalStorage() {
      localStorage.setItem("bible.readingLocation", this.readingLocation);
    },
  },
});

app.mount("#plan");
