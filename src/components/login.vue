<template>
  <div>
    <q-form @submit.prevent.stop="LoginButton">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            type="username"
            ref="username"
            outlined
            v-model.trim="username"
            label="Username"
            :rules="[val => !!val || $t('Enter an username')]"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click="username = ''"
                class="cursor-pointer"
                v-show="username"
              />
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-input
            v-model.trim="password"
            outlined
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            ref="password"
            :rules="[val => !!val || $t('Enter a password')]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-textbox-password" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
                v-show="password"
              />
            </template>
          </q-input>
        </div>

        <div class="q-mb-sm col-12">
          <q-checkbox
            class="q-ml-xs"
            dense
            size="xs"
            v-model="checkbox"
            label="Remember me"
          />
          <a class="q-ml-lg" href="forgotpasswprd" target="_blank"
            >Forgot your password?</a
          >
        </div>
        <div class="col-12">
          <div v-if="$q.platform.is.desktop">
            <div class="col-12">
              <q-btn
                dense
                color="accent"
                class="full-width"
                icon="ion-log-in"
                type="submit"
                :loading="submitting"
                no-caps
                label="Login"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>
          <div v-if="$q.platform.is.mobile">
            <div class="row q-col-gutter-md">
              <div class="col-9">
                <q-btn
                  dense
                  color="accent"
                  class="full-width"
                  icon="ion-log-in"
                  type="submit"
                  :loading="submitting"
                  no-caps
                  label="Login"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
              <div class="col-3">
                <q-btn
                  color="primary"
                  icon="fas fa-fingerprint"
                  type="a"
                  href="https://keycloak.batm.world/auth/realms/wms/protocol/openid-connect/auth?client_id=wms&response_mode=fragment&response_type=code&login=true&redirect_uri=https%3A%2F%2Fwms-dev.batm.world%2Fsso"
                  no-caps
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="q-pt-md col-12">
        <span>
          Haven't activated account yet?
          <a
            href="http://keycloak.batm.world/auth/realms/wms/account"
            target="_blank"
          >Activate now</a>
        </span>
        </div>-->
      </div>
      <!-- <q-btn
        icon="ion-log-in"
        type="submit"
        :loading="submitting"
        label="Login"
        class="full-width"
        color="accent"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
      <br/><br/>
      <q-btn
        icon="fas fa-user"
        type="a"
        href="http://keycloak.batm.world/auth/realms/wms/account"
        target="_blank"
        label="Account Activation"
        class="full-width"
        color="blue"
      >
      </q-btn>-->
    </q-form>
    <!-- <div v-if="$q.platform.is.desktop">
      <q-dialog v-model="selection" persistent>
        <q-card
          style="width: 500px; max-width: 80vw; background-color: #E6E5E5"
        >
          <q-card-section style="width: 100%">
            <div class="row">
              <div class="col-12">
                <div class="float-left  text-h6 text-bold q-mb-md">
                  Choose Business Process
                </div>
                <div class="float-right">
                  <q-btn
                    class="q-ml-xl"
                    @click="close"
                    size="sm"
                    round
                    color="negative"
                    dense
                    no-caps
                    icon="close"
                    v-close-popup
                  >
                    <q-tooltip>Close</q-tooltip>
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                  </q-btn>
                </div>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-card
                  class="cursor-pointer text-center"
                  @click="popupselection('wms')"
                >
                  <q-card-section>
                    <q-avatar
                      size="70px"
                      font-size="20px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-hand-holding-usd"
                    />
                  </q-card-section>

                  <q-card-section>
                    <div class="text-h7 text-bold text-primary">
                      Mutual Fund
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-4">
                <q-card
                  class="cursor-pointer text-center"
                  @click="popupselection('ba')"
                >
                  <q-card-section>
                    <q-avatar
                      size="70px"
                      font-size="20px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-coins"
                    />
                  </q-card-section>

                  <q-card-section>
                    <div class="text-h7 text-bold text-primary">
                      Bancassurance
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-4">
                <q-card
                  class="cursor-pointer text-center"
                  @click="popupselection('rb')"
                >
                  <q-card-section>
                    <q-avatar
                      size="70px"
                      font-size="20px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-file-invoice-dollar"
                    />
                  </q-card-section>

                  <q-card-section>
                    <div class="text-h7 text-bold text-primary">
                      Retail Bonds
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div> -->
    <!-- <div v-if="$q.platform.is.mobile">
      <q-dialog v-model="selection" persistent>
        <q-card style="background-color: #ebedf5">
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <div class="float-left text-h8 text-bold q-mb-md">
                  Choose Business Process
                </div>
                <div class="float-right">
                  <q-btn
                    icon="close "
                    @click="close"
                    size="sm"
                    round
                    color="negative"
                    no-caps
                    dense
                    v-close-popup
                  >
                    <q-tooltip>Close</q-tooltip>
                    <template v-slot:loading>
                      <q-spinner-facebook />
                    </template>
                  </q-btn>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <q-card
                  class="q-pl-md q-pr-md cursor-pointer text-center flex flex-center"
                  @click="popupselection('wms')"
                >
                  <q-card-section>
                    <q-avatar
                      size="35px"
                      font-size="10px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-hand-holding-usd"
                    />
                  </q-card-section>

                  <div
                    style="font-size:7px"
                    class="text-bold text-primary q-pb-md"
                  >
                    Mutual Fund
                  </div>
                </q-card>
              </div>
              <div class="col-4">
                <q-card
                  class="q-pl-md q-pr-md cursor-pointer text-center flex flex-center"
                  @click="popupselection('ba')"
                >
                  <q-card-section>
                    <q-avatar
                      size="35px"
                      font-size="10px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-coins"
                    />
                  </q-card-section>

                  <div
                    style="font-size:7px"
                    class="text-bold text-primary q-pb-md"
                  >
                    Bancassurance
                  </div>
                </q-card>
              </div>
              <div class="col-4">
                <q-card
                  class="cursor-pointer text-center"
                  @click="popupselection('rb')"
                >
                  <q-card-section>
                    <q-avatar
                      size="35px"
                      font-size="10px"
                      color="primary"
                      text-color="white"
                      icon="fas fa-file-invoice-dollar"
                    />
                  </q-card-section>

                  <div
                    style="font-size:7px"
                    class="text-bold text-primary q-pb-md"
                  >
                    Retail Bonds
                  </div>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LocalStorage, date } from 'quasar'
