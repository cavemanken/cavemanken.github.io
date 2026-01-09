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
});

menu.mount("#menu");
