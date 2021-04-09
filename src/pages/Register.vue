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
                 <q-input type="fullname" ref="fullname" @input="trim" outlined v-model="fullname" label="Full Name">
                   <template v-slot:prepend>
                     <q-icon name="person" />
                   </template>
                   <template v-slot:append>
                     <q-icon name="close" @click="fullname = ''" class="cursor-pointer" v-show="fullname" />
                   </template>
                 </q-input>
               </div>
               <div class="col-12">
                 <q-input type="username" ref="username" @input="trim" outlined v-model="username" label="Username">
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
import bcryptjs from 'bcryptjs'
import { Register } from 'src/graphql/MasterUser'
import { date } from 'quasar'
const saltRounds = 10
export default {
  name: 'Register',
  data() {
    return {
      tab: 'one',
      username: '',
      password: '',
      fullname: '',
      passwordLast: '',
      confirmPassword: '',
      isPwd: true,
      isCnPwd: true,
      submitting: false,
      register: false
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    trim() {
      this.username = this.username.replace(/ /g,'')
    },
    encrypt(value) {
      
    },
    Register() {
      if (this.password !== this.confirmPassword) {
        this.$q.notify({
          color: 'negative',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'Password did not match'
        })
      } else {
        this.register = true
        bcryptjs.genSalt(saltRounds, (err, salt) => {
          if (err) {
            return next(err)
          } else {
            bcryptjs.hash(this.password, salt, (err, hash) => {
              if (err) {
                return next(err)
              } else {
                this.passwordLast = hash
                
                this.$apollo
                  .mutate({
                    mutation: Register,
                    variables: {
                      objects: {
                        username: this.username,
                        password: this.passwordLast,
                        fullname: this.fullname
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
                    this.$router.push({
                      path: '/'
                    })
                  })
                  .catch(err => {
                    this.register = false
                    this.emessage = err
                    this.$q.notify({
                      color: 'negative',
                      textColor: 'white',
                      icon: 'fas fa-exclamation-circle',
                      message: 'Username ' + this.username + ' already exist'
                    })
                  })
              }
            })
          }
        })
      }
    },
    
    // encodedToBase64(value) {
    //   this.passwordLast = btoa(value)
    // },
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
