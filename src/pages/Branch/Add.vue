<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Branches" icon="fas fa-code-branch" to="/branch" />
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
                      <q-btn :loading="submitting" @click="SubmitDialog" :disable="
                          BranchCode === '' ||
                            BranchName === '' ||
                            BranchManagerName === '' ||
                            BranchManagerName === '' ||
                            Status === '' ||
                            Region === '' ||
                            Area === ''
                        " label="Submit" color="accent" style="width: 80px"></q-btn>
                      <q-btn @click="ClearButton" :disable="
                          BranchCode === '' &&
                            BranchName === '' &&
                            BranchManagerName === '' &&
                            BranchManagerName === '' &&
                            Status === '' &&
                            Region === '' &&
                            Area === ''
                        " label="Clear" color="cyan-7" style="width: 80px"></q-btn>
                      <q-btn @click="CancelDialog" label="Cancel" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-input outlined v-model="BranchCode" label="Branch Code" stack-label />
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-input outlined v-model="BranchName" label="Branch Name" stack-label />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-input outlined v-model="BranchManagerName" label="Branch Manager Name" stack-label />
                      </div>

                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-select outlined v-model="Status" :options="loadStatus" stack-label :option-label="
                            loadStatus => loadStatus.dropdown_details_desc
                          " :option-value="loadStatus => loadStatus" emit-value map-options label="Status"></q-select>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                    </div>
                  </q-card-section>

                  <q-card-section class="q-mt-md">
                    <div class="row">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-card>
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select outlined v-model="Region" :options="loadRegion" stack-label :option-label="
                                    loadRegion => loadRegion.region_name
                                  " :option-value="loadRegion => loadRegion" emit-value map-options label="Region">
                                </q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select outlined v-model="Area" :options="loadArea" stack-label :option-label="
                                    loadArea => loadArea.area_name
                                  " :option-value="loadArea => loadArea" emit-value map-options label="Area" />
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
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
import { InsBranch } from 'src/graphql/MasterBranch'
import { GetRegion } from 'src/graphql/Region'
import { ViewArea } from 'src/graphql/Area'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'AddBranches',
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      submitting: false,
      BranchCode: '',
      BranchName: '',
      BranchManagerName: '',
      Status: '',
      Region: '',
      Area: '',
      loadArea: [],
      loadRegion: [],
      loadStatus: []
    }
  },
  apollo: {
    loadArea: {
      query: ViewArea,
      update: data => data.wms_area
    },
    loadRegion: {
      query: GetRegion,
      update: data => data.wms_region
    },
    loadStatus: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Status'
      }
    }
  },
  methods: {
    SubmitButton() {
      this.submitting = true

      this.$apollo
        .mutate({
          mutation: InsBranch,
          variables: {
            objects: {
              branch_code: this.BranchCode,
              branch_manager_name: this.BranchManagerName,
              branch_name: this.BranchName,
              id_status: this.Status.id_dropdownlist_detail,
              id_area: this.Area.id_area,
              id_region: this.Region.id_region,
              created_by: 'auto_prananda',
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
              'Branch Code ' + this.BranchCode + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/branch' })
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
      this.BranchCode = ''
      this.BranchName = ''
      this.Status = ''
      this.BranchManagerName = ''
      this.Region = ''
      this.Area = ''

      setTimeout(() => {
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
          this.$router.push({ path: '/branch' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style></style>
