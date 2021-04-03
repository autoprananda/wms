<template>
  <q-layout view="hHh LpR fFf" v-if="auth === true">
    <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) The Header -->
    <q-header
      elevated
      class="text-white"
      style="background:linear-gradient(to right, #ffffff , #0155a5)"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawer = !leftDrawer"
          aria-label="Menu"
          color="primary"
        />

        <div v-if="$q.platform.is.desktop">
          <q-toolbar-title class="no-wrap">
            <q-btn
              no-caps
              push
              :ripple="false"
              flat
              dense
              to="/dashboard"
              shrink
            >
              <img src="statics/logoproduct.png" style="max-width: 60px " />
            </q-btn>
            <q-btn
              push
              dense
              no-caps
              :ripple="false"
              flat
              @click="Onchangelog"
              shrink
            >
              <div class="text-grey-9 q-mt-lg">v{{ appversion }}</div>
            </q-btn>
          </q-toolbar-title>
        </div>

        <div v-if="$q.platform.is.mobile">
          <q-toolbar-title class="no-wrap">
            <q-btn
              no-caps
              push
              :ripple="false"
              to="/dashboard"
              flat
              dense
              shrink
            >
              <img src="statics/logoproduct.png" style="max-width: 35px " />
            </q-btn>
            <!-- <q-btn push dense no-caps :ripple="false" @click="Onchangelog" flat shrink>
              <div class="text-grey-9 q-mt-lg" style="font-size: 12px">v{{ appversion }}</div>
            </q-btn>-->
            <br />
            <div
              @click="Onchangelog"
              class="text-bold q-ml-xs"
              style="font-size: 10px; color: black"
            >
              v{{ appversion }}
            </div>
          </q-toolbar-title>
        </div>

        <q-space />
        <div v-if="$q.platform.is.desktop">
          <div class="col-sm-3 q-pr-md center">
            <q-toggle
              dense
              color="blue-4"
              checked-icon="check"
              unchecked-icon="clear"
              style="color: black; width: 60px"
              v-model="tickerOn"
              @click="onTickerClick"
            >
              <q-tooltip>Ticker</q-tooltip>
            </q-toggle>
            <q-toolbar-title>
              <q-list
                class="transparent"
                v-if="OnDataTutorial.length !== 0 && DataCurrent !== DataCount"
              >
                <q-item clickable v-ripple @click="StartedTour()">
                  <q-item-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-8">
                        <q-item-label
                          class="text-overline"
                          style="font-size: 13px"
                          >Welcome</q-item-label
                        >
                      </div>
                      <div class="col-4">
                        <!-- <q-badge v-if="tes === false" color="red" floating>1</q-badge> -->
                        <q-item-label
                          class="text-overline"
                          style="font-size: 12px"
                          >{{ DataCurrent }}/{{ DataCount }}</q-item-label
                        >
                      </div>
                      <div class="col-12">
                        <q-linear-progress
                          rounded
                          size="4px"
                          :value="progress1"
                          color="white"
                        ></q-linear-progress>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-toolbar-title>
          </div>
        </div>
        <div v-if="$q.platform.is.mobile">
          <q-item>
            <q-toggle
              dense
              color="blue-4"
              checked-icon="check"
              unchecked-icon="clear"
              style="color: black; width: 45px"
              v-model="tickerOn"
              @click="onTickerClick"
            >
              <q-tooltip>Ticker</q-tooltip>
            </q-toggle>
            <q-icon
              v-if="OnDataTutorial.length !== 0 && DataCurrent !== DataCount"
              size="xs"
              class="cursor-pointer q-mt-sm"
              name="fas fa-book"
              @click="StartedTour()"
            >
              <q-tooltip>Get Started Tour</q-tooltip>
            </q-icon>
          </q-item>
        </div>
        <q-badge class="q-mt-sm q-mb-sm shadow-10 q-mr-xs" color="indigo-1">
          <q-btn-group flat @click="showing = false">
            <q-btn dense :ripple="false" flat no-caps color="white">
              <img src="statics/logobank.png" style="max-width: 100px;" />
            </q-btn>
            <q-btn dense :ripple="false" flat no-caps>
              <q-icon name="arrow_drop_down" size="16px" color="primary" />
            </q-btn>

            <q-btn flat round avatar>
              <q-avatar class="absolute-center">
                <img
                  v-if="DataPhotoUser === null"
                  src="statics/default-user-image.png"
                />
                <img v-else :src="DataPhotoUser" />
              </q-avatar>
            </q-btn>

            <!-- Dekstop -->
            <q-menu
              v-if="$q.platform.is.desktop"
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
                      <q-avatar @click="OnChangeAvatar" size="100px">
                        <img
                          v-if="DataPhotoUser === null"
                          src="statics/default-user-image.png"
                        />
                        <img v-else :src="DataPhotoUser" />
                        <q-tooltip
                          anchor="bottom right"
                          self="bottom right"
                          content-class="bg-grey-6"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-icon size="xs" name="fas fa-camera" />
                        </q-tooltip>
                      </q-avatar>
                    </q-btn>
                    <q-btn
                      class="q-ml-xs q-mt-sm q-mb-sm"
                      dense
                      color="primary"
                      :ripple="false"
                      label="Change Password"
                      push
                      size="sm"
                      flat
                      @click="OnChangePassword"
                    />
                    <q-btn
                      v-if="
                        OnDataTutorial.length !== 0 && ConditionWelcome === true
                      "
                      @click="StartedTour()"
                      style="width:110px"
                      color="primary"
                      label="Get Started Tour"
                      push
                      size="xs"
                      v-close-popup
                    />
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1" class="q-mt-sm q-mb-sm">
                      <span class="text-weight-bold" style="font-size: 17px">{{
                        userdata.name
                      }}</span>
                    </q-item-label>
                    <q-item-label
                      v-if="DataDesignation !== null"
                      class="text-weight-bold "
                      style="font-size: 12px"
                      >{{ DataDesignation }}</q-item-label
                    >
                    <q-item-label
                      v-if="BranchUser !== null"
                      class="text-weight-bold q-mb-xs"
                      style="font-size: 12px"
                      >{{ BranchUser }}</q-item-label
                    >
                    <q-item-label
                      class="text-weight-medium q-mb-xs"
                      style="font-size: 12px"
                      >{{ rolemap }}</q-item-label
                    >
                    <q-item-label
                      lines="2"
                      class="text-weight-medium text-primary text-capitalize q-mb-sm"
                    >
                      <span style="font-size: 11px" class="cursor-pointer">
                        Last Seen: <br />
                        {{ getFormatTime(lastlogin) }}
                      </span>
                    </q-item-label>
                    <q-item-label>
                      <div class="q-gutter-sm">
                        <q-btn
                          style="width:85px"
                          @click="NotificationDialog"
                          color="primary"
                          label="Notification"
                          push
                          size="xs"
                          v-close-popup
                        />
                        <q-btn
                          style="width:85px"
                          @click="LogoutDialog"
                          color="negative"
                          label="Logout"
                          push
                          size="xs"
                        />
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <!-- Mobile -->

            <q-menu
              v-if="$q.platform.is.mobile"
              transition-show="fadeInDown"
              transition-hide="fadeOutUp"
              filled
              :offset="[13, 9]"
              fit
            >
              <div class="q-ml-md q-mr-md q-mt-md flex flex-center">
                <q-avatar
                  class="shadow-3 cursor-pointer"
                  @click="OnChangeAvatar"
                  size="100px"
                >
                  <img
                    v-if="DataPhotoUser === null"
                    src="statics/default-user-image.png"
                  />
                  <img v-else :src="DataPhotoUser" />
                </q-avatar>
                <q-btn
                  class="full-width q-mt-xs"
                  dense
                  color="primary"
                  :ripple="false"
                  label="Change Password"
                  push
                  flat=""
                  no-caps
                  @click="OnChangePassword"
                />
              </div>

              <div class="q-ma-md font text-center">
                <q-item-section
                  class=" q-mb-sm text-weight-bolder"
                  style="font-size: 18px"
                  >{{ userdata.name }}</q-item-section
                >
                <q-item-label
                  v-if="DataDesignation !== null"
                  class=" text-weight-bold"
                  style="font-size: 14px"
                  >{{ DataDesignation }}</q-item-label
                >
                <q-item-label
                  v-if="BranchUser !== null"
                  class="q-mb-sm text-weight-bold "
                  style="font-size: 14px"
                  >{{ BranchUser }}</q-item-label
                >
                <q-item-section style="font-size: 14px">{{
                  rolemap
                }}</q-item-section>
                <q-item-section
                  style="font-size: 14px"
                  class="text-weight-medium text-primary text-capitalize q-mt-sm"
                  lines="1"
                  >Last Seen: {{ getFormatTime(lastlogin) }}</q-item-section
                >
              </div>
              <q-item-section>
                <div class="q-ml-md q-mr-md q-mb-md q-gutter-sm">
                  <q-btn
                    v-if="
                      OnDataTutorial.length !== 0 && ConditionWelcome === true
                    "
                    @click="StartedTour()"
                    color="primary"
                    label="Get Started Tour"
                    push
                    no-caps
                    class="full-width"
                    v-close-popup
                  />
                  <div class="row q-col-gutter-x-sm">
                    <div class="col-6">
                      <q-btn
                        color="primary"
                        @click="NotificationDialog"
                        class="full-width"
                        label="Notification"
                        push
                        dense
                        no-caps
                        v-close-popup
                      />
                    </div>
                    <div class="col-6">
                      <q-btn
                        @click="LogoutDialog"
                        class="full-width"
                        color="negative"
                        label="Logout"
                        push
                        dense
                        no-caps
                      />
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-menu>
          </q-btn-group>
          <q-tooltip
            anchor="bottom right"
            self="center right"
            v-model="showing"
            transition-show="scale"
            transition-hide="scale"
            content-style="font-size: 12px; width: 235px"
            :offset="[0, 44]"
          >
            <div class="font">
              <div class="text-weight-bolder q-mb-xs" style="font-size: 13px">
                {{ userdata.name }}
              </div>
              <div class="q-mb-xs">{{ rolemap }}</div>
              <div>Last Seen: {{ getFormatTime(lastlogin) }}</div>
            </div>
          </q-tooltip>
        </q-badge>
      </q-toolbar>
    </q-header>
    <!-- (Optional) The Footer -->
    <q-footer v-show="tickerOn" reveal elevated class="text-white bg-primary">
      <!-- <q-footer bordered class="text-black" style="background-color:#E6E5E5;"> -->
      <!-- <q-tabs top-indicator>
        <q-route-tab icon="map" to="/your/route" replace label="One Tab"/>
        <q-route-tab icon="assignment" to="/some/other/route" replace label="Other Tab"/>
      </q-tabs>-->

      <!-- corporate text -->
      <!-- <div v-for="(data, index) in data" :key="index"> -->
      <!-- component place -->
      <batm-running-text :ugAccessToken="token"></batm-running-text>
      <!-- <q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer"/>
        <q-btn-group rounded>
          <q-btn color="teal" rounded glossy label="English"/>
          <q-btn color="teal" rounded glossy label="Indonesia"/>
      </q-btn-group>-->
    </q-footer>
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer v-model="leftDrawer" show-if-above side="left" bordered>
      <!-- Komponen untuk daftar menu -->
      <component-menu
        :MuserRole="userdata.resource_access.wms.roles[0]"
        :ugAccessToken="token"
      ></component-menu>
    </q-drawer>
    <div v-if="$q.platform.is.desktop">
      <q-page-container style="background-color:#E6E5E5;">
        <!-- This is where pages get injected -->
        <router-view
          :dayHoliday="dayHolidayActive"
          :Muser="userdata"
          :ugAccessToken="token"
        ></router-view>
      </q-page-container>
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page-container>
        <!-- This is where pages get injected -->
        <router-view
          :dayHoliday="dayHolidayActive"
          :Muser="userdata"
          :ugAccessToken="token"
        ></router-view>
      </q-page-container>
    </div>
    <!-- change password -->
    <q-dialog persistent v-model="ChangePassword">
      <batm-change-password
        :Muser="userdata"
        :ugAccessToken="token"
      ></batm-change-password>
    </q-dialog>
    <!-- change avatar -->
    <q-dialog persistent v-model="ChangeAvatar">
      <batm-change-avatar
        :Muser="userdata"
        :ugAccessToken="token"
      ></batm-change-avatar>
    </q-dialog>

    <!-- change log -->
    <q-dialog v-model="Changelog">
      <q-card>
        <div class="q-ml-lg q-mr-md q-mb-md q-mt-sm">
          <change-log :Muser="userdata" :ugAccessToken="token"></change-log>
        </div>
      </q-card>
    </q-dialog>
    <!-- notification -->
    <q-dialog v-model="notif">
      <q-card>
        <Batm-Notification
          :Muser="userdata"
          :ugAccessToken="token"
        ></Batm-Notification>
      </q-card>
    </q-dialog>
    <q-dialog v-model="Welcome" full-width>
      <welcome class="body-style" :Muser="userdata" :OverBanner="showInstallBanner" :OverEvent="installEvent" :OverButtona2hm="Buttona2hs" ></welcome>
    </q-dialog>
  </q-layout>
