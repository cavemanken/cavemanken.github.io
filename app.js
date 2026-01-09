const menu = Vue.createApp({
  data() {
    return {
      menu: [
        ["CelestialViewing.html", "Celestial Viewing", "_self"],
        ["CBS.html", "CBS Printing", "_self"],
        ["Print.html", "Printing", "_self"],
        [
          "Progressive Rummy Rules.pdf",
          "Rules for Progressive Rummy",
          "_blank",
        ],
        ["RVMain.html", "RV Main", "_blank"],
        ["verses.pdf", "God's Will For You", "_blank"],
      ],
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

menu.mount("#menu");
