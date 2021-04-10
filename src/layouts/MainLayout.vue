<template>
  <q-layout view="lHh Lpr lFf">
    <q-header 
      elevated
      class="text-white"
      style="background:linear-gradient(to right, #ffffff , #0155a5)">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="primary"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!-- LOGO -->
        <q-toolbar-title class="no-wrap">
          <q-btn no-caps push :ripple="false" flat dense to="/dashboard" shrink>
            <img src="../statics/logoproduct.png" style="max-width: 60px " />
          </q-btn>
          <q-btn push dense no-caps :ripple="false" flat shrink>
          </q-btn>
        </q-toolbar-title>
        <!-- // -->
          <q-badge class="q-mt-sm q-mb-sm shadow-10 q-mr-xs" color="indigo-1">
          <q-btn-group flat @click="showing = false">
            <q-btn dense :ripple="false" flat no-caps color="white">
              <img src="../statics/logobank.png" style="max-width: 100px;" />
            </q-btn>
            <q-btn dense :ripple="false" flat no-caps>
              <q-icon name="arrow_drop_down" size="16px" color="primary" />
            </q-btn>

            <q-btn flat round avatar>
              <q-avatar class="absolute-center">
                <img
                  src="../statics/default-user-image.png"
                />
              </q-avatar>
            </q-btn>

            <!-- Dekstop -->
            <q-menu
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              :offset="[6, 9]"
              max-width="100%"
              max-height="100%"
              fit
            >
              <q-list bordered class="rounded-borders" style="width: 360px;">
                <q-item class="  q-mb-sm">
                  <q-item-section class="q-ml-sm q-mr-xs" avatar top>
                    <q-btn
                      class="q-mt-sm q-ml-xs shadow-3 cursor-pointer"
                      round
                    >
                      <q-avatar size="80px">
                        <img
                          src="../statics/default-user-image.png"
                        />
                        <q-tooltip
                          anchor="bottom right"
                          self="bottom right"
                          content-class="bg-grey-6"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                        </q-tooltip>
                      </q-avatar>
                    </q-btn>
                    
                  </q-item-section>
                  <q-item-section top>
                    <q-item-label  v-if="data.length !== 0" lines="1" class="q-mt-sm q-mb-sm">
                      <span class="text-weight-bold" style="font-size: 17px">{{
                        username
                      }}</span>
                    </q-item-label>
                    <q-item-label>
                      <div class="q-gutter-sm">
                        <q-btn
                          style="width:85px"
                          color="negative"
                          label="Logout"
                          push
                          size="xs"
                          @click="logoutDialog"
                        />
                      </div>
                    </q-item-label>
                  </q-item-section>
                  
                </q-item>
              </q-list>
            </q-menu>
          </q-btn-group>
        </q-badge>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <Menulist :ugAccessToken="token"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
let init = ''
let auth, userdata, token, refreshToken, tokenExp

import Menulist from 'components/MenuList.vue'
import { GetUser } from 'src/graphql/MasterUser'
export default {
  name: 'MainLayout',
  preFetch({ store, currentRoute, previousRoute, redirect }) {
    if (store.getters['showcase/isAuth']) {
      if (!store.getters['showcase/appsmode']) {
        redirect('/')
      }
      userdata = store.getters['showcase/user']
      auth = store.getters['showcase/isAuth']
      token = store.getters['showcase/token']
      refreshToken = store.getters['showcase/rtoken']
      tokenExp = store.getters['showcase/tokensExpiry']
    } else {
      redirect('/')
    }
  },
  data () {
    return {
      leftDrawerOpen: false,
      userdata: userdata,
      username: userdata.username,
      auth: auth,
      token: token,
      refreshToken: refreshToken,
      tokenExp: tokenExp,
      data: []
    }
  },
  components: { Menulist },
  computed: {
  },
  mounted() {
    this.getDataUser()
  },
  methods: {
    getDataUser() {
      this.data.push(this.userdata)
      console.log(this.data, 'data');
    },
    logoutDialog() {
      this.$q
        .dialog({
          title: 'Confirmation',

          message: 'Are you sure to Logout ?',

          persistent: true,

          ok: {
            label: 'Log Out',
            textColor: '',
            icon: 'logout',
            color: 'negative'
          },
          cancel: {
            label: 'no',
            textColor: 'negative',
            color: ''
          }
        })
        .onOk(() => {
          console.log('>>>> OK')
          this.logout()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    logout() {
      setTimeout(() => {
        sessionStorage.removeItem('username')
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'You Have Been Logout'
        })
        this.$router.replace('/')
      }, 2000)
    }
  }
}
</script>
