<template>
  <base-dialog
    :show="tryingToMakeChanges"
    title="Error"
    @close="handleAdminDialog"
    >You must login to make updates.
  </base-dialog>
  <header>
    <h2 @dblclick="toggleAdminMode">{{ title }}</h2>
  </header>
  <ul v-if="showItems">
    <li
      v-for="(item, index) in this.$store.getters['printing/menuItems']"
      :key="index"
    >
      <print-link
        :link-key="item.key"
        :link="item.link"
        :link-desc="item.linkDesc"
        :link-target="item.target"
        :admin-mode="
          adminMode &&
          $store.getters.token &&
          item.link !==
            'https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing'
        "
        @save-item="saveItem"
        @delete-item="deleteItem"
      ></print-link>
    </li>
  </ul>
  <base-button v-if="adminMode && $store.getters.token" @click="addNewLink">
    Add New Link
  </base-button>

  <form
    v-if="addMode"
    @submit.prevent="addItem(addedLink, addedLinkDesc, addedLinkTarget)"
  >
    <div class="addLink">
      <label>Link:</label
      ><input
        @change="addedLinkDesc = addedLink"
        type="text"
        v-model="addedLink"
      /><br />
      <label>Link Description:</label
      ><input id="linkDescInput" type="text" v-model="addedLinkDesc" /><br />
      <label>Target:</label
      ><input type="text" v-model="addedLinkTarget" /><br />
      <label></label><base-button type="submit">Save</base-button>
      <base-button @click="addMode = false">Cancel</base-button>
    </div>
  </form>

  <!--
  <base-button @click="postLinks()">Post Links</base-button>
  <base-button @click="updateLinks()">Put Links</base-button>
  <base-button @click="getLinksTest()">Get Links Test</base-button>
  <base-button @click="deleteLinks">Delete Links</base-button>
  <base-button @click="showLinksData()">Show Links Data</base-button>
  <base-button @click="saveAll()">Save All</base-button> 
  -->
</template>

