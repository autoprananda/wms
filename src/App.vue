<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  preFetch({ store, currentRoute, previousRoute, redirect }) {
    store.dispatch('showcase/initUser')
    store.dispatch('showcase/initToken')
    store.dispatch('showcase/initRToken')
    store.dispatch('showcase/inittokensExpiry')
    store.dispatch('showcase/initAppsMode')
  },
}
</script>
