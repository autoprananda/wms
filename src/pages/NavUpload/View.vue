<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Nav Upload" icon="fas fa-hand-holding-usd" to="/navupload" />
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
                          <q-field Standard label="Nav Date" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ NavDate }}</div>
                          </template>
                        </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Nav Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ NavAmount }}</div>
                          </template>
                        </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Product Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ProdName }}</div>
                          </template>
                        </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Product Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ProdCode }}</div>
                          </template>
                        </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Fund Manager Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ FundManager }}</div>
                          </template>
                        </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Bank" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Bank }}</div>
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
      OldCode: '',
      NavDate: '',
      NavAmount: '',
      FundManager: '',
      ProdName: {},
      ProdCode: '',
      loadProdName: [],
      Bank: '',
      optBank: [],
      submitting: false,
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  mounted() {
    this.onBindData()
  },
  methods: {
    onBack() {
      this.$router.push({ path: '/navupload' })
    },
    onBindData() {
      this.Bank = this.selected.bank.dropdown_details_desc
      this.FundManager = this.selected.fund_manager
      this.ProdCode = this.selected.product_code
      this.ProdName = this.selected.product_name
      this.NavAmount = this.selected.nav_amount
      this.NavDate = this.selected.nav_date
    },
  }
}
</script>

<style></style>
