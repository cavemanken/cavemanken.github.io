<template>
  <add-bucket-list-item-dialog
    :show="showAdd"
    @add-item="addItem"
    @cancel-add="cancelAdd"
  ></add-bucket-list-item-dialog>

  <edit-bucket-list-item-dialog
    v-if="editMode"
    :editKey="editKey"
    @save-item="saveItem"
    @cancel-save="cancelSave"
  ></edit-bucket-list-item-dialog>

  <base-dialog
    :show="tryingToMakeChanges"
    title="Error"
    @close="handleAdminDialog"
    >You must login to make updates.
  </base-dialog>

  <div>
    <h2 @dblclick="toggleAdminMode">Bucket List</h2>
    <div
      v-for="item in this.$store.getters['bucketlist/bucketListItems']"
      :key="item.key"
    >
      <base-button @click="editItem(item.key)" v-if="adminMode"
        >Edit</base-button
      >
      <base-button @click="deleteItem(item.key)" v-if="adminMode"
        >Delete</base-button
      >
      <bucket-item
        :item-key="item.key"
        :desc="item.desc"
        :comments="item.comments"
        :goalDate="item.goalDate"
        :completedDate="item.completedDate"
      ></bucket-item>
    </div>
    <base-button @click="addNewItem" v-if="adminMode">Add New</base-button>
  </div>
</template>

<script>
import AddBucketListItemDialog from './AddBucketListItemDialog.vue';
import EditBucketListItemDialog from './EditBucketListItemDialog.vue';
export default {
  components: { AddBucketListItemDialog, EditBucketListItemDialog },
  mounted() {
    this.getBucketList();
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
    saveItem(editKey, desc, goalDate, completedDate, comments) {
      this.editMode = false;
      this.updateBucketListItem(
        editKey,
        desc,
        goalDate,
        completedDate,
        comments
      );
    },
    cancelSave() {
      this.editMode = false;
    },
    deleteItem(key) {
      if (confirm('Do you really want to delete?')) {
        this.deleteBucketListItem(key);
      }
    },
    addItem(desc, goalDate, completedDate, comments) {
      this.createBucketListItem(desc, goalDate, completedDate, comments);
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
    async updateBucketListItem(key, desc, goalDate, completedDate, comments) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bucketlist/updateBucketListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
          desc: desc,
          goalDate: goalDate,
          completedDate: completedDate,
          comments: comments,
        });
        this.getBucketList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load bucketlist items.';
        alert(this.error);
      }
      this.isLoading = false;
    },
    // ******************************************************************************
    async createBucketListItem(desc, goalDate, completedDate, comments) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bucketlist/createBucketListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          desc: desc,
          goalDate: goalDate,
          completedDate: completedDate,
          comments: comments,
        });
        this.getBucketList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load bucketlist items.';
        alert(this.error);
      }
      this.isLoading = false;
    },

    // ******************************************************************************
    async deleteBucketListItem(key) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bucketlist/deleteBucketListItem', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
          key: key,
        });
        this.getBucketList();
        this.addMode = false;
      } catch (err) {
        this.error = err.message || 'Failed to load bucketlist items.';
        alert(this.error);
      }
      this.isLoading = false;
    },
    // ******************************************************************************
    async getBucketList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('bucketlist/getBucketListItems', {
          firebaseProjectLink: this.firebaseProjectLink,
          dbName: this.dbName,
        });
        // ??? not sure if this is the correct way to get at store items once they've been loaded ???
        // this.menuItems = this.$store.state.printing.menuItems;
        this.menuItems = this.$store.getters['bucketlist/bucketListItems'];
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
        this.error = err.message || 'Failed to load bucketlist items.';
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
      dbName: 'bucket_list',
      firebaseProjectLink: 'https://cmk63project-default-rtdb.firebaseio.com/',
      bucketListItems: [
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
