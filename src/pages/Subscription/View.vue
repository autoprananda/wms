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
            <q-breadcrumbs-el
              label="View Subscriptions"
              icon="far fa-eye"
              to="/subscription/viewlist"
            />
            <q-breadcrumbs-el label="View" icon="details" />
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
                        <q-field Standard label="Subscription No" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SubscriptionNo }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="GCIF" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Gcif }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Customer }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Product Category" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ProductCategory }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-4 col-md-4">
                        <q-field Standard label="Product" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Product }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2">
                        <q-field Standard label="Currency" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Currency }}</div>
                          </template>
                        </q-field>
                      </div>
                       <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field Standard label="Opening Date" stack-label>
                          <template v-slot:prepend>
                            <q-icon name="event" />
                          </template>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ OpeningDate }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Remark" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Remark }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <transition appear enter-active-class="animated zoomIn">
                      <q-card class="my-card shadow-6 center q-mt-md" inline style>
                        <q-card-section>
                          <q-tabs
                            v-model="tab"
                            active-color="primary"
                            indicator-color="primary"
                            class="text-grey"
                            align="justify"
                            inline-label
                          >
                            <q-tab label="Transaction" name="one" />
                            <q-tab label="Bank Account" name="two" />
                            <q-tab label="More Info" name="three" />
                          </q-tabs>

                          <q-separator />

                          <q-tab-panels v-model="tab" animated>>
                            <q-tab-panel name="one">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Subscription Amount" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ formatCurrency2(SubscriptionAmount) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Net Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ NetFeeAmount }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Tax Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ TaxFeeAmount }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Total Fee Amount" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >
                                          {{
                                          formatCurrency2(TotalFeeAmount)
                                          }}
                                        </div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field
                                      Standard
                                      label="Total Subscription Amount"
                                      stack-label
                                    >
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ formatCurrency2(TotalSubscription) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Total Payment Amount" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ formatCurrency2(TotalPayment) }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                </div>
                              </div>
                            </q-tab-panel>
                            <q-tab-panel name="two">
                              <q-card class="q-mt-md shadow-3">
                                <q-card-section>
                                  <div
                                    class="text-weight-bolder text-subtitle1 q-mb-sm"
                                  >Customer Bank Account</div>
                                  <q-separator />
                                  <div class="q-mb-md" />
                                  <div class="row q-col-gutter-md">
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
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Bank Account No" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BankAccountNo }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Currency" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ CurrencyBank }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Account Type" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ AccountType }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Branch Name" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BranchName }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                      <q-field Standard label="Remark" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ RemarkBA }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-tab-panel>

                            <q-tab-panel name="three">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <q-card class="shadow-3">
                                  <q-card-section>
                                    <div
                                      class="text-weight-bolder text-subtitle1 q-mb-sm"
                                    >Branch Info</div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Transaction Branch" stack-label>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ TrnBranch }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Sales Namr" stack-label>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ SalesName }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Customer Group" stack-label>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ CustomerGroup }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                     <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Reference No" stack-label>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ RefferenceNo }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field
                                          Standard
                                          label="Character Of Mutual Funds"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ CharacterOfMutualFunds }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Method Of Sales" stack-label>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ MethodOfSales }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field
                                          Standard
                                          label="Distribution Of Sales"
                                          stack-label
                                        >
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ DistributionOfSales }}</div>
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
                                    >Date Info</div>
                                    <q-separator />
                                    <div class="q-mb-md" />
                                    <div class="row q-col-gutter-md">
                                      
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Transaction Date" stack-label>
                                          <template v-slot:prepend>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ TrnDate }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Posting Date" stack-label>
                                          <template v-slot:prepend>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div
                                              class="self-center full-width no-outline"
                                              tabindex="0"
                                            >{{ PostingDate }}</div>
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
  name: 'ViewSubscription',
  data() {
    return {
      
      selectedview: JSON.parse(localStorage.selectedDataSubs),
      Gcif: '',
      Customer: '',
      SubscriptionNo: '',
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
      SubscriptionAmount: '',
      NetFeeAmount: '',
      TaxFeeAmount: '',

      TotalPayment: '',
      TotalSubscription: '',
      TotalFeeAmount: '',

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
  mounted() {
    this.onBindData()
  },
  watch: {
    selectedview(newSelected) {
      localStorage.selectedDataSubs = newSelected
    }
  },
  methods: {
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
    onBindData() {
      this.SubscriptionNo = this.selectedview.subscription_no
      this.Gcif = this.selectedview.gcif_number
      this.Customer = this.selectedview.customer_name
      this.ProductCategory = this.selectedview.product_category.dropdown_details_desc
      this.Product = this.selectedview.product.prod_desc
      this.Currency = this.selectedview.currency
      this.OpeningDate = this.selectedview.opening_date
      this.Remark = this.selectedview.remark

      this.Bank = this.selectedview.bank.dropdown_details_desc
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

      this.SubscriptionAmount = this.selectedview.subscription_amount
      this.NetFeeAmount = this.selectedview.net_fee_amount
      this.TaxFeeAmount = this.selectedview.tax_fee_amount
      this.TotalFeeAmount = this.selectedview.total_fee_amount
      this.TotalSubscription = this.selectedview.total_subscription_amount
      this.TotalPayment = this.selectedview.total_payment_amount
    },
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