import JwtDecode from 'jwt-decode'
import qs from 'qs'
export default {
  name: 'LoginComponent',
  data() {
    return {
      checkbox: false,
      username: '',
      password: '',
      publicKey: {},
      authenticator: '',
      isPwd: true,
      submitting: false,
      token: null,
      emessage: null,
      selection: false
    }
  },
  computed: {
    ...mapState('showcase', {
      loginUrl: 'loginUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    ...mapActions('showcase', {
      doLogin: 'login',
      doToken: 'token',
      doRToken: 'rtoken',
      dotokensExpiry: 'tokensExpiry',
      doAppsMode: 'appsmode',
      doLogout: 'logout'
    }),
    registerFinger() {
      console.log(this.$q.platform.is.desktop, 'fingerprint=====>')
      // this.authenticator = ''
      // if (this.$q.platform.is.desktop === true) {
      //   this.authenticator = 'cross-platform'
      // } else {
      //   this.authenticator = 'platform'
      // }
      console.log(this.authenticator, 'fingerprint=====>')
      if (this.username !== '' && this.password !== '') {
        if (!window.PublicKeyCredential) {
          console.log(
            window.PublicKeyCredential,
            'WebAuthn not supported on this browser'
          )
        }

        const UVPAA = window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
          .then(function(available) {
            if (!available) {
              console.log(available, 'WebAuthn not supported on this browser!')
            }
          })
          .catch(function(err) {
            console.error(err)
          })

        console.log('ASSERTION', UVPAA)

        const createCredentialDefaultArgs = {
          publicKey: {
            // Relying Party (a.k.a. - Service):
            rp: {
              name: 'BOS'
            },

            // User:
            user: {
              id: new Uint8Array(16),
              name: 'bos_auto',
              displayName: 'Auto Prananda'
            },

            pubKeyCredParams: [
              {
                type: 'public-key',
                alg: -7
              },
              {
                type: 'public-key',
                alg: -257
              }
            ],
            authenticatorSelection: {
              requireResidentKey: true,
              authenticatorAttachment: `platform`,
              userVerification: 'required'
            },
            attestation: 'none',
            timeout: 5000,
            challenge: new Uint8Array([
              // must be a cryptographically random number sent from a server
              0x8c,
              0x0a,
              0x26,
              0xff,
              0x22,
              0x91,
              0xc1,
              0xe9,
              0xb9,
              0x4e,
              0x2e,
              0x17,
              0x1a,
              0x98,
              0x6a,
              0x73,
              0x71,
              0x9d,
              0x43,
              0x48,
              0xd5,
              0xa7,
              0x6a,
              0x15,
              0x7e,
              0x38,
              0x94,
              0x52,
              0x77,
              0x97,
              0x0f,
              0xef
            ]).buffer
          }
        }

        // sample arguments for login
        const getCredentialDefaultArgs = {
          publicKey: {
            allowCredentials: [
              {
                id: new Uint8Array(16),
                type: 'public-key'
              }
            ],
            authenticatorSelection: {
              requireResidentKey: true,
              authenticatorAttachment: `platform`,
              userVerification: 'required'
            },
            timeout: 5000,
            // allowCredentials: [newCredential] // see below
            challenge: new Uint8Array([
              // must be a cryptographically random number sent from a server
              0x79,
              0x50,
              0x68,
              0x71,
              0xda,
              0xee,
              0xee,
              0xb9,
              0x94,
              0xc3,
              0xc2,
              0x15,
              0x67,
              0x65,
              0x26,
              0x22,
              0xe3,
              0xf3,
              0xab,
              0x3b,
              0x78,
              0x2e,
              0xd5,
              0x6f,
              0x81,
              0x26,
              0xe2,
              0xa6,
              0x01,
              0x7d,
              0x74,
              0x50
            ]).buffer
          }
        }

        // register / create a new credential
        navigator.credentials
          .create(createCredentialDefaultArgs)
          .then(cred => {
            console.log('NEW CREDENTIAL', cred)
            LocalStorage.set('publicKey', cred.id)
            this.LoginButton()
            // normally the credential IDs available for an account would come from a server
            // but we can just copy them from above...
            let idList = [
              {
                id: cred.rawId,
                transports: ['usb', 'nfc', 'ble'],
                type: 'public-key'
              }
            ]
            getCredentialDefaultArgs.publicKey.allowCredentials = idList
            return navigator.credentials.get(getCredentialDefaultArgs)
          })
          .catch(err => {
            console.log('ERROR', err)
            LocalStorage.set('publicKey', err)
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Fingerprint Failed'
            })
          })
      } else {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Check Fingerprint Failed'
        })
      }
    },
    close() {
      this.doLogout()
    },
    LoginButton() {
      let RefreshToken
      this.$log.info('info call at function LoginButton')
      this.submitting = true
      // let userdata
      const body = qs.stringify({
        grant_type: 'password',
        client_id: 'wms',
        username: this.username,
        password: this.password
      })
      this.$axios
        .post(this.loginUrl, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          this.submitting = false
          let decoded = JwtDecode(response.data.access_token)
          this.token = response.data.access_token
          RefreshToken = response.data.refresh_token
          this.doLogin(decoded)
          this.doToken(this.token)
          this.doRToken(RefreshToken)
          let ms = Number(decoded.exp + '000')
          let exptime = date.formatDate(ms)
          this.dotokensExpiry(exptime)
          this.emessage = true
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Welcome, ' + decoded.name
          })

          this.$axios
            .post(
              'https://wms-hasura.batm.world',
              {
                query: `
                mutation MyMutation($objects: [wms_log_activity_insert_input!]!) {
                  insert_wms_log_activity(objects: $objects){
                    affected_rows
                  }
                }`,
                variables: {
                  objects: {
                    username: decoded.preferred_username,
                    fullname: decoded.name,
                    group: decoded.role,
                    status_login: 'login ok',
                    date_login: this.now,
                    created_date: this.now,
                    created_by: decoded.preferred_username
                  }
                }
              },
              {
                headers: {
                  'x-hasura-access-key': 'batm.hasura2019',
                  Authorization: 'Bearer ' + this.token
                }
              }
            )
            .then(response => {
              this.selection = true
              this.popupselection('wms')
              // location.reload(true)
              // this.$router.push({ path: '/dashboard' })
            })
        })
        .catch(err => {
          // if the request fails, remove any possible user token if possible
          window.localStorage.clear()
          this.emessage = err
          console.log(err.response.status, 'code')
          if (err.response.status === 400) {
            this.ActivationDialog()
          }
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Login Failed'
          })
        })
      setTimeout(() => {
        this.submitting = false
      }, 3000)
    },
    ActivationDialog() {
      this.$q
        .dialog({
          title: 'Not Allowed',
          message: 'Sorry You Need to Activate Your Account First',

          persistent: true,

          ok: {
            icon: 'far fa-share-square',
            label: 'Activate Now',
            textColor: '',
            color: 'blue'
          },
          cancel: {
            label: 'Cancel',
            textColor: 'negative',
            color: ''
          }
        })
        .onOk(() => {
          window.open('http://keycloak.batm.world/auth/realms/wms/account')
        })
        .onCancel(() => {})
    },
    popupselection(apps) {
      if (apps === 'wms') {
        this.doAppsMode(apps)
        location.reload(true)
        this.$router.push({ path: '/dashboard' })
      } else if (apps === 'ba') {
        this.doAppsMode(apps)
        location.reload(true)
        this.$router.push({ path: '/dashboardba' })
      } else if (apps === 'rb') {
        this.doAppsMode(apps)
        location.reload(true)
        this.$router.push({ path: '/dashboardrb' })
      }
    },
    popupbutton() {
      this.selection = true
    }
  }
}
</script>

<style>
a:link {
  color: #4d4dff;
  background-color: transparent;
  text-decoration: none;
  font-size: 12px;
}
a:visited {
  color: #4d4dff;
  background-color: transparent;
  text-decoration: none;
  font-size: 12px;
}
a:hover {
  color: #4d4dff;
  background-color: transparent;
  text-decoration: underline;
  font-size: 12px;
}
a:active {
  color: #4d4dff;
  background-color: transparent;
  text-decoration: underline;
  font-size: 12px;
}

/* span {
  color: #262626;
  font-size: 12px;
} */
</style>
