<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Cities" icon="fas fa-building" to="/cities" />
              <q-breadcrumbs-el label="Edit" icon="edit" />
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
                          :disable="City === ''"
                          label="Submit"
                          color="accent"
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
                      <div class="row q-gutter-y-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="RegionName"
                            :options="loadregion"
                            :option-label="loadregion => loadregion.region_name"
                            :option-value="loadregion => loadregion"
                            emit-value
                            map-options
                            label="Region Name"
                            stack-label
                          />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input outlined v-model="City" label="City" />
                        </div>
                      </div>
                    </q-card-section>
                  </form>
                </q-card-section>
                <!-- <q-card-section>t:{{cek}}</q-card-section> -->
              </q-card>
            </transition>
          </q-card-section>
        </q-card>
      </q-page>
    </div>
</template>

<script>
import { ViewRegion } from 'src/graphql/Region'
import { EditMasterCities } from 'src/graphql/Cities'
import { date } from 'quasar'
export default {
  name: 'EditCities',
  data() {
    return {
      City: '',
      RegionName: {},
      OldCity: '',
      submitting: false,
      loadregion: [],
      user: this.$q.sessionStorage.getItem('username'),
      selected: JSON.parse(localStorage.selectedData),
    }
  },
  mounted() {
    this.onBindData()
  },
  apollo: {
    loadregion: {
      query: ViewRegion,
      update: data => data.wms_region
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  methods: {
    onBindData() {
      this.City = this.selected[0].city_name
      this.RegionName.region_name = this.selected[0].region.region_name
      this.OldCity = this.selected[0].city_name
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterCities,
          variables: {
            code: this.OldCity,
            changes: {
              id_region: this.RegionName.id_region,
              city_name: this.City,
              modified_date: this.now,
              modified_by: this.user
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'City ' + this.City + ' ' + 'Has Been Updated'
          })
          this.$router.push({ path: '/cities' })
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
          this.$router.push({ path: '/cities' })
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
