const menu = Vue.createApp({
  data() {
    return {
      linkText:
        "https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing",
      menu: [
        ["RVPreHaulChecklist.html", "Pre-haul Checklist", "_self"],
        ["RVWinterize.html", "Winterize Steps", "_self"],
      ],
    };
  },
});

menu.mount("#menu");
