<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el data-vv-name="Home" label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el data-vv-name="Products" label="Products" icon="fab fa-dropbox" to="/masterproduct" />
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
                      <q-btn data-vv-name="Back" @click="onBack" label="Back" color="negative" style="width: 80px"></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Product Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ProductCode }}</div>
                          </template>
                        </q-field>
                      </div>
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

                  <q-card-section>
                    <transition appear enter-active-class="animated zoomIn">
                      <q-card class="my-card shadow-6 center" inline style>
                        <q-card-section>
                          <q-tabs
                            v-model="tab"
                            active-color="primary"
                            indicator-color="primary"
                            class="text-grey"
                            align="justify"
                            inline-label
                          >
                            <q-tab data-vv-name="Tab Product & Bank Info" label="Product & Bank Info" name="one" />
                            <q-tab data-vv-name="Tab Settlement Info" label="Settlement Info" name="two" />
                          </q-tabs>

                          <q-separator />

                          <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="one">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-4 col-md-4">
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
                                    <q-field Standard label="Product Type" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ ProductType }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-4 col-md-4">
                                    <q-field Standard label="Fund Manager" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ FundManager }}</div>
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
                                    <q-field Standard label="Distribution Of Sales" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ DistributionOfSales }}</div>
                                      </template>
                                    </q-field>
                                  </div>

                                  <div class="col-xs-12 col-sm-4 col-md-4">
                                    <q-field Standard label="Bank Account No" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ BankAccountNo }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-5 col-md-5">
                                    <q-field Standard label="Beneficiary Name" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ BeneficiaryName }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field Standard label="Classification" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ Classification }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field Standard label="Custody Bank" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ CustodyBank }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
                                    <q-field Standard label="Branch Name" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ BranchName }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-3 col-md-3">
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
                                    <q-field Standard label="Account Type" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ AccountType }}</div>
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
                              </div>
                            </q-tab-panel>
                            <q-tab-panel name="two">
                              <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Settlement Period" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ SettlementPeriod }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Dividend reinvested" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ DevidendReinvested }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Account Name" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ AccountName }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-field Standard label="Account Number" stack-label>
                                      <template v-slot:control>
                                        <div
                                          class="self-center full-width no-outline"
                                          tabindex="0"
                                        >{{ AccountNumber }}</div>
                                      </template>
                                    </q-field>
                                  </div>
                                </div>
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
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[30, 25]">
          <q-btn fab icon="keyboard_arrow_up" color="negative" />
        </q-page-scroller>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  name: 'ViewProduct',
  data() {
    return {
      //
      ProductCode: '',
      Description: '',
      ProductCategory: '',
      FundManager: '',
      ProductType: '',
      CharacterOfMutualFunds: '',
      MethodOfSales: '',
      DistributionOfSales: '',
      BankAccountNo: '',
      BeneficiaryName: '',
      CustodyBank: '',
      BranchName: '',
      Currency: '',
      AccountType: '',
      Classification: '',
      CustomerSegment: '',
      PricingList: '',
      Remark: '',
      SettlementPeriod: '',
      DevidendReinvested: '',
      AccountNumber: '',
      AccountName: '',
      AutoSubscription: false,
      tab: 'one',
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
      this.ProductCode = this.selected.product_code
      this.Description = this.selected.prod_desc
      this.ProductCategory = this.selected.product_category.dropdown_details_desc
      this.ProductType = this.selected.product_type.dropdown_details_desc
      this.FundManager = this.selected.fund_manager
      this.CharacterOfMutualFunds = this.selected.mutual_fund.dropdown_details_desc
      this.MethodOfSales = this.selected.method_of_sales.dropdown_details_desc
      this.DistributionOfSales = this.selected.distribution_of_sales.dropdown_details_desc
      this.BankAccountNo = this.selected.bank_account_no
      this.BeneficiaryName = this.selected.beneficiary_name
      this.CustodyBank = this.selected.reference_cust_bank.dropdown_details_desc
      this.BranchName = this.selected.branch.branch_name
      this.Currency = this.selected.currencies.currencies_desc
      this.AccountType = this.selected.account_type.dropdown_details_desc
      this.Classification = this.selected.classification.dropdown_details_desc
      this.Remark = this.selected.remark
      this.SettlementPeriod = this.selected.settlement_periode.dropdown_details_desc
      this.DevidendReinvested = this.selected.dividend_reinvested.dropdown_details_desc
      this.AccountName = this.selected.account_name
      this.AccountNumber = this.selected.account_number
    },
    onBack() {
      this.$router.push({ path: '/masterproduct' })
    }
  }
}
</script>

<style></style>
