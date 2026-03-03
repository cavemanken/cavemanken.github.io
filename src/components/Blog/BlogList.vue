<template>
  <add-blog-list-item-dialog
    :show="showAdd"
    @add-item="addItem"
    @cancel-add="cancelAdd"
  ></add-blog-list-item-dialog>

  <edit-blog-list-item-dialog
    v-if="editMode"
    :editKey="editKey"
    @save-item="saveItem"
    @cancel-save="cancelSave"
  ></edit-blog-list-item-dialog>

  <base-dialog
    :show="tryingToMakeChanges"
    title="Error"
    @close="handleAdminDialog"
    >You must login to make updates.
  </base-dialog>

  <div>
    <h2 @dblclick="toggleAdminMode">Blog List</h2>
    <div
      v-for="item in this.$store.getters['bloglist/blogListItems']"
      :key="item.key"
    >
      <base-button @click="editItem(item.key)" v-if="adminMode"
        >Edit</base-button
      >
      <base-button @click="deleteItem(item.key)" v-if="adminMode"
        >Delete</base-button
      >
      <blog-item
        :item-key="item.key"
        :title="item.title"
        :comments="item.comments"
        :date="item.date"
      ></blog-item>
    </div>
    <base-button @click="addNewItem" v-if="adminMode">Add New</base-button>
  </div>
</template>

<script>
import AddBlogListItemDialog from './AddBlogListItemDialog.vue';
import EditBlogListItemDialog from './EditBlogListItemDialog.vue';
export default {
  components: { AddBlogListItemDialog, EditBlogListItemDialog },
  mounted() {
    this.getBlogList();
  },
  methods: {
    editItem(key) {
      this.editKey = key;
      this.editMode = true;
    },
    toggleAdminMode() {
      if (this.$store.state.auth.token) {
        this.itemKey = Math.random();
        this.adminMode = !this.adminMode;
      } else {
        this.tryingToMakeChanges = true;
      }
    },
    saveItem(editKey, title, date, comments) {
      this.editMode = false;
      this.updateBlogListItem(editKey, title, date, comments);
    },
    cancelSave() {
      this.editMode = false;
    },
    deleteItem(key) {
      if (confirm('Do you really want to delete?')) {
        this.deleteBlogListItem(key);
      }
    },
    addItem(title, date, comments) {
      this.createBlogListItem(title, date, comments);
      this.showAdd = false;
    },
    cancelAdd() {
      this.showAdd = false;
    },
    handleAdminDialog() {
      this.tryingToMakeChanges = false;
    },
    addNewItem() {
      if (this.$store.state.auth.token) {
        this.addMode = true;
        this.showAdd = true;
      } else {
        this.tryingToMakeChanges = true;
      }
    },
    // ******************************************************************************
    async updateBlogListItem(key, title, date, comments) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bloglist/updateBlogListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
          title: title,
          date: date,
          comments: comments,
        });
        this.getBlogList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load blog list items.';
        alert(this.error);
      }
      this.isLoading = false;
    },
    // ******************************************************************************
    async createBlogListItem(title, data, comments) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bloglist/createBlogListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          title: title,
          date: data,
          comments: comments,
        });
        this.getBlogList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load blog list items.';
        alert(this.error);
      }
      this.isLoading = false;
    },

    // ******************************************************************************
    async deleteBlogListItem(key) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bloglist/deleteBlogListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
        });
        this.getBlogList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load blog list items.';
        alert(this.error);
      }
      this.isLoading = false;
    },
    // ******************************************************************************
    async getBlogList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bloglist/getBlogListItems', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
        });
        // ??? not sure if this is the correct way to get at store items once they've been loaded ???
        // this.menuItems = this.$store.state.printing.menuItems;
        this.menuItems = this.$store.getters['bloglist/blogListItems'];
        // sort menuItems by linkDesc
        // this.menuItems.sort((a, b) => {
        //   const descA = a.linkDesc.toUpperCase();
        //   const descB = b.linkDesc.toUpperCase();
        //   if (descA < descB) {
        //     return -1;
        //   }
        //   if (descA > descB) {
        //     return 1;
        //   }
        //   return 0;
        // });
      } catch (err) {
        this.error = err.message || 'Failed to load blog list items.';
      }
      this.isLoading = false;
    },
  },

  data() {
    return {
      editKey: 'eee',
      adminMode: false,
      editMode: false,
      showEdit: false,
      showAdd: false,
      tryingToMakeChanges: false,
      dbName: 'blog_list',
      firebaseProjectLink: 'https://cmk63project-default-rtdb.firebaseio.com/',
      blogListItems: [
        { key: 1, description: 'test1' },
        { key: 2, description: 'test2' },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
div {
  margin-left: 15px;
}
h2 {
  margin-top: 5px;
  margin-bottom: 0px;
}
</style>
