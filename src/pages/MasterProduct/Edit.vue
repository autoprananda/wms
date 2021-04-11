<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
               <q-breadcrumbs-el data-vv-name="Home" label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el data-vv-name="Products" label="Products" icon="fab fa-dropbox" to="/masterproduct" />
              <q-breadcrumbs-el label="Edit" icon="edit" />
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
                        <q-btn
                          :loading="submitting"
                          @click="SubmitDialog"
                          label="Submit"
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
                        <div class="col-xs-12 col-sm-6 col-md-6">
                           <q-input
                            stack-label
                            outlined
                            v-model="ProductCode"
                            label="Product Code *"
                          >
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="Description"
                            label="Description *"
                          >
                          </q-input>
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
                              <q-tab
                                label="Product & Bank Info"
                                name="one"
                              />
                              <q-tab
                                label="Settlement Info"
                                name="two"
                              >
                              </q-tab>
                              <q-tab
                                label="Fee Structure"
                                name="three"
                              >
                              </q-tab>
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="tab" animated>
                              <q-tab-panel name="one">
                                <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="ProductCategory"
                                        :options="optProductCategory"
                                        stack-label
                                        :option-label="
                                        optProductCategory =>
                                        optProductCategory.dropdown_details_desc
                                        "
                                        :option-value="
                                        optProductCategory =>
                                        optProductCategory
                                        "
                                        emit-value
                                        map-options
                                        label="Product Category *"
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="ProductType"
                                        :options="optProductType"
                                        stack-label
                                        :option-label="
                                          optProductType =>
                                            optProductType.dropdown_details_desc
                                        "
                                        :option-value="
                                          optProductType => optProductType
                                        "
                                        emit-value
                                        map-options
                                        label="Product Type *"
                                        
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                       <q-input stack-label outlined v-model="FundManager" label="Fund Manager *">
                                       </q-input>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="CharacterOfMutualFunds"
                                        :options="optCharacter"
                                        stack-label
                                        :option-label="
                                          optCharacter =>
                                            optCharacter.dropdown_details_desc
                                        "
                                        :option-value="
                                          optCharacter => optCharacter
                                        "
                                        emit-value
                                        map-options
                                        label="Character Of Mutual Funds *"
                                        
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="MethodOfSales"
                                        :options="optMethod"
                                        stack-label
                                        :option-label="
                                          optMethod =>
                                            optMethod.dropdown_details_desc
                                        "
                                        :option-value="optMethod => optMethod"
                                        emit-value
                                        map-options
                                        label="Method Of Sales *"
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="DistributionOfSales"
                                        :options="optDistribution"
                                        stack-label
                                        :option-label="
                                          optDistribution =>
                                            optDistribution.dropdown_details_desc
                                        "
                                        :option-value="
                                          optDistribution => optDistribution
                                        "
                                        emit-value
                                        map-options
                                        label="Distribution Of Sales *"
                                      >
                                        >
                                      </q-select>
                                    </div>

                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="BankAccountNo"
                                        mask="################"
                                        label="Bank Account No *"
                                      >
                                        
                                      </q-input>
                                    </div>
                                    <div class="col-xs-12 col-sm-5 col-md-5">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="BeneficiaryName"
                                        label="Beneficiary Name *"
                                      >
                                      </q-input>
                                      
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="Classification"
                                        :options="optClassification"
                                        label="Classification *"
                                        stack-label
                                        :option-label="
                                          optClassification =>
                                            optClassification.dropdown_details_desc
                                        "
                                        :option-value="
                                          optClassification => optClassification
                                        "
                                        emit-value
                                        map-options
                                      >
                                      </q-select>
                                     
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="CustodyBank"
                                        :options="optCustodyBank1"
                                        stack-label
                                        :option-label="
                                          optCustodyBank1 =>
                                            optCustodyBank1.dropdown_details_desc
                                        "
                                        :option-value="optCustodyBank1 => optCustodyBank1"
                                        emit-value
                                        map-options
                                        label="Custody Bank *"
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="BranchName"
                                        :options="optBranch1"
                                        label="Branch Name *"
                                        stack-label
                                        :option-label="
                                          optBranch1 => optBranch1.branch_name
                                        "
                                        :option-value="optBranch1 => optBranch1"
                                        emit-value
                                        map-options
                                        
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="Currency"
                                        :options="optCurrency"
                                        stack-label
                                        :option-label="
                                          optCurrency =>
                                            optCurrency.currencies_desc
                                        "
                                        :option-value="
                                          optCurrency => optCurrency
                                        "
                                        emit-value
                                        map-options
                                        label="Currency *"
                                       
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="AccountType"
                                        :options="optAccountType"
                                        label="Account Type *"
                                        stack-label
                                        :option-label="
                                          optAccountType =>
                                            optAccountType.dropdown_details_desc
                                        "
                                        :option-value="
                                          optAccountType => optAccountType
                                        "
                                        emit-value
                                        map-options
                                      >
                                      </q-select>
                                     
                                    </div>
                                    
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                      <q-input
                                        outlined
                                        stack-label
                                        v-model="Remark"
                                        data-vv-name="Remark"
                                        label="Remark"
                                        type="textarea"
                                        float-label="Textarea"
                                        :max-height="100"
                                        rows="5"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </q-tab-panel>
                              <q-tab-panel name="two">
                                <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="SettlementPeriod"
                                        :options="optSettlementPeriod"
                                        stack-label
                                        :option-label="
                                          optSettlementPeriod =>
                                            optSettlementPeriod.dropdown_details_desc
                                        "
                                        :option-value="
                                          optSettlementPeriod =>
                                            optSettlementPeriod
                                        "
                                        emit-value
                                        map-options
                                        label="Settlement Period *"
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="DevidendReinvested"
                                        :options="optDevidendReinvested"
                                        stack-label
                                        :option-label="
                                          optDevidendReinvested =>
                                            optDevidendReinvested.dropdown_details_desc
                                        "
                                        :option-value="
                                          optDevidendReinvested =>
                                            optDevidendReinvested
                                        "
                                        emit-value
                                        map-options
                                        label="Dividend reinvested *"
                                      >
                                      </q-select>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="AccountName"
                                        label="Account Name *"
                                      >
                                      </q-input>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="AccountNumber"
                                        mask="################"
                                        label="Account Number *"
                                      >
                                      </q-input>
                                    </div>
                                  </div>
                                </div>
                              </q-tab-panel>
                              <q-tab-panel name="three">
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-card class="q-mt-md shadow-3">
                                    <q-card-section>
                                      <div
                                        class="col text-weight-bolder text-subtitle1 q-mb-sm"
                                      >Fee Structure</div>
                                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                        <div class="row q-col-gutter-md">
                                          <div class="col-xs-12 col-sm-6 col-md-6">
                                            <q-select
                                              outlined
                                              v-model="Tax"
                                              :options="optTax"
                                              stack-label
                                              :option-label="
                                            optTax =>
                                              optTax.dropdown_details_desc
                                          "
                                              :option-value="optTax => optTax"
                                              emit-value
                                              map-options
                                              label="Tax *"
                                            >
                                            </q-select>
                                          </div>
                                          <div class="col-xs-12 col-sm-6 col-md-6">
                                            <q-input
                                              outlined
                                              v-model="TaxRate"
                                              label="Tax Rate *"
                                              stack-label
                                            >
                                            </q-input>
                                          </div>
                                          <div class="col-xs-12 col-sm-6 col-md-6">
                                            <q-input
                                              outlined
                                              v-model="SubscriptionFee"
                                              label="Subscription Fee (%) *"
                                              stack-label
                                              
                                            >
                                            </q-input>
                                          </div>
                                          <div class="col-xs-12 col-sm-6 col-md-6">
                                            <q-input
                                              outlined
                                              v-model="RedemptionFee"
                                              label="Redemption Fee (%) *"
                                              stack-label
                                            >
                                            </q-input>
                                          </div>
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
import { EditMasterProdCode } from 'src/graphql/MasterProductCode'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetBranch } from 'src/graphql/MasterBranch'
import { GetMasterCurrency } from 'src/graphql/Currency'
import { date } from 'quasar'
export default {
  name: 'EditProduct',
  props: ['userLogin'],
  data() {
    return {
      carousel: false,
      submitting: false,
      user: this.userLogin,
      //
      ProductCategory: {},
      optProductCategory: [],
      ProductType: {},
      optProductType: [],
      FundManager: {},
      optFundManager: [],
      CharacterOfMutualFunds: {},
      optCharacter: [],
      MethodOfSales: {},
      optMethod: [],
      DistributionOfSales: {},
      optDistribution: [],
      InvesmentCategory: null,
      optInvesmentCategory: [],
      Currency: {},
      optCurrency: [],
      CustodyBank: {},
      optCustodyBank: [],
      optCustodyBank1: [],
      optBranch1: [],
      Classification: {},
      optClassification: [],
      CustomerSegment: {},
      optCustomerSegment: [],
      PricingList: {},
      optPricingList: [],
      BankAccountNo: '',
      BeneficiaryName: '',
      optBranch: [],
      BranchName: {},
      AccountType: {},
      optAccountType: [],
      Remark: '',

      //
      SettlementPeriod: {},
      optSettlementPeriod: [],
      DevidendReinvested: {},
      optDevidendReinvested: [],
      oldcode: '',
      AccountName: null,
      AccountNumber: null,
      //
      RedemptionFee: 0,
      SubscriptionFee: 0,
      TaxRate: 0,
      optTax: [],
      Tax: {},
      //
      ActiveTab: '',
      tab: 'one',
      ProductCode: '',
      Description: '',
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  apollo: {
    optTax: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Yes / No'
      }
    },
    optProductCategory: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Investment Category'
      }
    },
    optProductType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Product Type'
      }
    },
    optCustodyBank1: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Custody Bank'
      }
    },
    optCharacter: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Character of Mutual Funds'
      }
    },
    optMethod: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Method of Sales'
      }
    },
    optDistribution: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Distribution of Sales'
      }
    },
    optAccountType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Account Type'
      }
    },
    optSettlementPeriod: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Settlement Period'
      }
    },
    optDevidendReinvested: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Yes / No'
      }
    },
    optClassification: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Classification'
      }
    },
    optBranch1: {
      query: GetBranch,
      update: data => data.wms_branches
    },
    optCurrency: {
      query: GetMasterCurrency,
      update: data => data.wms_currencies
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
    
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterProdCode,
          variables: {
            code: this.oldcode,
            changes: {
              id_classification: this.Classification.id_dropdownlist_detail,
              fund_manager: this.FundManager,
              account_name: this.AccountName,
              account_number: this.AccountNumber,
              bank_account_no: this.BankAccountNo,
              beneficiary_name: this.BeneficiaryName,
              id_account_type: this.AccountType.id_dropdownlist_detail,
              id_branch: this.BranchName.id_branch,
              id_charac_mutual_fund: this.CharacterOfMutualFunds.id_dropdownlist_detail,
              id_currency: this.Currency.id,
              id_custody_bank: this.CustodyBank.id_dropdownlist_detail,
              id_distribution_of_sales: this.DistributionOfSales.id_dropdownlist_detail,
              id_dividend_reinvested: this.DevidendReinvested.id_dropdownlist_detail,
              id_method_of_sales: this.MethodOfSales.id_dropdownlist_detail,
              id_prod_cat: this.ProductCategory.id_dropdownlist_detail,
              id_prod_type: this.ProductType.id_dropdownlist_detail,
              id_settlement_periode: this.SettlementPeriod.id_dropdownlist_detail,
              prod_desc: this.Description,
              product_code: this.ProductCode,
              remark: this.Remark,
              id_tax: this.Tax.id_dropdownlist_detail,
              tax_rate: this.TaxRate,
              subs_fee: this.SubscriptionFee,
              redempt_fee: this.RedemptionFee,
              modified_date: this.now,
              modified_by: this.user.fullname
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Product ' + this.Description + ' ' + 'Has Been Updated'
          })
          this.$router.push({ path: '/masterproduct' })
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
      this.oldcode = this.selected[0].product_code
      this.ProductCode = this.selected[0].product_code
      this.Description = this.selected[0].prod_desc
      this.ProductCategory.dropdown_details_desc = this.selected[0].product_category.dropdown_details_desc
      this.ProductType.dropdown_details_desc = this.selected[0].product_type.dropdown_details_desc
      this.FundManager = this.selected[0].fund_manager
      this.CharacterOfMutualFunds.dropdown_details_desc = this.selected[0].mutual_fund.dropdown_details_desc
      this.MethodOfSales.dropdown_details_desc = this.selected[0].method_of_sales.dropdown_details_desc
      this.DistributionOfSales.dropdown_details_desc = this.selected[0].distribution_of_sales.dropdown_details_desc
      this.BankAccountNo = this.selected[0].bank_account_no
      this.BeneficiaryName = this.selected[0].beneficiary_name
      this.CustodyBank.dropdown_details_desc = this.selected[0].reference_cust_bank.dropdown_details_desc
      this.BranchName.branch_name = this.selected[0].branch.branch_name
      this.Currency.currencies_desc = this.selected[0].currencies.currencies_desc
      this.AccountType.dropdown_details_desc = this.selected[0].account_type.dropdown_details_desc
      this.Classification.profile_name_desc = this.selected[0].classification.dropdown_details_desc
      this.Remark = this.selected[0].remark
      this.SettlementPeriod.dropdown_details_desc = this.selected[0].settlement_periode.dropdown_details_desc
      this.DevidendReinvested.dropdown_details_desc = this.selected[0].dividend_reinvested.dropdown_details_desc
      this.AccountName = this.selected[0].account_name
      this.AccountNumber = this.selected[0].account_number
      this.Tax.dropdown_details_desc = this.selected[0].tax.dropdown_details_desc
      this.TaxRate = this.selected[0].tax_rate
      this.SubscriptionFee = this.selected[0].subs_fee
      this.RedemptionFee = this.selected[0].redempt_fee
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
          this.$router.push({ path: '/masterproduct' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style lang="stylus">
.table-label-color {
  thead tr:first-child th {
    position: sticky;
    opacity: 1;
  }
}

.error {
  color: #d6502f;
}

.form-input {
  display: none;
}
</style>
