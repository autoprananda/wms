<template>
  <div>
    <div v-if="$q.platform.is.desktop">
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
              <q-breadcrumbs-el label="Redeem" icon="redeem" />
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
                          :loading="Submitting"
                          @click="SubmitDialog"
                          label="Submit"
                          color="accent"
                          style="width: 80px"
                          :disable="errors.any() || TotalPayment === ''"
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
                        <!-- <div class="col-xs-12 col-sm-4 col-md-4">
                      <q-field outlined label="Transaction No" stack-label>
                        <template v-slot:control>
                          <div class="self-center full-width no-outline" tabindex="0">
                            {{ TransactionNo }}
                          </div>
                        </template>
                      </q-field>
                        </div>-->
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field outlined label="GCIF" stack-label>
                            <template v-slot:control>
                              <div class="self-center full-width no-outline" tabindex="0">{{ Gcif }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field outlined label="Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Customer }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field outlined label="Opening Date" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ OpeningDate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field outlined label="Cut Off Time" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ getTime(CutOffTime) }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-select
                            @input="
                              ResetSubscriptionNo(),
                                onLoadProductSub(),
                                onloadLastNav()
                            "
                            outlined
                            v-model="SubscriptionNo"
                            :options="loadSubscriptionNo"
                            :option-label="
                              loadSubscriptionNo =>
                                loadSubscriptionNo.subscription_no
                            "
                            :option-value="
                              loadSubscriptionNo => loadSubscriptionNo
                            "
                            emit-value
                            map-options
                            label="Account No"
                            v-validate="'required'"
                            data-vv-name="Account No"
                            :error="errors.has('Account No')"
                            stack-label
                          ></q-select>
                          <span
                            v-show="errors.has('Account No')"
                            class="error"
                          >{{ errors.first('Account No') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Product" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Product }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-field outlined label="Currency" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Currency }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field outlined label="Remark" stack-label>
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
                              <q-tab label="Transaction" name="one" />
                              <q-tab label="Bank Account" name="two" />
                              <q-tab label="More Info" name="three" />
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="tab" animated>
                              <q-tab-panel name="one">
                                <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Last Nav Date" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ LastNavDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-checkbox
                                        :disable="
                                          typeof OutStandingUnit === 'number'
                                        "
                                        v-model="RedemptAll"
                                        label="Redempt All"
                                        color="teal"
                                        @input="changeAllRedeem"
                                      />
                                    </div>
                                    <div class="col-xs-12 col-sm-2 col-md-2">
                                      <q-field outlined label="Outstanding Unit" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ OutStandingUnit }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-2 col-md-2">
                                      <q-field outlined label="Last NAV" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ formatCurrency4(LastNavAmount) }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div
                                      v-show="RedemptAll === false"
                                      class="col-xs-12 col-sm-2 col-md-2"
                                    >
                                      <q-input
                                        outlined
                                        v-model="RedemptionUnitCal"
                                        label="Redemption Unit"
                                        v-validate="
                                          'accountno|requiredunit|maxreddem'
                                        "
                                        data-vv-name="Redemption Unit"
                                        :error="errors.has('Redemption Unit')"
                                        @blur="
                                          ;(isInputActive = false),
                                            validateFieldAccount()
                                        "
                                        @focus="isInputActive = true"
                                        @input="
                                          changeValue(),
                                            validateValueRedeem(),
                                            validateRequired()
                                        "
                                        :decimals="2"
                                        numeric-keyboard-toggle
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Redemption Unit</q-tooltip>
                                      </q-input>
                                      <span v-show="errors.has('Redemption Unit')" class="error">
                                        {{
                                        errors.first('Redemption Unit')
                                        }}
                                      </span>
                                    </div>
                                    <div v-show="RedemptAll === true" class="col-xs-12 col-sm-2 col-md-2">
                                      <q-field
                                        outlined
                                        v-validate="
                                          'accountno|requiredunit|maxreddem'
                                        "
                                        data-vv-name="Redemption Unit"
                                        :error="errors.has('Redemption Unit')"
                                        label="Redemption Unit"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ RedemptionUnitCal }}</div>
                                        </template>
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Redemption Unit</q-tooltip>
                                      </q-field>
                                      <span v-show="errors.has('Redemption Unit')" class="error">
                                        {{
                                        errors.first('Redemption Unit')
                                        }}
                                      </span>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-field outlined label="Value Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ formatCurrency3(ValueAmount) }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-field
                                        outlined
                                        label="Available Balance Amount Using Last NAV"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >
                                            {{
                                            AvailableBalanceAmountUsingLastNAV
                                            }}
                                          </div>
                                        </template>
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >
                                          Available Balance Amount Using Last
                                          NAV
                                        </q-tooltip>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Net Fee Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ NetFeeAmount }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Tax Fee Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ TaxFeeAmount }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6 q-gutter-md">
                                      <q-btn
                                        style="width: 120px"
                                        :disable="SubscriptionNo === null || RedemptionUnitCal === '0.000000' || RedemptionUnitCal === '' || RedemptionUnitCal === 0"
                                        @click="ValidationAmount(), GetDataRules()"
                                        label="Calculate"
                                        color="primary"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Calculate</q-tooltip>
                                      </q-btn>
                                      <q-btn
                                        style="width: 140px"
                                        color="primary"
                                        label="Override Fee"
                                        :disable="SubscriptionNo === null || RedemptionUnitCal === '0.000000' || RedemptionUnitCal === '' || RedemptionUnitCal === 0"
                                        :loading="LoadDetail"
                                        @click="
                                          actionDetail(), changeFeeSetting()
                                        "
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Override Fee</q-tooltip>
                                      </q-btn>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6"></div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Total Fee Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >
                                            {{
                                            formatCurrency1(TotalFeeAmount)
                                            }}
                                          </div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Total Payment Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ formatCurrency3(TotalPayment) }}</div>
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
                                      >Customer Bank Account</div>
                                      <q-separator />
                                      <div class="q-mb-md" />
                                      <div class="row q-col-gutter-md">
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="BankAccountNoBA"
                                            label="Bank Account No"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BankAccountNoBA }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="BankBA"
                                            label="Bank"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BankBA }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="BranchNameBA"
                                            label="Branch Name"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BranchNameBA }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="AccountHolderName"
                                            label="Account Holder Name"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ AccountHolderName }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="CurrencyBA"
                                            label="Currency"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ CurrencyBA }}</div>
                                            </template>
                                            <q-tooltip
                                              anchor="top middle"
                                              self="bottom middle"
                                              content-style="font-size: 11px"
                                              :offset="[10, 10]"
                                              transition-show="scale"
                                              transition-hide="scale"
                                            >Currency</q-tooltip>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field
                                            outlined
                                            v-model="BankAccountTypeBA"
                                            label="Account Type"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BankAccountTypeBA }}</div>
                                            </template>
                                            <q-tooltip
                                              anchor="top middle"
                                              self="bottom middle"
                                              content-style="font-size: 11px"
                                              :offset="[10, 10]"
                                              transition-show="scale"
                                              transition-hide="scale"
                                            >Account Type</q-tooltip>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3"></div>
                                        <div class="col-xs-12 col-sm-12 col-md-12">
                                          <q-field
                                            outlined
                                            v-model="RemarkBA"
                                            label="Remark"
                                            stack-label
                                          >
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ RemarkBA }}</div>
                                            </template>
                                            <q-tooltip
                                              anchor="top middle"
                                              self="bottom middle"
                                              content-style="font-size: 11px"
                                              :offset="[10, 10]"
                                              transition-show="scale"
                                              transition-hide="scale"
                                            >Remark</q-tooltip>
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
                                      <div
                                        class="text-weight-bolder text-subtitle1 q-mb-sm"
                                      >Branch Info</div>
                                      <q-separator />
                                      <div class="q-mb-md" />
                                      <div class="row q-col-gutter-md">
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Transaction Branch" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ TransactionBranch }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Sales Referral" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ SalesReferal }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Customer Class" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ CustomerClass }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Subscription Type" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ SubscriptionType }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Branch Waperd" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BranchWaperd }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="WAPERD" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ Waperd }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-12 col-md-12">
                                          <q-field outlined label="Reference No" stack-label>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ RefferenceNo }}</div>
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
                                          <q-field outlined label="Cut Off Date" stack-label>
                                            <template v-slot:append>
                                              <q-icon name="event" />
                                            </template>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ CutOffDate }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Batch Date" stack-label>
                                            <template v-slot:append>
                                              <q-icon name="event" />
                                            </template>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ BatchDate }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Transaction Date" stack-label>
                                            <template v-slot:append>
                                              <q-icon name="event" />
                                            </template>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ TransactionDate }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Transaction Confirm" stack-label>
                                            <template v-slot:append>
                                              <q-icon name="event" />
                                            </template>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ TransactionConfirmDate }}</div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Posting Date" stack-label>
                                            <template v-slot:append>
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
                                        <div class="col-xs-12 col-sm-6 col-md-6">
                                          <q-field outlined label="Approve Date" stack-label>
                                            <template v-slot:append>
                                              <q-icon name="event" />
                                            </template>
                                            <template v-slot:control>
                                              <div
                                                class="self-center full-width no-outline"
                                                tabindex="0"
                                              >{{ ApproveDate }}</div>
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
        <q-dialog v-model="overridefee">
          <q-card>
            <q-card-section>
              <!-- <q-carousel v-model="slide" control-color="primary" padding height="120%"
        class="bg-white shadow-1 rounded-borders">
              <q-carousel-slide :name="1" class="column no-wrap flex-center">-->
              <div class="q-ml-sm q-mb-xs q-gutter-sm">
                <q-btn @click="defaultFee(), clearValidate()" label="Default Fee" color="cyan-7"></q-btn>
                <q-btn
                  :loading="Submitting"
                  @click="submitButtonOverwritte"
                  :disable="errors.any() || NetFeeResult === 'NaN'"
                  label="Submit"
                  color="accent"
                  style="width: 80px"
                ></q-btn>
                <q-btn label="Cancel" color="negative" v-close-popup style="width: 80px"></q-btn>
              </div>

              <q-card-section>
                <q-card class="shadow-3">
                  <q-card-section>
                    <div class="text-weight-bolder text-subtitle2 q-mb-sm">Fee Setting</div>
                    <q-separator />
                    <div class="q-mb-md" />
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field dense outlined label="Fee Include Tax" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ FeeIncludeTax }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="TaxSetting" label="Tax (%)" /> -->
                        <q-field dense outlined label="Tax (%)" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Tax }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="SubscriptionAmount" label="Amount" /> -->
                        <q-field dense outlined label="Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ formatCurrency(SubscriptionAmount) }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          dense
                          outlined
                          v-model="FeeSetting"
                          stack-label
                          label="Fee (%)"
                          :mask="mask || off"
                          v-validate="'max:5|min:1|regex:^[0-9.]+$'"
                          data-vv-name="Fee Setting"
                          :error="errors.has(' Fee Setting')"
                          @focus="isInputActiveTax = true"
                          @blur="getFeeSetting"
                          @input="rulesFee(), changeValueTax()"
                        />

                        <span
                          v-show="errors.has('Fee Setting')"
                          class="error"
                        >{{ errors.first('Fee Setting') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field dense outlined label="Min (%)" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ MinRedem }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="IndMinFeeAmount" label="Indikasi Min Fee Amount" /> -->
                        <q-field dense outlined label="Indikasi Min Fee Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ IndMinFeeAmount }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field dense outlined label="Max (%)" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ MaxRedem }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="IndMaxFeeAmount" label="Indikasi Max Fee Amount" /> -->
                        <q-field dense outlined label="Indikasi Max Fee Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ IndMaxFeeAmount }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card class="q-mt-lg shadow-3">
                  <q-card-section>
                    <div class="text-weight-bolder text-subtitle2 q-mb-sm">Result Fee Amount</div>
                    <q-separator />
                    <div class="q-mb-md" />
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="NetFeeResult" label="Net Fee Amount" /> -->
                        <q-field dense outlined label="Net Fee Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ NetFeeResult }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="TaxFeeResult" label="Tax Fee Amount" /> -->
                        <q-field dense outlined label="Tax Fee Amount" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ TaxFeeResult }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="float-right q-mt-xs text-subtitle2">Total Fee Amount :</div>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <!-- <q-input disable dense outlined v-model="TotalFeeResult" label="" /> -->
                        <q-field dense outlined label stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ TotalFeeResult }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card-section>
          </q-card>
          <!-- </q-carousel-slide>
          </q-carousel>-->
        </q-dialog>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[30, 25]">
          <q-btn fab icon="keyboard_arrow_up" color="negative" />
        </q-page-scroller>
      </q-page>
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Redemptions" icon="fas fa-hand-holding-usd" to="/redemption" />
            <q-breadcrumbs-el label="Redeem" icon="redeem" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline>
              <q-card-section>
                <form @submit.prevent>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="GCIF" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Gcif }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Customer }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="Opening Date" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ OpeningDate }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-3">
                        <q-field outlined label="Cut Off Time" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ getTime(CutOffTime) }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-4 col-md-4">
                        <q-select
                          @input="
                            ResetSubscriptionNo(),
                              onLoadProductSub(),
                              onloadLastNav()
                          "
                          outlined
                          v-model="SubscriptionNo"
                          :options="loadSubscriptionNo"
                          :option-label="
                            loadSubscriptionNo =>
                              loadSubscriptionNo.subscription_no
                          "
                          :option-value="
                            loadSubscriptionNo => loadSubscriptionNo
                          "
                          emit-value
                          map-options
                          label="Account No"
                          stack-label
                          v-validate="'required'"
                          data-vv-name="Account No"
                          :error="errors.has('Account No')"
                        ></q-select>
                        <span
                          v-show="errors.has('Account No')"
                          class="error"
                        >{{ errors.first('Account No') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Product" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Product }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-2 col-md-2">
                        <q-field outlined label="Currency" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Currency }}</div>
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
                      <q-card class="my-card shadow-6 center" inline style>
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

                        <q-tab-panels v-model="tab" animated>
                          <q-tab-panel name="one">
                            <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                              <div class="row q-col-gutter-md">
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Last Nav Date" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ LastNavDate }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-checkbox
                                    :disable="
                                      typeof OutStandingUnit === 'number'
                                    "
                                    v-model="RedemptAll"
                                    label="Redempt All"
                                    color="teal"
                                    @input="changeAllRedeem"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-2 col-md-2">
                                  <q-field outlined label="Outstanding Unit" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ OutStandingUnit }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-2 col-md-2">
                                  <q-field outlined label="Last NAV" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ formatCurrency4(LastNavAmount) }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div
                                  v-if="RedemptAll === false"
                                  class="col-xs-12 col-sm-2 col-md-2"
                                >
                                  <q-input
                                    outlined
                                    v-model="RedemptionUnitCal"
                                    label="Redemption Unit"
                                    v-validate="
                                      'accountno|requiredunit|maxreddem'
                                    "
                                    data-vv-name="Redemption Unit"
                                    :error="errors.has('Redemption Unit')"
                                    @blur="
                                      ;(isInputActive = false),
                                        validateFieldAccount()
                                    "
                                    @focus="isInputActive = true"
                                    @input="
                                      changeValue(),
                                        validateValueRedeem(),
                                        validateRequired()
                                    "
                                    :decimals="2"
                                    numeric-keyboard-toggle
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Redemption Unit</q-tooltip>
                                  </q-input>
                                  <span
                                    v-show="errors.has('Redemption Unit')"
                                    class="error"
                                  >{{ errors.first('Redemption Unit') }}</span>
                                </div>
                                <div v-else class="col-xs-12 col-sm-2 col-md-2">
                                  <q-field
                                    outlined
                                    v-validate="
                                      'accountno|requiredunit|maxreddem'
                                    "
                                    data-vv-name="Redemption Unit"
                                    :error="errors.has('Redemption Unit')"
                                    label="Redemption Unit"
                                    stack-label
                                  >
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ RedemptionUnitCal }}</div>
                                    </template>
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Redemption Unit</q-tooltip>
                                  </q-field>
                                  <span v-show="errors.has('Redemption Unit')" class="error">
                                    {{
                                    errors.first('Redemption Unit')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-3 col-md-3">
                                      <q-field outlined label="Value Amount" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ formatCurrency3(ValueAmount) }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                <div class="col-xs-12 col-sm-3 col-md-3">
                                  <q-field
                                    outlined
                                    label="Available Balance Amount Using Last NAV"
                                    stack-label
                                  >
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ AvailableBalanceAmountUsingLastNAV }}</div>
                                    </template>
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      Available Balance Amount Using Last
                                      NAV
                                    </q-tooltip>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Net Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ NetFeeAmount }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Tax Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ TaxFeeAmount }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-12">
                                  <div class="row q-col-gutter-md">
                                    <div class="col-12">
                                      <q-btn
                                        class="full-width"
                                        :disable="SubscriptionNo === null || RedemptionUnitCal === '0.000000' || RedemptionUnitCal === '' || RedemptionUnitCal === 0"
                                        @click="ValidationAmount(), GetDataRules()"
                                        label="Calculate"
                                        color="primary"
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Calculate</q-tooltip>
                                      </q-btn>
                                    </div>
                                    <div class="col-12">
                                      <q-btn
                                        class="full-width"
                                        color="primary"
                                        label="Override Fee"
                                        :disable="SubscriptionNo === null || RedemptionUnitCal === '0.000000' || RedemptionUnitCal === '' || RedemptionUnitCal === 0"
                                        :loading="LoadDetail"
                                        @click="
                                          actionDetail(), changeFeeSetting()
                                        "
                                      >
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Override Fee</q-tooltip>
                                      </q-btn>
                                    </div>
                                  </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Total Fee Amount" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ formatCurrency1(TotalFeeAmount) }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Total Payment Amount" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ formatCurrency3(TotalPayment) }}</div>
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
                                  >Customer Bank Account</div>
                                  <q-separator />
                                  <div class="q-mb-md" />
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field
                                        outlined
                                        v-model="BankAccountNoBA"
                                        label="Bank Account No"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BankAccountNoBA }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined v-model="BankBA" label="Bank" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BankBA }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field
                                        outlined
                                        v-model="BranchNameBA"
                                        label="Branch Name"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BranchNameBA }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field
                                        outlined
                                        v-model="AccountHolderName"
                                        label="Account Holder Name"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ AccountHolderName }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field
                                        outlined
                                        v-model="CurrencyBA"
                                        label="Currency"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ CurrencyBA }}</div>
                                        </template>
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Currency</q-tooltip>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field
                                        outlined
                                        v-model="BankAccountTypeBA"
                                        label="Account Type"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BankAccountTypeBA }}</div>
                                        </template>
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Account Type</q-tooltip>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 col-md-3"></div>
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                      <q-field
                                        outlined
                                        v-model="RemarkBA"
                                        label="Remark"
                                        stack-label
                                      >
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ RemarkBA }}</div>
                                        </template>
                                        <q-tooltip
                                          anchor="top middle"
                                          self="bottom middle"
                                          content-style="font-size: 11px"
                                          :offset="[10, 10]"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >Remark</q-tooltip>
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
                                  <div class="text-weight-bolder text-subtitle1 q-mb-sm">Branch Info</div>
                                  <q-separator />
                                  <div class="q-mb-md" />
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Transaction Branch" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ TransactionBranch }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Sales Referral" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ SalesReferal }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Customer Class" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ CustomerClass }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Subscription Type" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ SubscriptionType }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Branch Waperd" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BranchWaperd }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="WAPERD" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ Waperd }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                      <q-field outlined label="Reference No" stack-label>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ RefferenceNo }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                              <q-card class="q-mt-lg shadow-3">
                                <q-card-section>
                                  <div class="text-weight-bolder text-subtitle1 q-mb-sm">Date Info</div>
                                  <q-separator />
                                  <div class="q-mb-md" />
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Cut Off Date" stack-label>
                                        <template v-slot:append>
                                          <q-icon name="event" />
                                        </template>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ CutOffDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Batch Date" stack-label>
                                        <template v-slot:append>
                                          <q-icon name="event" />
                                        </template>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ BatchDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Transaction Date" stack-label>
                                        <template v-slot:append>
                                          <q-icon name="event" />
                                        </template>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ TransactionDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Transaction Confirm" stack-label>
                                        <template v-slot:append>
                                          <q-icon name="event" />
                                        </template>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ TransactionConfirmDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Posting Date" stack-label>
                                        <template v-slot:append>
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
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field outlined label="Approve Date" stack-label>
                                        <template v-slot:append>
                                          <q-icon name="event" />
                                        </template>
                                        <template v-slot:control>
                                          <div
                                            class="self-center full-width no-outline"
                                            tabindex="0"
                                          >{{ ApproveDate }}</div>
                                        </template>
                                      </q-field>
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
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

        <q-dialog v-model="overridefee">
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-btn
                    @click="defaultFee(), clearValidate()"
                    label="Default Fee"
                    color="cyan-7"
                    class="full-width"
                  ></q-btn>
                </div>
                <div class="col-6">
                  <q-btn label="Cancel" color="negative" v-close-popup class="full-width"></q-btn>
                </div>

                <div class="q-mt-sm q-mb-sm col-12">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle2 q-mb-sm">Fee Setting</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field dense outlined label="Fee Include Tax" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ FeeIncludeTax }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="TaxSetting" label="Tax (%)" /> -->
                          <q-field dense outlined label="Tax (%)" stack-label>
                            <template v-slot:control>
                              <div class="self-center full-width no-outline" tabindex="0">{{ Tax }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="SubscriptionAmount" label="Amount" /> -->
                          <q-field dense outlined label="Amount" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ formatCurrency(SubscriptionAmount) }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            dense
                            outlined
                            v-model="FeeSetting"
                            label="Fee (%)"
                            :mask="mask || off"
                            v-validate="'max:5|min:1|regex:^[0-9.]+$'"
                            data-vv-name="Fee Setting"
                            :error="errors.has(' Fee Setting')"
                            @focus="isInputActiveTax = true"
                            @blur="getFeeSetting"
                            @input="changeValueTax(), rulesFee()"
                          />

                          <span
                            v-show="errors.has('Fee Setting')"
                            class="error"
                          >{{ errors.first('Fee Setting') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field dense outlined label="Min (%)" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ MinRedem }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="IndMinFeeAmount" label="Indikasi Min Fee Amount" /> -->
                          <q-field dense outlined label="Indikasi Min Fee Amount" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IndMinFeeAmount }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field dense outlined label="Max (%)" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ MaxRedem }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="IndMaxFeeAmount" label="Indikasi Max Fee Amount" /> -->
                          <q-field dense outlined label="Indikasi Max Fee Amount" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IndMaxFeeAmount }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle2 q-mb-sm">Result Fee Amount</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="NetFeeResult" label="Net Fee Amount" /> -->
                          <q-field dense outlined label="Net Fee Amount" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ NetFeeResult }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="TaxFeeResult" label="Tax Fee Amount" /> -->
                          <q-field dense outlined label="Tax Fee Amount" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ TaxFeeResult }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <div class="float-right q-mt-xs text-subtitle2">Total Fee Amount :</div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <!-- <q-input disable dense outlined v-model="TotalFeeResult" label="" /> -->
                          <q-field dense outlined label stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ TotalFeeResult }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12">
                  <q-btn
                    :loading="Submitting"
                    @click="submitButtonOverwritte"
                    :disable="errors.any() || NetFeeResult === 'NaN'"
                    label="Submit"
                    color="accent"
                    class="full-width"
                  ></q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

        <div class="orientation-portrait">
          <q-page-sticky position="bottom-right" :offset="fabPos">
            <q-fab
              icon="fas fa-arrows-alt"
              active-icon="fas fa-compress-arrows-alt"
              label="Actions"
              label-position="left"
              external-label
              direction="up"
              color="primary"
              push
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
              <q-fab-action
                :disable="errors.any() || TotalPayment === '' || draggingFab "
                :loading="Submitting"
                @click="SubmitDialog"
                label="Submit"
                color="accent"
                external-label
                label-position="left"
                icon="reply"
                push
              />
              <q-fab-action
                @click="CancelDialog"
                label="Cancel"
                color="negative"
                external-label
                label-position="left"
                push
                icon="clear"
                :disable="draggingFab"
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
              push
              padding="5px"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
              <q-fab-action
                :disable="errors.any() || TotalPayment === '' || draggingFab "
                :loading="Submitting"
                @click="SubmitDialog"
                label="Submit"
                color="accent"
                icon="reply"
                push
                square
                label-position="bottom"
                padding="4px"
              />
              <q-fab-action
                @click="CancelDialog"
                label="Cancel"
                color="negative"
                push
                icon="clear"
                :disable="draggingFab"
                square
                label-position="bottom"
                padding="4px"
              />
            </q-fab>
          </q-page-sticky>
        </div>
      </q-page>
    </div>
  </div>
