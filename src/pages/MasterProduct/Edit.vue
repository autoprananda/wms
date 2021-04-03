<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el data-vv-name="Home" label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el data-vv-name="Products" label="Products" icon="settings" to="/masterproduct" />
              <q-breadcrumbs-el label="Edit" icon="edit" />
            </q-breadcrumbs>
          </q-card-section>
          <q-separator inset />

          <q-card-section>
            <transition appear enter-active-class="animated zoomIn">
              <q-card class="my-card shadow-6 center" inline>
                <q-card-section>
                  <form @submit.prevent="Submit">
                    <q-card-section>
                      <div class="q-gutter-sm">
                        <q-btn
                          :loading="submitting"
                          @click="SubmitDialog"
                          :disable="errors.any() ||
                      Description === '' || BranchName === '' || PricingList === '' ||
                      MethodOfSales === '' || AccountName === '' || AccountNumber === '' "
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
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-field outlined label="Product Code" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ProductCode }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="Description"
                            label="Description *"
                            v-validate="'required'"
                            data-vv-name="Description"
                            :error="errors.has('Description')"
                            :error-label="errors.first('Description')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Description</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Description')"
                            class="error"
                          >{{ errors.first('Description') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 q-mt-sm">
                          <q-checkbox size="sm" v-model="AutoSubscription" label="Auto Subscription" />
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

                            <q-tab-panels keep-alive v-model="tab" animated>
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
                                      optProductCategory => optProductCategory
                                    "
                                        emit-value
                                        map-options
                                        label="Product Category *"
                                        v-validate="'required'"
                                        data-vv-name="Product Category"
                                        :error="errors.has('Product Category')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Product Category</q-tooltip>
                                      </q-select>
                                      <span v-show="errors.has('Product Category')" class="error">
                                        {{
                                        errors.first('Product Category')
                                        }}
                                      </span>
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
                                        v-validate="'required'"
                                        data-vv-name="Product Type"
                                        :error="errors.has('Product Type')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Product Type</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Product Type')"
                                        class="error"
                                      >{{ errors.first('Product Type') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-select
                                        outlined
                                        v-model="FundManager"
                                        :options="optFundManager"
                                        stack-label
                                        :option-label="
                                      optFundManager =>
                                        optFundManager.fund_managers_name
                                    "
                                        :option-value="
                                      optFundManager => optFundManager
                                    "
                                        emit-value
                                        map-options
                                        label="Fund Manager *"
                                        v-validate="'required'"
                                        data-vv-name="Fund Manager"
                                        :error="errors.has('Fund Manager')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Fund Manager</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Fund Manager')"
                                        class="error"
                                      >{{ errors.first('Fund Manager') }}</span>
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
                                        :option-value="optCharacter => optCharacter"
                                        emit-value
                                        map-options
                                        label="Character Of Mutual Funds *"
                                        v-validate="'required'"
                                        data-vv-name="Character Of Mutual Funds"
                                        :error="
                                      errors.has('Character Of Mutual Funds')
                                    "
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Character Of Mutual Funds</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="
                                      errors.has('Character Of Mutual Funds')
                                    "
                                        class="error"
                                      >
                                        {{
                                        errors.first('Character Of Mutual Funds')
                                        }}
                                      </span>
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
                                        v-validate="'required'"
                                        data-vv-name="Method Of Sales"
                                        :error="errors.has('Method Of Sales')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Method Of Sales</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Method Of Sales')"
                                        class="error"
                                      >{{ errors.first('Method Of Sales') }}</span>
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
                                        v-validate="'required'"
                                        data-vv-name="Distribution Of Sales"
                                        :error="errors.has('Distribution Of Sales')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Distribution Of Sales</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Distribution Of Sales')"
                                        class="error"
                                      >
                                        {{
                                        errors.first('Distribution Of Sales')
                                        }}
                                      </span>
                                    </div>

                                    <div class="col-xs-12 col-sm-4 col-md-4">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="BankAccountNo"
                                        mask="################"
                                        label="Bank Account No *"
                                        v-validate="'required'"
                                        data-vv-name="Bank Account No"
                                        :error="errors.has('Bank Account No')"
                                        :error-label="
                                      errors.first('Bank Account No')
                                    "
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Bank Account No</q-tooltip>
                                      </q-input>
                                      <span
                                        v-show="errors.has('Bank Account No')"
                                        class="error"
                                      >{{ errors.first('Bank Account No') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="BeneficiaryName"
                                        label="Beneficiary Name *"
                                        v-validate="'required'"
                                        data-vv-name="Beneficiary Name"
                                        :error="errors.has('Beneficiary Name')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Beneficiary Name</q-tooltip>
                                      </q-input>
                                      <span v-show="errors.has('Beneficiary Name')" class="error">
                                        {{
                                        errors.first('Beneficiary Name')
                                        }}
                                      </span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="CustodyBank"
                                        :options="optCustodyBank1"
                                        label="Custody Bank *"
                                        stack-label
                                        :option-label="
                                      optCustodyBank1 =>
                                        optCustodyBank1.reference_custodian_bank_name
                                    "
                                        :option-value="
                                      optCustodyBank1 => optCustodyBank1
                                    "
                                        emit-value
                                        map-options
                                        v-validate="'required'"
                                        data-vv-name="Custody Bank"
                                        :error="errors.has('Custody Bank')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Custody Bank</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Custody Bank')"
                                        class="error"
                                      >{{ errors.first('Custody Bank') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
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
                                        v-validate="'required'"
                                        data-vv-name="Branch Name"
                                        :error="errors.has('Branch Name')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Branch Name</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Branch Name')"
                                        class="error"
                                      >{{ errors.first('Branch Name') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-select
                                        outlined
                                        v-model="Currency"
                                        :options="optCurrency"
                                        stack-label
                                        :option-label="
                                      optCurrency => optCurrency.currencies_desc
                                    "
                                        :option-value="optCurrency => optCurrency"
                                        emit-value
                                        map-options
                                        label="Currency *"
                                        v-validate="'required'"
                                        data-vv-name="Currency"
                                        :error="errors.has('Currency')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Currency</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Currency')"
                                        class="error"
                                      >{{ errors.first('Currency') }}</span>
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
                                        v-validate="'required'"
                                        data-vv-name="Account Type"
                                        :error="errors.has('Account Type')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Account Type</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Account Type')"
                                        class="error"
                                      >{{ errors.first('Account Type') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="Classification"
                                        :options="optClassification"
                                        stack-label
                                        :option-label="
                                      optClassification =>
                                        optClassification.profile_name_desc
                                    "
                                        :option-value="
                                      optClassification => optClassification
                                    "
                                        emit-value
                                        map-options
                                        label="Classification *"
                                        v-validate="'required'"
                                        data-vv-name="Classification"
                                        :error="errors.has('Classification')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Classification</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Classification')"
                                        class="error"
                                      >{{ errors.first('Classification') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="CustomerSegment"
                                        :options="optCustomerSegment"
                                        stack-label
                                        :option-label="
                                      optCustomerSegment =>
                                        optCustomerSegment.dropdown_details_desc
                                    "
                                        :option-value="
                                      optCustomerSegment => optCustomerSegment
                                    "
                                        emit-value
                                        map-options
                                        label="Customer Segment *"
                                        v-validate="'required'"
                                        data-vv-name="Customer Segment"
                                        :error="errors.has('Customer Segment')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Customer Segment</q-tooltip>
                                      </q-select>
                                      <span v-show="errors.has('Customer Segment')" class="error">
                                        {{
                                        errors.first('Customer Segment')
                                        }}
                                      </span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-select
                                        outlined
                                        v-model="PricingList"
                                        :options="optPricingList"
                                        stack-label
                                        :option-label="
                                      optPricingList =>
                                        optPricingList.price_name
                                    "
                                        :option-value="
                                      optPricingList => optPricingList
                                    "
                                        emit-value
                                        map-options
                                        label="Pricing List *"
                                        v-validate="'required'"
                                        data-vv-name="Pricing List"
                                        :error="errors.has('Pricing List')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Pricing List</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Pricing List')"
                                        class="error"
                                      >{{ errors.first('Pricing List') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                      <q-input
                                        outlined
                                        v-model="Remark"
                                        label="Remark"
                                        data-vv-name="Remark"
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
                                      optSettlementPeriod => optSettlementPeriod
                                    "
                                        emit-value
                                        map-options
                                        label="Settlement Period *"
                                        v-validate="'required'"
                                        data-vv-name="Settlement Period"
                                        :error="errors.has('Settlement Period')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Settlement Period</q-tooltip>
                                      </q-select>
                                      <span v-show="errors.has('Settlement Period')" class="error">
                                        {{
                                        errors.first('Settlement Period')
                                        }}
                                      </span>
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
                                        v-validate="'required'"
                                        data-vv-name="Devidend Reinvested"
                                        :error="errors.has('Devidend Reinvested')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Devidend Reinvested</q-tooltip>
                                      </q-select>
                                      <span
                                        v-show="errors.has('Devidend Reinvested')"
                                        class="error"
                                      >
                                        {{
                                        errors.first('Devidend Reinvested')
                                        }}
                                      </span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="AccountName"
                                        label="Account Name *"
                                        v-validate="'required'"
                                        data-vv-name="Account Name"
                                        :error="errors.has('Account Name')"
                                        :error-label="errors.first('Account Name')"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Account Name</q-tooltip>
                                      </q-input>
                                      <span
                                        v-show="errors.has('Account Name')"
                                        class="error"
                                      >{{ errors.first('Account Name') }}</span>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-input
                                        stack-label
                                        outlined
                                        v-model="AccountNumber"
                                        mask="################"
                                        label="Account Number *"
                                        v-validate="'required'"
                                        data-vv-name="Account Number"
                                        :error="errors.has('Account Number')"
                                        :error-label="
                                      errors.first('Account Number')
                                    "
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Account Number</q-tooltip>
                                      </q-input>
                                      <span
                                        v-show="errors.has('Account Number')"
                                        class="error"
                                      >{{ errors.first('Account Number') }}</span>
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
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Products" icon="settings" to="/masterproduct" />
            <q-breadcrumbs-el label="Edit" icon="edit" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline>
              <q-card-section>
                <form @submit.prevent="Submit">
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Product Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ProductCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="Description"
                          label="Description *"
                          v-validate="'required'"
                          data-vv-name="Description"
                          :error="errors.has('Description')"
                          :error-label="errors.first('Description')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >Description</q-tooltip>
                        </q-input>
                        <span
                          v-show="errors.has('Description')"
                          class="error"
                        >{{ errors.first('Description') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2 q-mt-sm">
                          <q-checkbox size="sm" v-model="AutoSubscription" label="Auto Subscription" />
                        </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <transition appear enter-active-class="animated zoomIn">
                      <q-card class="my-card shadow-6 center" inline style>
                        <q-tabs
                          v-model="tab"
                          active-color="primary"
                          indicator-color="primary"
                          class="text-grey"
                          align="justify"
                          inline-label
                        >
                          <q-tab label="Product & Bank Info" name="one" />
                          <q-tab label="Settlement Info" name="two" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels keep-alive v-model="tab" animated>
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
                                      optProductCategory => optProductCategory
                                    "
                                    emit-value
                                    map-options
                                    label="Product Category *"
                                    v-validate="'required'"
                                    data-vv-name="Product Category"
                                    :error="errors.has('Product Category')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Product Category</q-tooltip>
                                  </q-select>
                                  <span v-show="errors.has('Product Category')" class="error">
                                    {{
                                    errors.first('Product Category')
                                    }}
                                  </span>
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
                                    v-validate="'required'"
                                    data-vv-name="Product Type"
                                    :error="errors.has('Product Type')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Product Type</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Product Type')"
                                    class="error"
                                  >{{ errors.first('Product Type') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-select
                                    outlined
                                    v-model="FundManager"
                                    :options="optFundManager"
                                    stack-label
                                    :option-label="
                                      optFundManager =>
                                        optFundManager.fund_managers_name
                                    "
                                    :option-value="
                                      optFundManager => optFundManager
                                    "
                                    emit-value
                                    map-options
                                    label="Fund Manager *"
                                    v-validate="'required'"
                                    data-vv-name="Fund Manager"
                                    :error="errors.has('Fund Manager')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Fund Manager</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Fund Manager')"
                                    class="error"
                                  >{{ errors.first('Fund Manager') }}</span>
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
                                    :option-value="optCharacter => optCharacter"
                                    emit-value
                                    map-options
                                    label="Character Of Mutual Funds *"
                                    v-validate="'required'"
                                    data-vv-name="Character Of Mutual Funds"
                                    :error="
                                      errors.has('Character Of Mutual Funds')
                                    "
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Character Of Mutual Funds</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="
                                      errors.has('Character Of Mutual Funds')
                                    "
                                    class="error"
                                  >
                                    {{
                                    errors.first('Character Of Mutual Funds')
                                    }}
                                  </span>
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
                                    v-validate="'required'"
                                    data-vv-name="Method Of Sales"
                                    :error="errors.has('Method Of Sales')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Method Of Sales</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Method Of Sales')"
                                    class="error"
                                  >{{ errors.first('Method Of Sales') }}</span>
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
                                    v-validate="'required'"
                                    data-vv-name="Distribution Of Sales"
                                    :error="errors.has('Distribution Of Sales')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Distribution Of Sales</q-tooltip>
                                  </q-select>
                                  <span v-show="errors.has('Distribution Of Sales')" class="error">
                                    {{
                                    errors.first('Distribution Of Sales')
                                    }}
                                  </span>
                                </div>

                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    stack-label
                                    outlined
                                    v-model="BankAccountNo"
                                    mask="################"
                                    label="Bank Account No *"
                                    v-validate="'required'"
                                    data-vv-name="Bank Account No"
                                    :error="errors.has('Bank Account No')"
                                    :error-label="
                                      errors.first('Bank Account No')
                                    "
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Bank Account No</q-tooltip>
                                  </q-input>
                                  <span
                                    v-show="errors.has('Bank Account No')"
                                    class="error"
                                  >{{ errors.first('Bank Account No') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-8 col-md-8">
                                  <q-input
                                    stack-label
                                    outlined
                                    v-model="BeneficiaryName"
                                    label="Beneficiary Name *"
                                    v-validate="'required'"
                                    data-vv-name="Beneficiary Name"
                                    :error="errors.has('Beneficiary Name')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Beneficiary Name</q-tooltip>
                                  </q-input>
                                  <span v-show="errors.has('Beneficiary Name')" class="error">
                                    {{
                                    errors.first('Beneficiary Name')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    outlined
                                    v-model="CustodyBank"
                                    :options="optCustodyBank1"
                                    label="Custody Bank *"
                                    stack-label
                                    :option-label="
                                      optCustodyBank1 =>
                                        optCustodyBank1.reference_custodian_bank_name
                                    "
                                    :option-value="
                                      optCustodyBank1 => optCustodyBank1
                                    "
                                    emit-value
                                    map-options
                                    v-validate="'required'"
                                    data-vv-name="Custody Bank"
                                    :error="errors.has('Custody Bank')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Custody Bank</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Custody Bank')"
                                    class="error"
                                  >{{ errors.first('Custody Bank') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
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
                                    v-validate="'required'"
                                    data-vv-name="Branch Name"
                                    :error="errors.has('Branch Name')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Branch Name</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Branch Name')"
                                    class="error"
                                  >{{ errors.first('Branch Name') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-3 col-md-3">
                                  <q-select
                                    outlined
                                    v-model="Currency"
                                    :options="optCurrency"
                                    stack-label
                                    :option-label="
                                      optCurrency => optCurrency.currencies_desc
                                    "
                                    :option-value="optCurrency => optCurrency"
                                    emit-value
                                    map-options
                                    label="Currency *"
                                    v-validate="'required'"
                                    data-vv-name="Currency"
                                    :error="errors.has('Currency')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Currency</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Currency')"
                                    class="error"
                                  >{{ errors.first('Currency') }}</span>
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
                                    v-validate="'required'"
                                    data-vv-name="Account Type"
                                    :error="errors.has('Account Type')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Account Type</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Account Type')"
                                    class="error"
                                  >{{ errors.first('Account Type') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    outlined
                                    v-model="Classification"
                                    :options="optClassification"
                                    stack-label
                                    :option-label="
                                      optClassification =>
                                        optClassification.profile_name_desc
                                    "
                                    :option-value="
                                      optClassification => optClassification
                                    "
                                    emit-value
                                    map-options
                                    label="Classification *"
                                    v-validate="'required'"
                                    data-vv-name="Classification"
                                    :error="errors.has('Classification')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Classification</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Classification')"
                                    class="error"
                                  >{{ errors.first('Classification') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    outlined
                                    v-model="CustomerSegment"
                                    :options="optCustomerSegment"
                                    stack-label
                                    :option-label="
                                      optCustomerSegment =>
                                        optCustomerSegment.dropdown_details_desc
                                    "
                                    :option-value="
                                      optCustomerSegment => optCustomerSegment
                                    "
                                    emit-value
                                    map-options
                                    label="Customer Segment *"
                                    v-validate="'required'"
                                    data-vv-name="Customer Segment"
                                    :error="errors.has('Customer Segment')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Customer Segment</q-tooltip>
                                  </q-select>
                                  <span v-show="errors.has('Customer Segment')" class="error">
                                    {{
                                    errors.first('Customer Segment')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    outlined
                                    v-model="PricingList"
                                    :options="optPricingList"
                                    stack-label
                                    :option-label="
                                      optPricingList =>
                                        optPricingList.price_name
                                    "
                                    :option-value="
                                      optPricingList => optPricingList
                                    "
                                    emit-value
                                    map-options
                                    label="Pricing List *"
                                    v-validate="'required'"
                                    data-vv-name="Pricing List"
                                    :error="errors.has('Pricing List')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Pricing List</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Pricing List')"
                                    class="error"
                                  >{{ errors.first('Pricing List') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    outlined
                                    v-model="Remark"
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
                                      optSettlementPeriod => optSettlementPeriod
                                    "
                                    emit-value
                                    map-options
                                    label="Settlement Period *"
                                    v-validate="'required'"
                                    data-vv-name="Settlement Period"
                                    :error="errors.has('Settlement Period')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Settlement Period</q-tooltip>
                                  </q-select>
                                  <span v-show="errors.has('Settlement Period')" class="error">
                                    {{
                                    errors.first('Settlement Period')
                                    }}
                                  </span>
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
                                    v-validate="'required'"
                                    data-vv-name="Devidend Reinvested"
                                    :error="errors.has('Devidend Reinvested')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Devidend Reinvested</q-tooltip>
                                  </q-select>
                                  <span v-show="errors.has('Devidend Reinvested')" class="error">
                                    {{
                                    errors.first('Devidend Reinvested')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    stack-label
                                    outlined
                                    v-model="AccountName"
                                    label="Account Name *"
                                    v-validate="'required'"
                                    data-vv-name="Account Name"
                                    :error="errors.has('Account Name')"
                                    :error-label="errors.first('Account Name')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Account Name</q-tooltip>
                                  </q-input>
                                  <span
                                    v-show="errors.has('Account Name')"
                                    class="error"
                                  >{{ errors.first('Account Name') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    stack-label
                                    outlined
                                    v-model="AccountNumber"
                                    mask="################"
                                    label="Account Number *"
                                    v-validate="'required'"
                                    data-vv-name="Account Number"
                                    :error="errors.has('Account Number')"
                                    :error-label="
                                      errors.first('Account Number')
                                    "
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Account Number</q-tooltip>
                                  </q-input>
                                  <span
                                    v-show="errors.has('Account Number')"
                                    class="error"
                                  >{{ errors.first('Account Number') }}</span>
                                </div>
                              </div>
                            </div>
                          </q-tab-panel>
                        </q-tab-panels>
                      </q-card>
                    </transition>
                  </q-card-section>
                </form>
              </q-card-section>
            </q-card>
          </transition>
        </q-card-section>
        <div class="orientation-portrait">
          <q-page-sticky position="bottom-right" :offset="fabPos">
            <q-fab
              icon="fas fa-arrows-alt"
              active-icon="fas fa-compress-arrows-alt"
              direction="up"
              color="primary"
              push
              label="Actions"
              label-position="left"
              external-label
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
              <q-fab-action
                @click="SubmitDialog"
                :loading="submitting || draggingFab"
                label="Submit"
                color="accent"
                icon="reply"
                label-position="left"
                external-label
                :disable="errors.any() || !isFormInValid || Description === '' ||
                      BranchName === '' || PricingList === '' ||
                      MethodOfSales === '' || AccountName === '' || AccountNumber === ''|| draggingFab"
                push
              />
              <q-fab-action
                @click="CancelDialog"
                label="Cancel"
                color="negative"
                icon="clear"
                label-position="left"
                external-label
                :disable="draggingFab"
                push
              />
            </q-fab>
          </q-page-sticky>
        </div>
        <div class="orientation-landscape">
          <q-page-sticky position="bottom-right" :offset="fabPos">
            <q-fab
              icon="keyboard_arrow_left"
              label="Actions"
              direction="left"
              color="primary"
              padding="5px"
              push
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
              <q-fab-action
                @click="SubmitDialog"
                :loading="submitting"
                label="Submit"
                color="accent"
                icon="reply"
                square
                label-position="bottom"
                padding="4px"
                :disable="errors.any() || !isFormInValid || Description === '' ||
                      BranchName === '' || PricingList === '' ||
                      MethodOfSales === '' || AccountName === '' || AccountNumber === '' || draggingFab"
                push
              />
              <q-fab-action
                @click="CancelDialog"
                label="Cancel"
                color="negative"
                icon="clear"
                label-position="bottom"
                padding="4px"
                square
                :disable="draggingFab"
                push
              />
            </q-fab>
          </q-page-sticky>
        </div>
      </q-page>
    </div>
  </div>
</template>

<script>
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import { EditMasterProdCode } from 'src/graphql/MasterProductCode'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetBranch } from 'src/graphql/MasterBranch'
import { GetMasterCurrency } from 'src/graphql/Currency'
import { GetPricingToProduct } from 'src/graphql/PricingList'
import { GetFundManager } from 'src/graphql/FundManager/FundManager'
import { GetRefCustBank } from 'src/graphql/ReferenceCustodianBank/ReferenceCustodianBank'
import { ViewRiskProfileRule } from 'src/graphql/RiskProfileRule'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'EditProductCode',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      // userdata: state.user,
      userdata: this.Muser,
      carousel: false,
      submitting: false,
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
      AutoSubscription: false,
      ActiveTab: '',
      tab: 'one',
      ProductCode: '',
      Description: '',
      selected: JSON.parse(localStorage.selectedData),
      uuid: null,
      money: {
        thousands: ',',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  apollo: {
    optPricingList: {
      query: GetPricingToProduct,
      update: data => data.wms_pricing_lists
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
    optClassification: {
      query: ViewRiskProfileRule,
      update: data => data.wms_risk_profiles_rules
    },
    optCustomerSegment: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Customer Group'
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
    optFundManager: {
      query: GetFundManager,
      update: data => data.wms_fund_managers
    },
    optCustodyBank1: {
      query: GetRefCustBank,
      update: data => data.wms_reference_custodian_bank
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
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    clearValidate() {
      if (this.errors.any()) {
        this.$nextTick(() => {
          this.$validator.reset()
        })
      }
    },
    changeStatusTab() {
      if (this.ActiveTab === '') {
        this.ActiveTab = 'active'
      }
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterProdCode,
          variables: {
            code: this.oldcode,
            changes: {
              account_name: this.AccountName,
              account_number: this.AccountNumber,
              bank_account_no: this.BankAccountNo,
              beneficiary_name: this.BeneficiaryName,
              id_account_type: this.AccountType.id_dropdownlist_detail,
              id_branch: this.BranchName.id_branch,
              id_charac_mutual_fund: this.CharacterOfMutualFunds
                .id_dropdownlist_detail,
              id_classification: this.Classification.id_risk_profiles_rules,
              id_currency: this.Currency.id,
              id_custody_bank: this.CustodyBank.id_reference_custodian_bank,
              id_customer_segment: this.CustomerSegment.id_dropdownlist_detail,
              id_distribution_of_sales: this.DistributionOfSales
                .id_dropdownlist_detail,
              id_dividend_reinvested: this.DevidendReinvested
                .id_dropdownlist_detail,
              id_fund_manager: this.FundManager.id_fund_managers,
              id_method_of_sales: this.MethodOfSales.id_dropdownlist_detail,
              id_pricing_list: this.PricingList.id_price,
              id_prod_cat: this.ProductCategory.id_dropdownlist_detail,
              id_prod_type: this.ProductType.id_dropdownlist_detail,
              id_settlement_periode: this.SettlementPeriod
                .id_dropdownlist_detail,
              prod_desc: this.Description,
              product_code: this.ProductCode,
              remark: this.Remark,
              auto_subscription: this.AutoSubscription,
              modified_date: this.now,
              modified_by: this.userdata.name
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.AuditTrail()
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
    AuditTrail() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Edit',
            date_auditrail: this.now,
            menu: 'Product Management Setting',
            fullname: this.userdata.name,
            username: this.userdata.preferred_username,
            submenu: 'Products',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.oldcode = this.selected[0].product_code
      this.ProductCode = this.selected[0].product_code
      this.Description = this.selected[0].prod_desc
      this.ProductCategory.dropdown_details_desc = this.selected[0].product_category.dropdown_details_desc
      this.ProductType.dropdown_details_desc = this.selected[0].product_type.dropdown_details_desc
      this.FundManager.fund_managers_name = this.selected[0].fund_manager.fund_managers_name
      this.CharacterOfMutualFunds.dropdown_details_desc = this.selected[0].mutual_fund.dropdown_details_desc
      this.MethodOfSales.dropdown_details_desc = this.selected[0].method_of_sales.dropdown_details_desc
      this.DistributionOfSales.dropdown_details_desc = this.selected[0].distribution_of_sales.dropdown_details_desc
      this.BankAccountNo = this.selected[0].bank_account_no
      this.BeneficiaryName = this.selected[0].beneficiary_name
      this.CustodyBank.reference_custodian_bank_name = this.selected[0].reference_cust_bank.reference_custodian_bank_name
      this.BranchName.branch_name = this.selected[0].branch.branch_name
      this.Currency.currencies_desc = this.selected[0].currencies.currencies_desc
      this.AccountType.dropdown_details_desc = this.selected[0].account_type.dropdown_details_desc
      this.Classification.profile_name_desc = this.selected[0].classification.profile_name_desc
      this.CustomerSegment.dropdown_details_desc = this.selected[0].customer_segment.dropdown_details_desc
      this.PricingList.price_name = this.selected[0].pricing_lists.price_name
      this.Remark = this.selected[0].remark
      this.SettlementPeriod.dropdown_details_desc = this.selected[0].settlement_periode.dropdown_details_desc
      this.DevidendReinvested.dropdown_details_desc = this.selected[0].dividend_reinvested.dropdown_details_desc
      this.AccountName = this.selected[0].account_name
      this.AccountNumber = this.selected[0].account_number
      this.AutoSubscription = this.selected[0].auto_subscription
      console.log(typeof this.oldcode, '==>')
    },
    onRefresh() {
      this.$log.info('info call at function onRefresh')
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.loadData()
      }, 1000)

      this.selected = []
    },
    SubmitDialog() {
      this.$log.info('info call at function submitDialog')
      this.$validator.validateAll().then(result => {
        if (result) {
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
                label: 'Cancel',
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
        } else {
          this.$q.dialog({
            title: 'Error Submit',
            message: 'Please fill field required first.',
            color: 'error',
            ok: true
          })
        }
      })
    },

    CancelDialog() {
      this.$log.info('info call at function CancelDialog')
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
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    isFormInValid() {
      let validate = Object.keys(this.field).some(
        key => this.field[key].validated
      )
      let valid = Object.keys(this.field).some(key => this.field[key].valid)
      return { valid, validate }
    }
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