<script>
export default {
  watch: {
    mode(newMode) {
      this.handleModeChange(newMode);
    },
  },
  props: ['mode'],
  created() {
    this.handleModeChange(this.mode);
  },
  methods: {
    handleAdminDialog() {
      this.tryingToMakeChanges = false;
    },
    // ******************************************************************************
    async getLinksNew() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('printing/getMenuItems', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
        });
        // ??? not sure if this is the correct way to get at store items once they've been loaded ???
        // this.menuItems = this.$store.state.printing.menuItems;
        this.menuItems = this.$store.getters['printing/menuItems'];
        // sort menuItems by linkDesc
        this.menuItems.sort((a, b) => {
          const descA = a.linkDesc.toUpperCase();
          const descB = b.linkDesc.toUpperCase();
          if (descA < descB) {
            return -1;
          }
          if (descA > descB) {
            return 1;
          }
          return 0;
        });
      } catch (err) {
        this.error = err.message || 'Failed to load menuItems.';
      }
      this.isLoading = false;
    },
    // ******************************************************************************
    // PUT method replaces everything at the specified index with what ever is in the body
    // This is what I'm using for updates and inserts
    async updateLink(key) {
      const element = this.menuItems.find((item) => item.key === key);
      console.log('updateLink called for keyxxxxxx:', key, element.linkDesc);
      this.isLoading = true;
      try {
        console.log('printing/getMenuItems...');
        await this.$store.dispatch('printing/updateMenuItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
          link: element.link,
          linkDesc: element.linkDesc,
          linkTarget: element.target,
        });
      } catch (err) {
        this.error = err.message || 'Failed to load menuItems.';
        alert(this.error);
      }
      this.getLinksNew();
      this.isLoading = false;
    },

    // ******************************************************************************
    // this uses POST to create a new link, get the key, and then pushes that link onto the menuItems array
    async createLink(link, linkDesc, linkTarget) {
      this.isLoading = true;
      try {
        console.log('printing/getMenuItems...');
        await this.$store.dispatch('printing/createMenuItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          link: link,
          linkDesc: linkDesc,
          linkTarget: linkTarget,
        });
        this.getLinksNew();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load menuItems.';
        alert(this.error);
      }
      this.isLoading = false;
    },

    // ******************************************************************************
    async deleteLink(key) {
      console.log('DeleteLink called with key:', key);
      this.isLoading = true;
      try {
        console.log('printing/getMenuItems...');
        await this.$store.dispatch('printing/deleteMenuItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
        });
      } catch (err) {
        this.error = err.message || 'Failed to delete.';
      }
      this.getLinksNew();
      this.isLoading = false;
    },

    // ******************************************************************************
    handleModeChange(newMode) {
      this.adminMode = false;
      // console.log('handleModeChange called with mode:', newMode);
      this.showItems = false; // had to toggle this so edit items would redraw correctly without data from other lists
      setTimeout(() => {
        this.showItems = true;
      }, 500);

      this.firebaseProjectLink =
        'https://cmk63project-default-rtdb.firebaseio.com/';

      if (newMode === 'cbs') {
        this.dbName = 'my_cbs_links';
        this.title = 'CBS Printing';
      } else if (newMode === 'me') {
        this.dbName = 'my_print_links';
        this.title = 'My Printing';
      } else {
        this.dbName = 'my_cbs_links';
        this.title = 'CBS Printing';
      }
      this.getLinksNew();
    },

    // ******************************************************************************
    addItem(link, linkDesc, linkTarget) {
      // console.log('addItem called for', linkDesc);
      // put in database first to get key
      // then use that key to add to menuItems
      // this.createLinkAndPushToArray(link, linkDesc, linkTarget);
      this.createLink(link, linkDesc, linkTarget);
      this.addMode = false;
    },

    // ******************************************************************************
    addNewLink() {
      this.addMode = true;
      this.addedLink = '';
      this.addedLinkDesc = '';
      this.addedLinkTarget = '_blank';
    },

    // ******************************************************************************
    deleteItem(key) {
      // console.log('deleteItem called for', key);
      // here I am....need to make delete work with keys not indexes
      // this.menuItems = this.menuItems.filter((item) => item.key !== key);
      this.deleteLink(key);
    },

    // ******************************************************************************
    saveItem(key, link, linkDesc, linkTarget) {
      // console.log(
      //   ' aoeu saveItem called for key:',
      //   key,
      //   link,
      //   linkDesc,
      //   linkTarget
      // );
      this.menuItems.find((item) => item.key === key).link = link;
      this.menuItems.find((item) => item.key === key).linkDesc = linkDesc;
      this.menuItems.find((item) => item.key === key).target = linkTarget;
      this.updateLink(key);
    },

    // ******************************************************************************
    toggleAdminMode() {
      if (this.$store.state.auth.token) {
        this.adminMode = !this.adminMode;
      } else {
        this.tryingToMakeChanges = true;
      }
    },

    // ******************************************************************************
    showLinksData() {
      console.log('showLinksData called:', this.menuItems);
    },
  },

  data() {
    return {
      tryingToMakeChanges: false,
      adminMode: false,
      showItems: true,
      addMode: false,
      dbName: 'my_cbs_links',
      title: 'CBS Printing',
      // menuItems: [],
      addedLink: '',
      addedLinkDesc: '',
      addedLinkTarget: '_blank',
      // ************************************************
      // hold these until we get a secure database set up
      // ************************************************
      // menuItems: [
      //   {
      //     link: 'Shepherding Through Grief.pdf',
      //     linkDesc: 'Shepherding Through Grief.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: '2025-08-20 What Does Shepherding Look Like.pdf',
      //     linkDesc: 'My Notes for Shepherding.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Psalms Leadership Development Ideas.pdf',
      //     linkDesc: 'Psalms Leadership Development Ideas.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Leadership Development Resources.pdf',
      //     linkDesc: 'Leadership Development Resources.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'What is Leadership Development.pdf',
      //     linkDesc: 'What is Leadership Development.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Gospel Conversations.pdf',
      //     linkDesc: 'Gospel Conversations.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Sharing the Gospel.pdf',
      //     linkDesc: 'Sharing the Gospel.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Leadership Development Helps.pdf',
      //     linkDesc: 'Leadership Development Helps.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'AsTheDeerLyrics.pdf',
      //     linkDesc: 'AsTheDeerLyrics.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Devotion for Psalm 42.pdf',
      //     linkDesc: 'Devotion for Psalm 42.pdf',
      //     target: '_blank',
      //   },
      //   // {
      //   //   link: 'Shepherd Acrostic.pdf',
      //   //   linkDesc: 'Shepherding Acrostic.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Shepherding - First Connections with Class Participants.pdf',
      //   //   linkDesc: 'First Connections.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Shepherding Role Descriptions.pdf',
      //   //   linkDesc: 'Shepherding Role Descriptions.pdf',
      //   //   target: '_blank',
      //   // },
      //   //           {
      //   //             link: 'Shepherding Through Grief.pdf',
      //   //             linkDesc: 'Shepherding Through Grief.pdf',
      //   //             target: '_blank',
      //   //           },
      //   //           {
      //   //             link: '2025-08-20 What Does Shepherding Look Like.pdf',
      //   //             linkDesc: 'My Notes for Shepherding.pdf',
      //   //             target: '_blank',
      //   //           },
      //   // {
      //   //   link: 'CBSBookmark.pdf',
      //   //   linkDesc: 'CBSBookmark.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'CBSBookmark2.pdf',
      //   //   linkDesc: 'CBSBookmark2.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Bible Book Abbreviations Bookmarks.pdf',
      //   //   linkDesc: 'Bible Book Abbreviations Bookmarks.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Year 1 Puzzles and Patterns Lesson.pdf',
      //   //   linkDesc: 'Year 1 Puzzles and Patterns Lesson',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Lesson 3_ Longing for God.pdf',
      //   //   linkDesc: 'Lesson 3_ Longing for God.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Psalms Leadership Development Ideas.pdf',
      //   //   linkDesc: 'Psalms Leadership Development Ideas.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Leadership Development Resources.pdf',
      //   //   linkDesc: 'Leadership Development Resources.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'What is Leadership Development.pdf',
      //   //   linkDesc: 'What is Leadership Development.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Gospel Conversations.pdf',
      //   //   linkDesc: 'Gospel Conversations.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Sharing the Gospel.pdf',
      //   //   linkDesc: 'Sharing the Gospel.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'Leadership Development Helps.pdf',
      //   //   linkDesc: 'Leadership Development Helps.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: 'AsTheDeerLyrics.pdf',
      //   //   linkDesc: 'AsTheDeerLyrics.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: '2025-10-23 The Path of Life – A Devotion on the Psalms.pdf',
      //   //   linkDesc:
      //   //     '2025-10-23 The Path of Life - A Devotion on the Psalms.pdf',
      //   //   target: '_blank',
      //   // },
      //   // {
      //   //   link: '2025-12-04 Opening - Country Link.pdf',
      //   //   linkDesc: '2025-12-04 Opening - Country Link.pdf',
      //   //   target: '_blank',
      //   // },
      //   // add new links above here
      //   // {
      //   //   link: 'https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing',
      //   //   linkDesc: 'AV Shared Google Link',
      //   //   target: '_blank',
      //   // },
      //   {
      //     link: 'Leadership Development Ideas from Psalms (did Confidence in God on 1-28).pdf',
      //     linkDesc: 'LD Idea from Psalms (did Confidence in God on 1-28).pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Leadership Development Idea - Praying Scripture.pdf',
      //     linkDesc: 'LD Idea - Praying Scripture.pdf',
      //     target: '_blank',
      //   },
      //   {
      //     link: 'Leadership Development Idea - Transparency.pdf',
      //     linkDesc: 'LD Idea - Transparency.pdf',
      //     target: '_blank',
      //   },

      //   // add new links above here
      //   {
      //     link: 'https://drive.google.com/drive/folders/1oPPRU47CBxZvXY-_MjEFvzCTDmRE2vHY?usp=sharing',
      //     linkDesc: 'AV Shared Google Link',
      //     target: '_blank',
      //   },
      // ],
    };
  },
};
</script>

<style scoped>
header {
  margin-left: 30px;
}
ul {
  list-style: none;
}
section {
  font-size: 24px;
}

div.addLink label {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin: 5px;
}
</style>
