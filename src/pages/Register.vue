<template>
  <q-page> 
    <q-card class="row items-center absolute-center" style="width: 450px; max-width: 100%">
       <q-card-section class="col-12 flex flex-center">
         <q-tab-panel name="one">
           <q-card-section class="q-mr-md text-center">
             <img src="../statics/artha.png" style="width: 35%" />
           </q-card-section>
           <br>
             <div class="row q-col-gutter-md">
               <div class="col-12">
                 <q-input type="username" ref="username" @input="trim" outlined v-model="username" label="Ussername">
                   <template v-slot:prepend>
                     <q-icon name="person" />
                   </template>
                   <template v-slot:append>
                     <q-icon name="close" @click="username = ''" class="cursor-pointer" v-show="username" />
                   </template>
                 </q-input>
               </div>
               <div class="col-12">
                 <q-input v-model="password" outlined label="Password" :type="isPwd ? 'password' : 'text'"
                   ref="password" :rules="[ val => val.length >= 8 || 'Please use minimum 8 characters']">
                   <template v-slot:prepend>
                     <q-icon name="mdi-textbox-password" />
                   </template>
                   <template v-slot:append>
                     <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                       @click="isPwd = !isPwd" v-show="password" />
                   </template>
                 </q-input>
               </div>
               <div class="col-12">
                <q-input v-model="confirmPassword" outlined label="Confirm Password"
                  :type="isCnPwd ? 'password' : 'text'" ref="confirmPassword"
                  :rules="[ val => val.length >= 8 || 'Please use minimum 8 characters']">
                  <template v-slot:prepend>
                    <q-icon name="mdi-textbox-password" />
                  </template>
                  <template v-slot:append>
                    <q-icon :name="isCnPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isCnPwd = !isCnPwd" v-show="confirmPassword" />
                  </template>
                </q-input>
               </div>
                   <div class="col-12">
                     <q-btn :disable="!password || !confirmPassword || !username" dense color="primary" class="full-width" @click="Register" type="submit"
                       :loading="register" no-caps label="Register">
                       <template v-slot:loading>
                         <q-spinner-facebook />
                       </template>
                     </q-btn>
                   </div>
                   <div class="col-12">
                     <q-btn dense color="accent" @click="Login" outline class="full-width" type="submit"
                       :loading="submitting" no-caps label="Login">
                       <template v-slot:loading>
                         <q-spinner-facebook />
                       </template>
                     </q-btn>
                   </div>
             </div>
         </q-tab-panel>
       </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Register } from 'src/graphql/Register'
import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'Register',
  data() {
    return {
      tab: 'one',
      username: '',
      password: '',
      passwordLast: '',
      confirmPassword: '',
      isPwd: true,
      isCnPwd: true,
      submitting: false,
      register: false
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
    trim() {
      this.username = this.username.replace(/ /g,'')
    },
    Encrypt(value) {
        for (let i = 0; i < value.length; i++) {
          if (i < value.length - 1) {
            this.passwordLast += value.charCodeAt(i) + 10;
            this.passwordLast += '-';
          } else {
            this.passwordLast += value.charCodeAt(i) + 10;
          }
        }
        console.log(this.passwordLast, 'hasil')
        return this.passwordLast;
      },
    Register() {
      if (this.password !== this.confirmPassword) {
      this.$q.notify({
              color: 'negative',
              timeout: 300,
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Password did not match'
            })
      } else {
        this.register = true
        this.Encrypt(this.password)
        this.$apollo
          .mutate({
            mutation: Register,
            variables: {
              objects: {
                username: this.username,
                password: this.passwordLast
              }
            }
          })
          .then(response => {
            this.register = false
            this.$q.notify({
              color: 'accent',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Username ' + this.username + ' ' + 'Has Been Register'
            })
            this.$router.push({ path: '/' })
          })
          .catch(err => {
            this.register = false
            this.emessage = err
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Username '+ this.username + ' already exist'
            })
          })
        }
    },
    Login() {
      this.$router.push({ path: '/' })
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
