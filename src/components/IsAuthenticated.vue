<template>
  <div v-if="$store.state.auth.token">isAuthenticated</div>
  <div v-else>NOT authenticated</div>
</template>
