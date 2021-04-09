<template>
  <div>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            type="username"
            ref="username"
            outlined
            v-model.trim="username"
            label="Username"
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
        <div class="col-6">
          <q-btn
            dense
            color="accent"
            class="full-width"
            icon="ion-log-in"
            type="submit"
            :loading="submitting"
            no-caps
            @click="LoginButton"
            label="Login"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
         <div class="col-6">
          <q-btn
            dense
            color="primary"
            class="full-width"
            outline
            type="submit"
            @click="Register"
            :loading="submitting"
            no-caps
            label="Register"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
        
      </div>
  </div>
</template>

<script>

let init = ''

import { GetUser } from 'src/graphql/MasterUser'
import { mapState } from 'vuex'
import { date } from 'quasar'
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
      selection: false,
      passwordOri: ''
    }
  },
  computed: {
    ...mapState('showcase', {
      loginUrl: 'loginUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  },
  apollo: {
    loaddata: {
      query: GetUser,
      update: data => data.wms_m_user,
      variables: {
        code: init
      }
    }
  },
  methods: {
    LoginButton() {
      this.$apollo.queries.loaddata.refetch({
        code: this.username
      }).then(response => {
        if (response.data.wms_m_user.length !== 0) {
          this.decodedBase64(response.data.wms_m_user[0].password)
          if (this.passwordOri === this.password) {
            this.$q.sessionStorage.set('username', response.data.wms_m_user[0].username)
            this.$q.notify({
              color: 'accent',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Welcome, ' + response.data.wms_m_user[0].fullname
            })
            this.$router.push({ path: '/dashboard' })
          } else {
            this.wrongEmailorPassword()
          }
        } else {
          this.wrongEmailorPassword()
        }
      }).catch(error =>{
        console.log(error, 'Error')
      }) 
    },
    wrongEmailorPassword() {
      this.$q.notify({
        color: 'negative',
        timeout: 500,
        textColor: 'white',
        icon: 'fas fa-exclamation-circle',
        message: 'Username or Password Entered is Invalid'
      })
    },
    decodedBase64(value) {		
		this.passwordOri = atob(value)
    },
    Register() {
      this.$router.push({ path: '/register' })
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
</style>
