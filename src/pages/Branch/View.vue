<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Branches" icon="fas fa-code-branch" to="/branch" />
            <q-breadcrumbs-el label="View" icon="far fa-eye" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline style="background-color:white;">
              <q-card-section>
                <form>
                  <q-card-section>
                    <div class="q-mb-sm q-gutter-sm">
                      <q-btn @click="onBack" label="Back" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Branch Code" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ BranchCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Branch Name" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ BranchName }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Branch Manager Name" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ BranchManagerName }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Status" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Status }}</div>
                          </template>
                        </q-field>
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
                                <q-field Standard label="Region" stack-label>
                                  <template v-slot:control>
                                    <div class="self-center full-width no-outline" tabindex="0">{{ Region }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="Area" stack-label>
                                  <template v-slot:control>
                                    <div class="self-center full-width no-outline" tabindex="0">{{ Area }}</div>
                                  </template>
                                </q-field>
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
export default {
  name: 'ViewRole',
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      userdata: this.Muser,
      BranchCode: '',
      BranchName: '',
      BranchManagerName: '',
      Status: '',
      Region: '',
      Area: '',
      submitting: false,
      selected: JSON.parse(localStorage.selectedData),
      uuid: null
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
      this.BranchCode = this.selected.branch_code
      this.BranchName = this.selected.branch_name
      this.BranchManagerName = this.selected.branch_manager_name
      this.Region = this.selected.region.region_name
      this.Status = this.selected.status.dropdown_details_desc
      this.Area = this.selected.area.area_name
      this.OldCode = this.selected.id_branch
    },
    onBack() {
      this.$router.push({
        path: '/branch'
      })
    }
  }
}
</script>

<style></style>
