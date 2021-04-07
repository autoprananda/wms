<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Nav Upload" icon="fas fa-hand-holding-usd" to="/navupload" />
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
                          @click="SubmitDialog"
                          label="Submit"
                          color="accent"
                          style="width: 80px"
                        ></q-btn>
                        <q-btn
                          @click="ClearButton"
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
                          <q-input
                            stack-label
                            outlined
                            v-model="NavDate"
                            label="Nav Date *"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy1"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="NavDate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy1.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input outlined v-model="NavAmount" label="Nav Amount" stack-label />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="ProdName"
                            :options="loadProdName"
                            stack-label
                            :option-label="
                              loadProdName => loadProdName.prod_desc
                            "
                            :option-value="loadProdName => loadProdName"
                            emit-value
                            map-options
                            label="Product Name"
                          />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Product Code" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ProdName.product_code }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input outlined v-model="FundManager" label="Fund Manager Name" stack-label />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="Bank"
                            :options="optBank"
                            label="Bank *"
                            stack-label
                            :option-label="
                              (optBank) =>
                                optBank.dropdown_details_desc
                            "
                            :option-value="(optBank) => optBank"
                            emit-value
                            map-options
                          ></q-select>
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
import { InsertNav } from 'src/graphql/NavUpload'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { getProduct } from 'src/graphql/MasterProductCode'
import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'AddArea',
  props: ['Muser'],
  data() {
    return {
      NavDate: '',
      NavAmount: '',
      FundManager: '',
      ProdName: '',
      loadProdName: [],
      Bank: '',
      optBank: [],
      submitting: false,
      user: this.$q.sessionStorage.getItem('username')
    }
  },
  apollo: {
    optBank: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Custody Bank'
      }
    },
    loadProdName: {
      query: getProduct,
      update: (data) => data.wms_products
    },
  },
  mounted() {
    this.NavDate = this.now2
  },
  methods: {
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsertNav,
          variables: {
            objects: {
              id_custodian_bank: this.Bank.id_dropdownlist_detail,
              fund_manager: this.FundManager,
              product_name: this.ProdName.prod_desc,
              product_code: this.ProdName.product_code,
              id_product: this.ProdName.id_product,
              nav_amount: +this.NavAmount,
              nav_date:  this.NavDate,
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
            message: 'Nav ' + this.ProdName.prod_desc + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/navupload' })
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
      this.NavDate = this.now2
      this.Bank =  ''
      this.FundManager = ''
      this.ProdCode = ''
      this.ProdName = ''
      this.NavAmount = ''

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
          this.$router.push({ path: '/navupload' })
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
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    }
  }
}
</script>

<style></style>
