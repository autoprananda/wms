<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Countries" icon="fas fa-globe-asia" to="/countries" />
            <q-breadcrumbs-el label="Add" icon="note_add" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline style="background-color:white;">
              <q-card-section>
                <form @submit.prevent="SubmitButton">
                  <q-card-section>
                    <div class="q-mb-sm q-gutter-sm">
                      <q-btn
                        :loading="submitting"
                        @click="SubmitDialog"
                        :disable="Description === '' || CountryCode === ''"
                        label="Submit"
                        color="accent"
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        :disable="Description === '' && CountryCode === ''"
                        @click="ClearButton"
                        label="Clear"
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
                        <q-input outlined stack-label v-model="CountryCode" label="Country Code" />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined stack-label v-model="Description" label="Description" />
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
import { InsMasterCountries } from 'src/graphql/Countries'
import { date } from 'quasar'
export default {
  name: 'AddCountry',
  data() {
    return {
      user: this.$q.sessionStorage.getItem('username'),
      CountryCode: '',
      Description: '',
      submitting: false
    }
  },
  methods: {
    SubmitButton() {
      this.submitting = true

      this.$apollo
        .mutate({
          mutation: InsMasterCountries,
          variables: {
            objects: {
              country_code: this.CountryCode,
              country_name: this.Description,
              created_by: this.user,
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
            message:
              'Country Code ' + this.CountryCode + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/countries' })
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
    ClearButton() {
      this.CountryCode = ''
      this.Description = ''

      setTimeout(() => {
        // delay simulated, we are done,
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
          this.$router.push({ path: '/countries' })
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

<style></style>
