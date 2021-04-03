<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Branches" icon="fas fa-code-branch" to="/branch" />
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
                        :disable="
                          BranchCode === '' ||
                            BranchName === '' ||
                            BranchManagerName === '' ||
                            BranchManagerName === '' ||
                            Status === '' ||
                            Region === '' ||
                            Area === ''
                        "
                        @click="SubmitDialog"
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
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="Branch Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ BranchCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-input outlined v-model="BranchName" label="Branch Name" stack-label />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-input
                          outlined
                          v-model="BranchManagerName"
                          label="Branch Manager Name"
                          stack-label
                        />
                      </div>

                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-select
                          outlined
                          v-model="Status"
                          :options="loadStatus"
                          stack-label
                          :option-label="
                            loadStatus => loadStatus.dropdown_details_desc
                          "
                          :option-value="loadStatus => loadStatus"
                          emit-value
                          map-options
                          label="Status"
                        ></q-select>
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
                                <q-select
                                  outlined
                                  v-model="Region"
                                  :options="loadRegion"
                                  stack-label
                                  :option-label="
                                    loadRegion => loadRegion.region_name
                                  "
                                  :option-value="loadRegion => loadRegion"
                                  emit-value
                                  map-options
                                  label="Region"
                                ></q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  outlined
                                  v-model="Area"
                                  :options="loadArea"
                                  stack-label
                                  :option-label="
                                    loadArea => loadArea.area_name
                                  "
                                  :option-value="loadArea => loadArea"
                                  emit-value
                                  map-options
                                  label="Area"
                                />
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
import { EditBranch } from 'src/graphql/MasterBranch'
import { ViewArea } from 'src/graphql/Area'
import { GetRegion } from 'src/graphql/Region'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'EditBranch',
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      BranchCode: '',
      BranchName: '',
      BranchManagerName: '',
      Status: {},
      Region: {},
      Area: {},
      loadArea: [],
      OldCode: '',
      submitting: false,
      selected: JSON.parse(localStorage.selectedData),
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
  mounted() {
    this.onBindData()
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  methods: {
    onBindData() {
      this.BranchCode = this.selected[0].branch_code
      this.BranchName = this.selected[0].branch_name
      this.BranchManagerName = this.selected[0].branch_manager_name
      this.Region.region_name = this.selected[0].region.region_name
      this.Status.dropdown_details_desc = this.selected[0].status.dropdown_details_desc
      this.Area.area_name = this.selected[0].area.area_name
      this.OldCode = this.selected[0].id_branch
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditBranch,
          variables: {
            code: this.OldCode,
            changes: {
              branch_code: this.BranchCode,
              branch_manager_name: this.BranchManagerName,
              branch_name: this.BranchName,
              id_status: this.Status.id_dropdownlist_detail,
              id_area: this.Area.id_area,
              id_region: this.Region.id_region,
              modified_by: 'auto_prananda',
              modified_date: this.now
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Branch Code ' + this.BranchCode + ' ' + 'Has Been Updated'
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
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style></style>
