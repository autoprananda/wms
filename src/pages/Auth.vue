<template>
  <q-page>
    <div v-if="$q.platform.is.desktop">
      <q-card
        class="transparent row items-center absolute-center full-width full-height"
      >
        <q-card-section class="col-xs-12 col-sm-6 col-md-6 text-center">
          <transition appear enter-active-class="animated zoomIn ">
            <img src="../statics/artha.png" style="width: 30%" />
          </transition>
          <br />

          <div class="q-mt-lg">
            <img src="../statics/powered.png" style="width: 30%" />
          </div>
        </q-card-section>

        <q-card-section class="col-xs-12 col-sm-6 col-md-6 flex flex-center">
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6">
              <!-- <q-card-section class="q-mt-sm text-center">
              <img src="../statics/logobca.png" style="width: 80%" />

              <h5 class="q-mt-md text-primary text-weight-medium">Bank Central Asia</h5>
            </q-card-section>-->
              <q-card-section class="q-mr-md text-center">
                <img src="../statics/logobank.png" style="width: 100%" />
                <div class="q-mb-md">
                  <div class="float-right">v{{ appversion }}</div>
                </div>
              </q-card-section>
              <q-separator />
              <q-tab-panel name="one">
                <component-login></component-login>
              </q-tab-panel>
            </q-card>
          </transition>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="$q.platform.is.mobile">
      <div
        class="orientation-portrait transparent row q-pt-md full-width full-height"
      >
        <q-card-section class="col-12 text-center">
          <transition appear enter-active-class="animated zoomIn ">
            <img src="../statics/artha.png" style="width: 30%" />
          </transition>
          <br />

          <div class="q-mt-lg">
            <img src="../statics/powered.png" style="width: 30%" />
          </div>
        </q-card-section>

        <q-card-section class="col-12 flex flex-center">
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6">
              <q-card-section class="q-mr-md text-center">
                <img src="../statics/logobank.png" style="width: 100%" />
                <div class="q-mb-md">
                  <div class="float-right">v{{ appversion }}</div>
                </div>
              </q-card-section>
              <q-separator />
              <q-tab-panel name="one">
                <component-login></component-login>
              </q-tab-panel>
            </q-card>
          </transition>
        </q-card-section>
      </div>
      <div class="orientation-landscape transparent row  ">
        <q-card-section class="center q-mt-lg col-6 ">
          <transition appear enter-active-class="animated zoomIn ">
            <img src="../statics/artha.png" style="width: 30%" />
          </transition>
          <br />

          <div class="q-mt-lg">
            <img src="../statics/powered.png" style="width: 30%" />
          </div>
        </q-card-section>

        <q-card-section class="col-6 flex flex-center">
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6">
              <q-card-section class="q-mr-md text-center">
                <img src="../statics/logobank.png" style="width: 100%" />
                <div class="q-mb-md">
                  <div class="float-right">v{{ appversion }}</div>
                </div>
              </q-card-section>
              <q-separator />
              <q-tab-panel name="one">
                <component-login></component-login>
              </q-tab-panel>
            </q-card>
          </transition>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>

<script>
import ComponentLogin from '../components/login.vue'
import { version } from '../../package.json'
// import ComponentRegister from '../components/registration.vue'
export default {
  data() {
    return {
      tab: 'one',
      appversion: version
      // loading: false
    }
  },
  components: {
    ComponentLogin

    // ComponentRegister
  }
  // created() {
  //   this.loading = true
  //   setTimeout(() => {
  //     this.loading = false
  //   }, 1000)
  // }
}
</script>

<style lang="stylus" scoped>
.my-card {
  // width: 100%;
  // max-width: 500px;
  width: 300px;
  // height: 450px;
}

// .center {
//   display: flex;
//   align-items: center;
//   justify-content: flex-center;

// }

.center {
 padding: 100px 0;

  text-align: center;

}
</style>
