<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Cities" icon="fas fa-building" to="/cities" />
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
                    <div class="row q-gutter-y-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Regio Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ RegionName }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="City" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ City }}</div>
                          </template>
                        </q-field>
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
export default {
  name: 'ViewCIty',
  data() {
    return {
      City: null,
      RegionName: null,
      submitting: false,
      selected: JSON.parse(localStorage.selectedData)
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
      this.City = this.selected.city_name
      this.RegionName = this.selected.region.region_name
    },
    onBack() {
      this.$router.push({ path: '/cities' })
    }
  }
}
</script>

<style></style>
