<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred."
      @close="handleError"
      >{{ error }}</base-dialog
    >

    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your Email</label>
          <input type="email" id="email" v-model.trim="email" required />
        </div>
        <div class="control">
          <label for="password">Your Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            required
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (min 7 characters)
        </p>
        <div class="actions">
          <base-button @click="submitForm">{{
            submitButtonCaption
          }}</base-button>
          <!-- <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button> -->
        </div>
      </form>
    </base-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Sign Up';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Sign Up instead' : 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password === '' ||
        this.password.length < 7
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          // send http request
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        this.error = err.message || 'Failed to authenticate.';
      }
      //console.log('here token.......', this.$store.getters.token);
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    switchAuthMode() {
      console.log('switching auth mode');
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  margin-bottom: 10px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
