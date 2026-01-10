const checklist = Vue.createApp({
  data() {
    return {
      checklist: [
        "Connect battery",
        "Secure TV",
        "Close bathroom vent",
        "Close all windows",
        "Clear countertop",
        "Close all cupboards and drawers",
        "Raise stabilizers",
        "Raise stairs",
        "Turn off propane tanks",
        "Check tires",
        "Connect to Sequoia",
        "Check lights",
        "Remove wheel chocks",
        "Get dump station stuff ready",
      ],
    };
  },
});

checklist.mount("#checklist");
