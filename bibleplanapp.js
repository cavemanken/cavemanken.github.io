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
      console.log("building...");
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
      console.log("updating reading location", this.readingLocation);
      if (forward) {
        this.readingLocation++;
      } else {
        this.readingLocation--;
      }
      this.updateReadingLocation();
    },
    buttonDisabled(index) {
      if (index === 0) {
        return false;
      } else {
        return true;
      }
    },
    updateReadingLocation() {
      localStorage.setItem("bible.readingLocation", this.readingLocation);
      console.log("lc", localStorage.getItem("bible.readingLocation"));
    },
  },
});

app.mount("#plan");
