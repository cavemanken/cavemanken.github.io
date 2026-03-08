<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li style="border-right: 1px solid white">|</li>
        <li>
          <router-link to="/blog-list">Blog</router-link>
        </li>
        <li>
          <router-link to="/bucket-list">Bucket</router-link>
        </li>
        <li><router-link to="/print">Print</router-link></li>
        <li><router-link to="/rv">RV</router-link></li>
        <!-- <li>
          <router-link to="/prog-rummy-rules">Prog Rummy Rules</router-link>
        </li> -->
        <!-- Don't need to show this since they'll automatically be redirected to the login page if they try to access certain pages without being authenticated -->
        <!-- <li>
          <base-button v-if="!$store.getters.isAuthenticated" @click="login"
            >Login</base-button
          >
        </li> -->
        <li>
          <base-button
            v-if="$store.getters.isAuthenticated"
            @click="logout($store)"
          >
            Logout
          </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
      // go to a page that doesn't require auth, otherwise user gets stuck on a page they can't access
      this.$router.push('/print');
    },
    clearToken() {
      // ??? correct way to clear?
      this.$store.dispatch('logout');
    },
    login() {
      this.$router.push('/auth');
    },
  },
};
</script>
<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: #11005c;
}

nav {
  height: 100%;
  padding-left: 10px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

li {
  margin: 0 3px;
}

a {
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 5px;
  display: inline-block;
}

a:hover,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
/* button {
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
} */
</style>