</template>

<script>
let init = ''
import { InsTransactionHistories } from 'src/graphql/TransactionHistories'
import { GetAllMasterApprove } from 'src/graphql/MasterApprove'
import { InsApproval, GetNoLast } from 'src/graphql/TransactionApproval'
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import { GetSubscriptionApprove } from 'src/graphql/Subscription'
import { ViewCutOffTime } from 'src/graphql/CutOffTime'
import { GetLastNavProd } from 'src/graphql/NavUpload'
import {
  GetCode,
  GetProductSUb,
  GetPricingListProduct,
  InsertRedemption,
  GetRedemptionCIFandProduct
} from 'src/graphql/Redemption'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'AddCustomer',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      selected: JSON.parse(localStorage.selectedData),
      Customer: JSON.parse(localStorage.selectedData),
      CustomerTypePanel: localStorage.CustomerType,
      // for ganerate
      tesaa: '',
      TransactionNoMaster: [],
      TransactionNo: null,
      TransactionNoNext: [],
      // Overide Fee NEW

      PricingProduct: '',
      BalanceAfterPricingList: '',
      AmountPricingList: '',
      UnitPricingList: '',
      Tax: '',
      FeeIncludeTax: '',
      SubscriptionAmount: '',
      FeeSetting: null,
      MinRedem: '',
      MaxRedem: '',
      ProductSelect: null,
      userdata: this.Muser,
      Submitting: false,
      loading: false,
      overridefee: false,
      LoadDetail: null,
      // slide: 1,
      StatusRedemption: false,
      SubscriptionNo: null,
      loadSubscriptionNo: [],
      Product: '',
      Currency: '',
      Remark: '',
      AccountNo: '',
      optAccountNo: this.optAccountNo1,
      optAccountNoMaster: [],
      optAccountNo1: [],
      Name: null,
      Gcif: null,
      OpeningDate: null,
      ProductAccount: '',
      optProductAccount: [],
      CutOffTime: null,
      optCurrency: [],
      tab: 'one',
      // tab one
      OutStandingUnit: 0,
      optNAV: [],
      OptFeeIncludeTax: [],
      optFeeIncludeTax: [],
      GetFeeSetting: null,
      TaxSetting: '',
      AmountSetting: '',
      MinSetting: '',
      MaxSetting: '',
      sat: '##',
      redeemField: 'redempt all',
      GetIndMinAmount: null,
      GetNetFeeResult: null,
      GetIndMaxAmount: null,
      GetTaxFeeResult: null,
      GetTotalFeeResult: null,
      StatusOverwritte: false,
      // tab three
      RedemptAll: false,
      LastNavDateCal: null,
      LastNavDate: '',
      LastNavAmount: '',
      NavProduct: null,
      // RedemptionUnitCal: 0,
      GetFeeAmount: null,
      GetTaxFeeAmount: null,
      FeeRedemp: null,
      FeeTax: null,
      FeeTaxOverwritte: null,
      TotalFeeAmount: '',
      TotalPayment: '',
      AvailableBalanceAmountUsingLastNAV: 0,
      UpdateBalance: 0,
      isInputActive: false,
      isInputActiveTax: false,
      value: '',
      // tax four
      BankAccountNoBA: '',
      BankBA: '',
      BranchNameBA: '',
      AccountHolderName: '',
      BeneficiaryNameBA: '',
      BankAccountTypeBA: '',
      CurrencyBA: '',
      RemarkBA: '',

      // tab five
      BranchNamePA: '',
      optBranchNamePA: [],
      BankPA: '',
      optBankPA: [],
      BankAccountNoPA: '',
      AccountTypePA: '',
      optAccountTypePA: [],
      CurrencyPA: '',
      optCurrencyPA: [],
      BeneficiaryNamePA: '',
      RemarkPA: '',
      // tab six
      TransactionBranch: '',
      SalesReferal: '',
      CustomerClass: '',
      SubscriptionType: '',
      BranchWaperd: '',
      Waperd: '',
      RefferenceNo: '',
      CutOffDate: '',
      BatchDate: '',
      TransactionDate: '',
      TransactionConfirmDate: '',
      PostingDate: '',
      ApproveDate: '',
      uuid: '',
      Tredem: '',
      TSub: '',
      Tbal: '',
      TrnDate: '',
      timestamp: '',
      RuleApproval: [],
      Rules: null,
      //
      CodeApproval: '',
      Menu: '',
      Level: '',
      Status_Approval: '',
      Status: '',
      User: '',
      FullNameUser: '',
      MasterAppNo: '',
      selectedRule: [],
      DataRule: [],
      NoTransApprovalMaster: [],
      NoTransApproval: '',
      NoTransApprovalNext: [],
      Code: 'Redemption',
      mask: '',
      off: this.mask,
      rules1: '',
      rules2: '',
      //
      money: {
        thousands: '.',
        precision: 0,
        masked: false
      }
    }
  },
  apollo: {
    GetSubNo: {
      query: GetSubscriptionApprove,
      update: data => data.wms_subscription,
      variables: {
        code: init
      }
    },
    getProductSub: {
      query: GetProductSUb,
      update: data => data.wms_products,
      variables: {
        code: init
      }
    },
    getPricing: {
      query: GetPricingListProduct,
      update: data => data.wms_pricing_lists,
      variables: {
        code: init
      }
    },
    loadCode: {
      query: GetCode,
      update: data => data.wms_redemption
    },
    loadCuttOftime: {
      query: ViewCutOffTime,
      update: data => data.wms_cut_off_time
    },
    loadLastNav: {
      query: GetLastNavProd,
      update: data => data.wms_nav_upload,
      variables: {
        code: init
      }
    },
    LoadRedemptionCIFandProduct: {
      query: GetRedemptionCIFandProduct,
      update: data => data.wms_fund_switching,
      variables: {
        code: init,
        code1: init
      }
    },
    loadNOlast: {
      query: GetNoLast,
      update: data => data.wms_transaction_approval
    },
    RuleApproval: {
      query: GetAllMasterApprove,
      update: data => data.wms_m_approval
    }
  },
  computed: {
    ...mapState('showcase', {
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2: () => date.formatDate(Date.now(), 'YYYY-MM-DD'),
    isFormInValid() {
      let validate = Object.keys(this.field).some(
        key => this.field[key].validated
      )
      return validate
    },
    TotalFeeResult: {
      get: function() {
        return this.getTotalFeeResult()
      },
      set: function() {
        return this.GetTotalFeeResult
      }
    },
    TaxFeeResult: {
      get: function() {
        return this.getTaxFeeResult()
      },
      set: function() {
        return this.GetTaxFeeResult
      }
    },
    NetFeeResult: {
      get: function() {
        return this.getNetFeeResult()
      },
      set: function() {
        return this.GetNetFeeResult
      }
    },
    IndMinFeeAmount: {
      get: function() {
        return this.getIndMinAmount()
      },
      set: function() {
        return this.GetIndMinAmount
      }
    },
    IndMaxFeeAmount: {
      get: function() {
        return this.getIndMaxAmount()
      },
      set: function() {
        return this.GetIndMaxAmount
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
    ValueAmount: {
      get: function() {
        return this.getValueAmount()
      },
      set: function() {
        return this.GetValueAmount
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
    TaxFeeAmount: {
      get: function() {
        return this.getTaxFeeAmount()
      },
      set: function() {
        return this.GetTaxFeeAmount
      }
    },
    RedemptionUnitCal: {
      get: function() {
        if (this.isInputActive) {
          return this.clearValidRedeem()
        } else {
          let valueFix = this.formatCurrency2(this.value)
          return valueFix
        }
      },
      set: function(modifiedValue) {
        if (modifiedValue !== null) {
          if (modifiedValue === 0) {
            let newValue = 0
            this.value = newValue
          } else {
            let newValue = parseFloat(modifiedValue.replace(/[^\d\\.]/g, ''))
            if (isNaN(newValue)) {
              newValue = 0
            }
            this.value = newValue
          }
        }
      }
    }
  },
  mounted() {
    this.onBindData()
    this.onLoadSubsciptionNo()
    this.onloadCutOffTime()
    this.OpeningDate = this.now2
    this.TransactionDate = this.now2
    this.PostingDate = this.now2
    this.validateValueRedeem()
    this.validateFieldAccount()
    this.validateRequired()
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  created() {
    setInterval(this.getNow, 1000)
  },
  methods: {
    InsertTransactionHistories() {
      this.$apollo.mutate({
        mutation: InsTransactionHistories,
        variables: {
          objects: {
            customer_name: this.Customer,
            product_name: this.Product,
            opening_date: this.OpeningDate,
            status: 'Pending',
            transaction_code: this.TransactionNo,
            transaction_desc: 'Redemption',
            value: this.TotalPayment,
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    rulesFee() {
      console.log('2')
      let nilai = this.FeeSetting
      let result = ''
      for (let i = 0; i < nilai.length; i++) {
        if (nilai[i].match(/[0-9]/g)) {
          result += nilai[i].replace(nilai[i], '#')
        } else {
          result += nilai[i]
        }
      }
      console.log(result, 'tezzzz')
      if (result === '##.#') {
        this.mask = '##.##'
      } else if (result === '#.#') {
        this.mask = '#.##'
      } else if (result === '') {
        this.mask = ''
      } else if (result === '###') {
        this.mask = '###'
      }
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.Customer = this.selected[0].fullname
      this.Gcif = this.selected[0].gcif_number // untuk customer
    },
    onLoadProductSub() {
      console.log(this.SubscriptionNo, 'data SUBS')
      if (this.SubscriptionNo !== null) {
        this.$apollo.queries.getProductSub
          .refetch({
            code: this.SubscriptionNo.id_product
          })
          .then(response => {
            console.log(response, 'data PRD')
            let ProductSubs = response.data.wms_products
            console.log(ProductSubs, 'data PRD1')
            if (ProductSubs.length !== 0) {
              this.PricingProduct = ProductSubs[0].id_pricing_list
            } else {
              this.PricingProduct = ''
            }
            this.onLoadPricingList()
          })
      }
    },
    onLoadPricingList() {
      if (this.PricingProduct !== '') {
        this.$apollo.queries.getPricing
          .refetch({
            code: this.PricingProduct
          })
          .then(response => {
            this.ProductSelect = response.data.wms_pricing_lists
            if (this.ProductSelect.length !== 0) {
              console.log(this.ProductSelect, 'LOAD PRICING')
              this.Tax = this.ProductSelect[0].tax_rate
              this.FeeIncludeTax = this.ProductSelect[0].tax_desc.dropdown_details_desc
              this.FeeSetting = this.ProductSelect[0].redempt_fee
              this.MinRedem = this.ProductSelect[0].min_redempt_fee
              this.MaxRedem = this.ProductSelect[0].max_redempt_fee
              this.UnitPricingList = this.ProductSelect[0].redempt_unit
              this.AmountPricingList = this.ProductSelect[0].redempt_amount
              this.BalanceAfterPricingList = this.ProductSelect[0].balance_of_unit_after_redempt
            }
          })
      }
    },
    changeValue() {
      this.value = this.RedemptionUnitCal
    },
    validateValueRedeem() {
      const maxredeem = value =>
        new Promise(resolve => {
          setTimeout(() => {
            let input = value
            input = +this.splitDot2(this.RedemptionUnitCal)
            let max = +this.splitDot2(this.OutStandingUnit)
            if (input > max) {
              return resolve({
                invalid: true,
                valid: false,
                data: {
                  message: `Please fill Redemption Unit not to exceed the Outstanding Unit.`
                }
              })
            }
            return resolve({
              invalid: false,
              valid: true
            })
          }, 50)
        })
      this.$validator.extend('maxreddem', {
        validate: maxredeem,
        getMessage: (field, params, data) => data.message
      })
    },
    validateFieldAccount() {
      const account = value =>
        new Promise(resolve => {
          setTimeout(() => {
            let input = value
            input = this.SubscriptionNo
            if (input === '' || input === null) {
              this.RedemptionUnitCal = ''
              return resolve({
                invalid: true,
                valid: false,
                data: {
                  message: `Please fill Account No field first.`
                }
              })
            }
            return resolve({
              invalid: false,
              valid: true
            })
          }, 50)
        })
      this.$validator.extend('accountno', {
        validate: account,
        getMessage: (field, params, data) => data.message
      })
    },
    validateRequired() {
      const requiredUnit = value =>
        new Promise(resolve => {
          setTimeout(() => {
            let input = value
            input = this.RedemptionUnitCal
            if (input === '0.000000') {
              return resolve({
                invalid: true,
                valid: false,
                data: {
                  message: `The Redemption Unit field is required.`
                }
              })
            }
            return resolve({
              invalid: false,
              valid: true
            })
          }, 50)
        })
      this.$validator.extend('requiredunit', {
        validate: requiredUnit,
        getMessage: (field, params, data) => data.message
      })
    },
    clearValidate() {
      if (this.SubscriptionNo !== null) {
        if (this.errors.any()) {
          this.$nextTick(() => {
            this.$validator.reset()
          })
        }
      }
    },
    // TRANSACTION
    onloadLastNav() {
      this.$apollo.queries.loadLastNav
        .refetch({
          code: this.Product
        })
        .then(response => {
          let LastNAV = response.data.wms_nav_upload
          if (LastNAV.length !== 0) {
            console.log('ada')
            this.LastNavDate = LastNAV[0].nav_date
            this.LastNavAmount = LastNAV[0].nav_amount
          } else {
            this.LastNavDate = ''
            this.LastNavAmount = ''
          }
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
    // GET NET FEE
    getNetFeeAmount() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetFeeAmount = 0
          return this.GetFeeAmount
        } else {
          // console.log(this.value, '===cek ini yo')
          this.settingFee()
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
    getTaxFeeAmount() {
      if (this.RedemptionUnitCal !== 0) {
        if (this.SubscriptionNo === null) {
          this.GetTaxFeeAmount = 0
          return this.GetTaxFeeAmount
        } else {
          this.GetTaxFeeAmount =
            +(this.FeeTax / 100) * +this.splitDot(this.NetFeeAmount)
          this.GetTaxFeeAmount = this.formatCurrency(this.GetTaxFeeAmount)
          return this.GetTaxFeeAmount
        }
      } else {
        this.GetTaxFeeAmount = +(this.RedemptionUnitCal / 10).toFixed(1)
        return this.GetTaxFeeAmount
      }
    },
    settingFee() {
      if (this.SubscriptionNo !== null) {
        if (this.ProductSelect !== null) {
          if (this.FeeTaxOverwritte === null) {
            this.FeeRedemp = this.ProductSelect[0].redempt_fee
          } else {
            this.FeeRedemp = this.FeeTaxOverwritte
          }
          this.FeeTax = this.ProductSelect[0].tax_rate
        }
      }
    },
    changeValueFeeOverwritte(valStatus) {
      if (valStatus === true) {
        this.FeeTaxOverwritte = this.FeeSetting
        this.settingFee()
        this.NetFeeAmount = this.getNetFeeResult()
        this.TaxFeeAmount = this.getTaxFeeResult()
      }
    },
    // GET DATA SUBSCRIBE FROM SUBSCRIPTION NO
    ResetSubscriptionNo() {
      if (this.SubscriptionNo === null) {
        this.Currency = ''
        this.Product = ''
        this.Remark = ''
      } else {
        this.TotalFeeAmount = ''
        this.TotalPayment = ''
        this.RedemptionUnitCal = '0.000000'
        this.Currency = this.SubscriptionNo.currency
        this.Product = this.SubscriptionNo.product.prod_desc
        this.Remark = this.SubscriptionNo.remark
        this.BankBA = this.SubscriptionNo.bank
        this.BankAccountNoBA = this.SubscriptionNo.bank_account_no
        this.AccountHolderName = this.SubscriptionNo.account_holder_name
        this.BranchNameBA = this.SubscriptionNo.branch_name
        this.CurrencyBA = this.SubscriptionNo.currency_bank
        this.BankAccountTypeBA = this.SubscriptionNo.account_type
        this.RemarkBA = this.SubscriptionNo.remark_bank
        this.TransactionBranch = this.SubscriptionNo.transaction_branch
        this.SalesReferal = this.SubscriptionNo.sales_referral
        this.CustomerClass = this.SubscriptionNo.cust_group
        this.SubscriptionType = this.SubscriptionNo.subs_type.dropdown_details_desc
        this.BranchWaperd = this.SubscriptionNo.branch_waperd
        this.Waperd = this.SubscriptionNo.waperd
        this.RefferenceNo = this.SubscriptionNo.reference_no
        this.AvailableBalanceAmountUsingLastNAV = this.formatCurrency1(
          this.SubscriptionNo.balance_amount
        )
        this.RedemptAll = false
      }
    },
    onLoadSubsciptionNo() {
      this.$log.info('info call at function onLoadData')
      this.loading = true
      this.$apollo.queries.GetSubNo
        .refetch({
          code: this.Gcif
        })
        .then(response => {
          this.loadSubscriptionNo = response.data.wms_subscription
        })
    },
    // onLoadSubsciptionNo() {
    //   this.$apollo
    //     .query({
    //       query: GetSubscriptionApprove,
    //       update: data => data.wms_subscription,
    //       variables: {
    //         code: this.Gcif
    //       }
    //     })
    //     .then(response => {
    //       this.loadSubscriptionNo = response.data.wms_subscription
    //       console.log(this.loadSubscriptionNo, '111')
    //     })
    // },
    getTime(file) {
      if (file !== undefined && file !== null) {
        let date = file.split(':00+00')
        date = date.join(' ')
        return date
      }
    },
    onloadCutOffTime() {
      this.$apollo.queries.loadCuttOftime.refetch().then(response => {
        let Time = response.data.wms_cut_off_time
        if (Time.length !== 0) {
          console.log('ada')
          this.CutOffTime = Time[0].cut_off_time
        }
      })
    },
    // =============================>
    resetValueCalculation() {
      this.TotalFeeAmount = ''
      this.TotalPayment = ''
    },
    actionDetail() {
      this.$log.info('info call at function ActionDetail')
      this.resetValueCalculation()
      this.overridefee = true
    },
    changeValueTax() {
      this.GetFeeSetting = this.FeeSetting
      return this.GetFeeSetting
    },
    changeFeeSetting() {
      if (this.FeeSetting === null) {
        this.FeeSetting = this.ProductSelect[0].redempt_fee
      }
    },
    getIndMinAmount() {
      if (this.ProductSelect !== null) {
        this.GetIndMinAmount =
          +this.splitDot(this.SubscriptionAmount) * +(this.MinRedem / 100)
        this.GetIndMinAmount = this.formatCurrency(this.GetIndMinAmount)
        return this.GetIndMinAmount
      }
    },
    getIndMaxAmount() {
      if (this.ProductSelect !== null) {
        this.GetIndMaxAmount =
          +this.splitDot(this.SubscriptionAmount) * +(this.MaxRedem / 100)
        this.GetIndMaxAmount = this.formatCurrency(this.GetIndMaxAmount)
        return this.GetIndMaxAmount
      }
    },
    getNetFeeResult() {
      if (this.ProductSelect !== null) {
        this.GetNetFeeResult =
          +this.splitDot(this.SubscriptionAmount) * +(this.FeeSetting / 100)
        this.GetNetFeeResult = this.formatCurrency(this.GetNetFeeResult)
        return this.GetNetFeeResult
      }
    },
    getTaxFeeResult() {
      if (this.ProductSelect !== null) {
        this.GetTaxFeeResult =
          +this.splitDot(this.GetNetFeeResult) * +(this.Tax / 100)
        this.GetTaxFeeResult = this.formatCurrency(this.GetTaxFeeResult)
        return this.GetTaxFeeResult
      }
    },
    getTotalFeeResult() {
      if (this.ProductSelect !== null) {
        this.GetTotalFeeResult =
          +this.splitDot(this.GetNetFeeResult) +
          +this.splitDot(this.GetTaxFeeResult)
        this.GetTotalFeeResult = this.formatCurrency(this.GetTotalFeeResult)
        return this.GetTotalFeeResult
      }
    },
    getFeeSetting() {
      if (this.Product !== null) {
        if (this.FeeSetting !== null) {
          let minTax = +this.ProductSelect[0].min_redempt_fee
          let maxTax = +this.ProductSelect[0].max_redempt_fee
          let valueTax = +this.FeeSetting
          if (valueTax <= minTax) {
            this.FeeSetting = minTax
            return this.FeeSetting
          } else if (valueTax >= maxTax) {
            this.mask = ''
            this.FeeSetting = maxTax
            return this.FeeSetting
          } else if (minTax <= valueTax && valueTax <= maxTax) {
            this.FeeSetting = valueTax
            return this.FeeSetting
          }
        }
      }
    },
    defaultFee() {
      this.FeeSetting = ''
      if (this.FeeSetting === '') {
        this.mask = ''
        this.FeeSetting = this.ProductSelect[0].redempt_fee
      }
    },
    submitButtonOverwritte() {
      this.$log.info('info call at function submitButtonOverwritte')
      if (this.FeeSetting !== null) {
        this.StatusOverwritte = true
        this.Submitting = true
        this.changeValueFeeOverwritte(this.StatusOverwritte)
        setTimeout(() => {
          this.overridefee = false
          this.Submitting = false
          this.StatusOverwritte = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Override Been Submitted'
          })
        }, 1000)
      } else {
        this.FeeSetting = ''
      }
    },
    clearValidRedeem() {
      if (this.errors.any()) {
        this.$nextTick(() => {
          this.$validator.reset()
        })
        this.value = 0
        return this.value.toString()
      } else {
        return this.value
      }
    },
    changeAllRedeem() {
      if (this.SubscriptionNo !== null) {
        if (this.RedemptAll === true) {
          this.TotalFeeAmount = ''
          this.TotalPayment = ''
          this.RedemptionUnitCal = this.OutStandingUnit
          return this.RedemptionUnitCal
        } else {
          this.TotalFeeAmount = ''
          this.TotalPayment = ''
          this.value = 0
        }
      }
    },
    splitDot(val) {
      if (val !== undefined) {
        val = val.toString()
        val = val.split(',').join('')
        return val
      }
    },
    splitDot2(val) {
      if (val !== undefined) {
        val = val.toString()
        val = val.split('.')
        let val1 = val[0].split(',').join('')
        let val2 = val[1]
        val = `${val1}.${val2}`
        return val
      }
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
        num = num.toFixed(6).split('.')
        let num1 = num[0].replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
        let num2 = num[1]
        num = `${num1}.${num2}`
        return num
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
    ValidationAmount() {
      if (this.RedemptAll === false) {
        if (this.RedemptionUnitCal > this.UnitPricingList) {
          this.$q.dialog({
            title: 'Business Rules',
            message: 'This product can only Redemption to a maximun of <strong>' + this.UnitPricingList + ' unit',
            html: true,
            color: 'error',
            ok: true
          })
          this.resetValueCalculation()
        } else {
          if (this.ValueAmount > this.AmountPricingList) {
            this.$q.dialog({
              title: 'Business Rules',
              message: 'This product can only Redemption to a maximun of <strong>Rp.' + this.formatCurrency3(this.AmountPricingList) + ' Value Amount',
              html: true,
              color: 'error',
              ok: true
            })
            this.resetValueCalculation()
          } else {
            console.log(this.AfterUnit, 'SISA UNIT')
            console.log(this.BalanceAfterPricingList, 'BALANCE AFTER UNIT')
            if (this.BalanceAfterPricingList > this.AfterUnit) {
              this.$q.dialog({
                title: 'Business Rules',
                message: 'This product can only Redemption to a maximun of <strong>' + this.BalanceAfterPricingList + ' Balance After (Unit)',
                html: true,
                color: 'error',
                ok: true
              })
              this.resetValueCalculation()
            } else {
              this.onCalculate()
            }
          }
        }
      } else {
        this.onCalculate()
      }
    },
    onCalculate() {
      this.$log.info('info call at function onCalculate')
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
    },
    GetDataRules() {
      this.DataRule = []
      this.selectedRule = []
      for (let i = 0; i < this.RuleApproval.length; i++) {
        if (
          this.RuleApproval[i].type_transaction.dropdown_details_desc ===
          'Redemption'
        ) {
          for (
            let j = 0;
            j < this.RuleApproval[i].assign_role_approval.length;
            j++
          ) {
            if (
              this.RuleApproval[i].assign_role_approval[j].min_value <=
                this.TotalPayment &&
              this.RuleApproval[i].assign_role_approval[j].max_value >=
                this.TotalPayment
            ) {
              this.selectedRule.push({
                masterno: this.RuleApproval[i].assign_role_approval[j]
                  .approval_no,
                codeapproval: this.RuleApproval[i].approval_type,
                level: this.RuleApproval[i].assign_role_approval[j]
                  .Level_approval.dropdown_details_desc,
                option: this.RuleApproval[i].assign_role_approval[j]
                  .Option_approval.dropdown_details_desc,
                menu: this.RuleApproval[i].type_transaction
                  .dropdown_details_desc,
                status_app: false,
                status: 'Pending To Approval',
                user: this.RuleApproval[i].assign_role_approval[j].role_code,
                fullnameuser: this.RuleApproval[i].assign_role_approval[j]
                  .role_description
              })
              console.log(this.selectedRule, 'adakahrasa')
            }
          }
        }
      }
    },
    sortData(value) {
      let data = value.sort((a, b) => (b.NAV_Date > a.NAV_Date ? 1 : -1))
      return data
    },
    SubmitDialog() {
      this.$log.info('info call at function SubmitDialog')
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
              this.onLoadTransactionMaster()
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
    onLoadTransactionMaster() {
      this.Submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadCode.refetch().then(response => {
          this.TransactionNoMaster = response.data.wms_redemption
          this.generateNewTransactionNumber()
          console.log(this.TransactionNoMaster, '=======>>>>')
        })
      }, 1000)
    },
    OnLoadTransAppNo() {
      setTimeout(() => {
        this.$apollo.queries.loadNOlast.refetch().then(response => {
          this.NoTransApprovalMaster = response.data.wms_transaction_approval
          this.generateNewNoTransactionApproval()
          console.log(this.NoTransApprovalMaster, '=======>>>>111')
        })
      }, 1000)
    },
    generateNewTransactionNumber() {
      this.$log.info('info call at function generateNewSubscriptionNumber')
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
        console.log(this.TransactionNo, '=======>>> apakah ini adaaaa')
        this.OnLoadTransAppNo()
        return this.TransactionNo
      } else {
        this.TransactionNo = 'RDM-' + '0000001'
        console.log(this.TransactionNo, '=======>>> apakah ini adaaaa')
        this.OnLoadTransAppNo()
        return this.TransactionNo
      }
    },
    generateNewNoTransactionApproval() {
      this.$log.info('info call at function generateNewNoTransactionApproval')
      this.NoTransApprovalMaster.forEach(dataAppNo => {
        this.NoTransApprovalNext.push(dataAppNo.no_transaction)
      })
      if (this.NoTransApprovalNext.length !== 0) {
        this.NoTransApprovalNext[0] = this.NoTransApprovalNext[0].split('-')
        console.log(this.NoTransApprovalNext[0], '>>>>>>>numb')
        let x = +this.NoTransApprovalNext[0][1] + 1
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
        this.NoTransApproval = 'APPROVAL-' + y
        console.log(this.NoTransApproval, '=======>>> apakah ini adaaaa')
        this.submitButton()
        return this.NoTransApproval
      } else {
        this.NoTransApproval = 'APPROVAL-' + '0000001'
        console.log(this.NoTransApproval, '=======>>> apakah ini adaaaa')
        this.submitButton()
        return this.NoTransApproval
      }
    },
    getNow() {
      let TimeNow = Date.now()
      this.timestamp = date.formatDate(TimeNow, 'HH:mm')
    },
    SubmitDataRule() {
      for (let i = 0; i < this.selectedRule.length; i++) {
        let obj = {
          m_approval_no: this.selectedRule[i].masterno,
          code_approval: this.selectedRule[i].codeapproval,
          level: this.selectedRule[i].level,
          menu: this.selectedRule[i].menu,
          option: this.selectedRule[i].option,
          value: this.TotalPayment.toString(),
          status_approval: this.selectedRule[i].status_app,
          user_name: this.selectedRule[i].user,
          fullname: this.selectedRule[i].fullnameuser,
          created_date: this.now,
          created_by: this.userdata.name,
          status: this.selectedRule[i].status,
          customer_name: this.Customer,
          opening_date: this.OpeningDate,
          product_name: this.Product,
          no_transaction: this.NoTransApproval,
          id_approval: this.TransactionNo
        }
        this.DataRule.push(obj)
      }
      console.log(this.DataRule, 'apaaaaa')
    },
    submitButton() {
      if (this.CutOffTime <= this.timestamp) {
        this.CutOffTimeDialog()
      } else {
        let datalama
        this.$apollo.queries.LoadRedemptionCIFandProduct.refetch({
          code: this.Gcif,
          code1: this.Product
        }).then(response => {
          datalama = response.data.wms_redemption
          console.log(datalama, '=======>>>> DataLama')
          if (datalama.length === 0 || datalama[0].status_approval !== false) {
            this.SubmitDataRule()
            this.$apollo
              .mutate({
                mutation: InsertRedemption,
                variables: {
                  objects: {
                    redemp_all: this.RedemptAll,
                    transaction_no: this.TransactionNo,
                    gcif_number: this.Gcif,
                    name: this.Customer,
                    opening_date: this.OpeningDate,
                    cut_off_time: this.CutOffTime,
                    account_no: this.SubscriptionNo.subscription_no,
                    product: this.Product,
                    currency: this.Currency,
                    remark_redempt: this.Remark,

                    last_nav_date: this.LastNavDate,
                    outstanding_unit: this.OutStandingUnit,
                    last_nav: this.LastNavAmount.toString(),
                    redemption_unit: this.RedemptionUnitCal,
                    available_amount: this.AvailableBalanceAmountUsingLastNAV,
                    net_fee: this.NetFeeAmount,
                    tax_fee: this.TaxFeeAmount,
                    total_fee: this.TotalFeeAmount.toString(),
                    total_payment: this.TotalPayment.toString(),
                    redemption_amount: this.SubscriptionAmount.toString(),
                    bank_account_no: this.BankAccountNoBA,
                    bank: this.BankBA,
                    branch_name: this.BranchNameBA,
                    account_holder_name: this.AccountHolderName,
                    currency_bank: this.CurrencyBA,
                    account_type: this.BankAccountTypeBA,
                    remark_bank: this.RemarkBA,

                    transaction_branch: this.TransactionBranch,
                    sales_referal: this.SalesReferal,
                    customer_class: this.CustomerClass,
                    subs_type: this.SubscriptionType,
                    branch_waperd: this.BranchWaperd,
                    waperd: this.Waperd,
                    reference_no: this.RefferenceNo,
                    transaction_date: this.TransactionDate,
                    posting_date: this.PostingDate,
                    status_approval: this.StatusRedemption,
                    status_info: 'Pending',
                    update_balance: this.UpdateBalance.toString(),
                    created_by: this.userdata.name,
                    created_date: this.now
                  }
                }
              })
              .then(response => {
                this.InsertTransactionHistories()
                this.$apollo.mutate({
                  mutation: InsApproval,
                  variables: {
                    objects: this.DataRule
                  }
                })
                this.Submitting = false
                this.$q.notify({
                  color: 'accent',
                  textColor: 'white',
                  icon: 'fas fa-check-circle',
                  message: this.Customer + ' ' + 'Has Been Redempted'
                })
                this.AuditTrail()
                this.$router.push({ path: '/redemption' })
              })
              .catch(err => {
                this.Submitting = false
                this.NoTransApprovalNext = []
                this.TransactionNoNext = []
                this.emessage = err
                this.$q.notify({
                  color: 'negative',
                  textColor: 'white',
                  icon: 'fas fa-check-circle',
                  message: `Submit Error: ${this.emessage}`
                })
              })
          } else if (datalama[0].status_approval === false) {
            this.$q.dialog({
              title: 'Cannot Redemption',
              message: 'You still have data that has not been approved',
              color: 'error',
              ok: true
            })
            this.Submitting = false
            this.NoTransApprovalNext = []
            this.TransactionNoNext = []
          }
        })
      }
    },
    AuditTrail() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Add',
            date_auditrail: this.now,
            menu: 'Transactions',
            fullname: this.userdata.name,
            username: this.userdata.preferred_username,
            submenu: 'Redemptions',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    CutOffTimeDialog() {
      this.$q
        .dialog({
          title: 'Cut Off Time',
          message: 'Cut Off Time (End Of Day)',

          persistent: true,

          ok: {
            icon: 'close',
            label: 'BACK',
            textColor: 'white',
            color: 'negative'
          }
        })
        .onOk(() => {
          console.log('>>>> OK')
          this.$router.push({ path: '/redemption' })
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
          this.$router.push({ path: '/redemption' })
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
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

.hidden {
  display: none;
}
</style>
