const menu = Vue.createApp({
  data() {
    return {
      linkText:
        "https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing",
      menu: [
        ["Shepherd Acrostic.pdf", "Shepherding Acrostic.pdf", "_blank"],
        [
          "Shepherding - First Connections with Class Participants.pdf",
          "First Connections.pdf",
          "_blank",
        ],
        [
          "Shepherding Role Descriptions.pdf",
          "Shepherding Role Descriptions.pdf",
          "_blank",
        ],
        [
          "Shepherding Through Grief.pdf",
          "Shepherding Through Grief.pdf",
          "_blank",
        ],
        [
          "2025-08-20 What Does Shepherding Look Like.pdf",
          "My Notes for Shepherding.pdf",
          "_blank",
        ],
        ["CBSBookmark.pdf", "CBSBookmark.pdf", "_self"],
        ["CBSBookmark2.pdf", "CBSBookmark2.pdf", "_self"],
        [
          "Bible Book Abbreviations Bookmarks.pdf",
          "Bible Book Abbreviations Bookmarks.pdf",
          "_blank",
        ],
        [
          "Year 1 Puzzles and Patterns Lesson.pdf",
          "Year 1 Puzzles and Patterns Lesson",
          "_blank",
        ],
        [
          "Lesson 3_ Longing for God.pdf",
          "Lesson 3_ Longing for God.pdf",
          "_blank",
        ],
        [
          "Psalms Leadership Development Ideas.pdf",
          "Psalms Leadership Development Ideas.pdf",
          "_blank",
        ],
        [
          "Leadership Development Resources.pdf",
          "Leadership Development Resources.pdf",
          "_blank",
        ],
        [
          "What is Leadership Development.pdf",
          "What is Leadership Development.pdf",
          "_blank",
        ],
        ["Gospel Conversations.pdf", "Gospel Conversations.pdf", "_self"],
        ["Sharing the Gospel.pdf", "Sharing the Gospel.pdf", "_self"],
        [
          "Leadership Development Helps.pdf",
          "Leadership Development Helps.pdf",
          "_blank",
        ],
        [
          "2025-10-23 The Path of Life – A Devotion on the Psalms.pdf",
          "2025-10-23 The Path of Life - A Devotion on the Psalms.pdf",
          "_blank",
        ],
        [
          "2025-12-04 Opening - Country Link.pdf",
          "2025-12-04 Opening - Country Link.pdf",
          "_blank",
        ],
        [
          "AsTheDeerLyrics.pdf",
          "AsTheDeerLyrics.pdf",
          "_blank",
        ],
        // ***add new items above ***
        [
          "https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing",
          "AV Shared Google Link",
          "_blank",
        ],
      ],
    };
  },
  methods: {
    copyToClipboard() {
      // Get the text field

      // Select the text field
      // linkText.select();
      // linkText.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      //navigator.clipboard.writeText(linkText.value);
      navigator.clipboard.writeText(this.linkText);
    },
  },
});

menu.mount("#menu");

