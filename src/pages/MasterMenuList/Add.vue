<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Menu" icon="fas fa-bars" to="/menu" />
            <q-breadcrumbs-el label="Add" icon="note_add" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline style="background-color:white;">
              <q-card-section>
                <form>
                  <q-card-section>
                    <div class="q-gutter-sm">
                      <q-btn
                        @click="SubmitDialog"
                        :disable="
                          MenuCode === '' ||
                            MenuDescription === '' ||
                            GrupIcon === '' ||
                            SortOrder === ''
                        "
                        :loading="submitting"
                        label="Submit"
                        color="accent"
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        label="Clear"
                        :disable="
                          MenuCode === '' &&
                            MenuDescription === '' &&
                            GrupIcon === '' &&
                            SortOrder === ''
                        "
                        @click="ClearButton"
                        color="cyan-7"
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        @click="CancelDialog"
                        label="Cancel"
                        color="negative"
                        style="width: 80px"
                      ></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined v-model="MenuCode" label="Menu Code" stack-label />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          v-model="MenuDescription"
                          label="Menu Description"
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          mask="####"
                          v-model="SortOrder"
                          label="Sort Order"
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined v-model="GrupIcon" label="Grup Icon" stack-label />
                      </div>
                    </div>
                  </q-card-section>
                </form>
              </q-card-section>
            </q-card>
          </transition>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { date } from 'quasar'
import { InsMasterMenu } from 'src/graphql/MasterMenu'
export default {
  name: 'AddMasterMenu',
  props: ['userLogin'],
  data() {
    return {
      user: this.userLogin,
      submitting: false,
      emessage: '',
      MenuCode: '',
      MenuDescription: '',
      GrupIcon: '',
      SortOrder: '',
      userdata: this.Muser
    }
  },
  methods: {
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsMasterMenu,
          variables: {
            objects: {
              menu_code: this.MenuCode,
              menu_desc: this.MenuDescription,
              order_key: +this.SortOrder,
              icon: this.GrupIcon,
              created_by: this.user.fullname,
              created_date: this.now
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Menu Code ' + this.MenuCode + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/menu' })
        })
        .catch(err => {
          this.submitting = false
          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
    },
    SubmitDialog() {
      this.$q
        .dialog({
          title: 'Confirmation',
          message: 'Are you sure ?',

          persistent: true,

          ok: {
            icon: 'far fa-share-square',
            label: 'Submit',
            textColor: '',
            color: 'accent'
          },
          cancel: {
            label: 'No',
            textColor: 'accent',
            color: ''
          }
        })
        .onOk(() => {
          console.log('>>>> OK')
          this.SubmitButton()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    ClearButton() {
      this.MenuDescription = ''
      this.MenuCode = ''
      this.SortOrder = ''
      this.GrupIcon = ''

      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    CancelDialog() {
      this.$q
        .dialog({
          title: 'Confirmation',
          message: 'Are you sure ?',

          persistent: true,

          ok: {
            icon: 'close',
            label: 'Yes',
            textColor: '',
            color: 'negative'
          },
          cancel: {
            label: 'No',
            textColor: 'negative',
            color: ''
          }
        })
        .onOk(() => {
          console.log('>>>> OK')
          this.$router.push({ path: '/menu' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>
