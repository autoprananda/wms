<template>
  <q-layout style="background-color:#E6E5E5;">
    <!-- <q-layout style="background:linear-gradient(to right, #ffffff , #0155a5)"> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// let state = {
//   loginstate: localStorage.getItem('logged')
// }
import {
  LocalStorage
} from 'quasar'
export default {
  name: 'LayoutLogin',
  preFetch({ store, currentRoute, previousRoute, redirect }) {
    // kalau user sudah login
    if (store.getters['showcase/isAuth']) {
      if (store.getters['showcase/appsmode']) {
        if (store.getters['showcase/appsmode'] === 'wms') {
          redirect('/dashboard')
        } else if (store.getters['showcase/appsmode'] === 'ba') {
          redirect('/dashboardba')
        } else if (store.getters['showcase/appsmode'] === 'rb') {
          redirect('/dashboardrb')
        } else {
          LocalStorage.clear()
        }
      }
    }
  },
  // data() {
  //   return { auth: state.loginstate }
  // },
  mounted() {
    this.$q.loading.hide()
  }

  // methods: {
  //   // isLogin() {
  //   //   if (this.auth === 'true') {
  //   //     this.$router.push({ path: '/dashboard' })
  //   //   } else {
  //   //     this.$router.push({ path: '/' })
  //   //   }
  //   // }
  // }
}
</script>
