<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Region" icon="fas fa-map-marked-alt" to="/region" />
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
                        :disable="
                          Country === '' ||
                            RegionCode === '' ||
                            RegionName === ''
                        "
                        @click="SubmitDialog"
                        label="Submit"
                        color="accent"
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        @click="ClearButton"
                        :disable="
                          Country === '' &&
                            RegionCode === '' &&
                            RegionName === ''
                        "
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
                    <!-- <div class="q-pa-md"> -->
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="Country"
                          :options="loadcountry"
                          :option-label="
                            loadcountry => loadcountry.country_name
                          "
                          :option-value="loadcountry => loadcountry"
                          emit-value
                          map-options
                          label="Country"
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined stack-label v-model="RegionCode" label="Region Code" />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined stack-label v-model="RegionName" label="Region Name" />
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
import { InsertRegion } from 'src/graphql/Region'
import { GetAllCountries } from 'src/graphql/Countries'
import { date } from 'quasar'
export default {
  name: 'AddRegion',
  data() {
    return {
      user: this.$q.sessionStorage.getItem('username'),
      userdata: this.Muser,
      RegionName: '',
      RegionCode: '',
      Country: '',
      submitting: false,
      loadcountry: []
    }
  },
  apollo: {
    loadcountry: {
      query: GetAllCountries,
      update: data => data.wms_countries
    }
  },
  methods: {
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsertRegion,
          variables: {
            objects: {
              region_code: this.RegionCode,
              region_name: this.RegionName,
              id_country: this.Country.id_country,
              created_date: this.now,
              created_by: this.user
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
              'Region Code ' + this.RegionCode + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/region' })
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

      // console.log('Clicked on an Item')
    },
    ClearButton() {
      this.Country = ''
      this.RegionName = ''
      this.RegionCode = ''

      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
        this.submitting = false
        this.$q.notify({
          timeout: 300,
          color: 'cyan-7',
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
          this.$router.push({ path: '/region' })
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
