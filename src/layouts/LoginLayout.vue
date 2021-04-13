<template>
  <q-layout style="background-color:#E6E5E5;">

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  LocalStorage
} from 'quasar'
export default {
  name: 'LayoutLogin',
  preFetch({ store, currentRoute, previousRoute, redirect }) {
    // kalau user sudah login
    if (store.getters['showcase/isAuth']) {
      if (store.getters['showcase/appsmode']) {
        redirect('/dashboard')
      } else {
        LocalStorage.clear()
      }
    }
  },
  mounted() {
    this.$q.loading.hide()
  }
}
</script>
