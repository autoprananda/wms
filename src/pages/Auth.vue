<template>
  <q-page>
    <div>
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
  </q-page>
</template>

<script>
import ComponentLogin from '../components/login.vue'
import { version } from '../../package.json'
export default {
  data() {
    return {
      tab: 'one',
      appversion: version
    }
  },
  components: {
    ComponentLogin
  }
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