</template>
<script>
let auth, userdata, token, refreshToken, tokenED
let init = ''
import qs from 'qs'
import ChangeLog from 'components/changelog.vue'
import Notification from 'components/pushNotification.vue'
import { version } from '../../package.json'
import { LocalStorage, date } from 'quasar'
import { RoleMap } from 'src/graphql/Role'
import componentMenu from 'components/menulist.vue'
import batmRunningText from 'components/Marquee/RunningText.vue'
import changepassword from 'components/changepassword.vue'
import changeavatar from 'components/changeavatar.vue'
import Welcome from '../components/welcome.vue'
import { PublicHoliday } from 'src/graphql/PublicHoliday'
// const componentMenu = () => ({
//   component: import('components/menulist.vue'),
//   timeout: 3000
// })
// const batmRunningText = () => ({
//   component: import('components/Marquee/RunningText.vue'),
//   timeout: 3000
// })
import {
  GetDataTutorial,
  GetDataTutorialSubscription,
  GetDataCountWelcome,
  GetDataCountWelcomeSubscription,
  GetDataWelcomeCurrent,
  GetDataWelcomeCurrentSubscription
} from 'src/graphql/Tutorial'
import { InsLogActivity, GetLastSeen } from 'src/graphql/LogActivity'
import { registerEndpoint } from 'src/graphql/PushMessages'
import {
  GetUserProfile,
  GetUserProfileSubscription
} from 'src/graphql/UserProfile'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'DashboardLayout',
  preFetch({ store, currentRoute, previousRoute, redirect }) {
    // kalau user sudah login
    if (store.getters['showcase/isAuth']) {
      if (!store.getters['showcase/appsmode']) {
        redirect('/')
      } else if (store.getters['showcase/appsmode'] === 'ba') {
        redirect('/dashboardba')
      } else if (store.getters['showcase/appsmode'] === 'rb') {
        redirect('/dashboardrb')
      }
      userdata = store.getters['showcase/user']
      auth = store.getters['showcase/isAuth']
      token = store.getters['showcase/token']
      refreshToken = store.getters['showcase/rtoken']
      tokenED = store.getters['showcase/tokensExpiry']
      // this.userdata = store.getters['showcase/user']
    } else redirect('/') // kalau user belum login
  },
  data() {
    return {
      rolemap: '',
      timer: '',
      OnDataTutorial: [],
      DataCount: [],
      DataCurrent: [],
      tes: false,
      ConditionWelcome: false,
      appversion: version,
      tab: 'Upload',
      off: false,
      current: 2,
      progress1: 0,
      tickerOn: true,
      showing: false,
      Changelog: false,
      leftDrawer: false,
      ChangePassword: false,
      ChangeAvatar: false,
      Welcome: false,
      userdata: userdata,
      data: [],
      lastseen: [],
      lastlogin: [],
      DataPhotoUser: [],
      DataDesignation: [],
      BranchUser: [],
      dataPublicholidays: [],
      auth: auth,
      token: token,
      refreshToken: refreshToken,
      tokenED: tokenED,
      pushsub: JSON.parse(LocalStorage.getItem('pushSubscription')),
      notif: false,
      userAgent: '',
      showInstallBanner: false,
      installEvent: null,
      Buttona2hs: false,
      dayHolidayActive: false
    }
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      this.showInstallBanner = true
      e.preventDefault()
      this.installEvent = e
      this.Buttona2hs = true
    })
  },
  apollo: {
    OnDataTutorial: {
      query: GetDataTutorial,
      update: data => data.wms_tutorial,
      variables: {
        code: init
      }
    },
    GetDataCount: {
      query: GetDataCountWelcome,
      update: data => data.wms_tutorial_aggregate,
      variables: {
        code: init
      }
    },
    GetDataCurrent: {
      query: GetDataWelcomeCurrent,
      update: data => data.wms_welcome,
      variables: {
        code: init
      }
    },
    GetDataPhotoUser: {
      query: GetUserProfile,
      update: data => data.wms_user_profile,
      variables: {
        code: init
      }
    },
    dataPublicholidays: {
      query: PublicHoliday,
      update: data => data.wms_m_public_holiday,
      variables: {
        code: init
      }
    }
  },
  components: {
    BatmChangePassword: changepassword,
    BatmChangeAvatar: changeavatar,
    ComponentMenu: componentMenu,
    BatmRunningText: batmRunningText,
    ChangeLog,
    BatmNotification: Notification,
    Welcome
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      logoutUrl: 'logoutUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2: () => date.formatDate(Date.now(), 'YYYY-MM-DD'),
    DateNow: () => date.formatDate(Date.now(), 'ddd, DD MMM YY'),
    TimeNow: () => date.formatDate(Date.now(), 'HH:mm:ss')
  },
  mounted() {
    this.getDatePublicHolidays()
    this.OnloadData()
    this.OnloadDataCount()
    this.OnloadDataCurrent()
    this.OnloadUserProfile()
    this.loadRole()
    this.tokenSession()
    this.updateNow()
    this.GetDataLastSeen()
    this.stringCut()
    this.registerEndpoint()
    // this.Notification()
    setInterval(this.updateNow, 1000)
  },
  methods: {
    getDatePublicHolidays() {
      this.$apollo.queries.dataPublicholidays.refetch({
        code: this.now2
      }).then(response => {
        this.dataPublicholidays = response.data.wms_m_public_holiday
        if (this.dataPublicholidays.length !== 0) {
          if (this.dataPublicholidays[0].is_active === true) {
            this.dayHolidayActive = true
          } else {
            this.dayHolidayActive = false
          }
        } else {
          this.dayHolidayActive = false
        }
      })
    },
    OnloadUserProfile() {
      this.$apollo.queries.GetDataPhotoUser.refetch({
        code: userdata.preferred_username
      }).then(response => {
        this.DataPhotoUser = response.data.wms_user_profile[0].photo
        if (response.data.wms_user_profile[0].relasi_designation === null) {
          this.DataDesignation = null
        } else {
          this.DataDesignation =
            response.data.wms_user_profile[0].relasi_designation.ms_designation_desc
        }
        if (response.data.wms_user_profile[0].relasi_assign_branch === null) {
          this.BranchUser = null
        } else {
          this.BranchUser =
            response.data.wms_user_profile[0].relasi_assign_branch[0].relasi_branch.branch_name
        }
      })
      this.$apollo.queries.GetDataPhotoUser.subscribeToMore({
        document: GetUserProfileSubscription,
        variables: {
          code: userdata.preferred_username
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          this.DataPhotoUser = subscriptionData.data.wms_user_profile[0].photo
          if (
            subscriptionData.data.wms_user_profile[0].relasi_designation ===
            null
          ) {
            this.DataDesignation = null
          } else {
            this.DataDesignation =
              subscriptionData.data.wms_user_profile[0].relasi_designation.ms_designation_desc
          }
        }
      })
    },
    Notification() {
      setInterval(() => {
        this.tes = true
      }, 2500)
      setInterval(() => {
        this.tes = false
      }, 20000)
    },
    StartedTour() {
      this.Welcome = true
    },
    BarWelcome() {
      this.progress1 = +(+this.DataCurrent / +this.DataCount).toFixed(2)
    },
    OnloadDataCurrent() {
      this.$apollo.queries.GetDataCurrent.refetch({
        code: userdata.preferred_username
      }).then(response => {
        this.DataCurrent = response.data.wms_welcome
        if (this.DataCurrent.length === 0) {
          this.ConditionWelcome = false
          this.DataCurrent = 0
        } else {
          this.ConditionWelcome = []
          this.ConditionWelcome = this.DataCurrent[0].welcome
          this.DataCurrent = this.DataCurrent[0].step_welcome
        }
        this.BarWelcome()
      })
      this.$apollo.queries.GetDataCurrent.subscribeToMore({
        document: GetDataWelcomeCurrentSubscription,
        variables: {
          code: userdata.preferred_username
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          this.DataCurrent = subscriptionData.data.wms_welcome
          if (this.DataCurrent.length === 0) {
            this.ConditionWelcome = false
            this.DataCurrent = 0
          } else {
            this.ConditionWelcome = []
            this.ConditionWelcome = this.DataCurrent[0].welcome
            this.DataCurrent = this.DataCurrent[0].step_welcome
          }
          this.BarWelcome()
        }
      })
    },
    OnloadDataCount() {
      this.$apollo.queries.GetDataCount.refetch({
        code: userdata.resource_access.wms.roles[0]
      }).then(response => {
        this.DataCount = response.data.wms_tutorial_aggregate.aggregate.count
      })
      this.$apollo.queries.GetDataCount.subscribeToMore({
        document: GetDataCountWelcomeSubscription,
        variables: {
          code: userdata.resource_access.wms.roles[0]
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          this.DataCount =
            subscriptionData.data.wms_tutorial_aggregate.aggregate.count
        }
      })
    },
    OnloadData() {
      this.$apollo.queries.OnDataTutorial.refetch({
        code: userdata.resource_access.wms.roles[0]
      }).then(response => {
        this.OnDataTutorial = response.data.wms_tutorial
      })
      this.$apollo.queries.OnDataTutorial.subscribeToMore({
        document: GetDataTutorialSubscription,
        variables: {
          code: userdata.resource_access.wms.roles[0]
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          this.OnDataTutorial = subscriptionData.data.wms_tutorial
        }
      })
    },
    stringCut() {
      let string = this.$q.platform.userAgent
      let split1 = string.split('(')
      let split2 = split1[1].toString().split(')')
      let split3 = split2[0].toString().split(';')
      let result = split3[2].toString()
      this.userAgent = result
      console.log(result, 'cek string')
    },
    registerEndpoint() {
      let obj = {}
      if (this.pushsub != null) {
        if (this.$q.platform.is.mobile) {
          obj.device_type = 'mobile'
        } else if (this.$q.platform.is.desktop) {
          obj.device_type = 'desktop'
        }
        obj.endpoint = this.pushsub.endpoint
        obj.auth = this.pushsub.keys.auth
        obj.p256dh = this.pushsub.keys.p256dh
        obj.username = userdata.preferred_username
        obj.name = userdata.name
        obj.label = this.userAgent
        this.$apollo
          .mutate({
            mutation: registerEndpoint,
            variables: {
              objects: obj
            }
          })
          .then(response => {
            console.log('endpoint registered')
          })
          .catch(err => {
            err = true
            console.log('already exist')
          })
      }
    },
    GetDataLastSeen() {
      let datalastseen = []
      this.$apollo
        .query({
          query: GetLastSeen,
          update: data => data.wms_log_activity,
          variables: {
            code: this.userdata.preferred_username
          }
        })
        .then(response => {
          datalastseen = response.data.wms_log_activity
          if (datalastseen[1] === undefined) {
            this.lastlogin = datalastseen[0].date_login
          } else {
            this.lastlogin = datalastseen[1].date_login
          }
        })
    },
    logActivity() {
      this.$apollo.mutate({
        mutation: InsLogActivity,
        variables: {
          objects: {
            username: userdata.preferred_username,
            fullname: userdata.name,
            group: userdata.role,
            status_login: 'logout ok',
            date_login: this.now,
            created_date: this.now,
            created_by: userdata.preferred_username
          }
        }
      })
    },
    updateNow() {
      this.timer = Date.now()
    },
    tokenSession() {
      let date1 = new Date(this.tokenED)
      let date2 = new Date(this.now)
      let unit = 'days'
      let diff = date.getDateDiff(date1, date2, unit)
      if (diff < 1) {
        const body = qs.stringify({
          client_id: 'wms',
          Authorization: 'bearer ' + this.token,
          refresh_token: this.refreshToken
        })
        this.$axios
          .post(this.logoutUrl, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            this.doLogout().then(() => {
              this.$q.loading.hide()
              this.$router.replace('/')
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Expired Token'
              })
            })
          })
      }
    },
    loadRole() {
      this.$apollo
        .query({
          query: RoleMap,
          variables: {
            code: this.userdata.resource_access.wms.roles[0]
          }
        })
        .then(response => {
          let datarole = response.data
          this.rolemap = datarole.wms_roles[0].roles_desc
        })
    },
    onTickerClick() {
      if (this.tickerOn === false) {
        this.tickerOn = !this.tickerOn
      } else {
        this.tickerOn = !this.tickerOn
      }
    },
    getFormatTime(file) {
      let timeStamp = new Date(file)
      return date.formatDate(timeStamp, 'ddd, DD MMM YYYY HH:mm:ss')
    },
    Onchangelog() {
      this.$log.info('info call at function Onchangelog')
      this.Changelog = true
    },
    ...mapActions('showcase', {
      doLogout: 'logout'
    }),
    OnChangePassword() {
      this.ChangePassword = true
    },
    OnChangeAvatar() {
      this.ChangeAvatar = true
    },
    loadtimelogin() {
      let datalastseen = []
      this.$axios
        .get(
          this.baseUrl +
            "/api/batm/wms/WMS_LOG_ACT?ql=where log_user_id = '" +
            this.userdata.username +
            "'",
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        )
        .then(response => {
          datalastseen = response.data.entities
          this.lastseen = datalastseen[1]
          this.lastlogin = datalastseen[1].log_login_datetime
        })
        .catch(error => {
          console.log(error.response.status, 'gagal') // Logs a string: Error: Request failed with status code 404
        })
    },

    logout() {
      this.logActivity()
      const body = qs.stringify({
        client_id: 'wms',
        Authorization: 'bearer ' + this.token,
        refresh_token: this.refreshToken
      })
      setTimeout(() => {
        this.$axios
          .post(this.logoutUrl, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            this.doLogout().then(() => {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'You Have Been Logout'
              })
              this.$router.replace('/')
            })
          })
      }, 2000)
    },
    NotificationDialog() {
      this.notif = true
    },
    LogoutDialog() {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.body-style {
  overflow: hidden;
}

.center {
  display: flex;
  align-items: center;
  font-weight: bold;
  justify-content: flex-end;
}

.space {
  text-indent: 5%;
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.font {
  font-family: Verdana;
}

.MarqueeFont {
  font-family: Courier;
}
</style>
