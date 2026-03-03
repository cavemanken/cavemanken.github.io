<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>Add a Blog List Item</h2>
          </slot>
        </header>
        <table>
          <tr>
            <th align="right">Description</th>
            <td>
              <input type="text" v-model="desc" />
            </td>
          </tr>
          <tr>
            <th align="right">Goal Date</th>
            <td>
              <input type="date" v-model="goalDate" />
            </td>
          </tr>
          <tr>
            <th align="right">Completed Date</th>
            <td>
              <input type="date" v-model="completedDate" />
            </td>
          </tr>
          <tr>
            <th align="right">Comments</th>
            <td>
              <input type="text" v-model="comments" />
            </td>
          </tr>
        </table>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryAdd">Save</base-button>
            <base-button @click="cancelAdd">Cancel</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      desc: '',
      goalDate: '',
      completedDate: '',
      comments: '',
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['addItem', 'cancelAdd'],
  methods: {
    tryAdd() {
      if (this.desc.trim() === '') {
        alert('Description is required.');
      } else {
        this.$emit(
          'add-item',
          this.desc,
          this.goalDate,
          this.completedDate,
          this.comments
        );
        // clear them
        this.desc = '';
        this.goalDate = '';
        this.completedDate = '';
        this.comments = '';
      }
    },
    cancelAdd() {
      this.$emit('cancel-add');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
