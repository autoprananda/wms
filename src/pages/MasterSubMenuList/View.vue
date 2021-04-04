<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="SubMenu" icon="fas fa-bars" to="/submenu" />
            <q-breadcrumbs-el label="View" icon="details" />
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
                    <!-- <div class="q-pa-md"> -->
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Menu Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ MenuCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Menu Description" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ MenuDescription }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-card class="q-mt-md shadow-3">
                          <q-card-section>
                            <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Detail Menu</div>
                            <q-separator />
                            <div class="q-mb-md" />
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="SortOrder" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ SortOrder }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="SubMenu Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ SubMenuCode }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="SubMenu Description" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ SubMenuDesc }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="Path" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Path }}</div>
                                  </template>
                                </q-field>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
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
export default {
  name: 'MainDesignation',
  data() {
    return {
      MenuCode: '',
      MenuDescription: '',
      SubMenuCode: '',
      SubMenuDesc: '',
      SortOrder: '',
      Path: '',
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  mounted() {
    this.OnBindData()
  },
  methods: {
    OnBindData() {
      this.MenuCode = this.selected.menu.menu_code
      this.MenuDescription = this.selected.menu.menu_desc
      this.SortOrder = this.selected.order_key
      this.Path = this.selected.path
      this.SubMenuCode = this.selected.submenu_code
      this.SubMenuDesc = this.selected.submenu_desc
    },
    onBack() {
      this.$router.push({ path: '/submenu' })
    }
  }
}
</script>
