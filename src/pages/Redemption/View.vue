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
                      <q-btn @click="onBack" label="Back" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="GCIF" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Gcif }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Name" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Customer }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Opening Date" stack-label>
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
                        <q-field Standard label="Subscription No" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ SubscriptionNo }}
                            </div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-7 col-md-7">
                        <q-field Standard label="Product" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Product }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2">
                        <q-field Standard label="Currency" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">
                              {{ Currency }}
                            </div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Remark" stack-label>
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
                                    <q-field Standard label="Last Nav Date" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ LastNavDate }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-checkbox disable v-model="RedemptAll" label="Redempt All" color="teal"/>
                                  </div>
                                  <div class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field Standard label="Outstanding Unit" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ OutStandingUnit }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field Standard label="Last NAV" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency4(LastNavAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-2 col-md-2">
                                    <q-field Standard label="Redemption Unit" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ RedemptionUnitCal }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field Standard label="Value Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency3(ValueAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field Standard label="Available Balance Amount Using Last NAV" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency3(AvailableBalanceAmountUsingLastNAV) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Net Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ formatCurrency3(NetFeeAmount) }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Tax Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{ formatCurrency3(TaxFeeAmount) }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>

                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Total Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">
                                          {{ formatCurrency1(TotalFeeAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Total Payment Amount" stack-label>
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
                                        <q-field Standard label="Bank" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">{{ Bank }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>

                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Bank Account No" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ BankAccountNo }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Currency" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CurrencyBank }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Account Type" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ AccountType }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Branch Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ BranchName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-12 col-md-12">
                                        <q-field Standard label="Remark" stack-label>
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
                                        <q-field Standard label="Transaction Branch" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ TrnBranch }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Sales Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ SalesName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Customer Class" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CustomerGroup }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Refference No" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ RefferenceNo }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Character Of Mutual Funds" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CharacterOfMutualFunds }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Method Of Sales" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ MethodOfSales }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Distribution Of Sales" stack-label>
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
                                        <q-field Standard label="Transaction Date" stack-label>
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
                                        <q-field Standard label="Posting Date" stack-label>
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
export default {
  name: 'Redemption',
  data() {
    return {
      selectedview: JSON.parse(localStorage.selectedDataSubs),
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
      TaxFeeAmount: 0,
      NetFeeAmount: 0,
      ValueAmount: 0,
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
    selectedview(newSelected) {
      localStorage.selectedDataSubs = newSelected
    }
  },
  mounted() {
    this.onBindData()
  },
  methods: {
    onBindData() {
       this.Gcif = this.selectedview.gcif_number
       this.Customer = this.selectedview.customer
       this.SubscriptionNo = this.selectedview.subscription_no
       this.Product = this.selectedview.product
       this.Currency = this.selectedview.currency
       this.Remark = this.selectedview.remark
       this.OpeningDate = this.selectedview.opening_date

       this.Bank = this.selectedview.bank
       this.BankAccountNo = this.selectedview.bank_account_no
       this.CurrencyBank = this.selectedview.bank_currency
       this.AccountType = this.selectedview.bank_account_type
       this.BranchName = this.selectedview.bank_branch
       this.RemarkBA = this.selectedview.bank_remark

       this.TrnBranch = this.selectedview.trc_branch
       this.SalesName = this.selectedview.sales_name
       this.CustomerGroup = this.selectedview.customer_group
       this.RefferenceNo = this.selectedview.reference_no
       this.CharacterOfMutualFunds = this.selectedview.mutual_fund
       this.DistributionOfSales = this.selectedview.distribution_of_sales
       this.TrnDate = this.selectedview.trc_date
       this.MethodOfSales = this.selectedview.method_of_sales
       this.PostingDate = this.selectedview.posting_date

       this.TransactionNo = this.selectedview.transaction_no
       this.LastNavDate = this.selectedview.last_nav_date
       this.RedemptAll = this.selectedview.redempt_all
       this.OutStandingUnit = this.selectedview.outstanding_unit
       this.LastNavAmount = this.selectedview.last_nav_amount
       this.RedemptionUnitCal = this.selectedview.redemption_unit
       this.ValueAmount = this.selectedview.value_amount
       this.AvailableBalanceAmountUsingLastNAV = this.selectedview.available_balance
       this.NetFeeAmount = this.selectedview.net_fee_amount
       this.TaxFeeAmount = this.selectedview.tax_fee_amount
       this.TotalFeeAmount = this.selectedview.total_fee_amount
       this.TotalPayment = this.selectedview.total_payment_amount
    },
    onBack() {
      this.$router.go(-1)
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
  }
}
</script>

<style></style>
