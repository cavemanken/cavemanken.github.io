<template>
  <router-link to="/print/menu/me">My Printing</router-link>
  <router-link to="/print/menu/cbs">CBS Printing</router-link>
  <router-view></router-view>
</template>

<style scoped>
a {
  margin-left: 10px;
  margin-top: 3px;
  border: 1px solid transparent;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  padding: 5px 10px 5px 10px;
  display: inline-block;
  background: gray;
}

a:hover,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
