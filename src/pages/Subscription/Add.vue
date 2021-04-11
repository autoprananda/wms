<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el
              label="Subscriptions"
              icon="fas fa-hand-holding-usd"
              to="/subscription"
            />
            <q-breadcrumbs-el label="Subscribe" icon="fas fa-user-plus" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline>
              <q-card-section>
                <form @submit.prevent>
                  <q-card-section>
                    <div class="q-gutter-sm">
                      <q-btn
                        label="Submit"
                        @click="SubmitDialog"
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
                        <q-field outlined label="GCIF" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >
                              {{ Gcif }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >
                              {{ Customer }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-select
                          stack-label
                          outlined
                          v-model="ProductCategory"
                          :options="optProductCategory"
                          emit-value
                          map-options
                          :option-label="
                            optProductCategory =>
                              optProductCategory.dropdown_details_desc
                          "
                          :option-value="
                            optProductCategory => optProductCategory
                          "
                          label="Product Category *"
                        >
                        </q-select>
                      </div>
                      <div class="col-xs-12 col-sm-5 col-md-5">
                        <q-select
                          stack-label
                          outlined
                          v-model="Product"
                          :options="optProduct"
                          label="Product *"
                          :option-label="optProduct => optProduct.prod_desc"
                          :option-value="optProduct => optProduct"
                          @input="resetValueProduct"
                        >
                        </q-select>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2">
                        <q-field outlined label="Currency" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >
                              {{ Currency }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-5 col-md-5">
                        <q-field outlined label="Opening Date" stack-label>
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >
                              {{ OpeningDate }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-input
                          outlined
                          v-model="Remark"
                          label="Remark"
                          stack-label
                          type="textarea"
                          float-label="Textarea"
                          :max-height="100"
                          rows="5"
                        />
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <transition appear enter-active-class="animated zoomIn">
                      <q-card
                        class="my-card shadow-6 center q-mt-md"
                        inline
                        style
                      >
                        <q-card-section>
                          <q-tabs
                            v-model="tab"
                            active-color="primary"
                            indicator-color="primary"
                            class="text-grey"
                            align="justify"
                            inline-label
                          >
                            <q-tab
                              label="Transaction"
                              name="one"
                            />
                            <q-tab
                              label="Bank Account"
                              name="two"
                            />
                            <q-tab
                              label="More Info"
                              name="three"
                            >
                            </q-tab>
                          </q-tabs>
                          <q-separator />

                          <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="one">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-radio
                                      class="text-bold"
                                      v-model="Shape"
                                      val="HitungGross"
                                      label="Perhitungan Gross"
                                      @input="changeCalculation"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-radio
                                      class="text-bold"
                                      v-model="Shape"
                                      val="HitungNet"
                                      label="Perhitungan Net"
                                      @input="changeCalculation"
                                    />
                                  </div>
                                </div>
                                <br />

                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      :disable="Product === null"
                                      outlined
                                      v-model="SubscriptionAmount"
                                      stack-label
                                      label="Subscription Amount"
                                      @input="ResetCalculate()"
                                    >
                                    </q-input>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Net Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">
                                        {{ NetFeeAmount }}
                                      </div>
                                    </template>
                                  </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Tax Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">
                                        {{ TaxFeeAmount }}
                                      </div>
                                    </template>
                                  </q-field>
                                  </div>
                                </div>
                                <br />
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <div class="q-gutter-md">
                                      <q-btn
                                        style="width: 140px"
                                        color="primary"
                                        label="Calculate"
                                        :disable="SubscriptionAmount === 0"
                                        @click="onCalculate"
                                      >
                                      </q-btn>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Total Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">
                                        {{ formatCurrency2(TotalFeeAmount) }}
                                      </div>
                                    </template>
                                  </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Total Subscription Amount" stack-label>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">
                                        {{ formatCurrency2(TotalSubscription) }}
                                      </div>
                                    </template>
                                  </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <div
                                      class="float-right q-mt-md text-subtitle1 text-bold"
                                    >
                                      Total Payment Amount :
                                    </div>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined stack-label>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">
                                        {{ formatCurrency2(TotalPayment) }}
                                      </div>
                                    </template>
                                  </q-field>
                                  </div>
                                </div>
                              </div>
                            </q-tab-panel>
                            <q-tab-panel name="two">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <q-card class="shadow-3">
                                  <q-card-section>
                                    <div
                                      class="text-weight-bolder text-subtitle1 q-mb-sm"
                                    >
                                      Customer Bank Account
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div
                                        class="col-xs-12 col-sm-6 col-md-6"
                                      >
                                        <q-select
                                          stack-label
                                          outlined
                                          v-model="Bank"
                                          :options="optBank"
                                          emit-value
                                          map-options
                                          :option-label="optBank =>optBank.dropdown_details_desc"
                                          :option-value="optBank => optBank"
                                          @input="FilterAccountBank(), ClearFilterAccountBank()"
                                          label="Bank"
                                        ></q-select>
                                      </div>

                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-select
                                          stack-label
                                          outlined
                                          v-model="BankAccountNo"
                                          :options="optBankAccountNo"
                                          emit-value
                                          map-options
                                          :option-label="
                                            optBankAccountNo =>
                                              optBankAccountNo.account_number
                                          "
                                          :option-value="
                                            optBankAccountNo =>
                                              optBankAccountNo
                                          "
                                          @input="resetValueBankAccoount"
                                          label="Bank Account No"
                                        ></q-select>
                                      </div>
                                      <div
                                        class="col-xs-12 col-sm-4 col-md-4"
                                      >
                                        <q-field
                                          outlined
                                          label="Currency"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ CurrencyBank }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div
                                        class="col-xs-12 col-sm-4 col-md-4"
                                      >
                                        <q-field
                                          outlined
                                          label="Account Type"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ AccountType }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Branch Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ BranchName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                        <q-input
                                          outlined
                                          v-model="RemarkBA"
                                          stack-label
                                          label="Remark"
                                          type="textarea"
                                          float-label="Textarea"
                                          :max-height="100"
                                          rows="5"
                                        >
                                        </q-input>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </div>
                            </q-tab-panel>
                            <q-tab-panel name="three">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <q-card class="shadow-3">
                                  <q-card-section>
                                    <div
                                      class="text-weight-bolder text-subtitle1 q-mb-sm"
                                    >
                                      Branch Info
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div
                                        class="col-xs-12 col-sm-6 col-md-6"
                                      >
                                        <q-field
                                          outlined
                                          label="Transaction Branch"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ TrnBranch }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div
                                        class="col-xs-12 col-sm-6 col-md-6"
                                      >
                                        <q-field
                                          outlined
                                          label="Sales Name"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ SalesName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div
                                        class="col-xs-12 col-sm-6 col-md-6"
                                      >
                                        <q-field
                                          outlined
                                          label="Customer Class"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ CustomerGroup }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-input stack-label outlined v-model="RefferenceNo" label="Reference No" />
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Character Of Mutual Funds" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CharacterOfMutualFunds }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Method Of Sales" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ MethodOfSales }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Distribution Of Sales" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ DistributionOfSales }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>

                                <q-card class="q-mt-lg shadow-3">
                                  <q-card-section>
                                    <div
                                      class="text-weight-bolder text-subtitle1 q-mb-sm"
                                    >
                                      Date Info
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field
                                          outlined
                                          label="Transaction Date"
                                          stack-label
                                        >
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ TrnDate }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div
                                        class="col-xs-12 col-sm-6 col-md-6"
                                      >
                                        <q-field
                                          outlined
                                          label="Posting Date"
                                          stack-label
                                        >
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >
                                              {{ PostingDate }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </div>
                            </q-tab-panel>
                          </q-tab-panels>
                        </q-card-section>
                      </q-card>
                    </transition>
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
let init = ''

import { InsertSubscription, GetGenerateSubsNo } from 'src/graphql/Subscription'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { getProduct } from 'src/graphql/MasterProductCode'
import { FilterBank } from 'src/graphql/Customer/CustomerBank'
import { date } from 'quasar'
export default {
  name: 'Subscription',
  props: ['userLogin'],
  data() {
    return {
      selected: JSON.parse(localStorage.selectedData),
      user: this.userLogin,

      SubscriptionNoMaster: [],
      SubscriptionNo: '',
      SubscriptionNoNext: [],

      Gcif: '',
      Customer: '',
      optProductCategory: [],
      ProductCategory: '',
      Product: null,
      optProduct: [],
      Currency: '',
      OpeningDate: '',
      Remark: '',
      tab: 'one',
      // Tab Transaction
      Shape: 'HitungGross',
      SubscriptionAmount: 0,
      NetFeeAmount: 0,
      TaxFeeAmount: 0,

      TotalPayment: 0,
      TotalSubscription: 0,
      TotalFeeAmount: 0,

      // Tab Bank
      Bank: '',
      optBank: [],
      optBankAccountNo: [],
      BankAccountNo: '',
      CurrencyBank: '',
      AccountType: '',
      BranchName: '',
      RemarkBA: '',
      //

      // More Info
      TrnBranch: '',
      SalesName: '',
      CustomerGroup: '',
      CharacterOfMutualFunds: '',
      MethodOfSales: '',
      DistributionOfSales: '',
      RefferenceNo: '',
      TrnDate: '',
      PostingDate: ''

    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  apollo: {
    loadgenerateSubsNumber: {
      query: GetGenerateSubsNo,
      update: data => data.wms_subscription
    },
    optProduct: {
      query: getProduct,
      update: (data) => data.wms_products
    },
    optProductCategory: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Investment Category'
      }
    },
    optBank: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Custody Bank'
      }
    },
    optBankAccountNo: {
      query: FilterBank,
      update: data => data. wms_customer_bank,
      variables: {
        code: init,
        code1: init
      }
    }
  },
  mounted() {
    this.onBindData()
    this.OpeningDate = this.now2
    this.PostingDate = this.now2
    this.TrnDate = this.now2
  },
  methods: {
    OnLoadSubscNumber() {
      this.Submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadgenerateSubsNumber.refetch().then(response => {
          this.SubscriptionNoMaster = response.data.wms_subscription
          this.generateNewSubscriptionNumber()
        })
      }, 1000)
    },
    generateNewSubscriptionNumber() {
      this.SubscriptionNoMaster.forEach(dataSubsNumb => {
        this.SubscriptionNoNext.push(dataSubsNumb.subscription_no)
      })
      if (this.SubscriptionNoNext.length !== 0) {
        this.SubscriptionNoNext[0] = this.SubscriptionNoNext[0].split('-')
        let x = +this.SubscriptionNoNext[0][1] + 1
        let y =
          x > 9
            ? x > 99
              ? x > 999
                ? x > 9999
                  ? x > 99999
                    ? x > 999999
                      ? x
                      : '0' + x
                    : '00' + x
                  : '000' + x
                : '0000' + x
              : '00000' + x
            : '000000' + x
        this.SubscriptionNo = 'SUBS-' + y
        this.SubmitButton()
        return this.SubscriptionNo
      } else {
        this.SubscriptionNo = 'SUBS-' + '0000001'
        this.SubmitButton()
        return this.SubscriptionNo
      }
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
          this.OnLoadSubscNumber()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsertSubscription,
          variables: {
            objects: {
              subscription_no: this.SubscriptionNo,
              gcif_number: this.Gcif,
              customer_name: this.Customer,
              id_product_category: this.ProductCategory.id_dropdownlist_detail,
              id_product: this.Product.id_product,
              currency: this.Currency,
              opening_date: this.OpeningDate,
              remark: this.Remark,

              id_bank: this.Bank.id_dropdownlist_detail,
              bank_account_no: this.BankAccountNo.account_number,
              bank_currency: this.CurrencyBank,
              bank_account_type: this.AccountType,
              bank_branch: this.BranchName,
              bank_remark: this.RemarkBA,

              trc_branch: this.TrnBranch,
              sales_name: this.SalesName,
              customer_group: this.CustomerGroup,
              reference_no: this.RefferenceNo,
              mutual_fund: this.CharacterOfMutualFunds,
              distribution_of_sales: this.DistributionOfSales,
              trc_date: this.TrnDate,
              method_of_sales: this.MethodOfSales,
              posting_date: this.PostingDate,

              subscription_amount: this.SubscriptionAmount,
              net_fee_amount: this.NetFeeAmount,
              tax_fee_amount: this.TaxFeeAmount,
              total_fee_amount: this.TotalFeeAmount,
              total_subscription_amount: this.TotalSubscription,
              total_payment_amount: this.TotalPayment,
              balance_amount: this.TotalSubscription,

              created_date: this.now,
              created_by: this.user.fullname
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Subscription' + this.SubscriptionNo + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/subscription' })
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
    onBindData() {
       this.Gcif = this.selected[0].gcif_number
       this.Customer = this.selected[0].fullname
       this.BranchName = this.selected[0].branch.branch_name
       this.TrnBranch = this.selected[0].branch.branch_name
       this.SalesName = this.selected[0].sales_name
       this.CustomerGroup = this.selected[0].customer_group.dropdown_details_desc
    },
    // ================================================================
    // TAB Transaction
    // ================================================================
    changeCalculation() {
      if (this.Shape === 'HitungNet') {
        this.resetValueCalculation()
      } else {
        this.resetValueCalculation()
      }
    },
    resetValueCalculation() {
      this.TotalFeeAmount = 0
      this.TotalSubscription = 0
      this.TotalPayment = 0
    },
    ResetCalculate() {
        this.TotalFeeAmount = 0
        this.TotalSubscription = 0
        this.TotalPayment = 0
    },
    onCalculate() {
      let taxFeeAmount = this.TaxFeeAmount / 100
      let netFeeAmount = this.NetFeeAmount / 100
      let x = this.SubscriptionAmount * netFeeAmount
      let y = x * taxFeeAmount
      if (this.Shape === 'HitungGross') {
        this.TotalFeeAmount = x + y
        this.TotalSubscription = this.SubscriptionAmount - this.TotalFeeAmount
        this.TotalPayment = this.SubscriptionAmount
      } else {
        this.TotalFeeAmount = x + y
        this.TotalSubscription = this.SubscriptionAmount
        this.TotalPayment = +this.TotalFeeAmount + +this.TotalSubscription
      }
    },
    // ================================================================
    // TAB BANK
    // ================================================================
    resetValueProduct() {
      if (this.Product === null) {
        this.Currency = ''
        this.DistributionOfSales = ''
        this.MethodOfSales = ''
        this.CharacterOfMutualFunds = ''
        this.NetFeeAmount = 0
        this.TaxFeeAmount = 0
      } else {
        this.Currency = this.Product.currencies.currencies_code
        this.MethodOfSales = this.Product.method_of_sales.dropdown_details_desc
        this.DistributionOfSales = this.Product.distribution_of_sales.dropdown_details_desc
        this.CharacterOfMutualFunds = this.Product.mutual_fund.dropdown_details_desc
        this.NetFeeAmount = this.Product.subs_fee
        this.TaxFeeAmount = this.Product.tax_rate
      }
    },
    resetValueBankAccoount() {
      if (this.BankAccountNo === '') {
        this.CurrencyBank = ''
        this.AccountType = ''
      } else {
        this.CurrencyBank = this.BankAccountNo.currency.currencies_code
        this.AccountType = this.BankAccountNo.account_type.dropdown_details_desc
      }
    },
    ClearFilterAccountBank () {
      this.BankAccountNo = ''
      this.CurrencyBank = ''
      this.AccountType = ''
    },
    FilterAccountBank() {
      this.optBankAccountNo = []
      this.$q.loading.show()
      this.$apollo.queries.optBankAccountNo
        .refetch({
          code: this.Gcif,
          code1: this.Bank.dropdown_details_desc
        })
        .then(response => {
          this.optBankAccountNo = response.data. wms_customer_bank
          this.$q.loading.hide()
        })
    },
    CancelDialog() {
      this.StatusOverwritte = false
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
          this.$router.push({ path: '/subscription' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    formatCurrency(num) {
      if (num !== null) {
        return num
          .toFixed(1)
          .replace(',', '.')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    },
    formatCurrency1(num) {
      if (num !== null) {
        num = +num
        return num.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    formatCurrency2(num) {
      if (num !== null) {
        num = +num
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    formatCurrency3(num) {
      if (num !== null) {
        num.toString()
        num = num.split(',').join('')
        return +num
      }
    },
    FormatString(num) {
      if (num !== null) {
        num.toString()
        return num
      }
    },
    splitDot(val) {
      if (val !== undefined) {
        val = val.toString()
        val = val.split(',').join('')
        return val
      }
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    }
  }
}
</script>

<style></style>
