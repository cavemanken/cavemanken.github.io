const menu = Vue.createApp({
  data() {
    return {
      linkText:
        "https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing",
      menu: [
        ["RVPreHaulChecklist.html", "Pre-haul Checklist", "_self"],
        ["RVWinterizeChecklist.html", "Winterize Steps Checklist", "_self"],
      ],
    };
  },
});

menu.mount("#menu");
