<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Menu" icon="fas fa-bars" to="/menu" />
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
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Sort Order" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SortOrder }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Grup Icon" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ GrupIcon }}</div>
                          </template>
                        </q-field>
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
  name: 'View',
  data() {
    return {
      MenuCode: '',
      MenuDescription: '',
      GrupIcon: '',
      SortOrder: '',
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
      this.MenuCode = this.selected.menu_code
      this.MenuDescription = this.selected.menu_desc
      this.GrupIcon = this.selected.icon
      this.SortOrder = this.selected.order_key
    },
    onBack() {
      this.$router.push({ path: '/menu' })
    }
  }
}
</script>
