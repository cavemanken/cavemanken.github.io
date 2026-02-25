<template>
  <base-button :disabled="editMode" v-if="adminMode" @click="editItem()">
    Edit
  </base-button>
  <base-button v-if="adminMode" @click="deleteItem(linkKey)"
    >Delete</base-button
  >
  <a :href="linkPrefix + link" :target="linkTarget">{{ linkDesc }} </a>
  <form
    v-if="editMode"
    @submit.prevent="
      saveItem(linkKey, updatedLink, updatedLinkDesc, updatedLinkTarget)
    "
  >
    <div>
      <label>Link:</label><input type="text" v-model="updatedLink" /><br />
      <label>Link Description:</label
      ><input id="linkDescInput" type="text" v-model="updatedLinkDesc" /><br />
      <label>Target:</label
      ><input type="text" v-model="updatedLinkTarget" /><br />
      <label></label><base-button type="submit">Save</base-button>
      <base-button @click="cancelEditMode()">Cancel</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    adminMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    linkKey: {
      type: String,
      required: true,
      default: '',
    },
    link: {
      type: String,
      required: true,
      default: '',
    },
    linkDesc: {
      type: String,
      required: true,
      default: '',
    },
    linkTarget: {
      type: String,
      required: false,
      default: '_blank',
    },
  },
  data() {
    return {
      linkPrefix: '../',
      editMode: false,
      updatedLink: this.link,
      updatedLinkDesc: this.linkDesc,
      updatedLinkTarget: this.linkTarget,
    };
  },
  emits: ['save-item', 'delete-item'],
  methods: {
    cancelEditMode() {
      this.editMode = false;
      this.updatedLink = '';
      this.updatedLinkDesc = '';
      this.updatedLinkTarget = '';
    },
    editItem() {
      console.log('editItem called...');
      this.updatedLink = this.link;
      this.updatedLinkDesc = this.linkDesc;
      this.updatedLinkTarget = this.linkTarget;
      this.editMode = true;
    },
    saveItem(linkKey, link, linkDesc, linkTarget) {
      console.log('saveItem called for', linkKey, link, linkDesc, linkTarget);
      console.log('linkKey:', linkKey);
      this.$emit('save-item', linkKey, link, linkDesc, linkTarget);
      this.editMode = false;
      this.updatedLink = '';
      this.updatedLinkDesc = '';
      this.updatedLinkTarget = '';
    },
    deleteItem(key) {
      if (confirm('Do you really want to delete?')) {
        this.$emit('delete-item', key);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 10px;
}
div {
  margin-left: 25px;
}
input {
  width: 300px;
}
label {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 10px;
  margin-bottom: 5px;
}
/* button {
  margin-left: 5px;
  border: 1px solid transparent;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  padding: 5px 10px 5px 10px;
  display: inline-block;
  background: gray;
} */
</style>
