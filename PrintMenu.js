const menu = Vue.createApp({
  data() {
    return {
      menu: [
        ["SuperCapeBinder.pdf", "SuperCapeBinder.pdf", "_blank"],
        ["importantprintinginstructions.pdf", "instructions.pdf", "_blank"],
        [
          "Safeguard Cancelation Form-1.pdf",
          "Safeguard Cancelation Form-1.pdf",
          "_blank",
        ],
        [
          "Assurant Cancellation Form.pdf",
          "Assurant Cancellation Form.pdf",
          "_blank",
        ],
        ["Wisemen2.pdf", "Wisemen2.pdf", "_blank"],
        ["2026AmbetterKen.pdf", "2026AmbetterKen.pdf", "_blank"],
        ["2026AmbetterJenny.pdf", "2026AmbetterJenny.pdf", "_blank"],
      ],
    };
  },
});

menu.mount("#menu");
