const checklist = Vue.createApp({
  data() {
    return {
      checklist: [
        { name: "Turn off the water heater switch on outside unit" },
        { name: "Empty all 3 holding tanks completely and close them" },
        { name: "Open hot and cold low point drains" },
        {
          name: "When the fresh water tank is completely empty, run the pump to pull any water out of the pump supply line -- Or -- disconnect the supply line at the water pump to drain it",
        },
        {
          name: "Open all faucets",
          subitems: [
            { name: "Kitchen Sink" },
            { name: "Bathroom Sink" },
            { name: "Indoor Shower" },
            { name: "Outdoor Shower" },
            { name: "Hold down toilet flusher" },
            { name: "Open water heater pressure relief valve" },
            { name: "Let drain" },
          ],
        },
        { name: "Close hot and cold low point drains" },
        { name: "Close all faucets" },
        { name: "Open valve to antifreeze pickup line (under couch)" },
        { name: "Put clear hose (antifreeze pickup line) into RV antifreeze" },
        { name: "Turn on pump" },
        {
          name: "Open one faucet at a time until pink antifreeze flows, then close",
          subitems: [
            { name: "Kitchen Sink" },
            { name: "Bathroom Sink" },
            { name: "Toilet" },
            { name: "Indoor Shower" },
            { name: "Outdoor Shower" },
          ],
        },
        { name: "Turn off water pump" },
        {
          name: "Depressurize the system by opening a faucet for a few seconds",
        },
        { name: "Open low point drains (should see antifreeze come out)" },
        { name: "Close low point drains" },
        {
          name: "Push in on check valve for city water",
          subitems: [
            { name: "If you see antifreeze, then you are done" },
            {
              name: "Otherwise, have someone run the pump for 2 seconds while you're holding the checkvalve",
            },
          ],
        },
        { name: "Close valve to antifreeze pickup line (under couch)" },
        { name: "Open water heater pressure relief valve" },
        {
          name: "Pour some antifreeze into drains and black tank flush input",
          subitems: [
            { name: "Kitchen Sink (Both Sides)" },
            { name: "Bathroom Sink" },
            { name: "Toilet (flush down a little so all seals are covered)" },
            { name: "Indoor Shower" },
            { name: "Black Tank Flush Input (Did not do in 2025)" },
          ],
        },
        { name: "Empty black and gray holding tanks" },
        { name: "YOU ARE DONE!" },
      ],
    };
  },
});

checklist.mount("#checklist");
