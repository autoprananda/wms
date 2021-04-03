<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Currencies " icon="fas fa-dollar-sign" to="/currencies" />
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
                    <div class="q-gutter-sm">
                      <q-btn data-vv-name="Back" @click="onBack" label="Back" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <!-- <div class="q-pa-md"> -->
                    <div class="row q-col-gutter-sm">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Currency Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ CurrencyCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Description" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Description }}</div>
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
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      CurrencyCode: null,
      Description: null,
      OldCode: '',
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
      console.log(this.selected, 'isinya')
      this.CurrencyCode = this.selected.currencies_code
      this.Description = this.selected.currencies_desc
      this.OldCode = this.selected.currencies_code
    },
    onBack() {
      this.$router.push({ path: '/currencies' })
    }
  }
}
</script>

<style></style>
