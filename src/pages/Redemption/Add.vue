<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el
              label="Redemptions"
              icon="fas fa-hand-holding-usd"
              to="/redemption"
            />
            <q-breadcrumbs-el label="Redemption" icon="fas fa-user-plus" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline>
              <q-card-section>
                <form>
                  <q-card-section>
                    <div class="q-gutter-sm">
                      <q-btn :loading="submitting" :disable="TotalFeeAmount === 0 || TotalPayment === 0" label="Submit"
                        @click="SubmitDialog" color="accent" style="width: 80px"></q-btn>
                      <q-btn @click="CancelDialog" label="Cancel" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="GCIF" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Gcif }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Name" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Customer }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="Opening Date" stack-label>
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ OpeningDate }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-select stack-label outlined v-model="SubscriptionNo" :options="loadSubscriptionNo" emit-value
                          map-options :option-label="
                            loadSubscriptionNo =>
                              loadSubscriptionNo.subscription_no
                          " :option-value="
                            loadSubscriptionNo => loadSubscriptionNo
                          " @input="resetValueSubsNo(), onloadLastNav()" label="Subscription No *">
                        </q-select>
                      </div>
                      <div class="col-xs-12 col-sm-7 col-md-7">
                        <q-field outlined label="Product" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Product }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2">
                        <q-field outlined label="Currency" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Currency }}
                            </div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field outlined label="Remark" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Remark }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <transition appear enter-active-class="animated zoomIn">
                      <q-card class="my-card shadow-6 center q-mt-md" inline style>
                        <q-card-section>
                          <q-tabs v-model="tab" active-color="primary" indicator-color="primary" class="text-grey"
                            align="justify" inline-label>
                            <q-tab label="Transaction" name="one" />
                            <q-tab label="Bank Account" name="two" />
                            <q-tab label="More Info" name="three">
                            </q-tab>
                          </q-tabs>
                          <q-separator />

                          <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="one">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Last Nav Date" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ LastNavDate }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-checkbox v-model="RedemptAll" label="Redempt All" color="teal"
                                      @input="changeAllRedeem" />
                                  </div>
                                  <div class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field outlined label="Outstanding Unit" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ OutStandingUnit }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field outlined label="Last NAV" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency4(LastNavAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div v-if="RedemptAll === false" class="col-xs-12 col-sm-2 col-md-2">
                                    <q-input @input="resetValue" outlined stack-label v-model="RedemptionUnitCal"
                                      label="Redemption Unit" :decimals="2" numeric-keyboard-toggle>
                                    </q-input>
                                  </div>
                                  <div v-else class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field outlined label="Redemption Unit" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ RedemptionUnitCal }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field outlined label="Value Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency3(ValueAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field outlined label="Available Balance Amount Using Last NAV" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ AvailableBalanceAmountUsingLastNAV }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Net Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ NetFeeAmount }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Tax Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ TaxFeeAmount }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-12">
                                    <div class="row q-col-gutter-md">
                                      <div class="col-2">
                                        <q-btn :disable="SubscriptionNo === null || RedemptionUnitCal === 0"
                                          class="full-width" @click="validateCalculate" label="Calculate"
                                          color="primary">
                                        </q-btn>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Total Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency1(TotalFeeAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field outlined label="Total Payment Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency3(TotalPayment) }}</div>
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
                                    <div class="text-weight-bolder text-subtitle1 q-mb-sm">
                                      Customer Bank Account
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Bank" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">{{ Bank }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>

                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Bank Account No" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ BankAccountNo }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Currency" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CurrencyBank }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Account Type" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
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
                                        <q-field outlined label="Remark" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">{{ RemarkBA }}
                                            </div>
                                          </template>
                                        </q-field>
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
                                    <div class="text-weight-bolder text-subtitle1 q-mb-sm">
                                      Branch Info
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Transaction Branch" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ TrnBranch }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Sales Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ SalesName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Customer Class" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CustomerGroup }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Refference No" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ RefferenceNo }}
                                            </div>
                                          </template>
                                        </q-field>
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
                                    <div class="text-weight-bolder text-subtitle1 q-mb-sm">
                                      Date Info
                                    </div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Transaction Date" stack-label>
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ TrnDate }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field outlined label="Posting Date" stack-label>
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
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
import { insertRedemption, GetGenerateRedemNo } from 'src/graphql/Redemption'
import { getSubscriptionNo, UpdateBalanceAmount } from 'src/graphql/Subscription'
import { GetLastNav } from 'src/graphql/NavUpload'
import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'Redemption',
  props: ['Muser'],
  data() {
    return {
      selected: JSON.parse(localStorage.selectedData),
      user: this.$q.sessionStorage.getItem('username'),

      submitting: false,
      TransactionNoMaster: [],
      TransactionNo: null,
      TransactionNoNext: [],

      SubscriptionNo: null,
      loadSubscriptionNo: [],
      Gcif: '',
      Customer: '',
      Currency: '',
      OpeningDate: '',
      Remark: '',
      Product: null,
      
      tab: 'one',
      // Tab Transaction
      LastNavDate: '',
      RedemptAll: false,
      OutStandingUnit: 0,
      LastNavAmount: 0,
      RedemptionUnitCal: 0,
      AvailableBalanceAmountUsingLastNAV: 0,
      TotalFeeAmount: 0,
      TotalPayment: 0,
      SubscriptionAmount: 0,
      //
      FeeRedemp: 0,
      FeeTax: 0,
      UpdateBalance: 0,
      //


      // Tab Bank
      Bank: '',
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
    GetSubNo: {
      query: getSubscriptionNo,
      update: data => data.wms_subscription,
      variables: {
        code: init
      }
    },
    loadLastNav: {
      query: GetLastNav,
      update: data => data.wms_nav,
      variables: {
        code: init
      }
    },
    loadCode: {
      query: GetGenerateRedemNo,
      update: data => data.wms_redemption
    },
  },
  mounted() {
    this.onBindData()
    this.onLoadSubsciptionNo()
    this.OpeningDate = this.now2
  },
  methods: {
    // ================================================================
    // Tab Transaction
    // ================================================================
    onBindData() {
       this.Gcif = this.selected[0].gcif_number
       this.Customer = this.selected[0].fullname
    },
    onLoadSubsciptionNo() {
      this.$apollo.queries.GetSubNo
        .refetch({
          code: this.Gcif
        })
        .then(response => {
          this.loadSubscriptionNo = response.data.wms_subscription
        })
    },
    onloadLastNav() {
      this.$q.loading.show()
      this.$apollo.queries.loadLastNav
        .refetch({
          code: this.SubscriptionNo.product.prod_desc
        })
        .then(response => {
          let LastNAV = response.data.wms_nav
          if (LastNAV.length !== 0) {
            this.LastNavDate = LastNAV[0].nav_date
            this.LastNavAmount = LastNAV[0].nav_amount
          } else {
            this.LastNavDate = ''
            this.LastNavAmount = 0
          }
          this.$q.loading.hide()
          this.calculateOutStandingUnit()
        })
    },
    calculateOutStandingUnit() {
      if (this.SubscriptionNo !== null) {
        let result = this.SubscriptionNo.balance_amount / this.LastNavAmount
        this.OutStandingUnit = this.formatCurrency4(result)
        return this.OutStandingUnit
      }
    },
    getValueAmount() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetValueAmount = 0
          return this.GetValueAmount
        } else {
          this.GetValueAmount = +this.splitDot(this.RedemptionUnitCal) * this.LastNavAmount
          return this.GetValueAmount
        }
      } else {
        this.GetValueAmount = 0
        return this.GetValueAmount
      }
    },
    getNetFeeAmount() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetFeeAmount = 0
          return this.GetFeeAmount
        } else {
          this.SubscriptionAmount = +this.splitDot(this.RedemptionUnitCal) * this.LastNavAmount
          this.GetFeeAmount = +(this.FeeRedemp / 100) * this.SubscriptionAmount
          this.GetFeeAmount = this.formatCurrency(this.GetFeeAmount)
          return this.GetFeeAmount
        }
      } else {
        this.GetFeeAmount = +(this.RedemptionUnitCal * 1).toFixed(1)
        return this.GetFeeAmount
      }
    },
    getTaxFeeAmount() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetTaxFeeAmount = 0
          return this.GetTaxFeeAmount
        } else {
          this.GetTaxFeeAmount = +(this.FeeTax / 100) * +this.splitDot(this.NetFeeAmount)
          this.GetTaxFeeAmount = this.formatCurrency(this.GetTaxFeeAmount)
          return this.GetTaxFeeAmount
        }
      } else {
        this.GetTaxFeeAmount = +(this.RedemptionUnitCal / 10).toFixed(1)
        return this.GetTaxFeeAmount
      }
    },
    getAfterUnit() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetAfterUnit = 0
          return this.GetAfterUnit
        } else {
          this.GetAfterUnit = +this.splitDot(this.OutStandingUnit) - +this.splitDot(this.RedemptionUnitCal)
          return this.GetAfterUnit
        }
      } else {
        this.GetAfterUnit = 0
        return this.GetAfterUnit
      }
    },
    validateCalculate() {
      if (this.AfterUnit < 0) {
        this.$q.dialog({
          title: 'Business Rules',
          message: 'This product can only Redemption to a maximun of <strong>' + this.OutStandingUnit,
          html: true,
          color: 'error',
          ok: true
        })
        this.resetValueCalculation()
      } else {
        this.onCalculate()
      }

    },
    resetValue() {
      this.TotalFeeAmount = 0
      this.TotalPayment = 0
    },
    resetValueCalculation() {
      this.RedemptionUnitCal = 0
      this.TotalFeeAmount = 0
      this.TotalPayment = 0
    },
    onCalculate() {
      let netFeeAmount = parseFloat(this.splitDot(this.NetFeeAmount))
      let taxFeeAmount = parseFloat(this.splitDot(this.TaxFeeAmount))
      let subscriptionAmount = this.SubscriptionAmount
      if (this.SubscriptionNo !== null) {
        this.TotalFeeAmount = netFeeAmount + taxFeeAmount
        this.TotalPayment = subscriptionAmount - this.TotalFeeAmount
        this.UpdateBalance =
          parseInt(this.splitDot(this.SubscriptionNo.balance_amount)) -
          subscriptionAmount
      }
      console.log(this.UpdateBalance, 'UpdateBalance');
    },
    changeAllRedeem() {
      if (this.SubscriptionNo !== null) {
        if (this.RedemptAll === true) {
          this.TotalFeeAmount = 0
          this.TotalPayment = 0
          this.RedemptionUnitCal = this.OutStandingUnit
          return this.RedemptionUnitCal
        } else {
          this.TotalFeeAmount = 0
          this.TotalPayment = 0
          this.value = 0
        }
      }
    },
     // ================================================================
    // Tab Bank and More Info 
    // ================================================================
    resetValueSubsNo() {
      if (this.SubscriptionNo === null) {
        this.Currency = ''
        this.Product = ''
        this.Remark = ''

        this.Bank = ''
        this.BankAccountNo = ''
        this.CurrencyBank = ''
        this.AccountType = ''
        this.BranchName = ''
        this.RemarkBA = ''

        this.TrnBranch = ''
        this.SalesName = ''
        this.CustomerGroup = ''
        this.CharacterOfMutualFunds = ''
        this.MethodOfSales = ''
        this.DistributionOfSales = ''
        this.RefferenceNo = ''
        this.TrnDate = ''
        this.PostingDate = ''
        this.AvailableBalanceAmountUsingLastNAV = 0
        this.FeeRedemp = 0
        this.FeeTax = 0
      } else {
        this.Currency = this.SubscriptionNo.currency
        this.Product = this.SubscriptionNo.product.prod_desc
        this.Remark = this.SubscriptionNo.remark

        this.Bank = this.SubscriptionNo.bank.dropdown_details_desc
        this.BankAccountNo = this.SubscriptionNo.bank_account_no
        this.CurrencyBank = this.SubscriptionNo.bank_currency
        this.AccountType = this.SubscriptionNo.bank_account_type
        this.BranchName = this.SubscriptionNo.bank_branch
        this.RemarkBA = this.SubscriptionNo.bank_remark

        this.TrnBranch = this.SubscriptionNo.trc_branch
        this.SalesName = this.SubscriptionNo.sales_name
        this.CustomerGroup = this.SubscriptionNo.customer_group
        this.CharacterOfMutualFunds = this.SubscriptionNo.mutual_fund
        this.MethodOfSales = this.SubscriptionNo.method_of_sales
        this.DistributionOfSales = this.SubscriptionNo.distribution_of_sales
        this.RefferenceNo = this.SubscriptionNo.reference_no
        this.TrnDate = this.SubscriptionNo.trc_date
        this.PostingDate = this.SubscriptionNo.posting_date
        this.AvailableBalanceAmountUsingLastNAV = this.formatCurrency1(this.SubscriptionNo.balance_amount)
        this.FeeRedemp = this.SubscriptionNo.product.redempt_fee
        this.FeeTax = this.SubscriptionNo.product.tax_rate
      }
    },
    // ================================================================
    // Submit
    // ================================================================
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
          this.onLoadTransactionMaster()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onLoadTransactionMaster() {
      this.Submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadCode.refetch().then(response => {
          this.TransactionNoMaster = response.data.wms_redemption
          this.generateNewTransactionNumber()
        })
      }, 1000)
    },
    generateNewTransactionNumber() {
      this.TransactionNoMaster.forEach(dataRedememptionNo => {
        this.TransactionNoNext.push(dataRedememptionNo.transaction_no)
      })
      if (this.TransactionNoNext.length !== 0) {
        this.TransactionNoNext[0] = this.TransactionNoNext[0].split('-')
        console.log(this.TransactionNoNext[0], '>>>>>>>numb')
        let x = +this.TransactionNoNext[0][1] + 1
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
        this.TransactionNo = 'RDM-' + y
        this.SubmitButton()
        return this.TransactionNo
      } else {
        this.TransactionNo = 'RDM-' + '0000001'
        this.SubmitButton()
        return this.TransactionNo
      }
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: insertRedemption,
          variables: {
            objects: {
              gcif_number: this.Gcif,
              customer: this.Customer,
              subscription_no: this.SubscriptionNo.subscription_no,
              id_product: this.SubscriptionNo.product.id_product,
              product: this.Product,
              currency: this.Currency,
              remark: this.Remark,
              opening_date: this.OpeningDate,


              bank: this.Bank,
              bank_account_no: this.BankAccountNo,
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

              transaction_no: this.TransactionNo,
              last_nav_date: this.LastNavDate,
              redempt_all: this.RedemptAll,
              outstanding_unit: this.OutStandingUnit,
              last_nav_amount: this.LastNavAmount,
              redemption_unit: this.RedemptionUnitCal,
              value_amount: this.ValueAmount,
              available_balance: +this.splitDot(this.AvailableBalanceAmountUsingLastNAV),
              net_fee_amount: +this.splitDot(this.NetFeeAmount),
              tax_fee_amount: +this.splitDot(this.TaxFeeAmount),
              total_fee_amount: this.TotalFeeAmount,
              total_payment_amount: this.TotalPayment,
              created_date: this.now,
              created_by: this.user
            }
          }
        })
        .then(response => {
          this.$apollo
            .mutate({
              mutation: UpdateBalanceAmount,
              variables: {
                code: this.SubscriptionNo.subscription_no,
                changes: {
                  balance_amount: this.UpdateBalance,
                  modified_date: this.now,
                  modified_by: this.user
                }
              }
            })
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Redemption ' + this.TransactionNo + ' ' + 'Has Been Submitted'
          })
          this.$router.push({ path: '/redemption' })
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
          this.$router.push({ path: '/redemption' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
   
    // ================================================================
    // Format 
    // ================================================================
    
    
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
        num = +num
        return num.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    formatCurrency4(num) {
      if (num !== null) {
        num = +num
        return num
          .toFixed(0)
          .replace(',', '.')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    ...mapState('showcase', {
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    },
    ValueAmount: {
      get: function() {
        return this.getValueAmount()
      },
      set: function() {
        return this.GetValueAmount
      }
    },
    NetFeeAmount: {
      get: function() {
        return this.getNetFeeAmount()
      },
      set: function() {
        return this.GetFeeAmount
      }
    },
    TaxFeeAmount: {
      get: function() {
        return this.getTaxFeeAmount()
      },
      set: function() {
        return this.GetTaxFeeAmount
      }
    },
    AfterUnit: {
      get: function() {
        return this.getAfterUnit()
      },
      set: function() {
        return this.GetAfterUnit
      }
    },
  }
}
</script>

<style></style>
