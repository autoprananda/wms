<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="Corporate Customer" icon="note_add" />
            </q-breadcrumbs>
          </q-card-section>

          <q-separator inset />
          <q-card-section>
            <div class="q-gutter-sm">
              <q-radio
                v-model="mode"
                val="Individual"
                label="Individual Customer"
                @input="togglecust"
              />
              <q-radio
                v-model="mode"
                val="Corporate"
                label="Corporate Customer"
                @input="togglecust"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <form @submit.prevent="submitButton">
              <q-card class="my-card shadow-6 center" inline>
                <q-card-section>
                  <div class="q-ma-xs q-gutter-sm">
                    <q-btn
                      :loading="submitting"
                      @click="submitDialog"
                      :disable="
                      errors.any() ||
                        !isFormInValid ||
                        ProfitInfo3YearsAgo === '' ||
                        TaxIdNumber === '' ||
                        TinForeignTin === '' ||
                        IssuanceCountry === '' ||
                        GIIN === '' ||
                        SubsOwnerName === '' ||
                        SubsOwnerAddress === '' ||
                        SubsOwnerTIN === '' ||
                        Status === '' ||
                        listData.length === 0 ||
                        listDataBank.length === 0 ||
                        dataUploaded.length === 0
                    "
                      label="Submit"
                      color="accent"
                      style="width: 80px"
                    ></q-btn>
                    <q-btn @click="clearButton" label="Clear" color="cyan-7" style="width: 80px"></q-btn>
                    <q-btn
                      @click="cancelDialog"
                      label="Cancel"
                      color="negative"
                      style="width: 80px"
                    ></q-btn>
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-tabs
                    v-model="tab"
                    active-color="primary"
                    indicator-color="primary"
                    class="text-grey"
                    align="justify"
                    inline-label
                  >
                    <q-tab label="Customer" name="one"></q-tab>
                    <q-tab
                      label="Contact Info"
                      name="two"
                      @click="changeStatusTab1(), clearValidate(), refreshDataUpload()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab1"
                        v-validate="'required'"
                        data-vv-name="Contact Info Tab"
                        :error="errors.has('Contact Info Tab')"
                      />
                    </q-tab>
                    <q-tab label="Address" name="Address" />
                    <q-tab
                      label="Branch Info"
                      name="three"
                      @click="changeStatusTab2(), clearValidate()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab2"
                        v-validate="'required'"
                        data-vv-name="Branch Info Tab"
                        :error="errors.has('Branch Info Tab')"
                      />
                    </q-tab>
                    <q-tab
                      label="Document"
                      name="four"
                      @click="changeStatusTab3(), clearValidate(), refreshDataUpload()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab3"
                        v-validate="'required'"
                        data-vv-name="Document Tab"
                        :error="errors.has('Document Tab')"
                      />
                    </q-tab>
                    <q-tab
                      label="Tax Info"
                      name="five"
                      @click="changeStatusTab4(), clearValidate()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab4"
                        v-validate="'required'"
                        data-vv-name="Tax Info Tab"
                        :error="errors.has('Tax Info Tab')"
                      />
                    </q-tab>
                  </q-tabs>
                  <span v-show="errors.has('Contact Info Tab')" class="error">
                    {{
                    errors.first('Contact Info Tab')
                    }}
                  </span>&nbsp;
                  <!-- <br/> -->
                  <span v-show="errors.has('Branch Info Tab')" class="error">
                    {{
                    errors.first('Branch Info Tab')
                    }}
                  </span>&nbsp;
                  <!-- <br/> -->
                  <span v-show="errors.has('Document Tab')" class="error">
                    {{
                    errors.first('Document Tab')
                    }}
                  </span>&nbsp;
                  <!-- <br/> -->
                  <span v-show="errors.has('Tax Info Tab')" class="error">
                    {{
                    errors.first('Tax Info Tab')
                    }}
                  </span>
                  <q-separator />

                  <q-tab-panels keep-alive v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Corporate Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                v-model="CompanyName"
                                label="Company Name"
                                v-validate="'required'"
                                data-vv-name="Company Name"
                                :error="errors.has('Company Name')"
                              />
                              <span
                                v-show="errors.has('Company Name')"
                                class="error"
                              >{{ errors.first('Company Name') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="SIUPNo"
                                label="SIUP No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="SIUP No"
                                :error="errors.has('SIUP No')"
                              />
                              <span
                                v-show="errors.has('SIUP No')"
                                class="error"
                              >{{ errors.first('SIUP No') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="SIUPExpDate"
                                label="SIUP Expiration Date"
                                v-validate="'required|date_format:yyyy-mm-dd'"
                                data-vv-name="SIUP Exp Date"
                                :error="errors.has('SIUP Exp Date')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy7"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="SIUPExpDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy7.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                              <span
                                v-show="errors.has('SIUP Exp Date')"
                                class="error"
                              >{{ errors.first('SIUP Exp Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="SKDNo"
                                label="SKD No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="SKD No"
                                :error="errors.has('SKD No')"
                              />
                              <span
                                v-show="errors.has('SKD No')"
                                class="error"
                              >{{ errors.first('SKD No') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="SKDExpDate"
                                label="SKD Expiration Date"
                                v-validate="'required|date_format:yyyy-mm-dd'"
                                data-vv-name="SKD Exp Date"
                                :error="errors.has('SKD Exp Date')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy10"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="SKDExpDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy10.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                              <span
                                v-show="errors.has('SKD Exp Date')"
                                class="error"
                              >{{ errors.first('SKD Exp Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="Status"
                                :options="optStatus"
                                label="Status *"
                                v-validate="'required'"
                                data-vv-name="Status"
                                stack-label
                                :option-label="
                                  optStatus => optStatus.dropdown_details_desc
                                "
                                :option-value="optStatus => optStatus"
                                emit-value
                                map-options
                                :error="errors.has('Status')"
                                :error-label="errors.first('Status')"
                                @blur="clearValidate()"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Status</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Status')"
                                class="error"
                              >{{ errors.first('Status') }}</span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">AD/ART</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="Ownership"
                                :options="optOwnership"
                                stack-label
                                :option-label="
                                  optOwnership =>
                                    optOwnership.dropdown_details_desc
                                "
                                :option-value="optOwnership => optOwnership"
                                emit-value
                                map-options
                                label="Ownership *"
                                v-validate="'required'"
                                data-vv-name="Ownership"
                                :error="errors.has('Ownership')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Ownership</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Ownership')"
                                class="error"
                              >{{ errors.first('Ownership') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="DateOfEstablishment"
                                label="Date Of Establishment"
                                v-validate="'required|date_format:yyyy-mm-dd'"
                                data-vv-name="Date Of Establishment"
                                :error="errors.has('Date Of Establishment')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy8"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="DateOfEstablishment"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy8.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                              <span v-show="errors.has('Date Of Establishment')" class="error">
                                {{
                                errors.first('Date Of Establishment')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="PlaceOfEstablishment"
                                label="Place Of Establishment *"
                                v-validate="'required'"
                                data-vv-name="Place Of Establishment"
                                :error="errors.has('Place Of Establishment')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Place Of Establishment</q-tooltip>
                              </q-input>
                              <span v-show="errors.has('Place Of Establishment')" class="error">
                                {{
                                errors.first('Place Of Establishment')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="CountryOfEstablishment"
                                label="Country Of Establishment *"
                                v-validate="'required'"
                                data-vv-name="Country Of Establishment"
                                :error="errors.has('Country Of Establishment')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Country Of Establishment</q-tooltip>
                              </q-input>
                              <span v-show="errors.has('Country Of Establishment')" class="error">
                                {{
                                errors.first('Country Of Establishment')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                v-model="ArticlesOfAssosiationNo"
                                label="Articles of Association No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="Articles of Association No"
                                :error="
                                  errors.has('Articles of Association No')
                                "
                              />
                              <span
                                v-show="
                                  errors.has('Articles of Association No')
                                "
                                class="error"
                              >
                                {{
                                errors.first('Articles of Association No')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="CompanyType"
                                :options="optCompanyType"
                                stack-label
                                :option-label="
                                  optCompanyType =>
                                    optCompanyType.dropdown_details_desc
                                "
                                :option-value="optCompanyType => optCompanyType"
                                emit-value
                                map-options
                                label="Company Type *"
                                v-validate="'required'"
                                data-vv-name="Company Type"
                                :error="errors.has('Company Type')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Company Type</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Company Type')"
                                class="error"
                              >{{ errors.first('Company Type') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="CompanyCharacteristic"
                                :options="optCompanyCharacteristic"
                                stack-label
                                :option-label="
                                  optCompanyCharacteristic =>
                                    optCompanyCharacteristic.dropdown_details_desc
                                "
                                :option-value="
                                  optCompanyCharacteristic =>
                                    optCompanyCharacteristic
                                "
                                emit-value
                                map-options
                                label="Company Characteristic *"
                                v-validate="'required'"
                                data-vv-name="Company Characteristic"
                                :error="errors.has('Company Characteristic')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Company Characteristic</q-tooltip>
                              </q-select>
                              <span v-show="errors.has('Company Characteristic')" class="error">
                                {{
                                errors.first('Company Characteristic')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="IncomeLevel"
                                :options="optIncomeLevel"
                                stack-label
                                :option-label="
                                  optIncomeLevel =>
                                    optIncomeLevel.dropdown_details_desc
                                "
                                :option-value="optIncomeLevel => optIncomeLevel"
                                emit-value
                                map-options
                                label="Income Level (IDR)"
                                v-validate="'required'"
                                data-vv-name="Income Level"
                                :error="errors.has('Income Level')"
                              />
                              <span
                                v-show="errors.has('Income Level')"
                                class="error"
                              >{{ errors.first('Income Level') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="InvestorRiskProfile"
                                :options="optInvestorRiskProfile"
                                stack-label
                                :option-label="
                                  optInvestorRiskProfile =>
                                    optInvestorRiskProfile.dropdown_details_desc
                                "
                                :option-value="
                                  optInvestorRiskProfile =>
                                    optInvestorRiskProfile
                                "
                                emit-value
                                map-options
                                label="Investor's Risk Profile"
                                v-validate="'required'"
                                data-vv-name="Investor Risk Profile"
                                :error="errors.has('Investor Risk Profile')"
                              />
                              <span v-show="errors.has('Investor Risk Profile')" class="error">
                                {{
                                errors.first('Investor Risk Profile')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="InvestmentObjective"
                                :options="optInvestmentObjective"
                                stack-label
                                :option-label="
                                  optInvestmentObjective =>
                                    optInvestmentObjective.dropdown_details_desc
                                "
                                :option-value="
                                  optInvestmentObjective =>
                                    optInvestmentObjective
                                "
                                emit-value
                                map-options
                                label="Investment Objective"
                                v-validate="'required'"
                                data-vv-name="Investment Objective"
                                :error="errors.has('Investment Objective')"
                              />
                              <span v-show="errors.has('Investment Objective')" class="error">
                                {{
                                errors.first('Investment Objective')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="SourceOfFund"
                                :options="optSourceOfFund"
                                stack-label
                                :option-label="
                                  optSourceOfFund =>
                                    optSourceOfFund.dropdown_details_desc
                                "
                                :option-value="
                                  optSourceOfFund => optSourceOfFund
                                "
                                emit-value
                                map-options
                                label="Source Of Fund *"
                                v-validate="'required'"
                                data-vv-name="Source Of Fund"
                                :error="errors.has('Source Of Fund')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Source Of Fund</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Source Of Fund')"
                                class="error"
                              >{{ errors.first('Source Of Fund') }}</span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="text-weight-bolder text-subtitle1 q-mb-sm">Asset Information</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="AssetOwner"
                                label="Asset Owner"
                                v-validate="'required'"
                                data-vv-name="Asset Owner"
                                :error="errors.has('Asset Owner')"
                              />
                              <span
                                v-show="errors.has('Asset Owner')"
                                class="error"
                              >{{ errors.first('Asset Owner') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="StatementType"
                                :options="optStatementType"
                                stack-label
                                :option-label="
                                  optStatementType =>
                                    optStatementType.dropdown_details_desc
                                "
                                :option-value="
                                  optStatementType => optStatementType
                                "
                                emit-value
                                map-options
                                label="Statement Type"
                                v-validate="'required'"
                                data-vv-name="Statement Type"
                                :error="errors.has('Statement Type')"
                              />
                              <span
                                v-show="errors.has('Statement Type')"
                                class="error"
                              >{{ errors.first('Statement Type') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                v-model="AssetInfoLastYear"
                                label="For the Past 3 Years (IDR) - Last Year "
                                mask="############"
                                v-validate="'required|numeric'"
                                data-vv-name="Asset Info Last Year"
                                :error="errors.has('Asset Info Last Year')"
                              />
                              <span v-show="errors.has('Asset Info Last Year')" class="error">
                                {{
                                errors.first('Asset Info Last Year')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                mask="############"
                                v-model="AssetInfo2YearsAgo"
                                label="For the Past 3 Years (IDR) - 2 Years Ago"
                                v-validate="'required|numeric'"
                                data-vv-name="Asset Info 2 Years Ago"
                                :error="errors.has('Asset Info 2 Years Ago')"
                              />
                              <span v-show="errors.has('Asset Info 2 Years Ago')" class="error">
                                {{
                                errors.first('Asset Info 2 Years Ago')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                mask="############"
                                v-model="AssetInfo3YearsAgo"
                                label="For the Past 3 Years (IDR) - 3 Years Ago"
                                v-validate="'required|numeric'"
                                data-vv-name="Asset Info 3 Years Ago"
                                :error="errors.has('Asset Info 3 Years Ago')"
                              />
                              <span v-show="errors.has('Asset Info 3 Years Ago')" class="error">
                                {{
                                errors.first('Asset Info 3 Years Ago')
                                }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="text-weight-bolder text-subtitle1 q-mb-sm">Profit Information</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                mask="############"
                                v-model="ProfitInfoLastYear"
                                label="For the Past 3 Years (IDR) - Last Year "
                                v-validate="'required|numeric'"
                                data-vv-name="Profit Info Last Year"
                                :error="errors.has('Profit Info Last Year')"
                              />
                              <span v-show="errors.has('Profit Info Last Year')" class="error">
                                {{
                                errors.first('Profit Info Last Year')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                mask="############"
                                v-model="ProfitInfo2YearsAgo"
                                label="For the Past 3 Years (IDR) - 2 Years Ago"
                                v-validate="'required|numeric'"
                                data-vv-name="Profit Info 2 Years Ago"
                                :error="errors.has('Profit Info 2 Years Ago')"
                              />
                              <span v-show="errors.has('Profit Info 2 Years Ago')" class="error">
                                {{
                                errors.first('Profit Info 2 Years Ago')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                stack-label
                                outlined
                                mask="############"
                                v-model="ProfitInfo3YearsAgo"
                                label="For the Past 3 Years (IDR) - 3 Years Ago"
                                v-validate="'required|numeric'"
                                data-vv-name="Profit Info 3 Years Ago"
                                :error="errors.has('Profit Info 3 Years Ago')"
                                @blur="clearValidate()"
                              />
                              <span v-show="errors.has('Profit Info 3 Years Ago')" class="error">
                                {{
                                errors.first('Profit Info 3 Years Ago')
                                }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="Address">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-input
                              outlined
                              stack-label
                              v-model="Address"
                              label="Address"
                              type="textarea"
                              float-label="Textarea"
                              :max-height="100"
                              rows="5"
                              v-validate="'required'"
                              data-vv-name="Address"
                              :error="errors.has('Address')"
                            />
                            <span
                              v-show="errors.has('Address')"
                              class="error"
                            >{{ errors.first('Address') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="Email"
                              label="Email"
                              v-validate="'required|email'"
                              data-vv-name="Email"
                              :error="errors.has('Email')"
                            />
                            <span v-show="errors.has('Email')" class="error">
                              {{
                              errors.first('Email')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="Country"
                              :options="optCountry"
                              stack-label
                              :option-label="
                                optCountry => optCountry.country_name
                              "
                              :option-value="optCountry => optCountry"
                              emit-value
                              map-options
                              @input="FilterRegion(), ClearCountry()"
                              label="Country"
                              v-validate="'required'"
                              data-vv-name="Country"
                              :error="errors.has('Country')"
                            ></q-select>
                            <span
                              v-show="errors.has('Country')"
                              class="error"
                            >{{ errors.first('Country') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              mask="#############"
                              v-model="Phone1"
                              label="Phone 1"
                              v-validate="'required|min:10|max:13'"
                              data-vv-name="Phone"
                              :error="errors.has('Phone')"
                            />
                            <span v-show="errors.has('Phone')" class="error">
                              {{
                              errors.first('Phone')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              outlined
                              v-model="Phone2"
                              mask="##############"
                              label="Phone 2 "
                              stack-label
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input outlined v-model="Fax1" label="Fax 1" stack-label />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input outlined v-model="Fax2" label="Fax 2" stack-label />
                          </div>
                        </div>
                        <br />
                        <br />
                        <q-card class="shadow-3">
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  outlined
                                  v-model="Region"
                                  :disable="Country === ''"
                                  :options="optRegion"
                                  stack-label
                                  :option-label="
                                    optRegion => optRegion.region_name
                                  "
                                  :option-value="optRegion => optRegion"
                                  emit-value
                                  map-options
                                  @input="FilterCity(), ClearRegion()"
                                  label="Region"
                                  v-validate="'required'"
                                  data-vv-name="Region"
                                  :error="errors.has('Region')"
                                ></q-select>
                                <span
                                  v-show="errors.has('Region')"
                                  class="error"
                                >{{ errors.first('Region') }}</span>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  outlined
                                  v-model="City"
                                  :options="optCity"
                                  :disable="Region === ''"
                                  stack-label
                                  :option-label="optCity => optCity.city_name"
                                  :option-value="optCity => optCity"
                                  emit-value
                                  map-options
                                  @input="FilterSubdistrict(), ClearCity()"
                                  label="City"
                                  v-validate="'required'"
                                  data-vv-name="City"
                                  :error="errors.has('City')"
                                ></q-select>
                                <span
                                  v-show="errors.has('City')"
                                  class="error"
                                >{{ errors.first('City') }}</span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-select
                                  outlined
                                  v-model="Subdistrict"
                                  :options="optSubdistrict"
                                  :disable="City === ''"
                                  stack-label
                                  :option-label="
                                    optSubdistrict =>
                                      optSubdistrict.subdisct_name
                                  "
                                  :option-value="
                                    optSubdistrict => optSubdistrict
                                  "
                                  emit-value
                                  map-options
                                  @input="FilterVillage(), ClearSubdistrict()"
                                  label="Subdistrict"
                                  v-validate="'required'"
                                  data-vv-name="Subdistrict"
                                  :error="errors.has('Subdistrict')"
                                ></q-select>
                                <span
                                  v-show="errors.has('Subdistrict')"
                                  class="error"
                                >{{ errors.first('Subdistrict') }}</span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-select
                                  outlined
                                  v-model="Village"
                                  :options="optVillage"
                                  :disable="Subdistrict === ''"
                                  stack-label
                                  :option-label="
                                    optVillage => optVillage.village_name
                                  "
                                  :option-value="optVillage => optVillage"
                                  emit-value
                                  map-options
                                  label="District"
                                  v-validate="'required'"
                                  data-vv-name="District"
                                  :error="errors.has('District')"
                                ></q-select>
                                <span
                                  v-show="errors.has('District')"
                                  class="error"
                                >{{ errors.first('District') }}</span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-field outlined label="Postal Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Village.postal_code }}</div>
                                  </template>
                                  <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    content-style="font-size: 11px"
                                    :offset="[10, 10]"
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >Postal Code</q-tooltip>
                                </q-field>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <q-card-section>
                        <div class="q-gutter-sm">
                          <q-btn
                            :loading="LoadDetail"
                            @click="ActionDetail"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                            style="width:75px"
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="DeleteDialogContact"
                            :disable="selectedAuthorized.length === 0"
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                            style="width:75px"
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                      </q-card-section>

                      <q-card-section>
                        <q-table
                          title="Authorized Info"
                          class="q-ml-sm q-mr-sm table-label-color"
                          :grid="$q.screen.xs"
                          :data="listData"
                          :columns="columnsAuthorized"
                          row-key="order_key"
                          selection="single"
                          :selected.sync="selectedAuthorized"
                          separator="cell"
                          :loading="loading"
                          color="primary"
                          wrap-cells
                        ></q-table>
                      </q-card-section>
                      <q-dialog v-model="AuthorizedAdd">
                        <q-card style="width: 400px; max-width: 80vw;">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="AddButton">
                              <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                <div class="col-6">
                                  <q-btn
                                    @click="clearAuthorized"
                                    label="Clear"
                                    class="full-width"
                                    dense
                                    color="cyan-7"
                                    style="width: 80px"
                                  ></q-btn>
                                </div>
                                <div class="col-6">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    label="Close"
                                    color="negative"
                                    v-close-popup
                                  ></q-btn>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1FirstName"
                                    label="First Name"
                                    v-validate="'required|alpha'"
                                    data-vv-name="First Name"
                                    :error="errors.has('First Name')"
                                  />
                                  <span
                                    v-show="errors.has('First Name')"
                                    class="error"
                                  >{{ errors.first('First Name') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1MiddleName"
                                    label="Middle Name"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1LastName"
                                    label="Last Name"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    v-model="AP1Position"
                                    :options="optAP1Position"
                                    stack-label
                                    :option-label="
                                      optAP1Position =>
                                        optAP1Position.dropdown_details_desc
                                    "
                                    :option-value="
                                      optAP1Position => optAP1Position
                                    "
                                    emit-value
                                    map-options
                                    label="Position"
                                    v-validate="'required'"
                                    data-vv-name="Position"
                                    :error="errors.has('Position')"
                                  >
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Position</q-tooltip>
                                  </q-select>
                                  <span
                                    v-show="errors.has('Position')"
                                    class="error"
                                  >{{ errors.first('Position') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1MobilePhone"
                                    mask="#############"
                                    label="Mobile Phone"
                                    v-validate="
                                      'required|numeric|min:10|max:12'
                                    "
                                    data-vv-name="Mobile Phone"
                                    :error="errors.has('Mobile Phone')"
                                  />
                                  <span
                                    v-show="errors.has('Mobile Phone')"
                                    class="error"
                                  >{{ errors.first('Mobile Phone') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    stack-label
                                    v-model="AP1Email"
                                    label="Email"
                                    v-validate="'required|email'"
                                    data-vv-name="Email"
                                    :error="errors.has('Email')"
                                  />
                                  <span
                                    v-show="errors.has('Email')"
                                    class="error"
                                  >{{ errors.first('Email') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1Npwp"
                                    mask="##.###.###.#-###.###"
                                    label="NPWP"
                                    v-validate="'required|min:20|max:20'"
                                    data-vv-name="NPWP"
                                    :error="errors.has('NPWP')"
                                  />
                                  <span
                                    v-show="errors.has('NPWP')"
                                    class="error"
                                  >{{ errors.first('NPWP') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1IDType"
                                    :options="optAP1IDType"
                                    label="ID Type"
                                    :option-label="
                                      optAP1IDType =>
                                        optAP1IDType.dropdown_details_desc
                                    "
                                    :option-value="optAP1IDType => optAP1IDType"
                                    emit-value
                                    map-options
                                    v-validate="'required'"
                                    data-vv-name="ID Type"
                                    :error="errors.has('ID Type')"
                                  />
                                  <span
                                    v-show="errors.has('ID Type')"
                                    class="error"
                                  >{{ errors.first('ID Type') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1IDNumber"
                                    mask="################"
                                    label="ID Number"
                                    v-validate="
                                      'required|numeric|min:16|max:16'
                                    "
                                    data-vv-name="ID Number"
                                    :error="errors.has('ID Number')"
                                  />
                                  <span
                                    v-show="errors.has('ID Number')"
                                    class="error"
                                  >{{ errors.first('ID Number') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1IDExpirationDate"
                                    label="ID Expiration Date"
                                  >
                                    <template v-slot:append>
                                      <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy
                                          ref="qDateProxy3"
                                          transition-show="scale"
                                          transition-hide="scale"
                                        >
                                          <q-date
                                            today-btn
                                            v-model="AP1IDExpirationDate"
                                            mask="YYYY-MM-DD"
                                            @input="
                                              () => $refs.qDateProxy3.hide()
                                            "
                                          />
                                        </q-popup-proxy>
                                      </q-icon>
                                    </template>
                                  </q-input>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    v-model="CountryContact"
                                    :options="optCountryContact"
                                    stack-label
                                    :option-label="
                                      optCountryContact =>
                                        optCountryContact.country_name
                                    "
                                    :option-value="
                                      optCountryContact => optCountryContact
                                    "
                                    emit-value
                                    map-options
                                    @input="
                                      FilterRegionContact(),
                                        ClearCountryContact()
                                    "
                                    label="Country"
                                    v-validate="'required'"
                                    data-vv-name="Country"
                                    :error="errors.has('Country')"
                                  ></q-select>
                                  <span
                                    v-show="errors.has('Country')"
                                    class="error"
                                  >{{ errors.first('Country') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="CountryContact === ''"
                                    v-model="RegionContact"
                                    :options="optRegionContact"
                                    stack-label
                                    :option-label="
                                      optRegionContact =>
                                        optRegionContact.region_name
                                    "
                                    :option-value="
                                      optRegionContact => optRegionContact
                                    "
                                    emit-value
                                    map-options
                                    @input="
                                      FilterCityContact(), ClearRegionContact()
                                    "
                                    label="Region"
                                    v-validate="'required'"
                                    data-vv-name="Region"
                                    :error="errors.has('Region')"
                                  ></q-select>
                                  <span
                                    v-show="errors.has('Region')"
                                    class="error"
                                  >{{ errors.first('Region') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="RegionContact === ''"
                                    dense
                                    outlined
                                    v-model="CityContact"
                                    :options="optCityContact"
                                    stack-label
                                    :option-label="
                                      optCityContact => optCityContact.city_name
                                    "
                                    :option-value="
                                      optCityContact => optCityContact
                                    "
                                    emit-value
                                    map-options
                                    @input="
                                      FilterSubdistrictContact(),
                                        ClearCityContact()
                                    "
                                    label="City"
                                    v-validate="'required'"
                                    data-vv-name="City"
                                    :error="errors.has('City')"
                                  ></q-select>
                                  <span
                                    v-show="errors.has('City')"
                                    class="error"
                                  >{{ errors.first('City') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="CityContact === ''"
                                    dense
                                    outlined
                                    v-model="SubdistrictContact"
                                    :options="optSubdistrictContact"
                                    stack-label
                                    :option-label="
                                      optSubdistrictContact =>
                                        optSubdistrictContact.subdisct_name
                                    "
                                    :option-value="
                                      optSubdistrictContact =>
                                        optSubdistrictContact
                                    "
                                    emit-value
                                    map-options
                                    label="Subdistrict"
                                    @input="
                                      FilterVillageContact(),
                                        ClearSubdistrictContact()
                                    "
                                    v-validate="'required'"
                                    data-vv-name="Subdistrict"
                                    :error="errors.has('Subdistrict')"
                                  ></q-select>
                                  <span
                                    v-show="errors.has('Subdistrict')"
                                    class="error"
                                  >{{ errors.first('Subdistrict') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="SubdistrictContact === ''"
                                    v-model="VillageContact"
                                    :options="optVillageContact"
                                    stack-label
                                    :option-label="
                                      optVillageContact =>
                                        optVillageContact.village_name
                                    "
                                    :option-value="
                                      optVillageContact => optVillageContact
                                    "
                                    emit-value
                                    map-options
                                    label="District"
                                    v-validate="'required'"
                                    data-vv-name="District"
                                    :error="errors.has('District')"
                                  ></q-select>
                                  <span
                                    v-show="errors.has('District')"
                                    class="error"
                                  >{{ errors.first('District') }}</span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field dense outlined label="Postal Code" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ VillageContact.postal_code }}</div>
                                    </template>
                                    <q-tooltip
                                      anchor="top middle"
                                      self="bottom middle"
                                      content-style="font-size: 11px"
                                      :offset="[10, 10]"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >Postal Code</q-tooltip>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    outlined
                                    v-model="DomicileContact"
                                    label="Domicile Address *"
                                    type="textarea"
                                    stack-label
                                    float-label="Textarea"
                                    :max-height="80"
                                    rows="5"
                                    v-validate="'required'"
                                    data-vv-name="Domicile Address *"
                                    :error="errors.has('Domicile Address *')"
                                  ></q-input>
                                  <span
                                    v-show="errors.has('Domicile Address *')"
                                    class="error"
                                  >{{ errors.first('Domicile Address *') }}</span>
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    :loading="adding"
                                    @click="AddButton"
                                    label="Add"
                                    :disable="
                                      errors.any() ||
                                        AP1FirstName === '' ||
                                        AP1IDNumber === '' ||
                                        AP1Position === '' ||
                                        AP1MobilePhone === '' ||
                                        AP1Email === '' ||
                                        AP1IDType === '' ||
                                        AP1Npwp === '' ||
                                        CountryContact === '' ||
                                        RegionContact === '' ||
                                        CityContact === '' ||
                                        SubdistrictContact === '' ||
                                        VillageContact === '' ||
                                        DomicileContact === ''
                                    "
                                    color="accent"
                                  ></q-btn>
                                </div>
                              </div>
                            </form>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                    </q-tab-panel>

                    <q-tab-panel name="three">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="text-weight-bolder text-subtitle1 q-mb-sm">CIF Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <!-- <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field outlined label="Global Cif Number" stack-label>
                            <template v-slot:control>
                              <div class="self-center full-width no-outline" tabindex="0">{{ GlobalCifNumber }}</div>
                            </template>
                          </q-field>
                          <span v-show="errors.has('Global CIF Number')"
                            class="error">{{ errors.first('Global CIF Number') }}</span>
                            </div>-->
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="BranchName"
                                :options="optBranchName"
                                label="Branch Name *"
                                stack-label
                                :option-label="
                                  optBranchName => optBranchName.branch_name
                                "
                                :option-value="optBranchName => optBranchName"
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
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="SalesName"
                                :options="optSalesName"
                                label="Sales Name *"
                                stack-label
                                :option-label="optSalesName => optSalesName.sales_name"
                                :option-value="optSalesName => optSalesName"
                                emit-value
                                @input="getWaperd"
                                map-options
                                v-validate="'required'"
                                data-vv-name="Sales Name"
                                :error="errors.has('Sales Name')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Sales Name</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Sales Name')"
                                class="error"
                              >{{ errors.first('Sales Name') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field outlined label="Branch WAPERD" stack-label>
                                <template v-slot:control>
                                  <div class="self-center full-width no-outline" tabindex="0">{{ BranchWaperd }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field outlined label="WAPERD" stack-label>
                                <template v-slot:control>
                                  <div class="self-center full-width no-outline" tabindex="0">{{ Waperd }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field outlined label="Registration Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ RegistrationDate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field outlined label="Date Last Update" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ DateLastUpdate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="LobCode"
                                :options="optLobCode"
                                label="LOB Code"
                                stack-label
                                :option-label="
                                  optLobCode => optLobCode.dropdown_details_desc
                                "
                                :option-value="optLobCode => optLobCode"
                                emit-value
                                map-options
                                v-validate="'required'"
                                data-vv-name="LOB Code"
                                :error="errors.has('LOB Code')"
                              />
                              <span
                                v-show="errors.has('LOB Code')"
                                class="error"
                              >{{ errors.first('LOB Code') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="CustomerGroup"
                                :options="optCustomerGroup"
                                stack-label
                                :option-label="
                                  optCustomerGroup =>
                                    optCustomerGroup.dropdown_details_desc
                                "
                                :option-value="
                                  optCustomerGroup => optCustomerGroup
                                "
                                emit-value
                                map-options
                                label="Customer Group"
                                v-validate="'required'"
                                data-vv-name="Customer Group"
                                :error="errors.has('Customer Group')"
                              />
                              <span
                                v-show="errors.has('Customer Group')"
                                class="error"
                              >{{ errors.first('Customer Group') }}</span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>

                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="q-gutter-sm">
                            <q-btn
                              :loading="LoadDetail"
                              @click="ActionDetailBank"
                              style="width:75px"
                              color="primary"
                              icon="ion-add"
                              v-ripple
                            >
                              <q-tooltip>Add</q-tooltip>
                            </q-btn>
                            <q-btn
                              @click="DeleteDialogBank"
                              :disable="selectedBank.length === 0"
                              style="width:75px"
                              color="negative"
                              icon="eva-trash-2"
                              v-ripple
                            >
                              <q-tooltip>Delete</q-tooltip>
                            </q-btn>
                          </div>
                        </q-card-section>

                        <q-card-section>
                          <q-table
                            title="Account Info"
                            class="q-ml-sm q-mr-sm table-label-color"
                            :grid="$q.screen.xs"
                            :data="listDataBank"
                            :columns="columnsBank"
                            row-key="order_key"
                            selection="single"
                            :selected.sync="selectedBank"
                            separator="cell"
                            :loading="loading"
                            color="primary"
                            wrap-cells
                          ></q-table>
                        </q-card-section>
                        <q-dialog v-model="AccountInfo">
                          <q-card style="width: 400px; max-width: 80vw;">
                            <q-card-section style="width: 100%">
                              <form @submit.prevent>
                                <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                  <div class="col-6">
                                    <q-btn
                                      class="full-width"
                                      dense
                                      @click="clearBank"
                                      label="Clear"
                                      color="cyan-7"
                                      style="width: 80px"
                                    ></q-btn>
                                  </div>
                                  <div class="col-6">
                                    <q-btn
                                      class="full-width"
                                      dense
                                      label="Close"
                                      color="negative"
                                      v-close-popup
                                    ></q-btn>
                                  </div>
                                  <div class="col-12">
                                    <q-input
                                      stack-label
                                      outlined
                                      dense
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
                                    <span v-show="errors.has('Account Number')" class="error">
                                      {{
                                      errors.first('Account Number')
                                      }}
                                    </span>
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="Bank"
                                      :options="optBank"
                                      label="Bank *"
                                      v-validate="'required'"
                                      data-vv-name="Bank"
                                      stack-label
                                      :option-label="
                                        optBank => optBank.dropdown_details_desc
                                      "
                                      :option-value="optBank => optBank"
                                      emit-value
                                      map-options
                                      :error="errors.has('Bank')"
                                      :error-label="errors.first('Bank')"
                                    >
                                      <q-tooltip
                                        anchor="top middle"
                                        self="bottom middle"
                                        content-style="font-size: 11px"
                                        :offset="[10, 10]"
                                        transition-show="scale"
                                        transition-hide="scale"
                                      >Bank</q-tooltip>
                                    </q-select>
                                    <span
                                      v-show="errors.has('Bank')"
                                      class="error"
                                    >{{ errors.first('Bank') }}</span>
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="AccountType"
                                      :options="optAccountType"
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
                                      label="Account Type *"
                                      v-validate="'required'"
                                      data-vv-name="Account Type"
                                      :error="errors.has('Account Type')"
                                      :error-label="
                                        errors.first('Account Type')
                                      "
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
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="Currency"
                                      :options="optCurrency"
                                      stack-label
                                      :option-label="
                                        optCurrency =>
                                          optCurrency.currencies_code
                                      "
                                      :option-value="optCurrency => optCurrency"
                                      emit-value
                                      map-options
                                      label="Currency *"
                                      v-validate="'required'"
                                      data-vv-name="Currency"
                                      :error="errors.has('Currency')"
                                      :error-label="errors.first('Currency')"
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
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="StatusBank"
                                      :options="optStatus"
                                      label="Status *"
                                      v-validate="'required'"
                                      data-vv-name="Status"
                                      stack-label
                                      :option-label="
                                        optStatus =>
                                          optStatus.dropdown_details_desc
                                      "
                                      :option-value="optStatus => optStatus"
                                      emit-value
                                      map-options
                                      :error="errors.has('Status')"
                                      :error-label="errors.first('Status')"
                                      @blur="clearValidate()"
                                    >
                                      <q-tooltip
                                        anchor="top middle"
                                        self="bottom middle"
                                        content-style="font-size: 11px"
                                        :offset="[10, 10]"
                                        transition-show="scale"
                                        transition-hide="scale"
                                      >Status</q-tooltip>
                                    </q-select>
                                    <span
                                      v-show="errors.has('Status')"
                                      class="error"
                                    >{{ errors.first('Status') }}</span>
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      dense
                                      disable
                                      outlined
                                      v-model="Default"
                                      :options="optDefault"
                                      label="Default"
                                      stack-label
                                    >
                                      <q-tooltip
                                        anchor="top middle"
                                        self="bottom middle"
                                        content-style="font-size: 11px"
                                        :offset="[10, 10]"
                                        transition-show="scale"
                                        transition-hide="scale"
                                      >Default</q-tooltip>
                                    </q-select>
                                  </div>
                                  <div class="col-12">
                                    <q-btn
                                      class="full-width"
                                      dense
                                      :loading="adding"
                                      @click="AddButtonBank"
                                      :disable="
                                        AccountNumber === '' ||
                                          Bank === '' ||
                                          Currency === '' ||
                                          AccountType === '' ||
                                          StatusBank === ''
                                      "
                                      label="Add"
                                      color="accent"
                                    ></q-btn>
                                  </div>
                                </div>
                              </form>
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="four">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-pa-sm">
                          <batm-upload
                            :Muser="userdata"
                            :ugAccessToken="token"
                            :optDocuments="optDocumentCategory"
                            :dataUpload="dataUploaded"
                            :status="multiple"
                            :callMethod="onGetOptDocuments"
                          ></batm-upload>
                        </div>
                        <br />
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="five">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="TaxIdNumber"
                              mask="##.###.###.#-###.###"
                              label="Tax ID Number"
                              v-validate="'required|min:20|max:20'"
                              data-vv-name="Tax ID Number"
                              :error="errors.has('Tax ID Number')"
                            />
                            <span
                              v-show="errors.has('Tax ID Number')"
                              class="error"
                            >{{ errors.first('Tax ID Number') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="TinForeignTin"
                              mask="##.###.###.#-###.###"
                              label="TIN / Foreign TIN"
                              v-validate="'required|min:20|max:20'"
                              data-vv-name="TIN / Foreign TIN"
                              :error="errors.has('TIN / Foreign TIN')"
                            />
                            <span
                              v-show="errors.has('TIN / Foreign TIN')"
                              class="error"
                            >{{ errors.first('TIN / Foreign TIN') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="IssuanceCountry"
                              :options="optIssuanceCountry"
                              stack-label
                              :option-label="
                                optIssuanceCountry =>
                                  optIssuanceCountry.country_name
                              "
                              :option-value="
                                optIssuanceCountry => optIssuanceCountry
                              "
                              emit-value
                              map-options
                              label="Issuance Country *"
                              v-validate="'required'"
                              data-vv-name="Issuance Country"
                              :error="errors.has('Issuance Country')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                              >Issuance Country</q-tooltip>
                            </q-select>
                            <span
                              v-show="errors.has('Issuance Country')"
                              class="error"
                            >{{ errors.first('Issuance Country') }}</span>
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="GIIN"
                              label="GIIN"
                              v-validate="'required'"
                              data-vv-name="GIIN"
                              :error="errors.has('GIIN')"
                            />
                            <span v-show="errors.has('GIIN')" class="error">
                              {{
                              errors.first('GIIN')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-input
                              stack-label
                              outlined
                              v-model="SubsOwnerName"
                              label="Substantial U.S Owner Name"
                              v-validate="'required'"
                              data-vv-name="Subs U.S Owner Name"
                              :error="errors.has('Subs U.S Owner Name')"
                            />
                            <span
                              v-show="errors.has('Subs U.S Owner Name')"
                              class="error"
                            >{{ errors.first('Subs U.S Owner Name') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-input
                              stack-label
                              outlined
                              v-model="SubsOwnerAddress"
                              label="Domicile Address"
                              type="textarea"
                              float-label="Textarea"
                              :max-height="100"
                              rows="5"
                              v-validate="'required'"
                              data-vv-name="Domicile Address"
                              :error="errors.has('Domicile Address')"
                            />
                            <span
                              v-show="errors.has('Domicile Address')"
                              class="error"
                            >{{ errors.first('Domicile Address') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-input
                              stack-label
                              outlined
                              v-model="SubsOwnerTIN"
                              label="Substantial U.S Owner TIN"
                              v-validate="'required'"
                              data-vv-name="Subs U.S Owner TIN"
                              :error="errors.has('Subs U.S Owner TIN')"
                              @blur="clearValidate()"
                            />
                            <span
                              v-show="errors.has('Subs U.S Owner TIN')"
                              class="error"
                            >{{ errors.first('Subs U.S Owner TIN') }}</span>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card-section>
              </q-card>
            </form>
          </q-card-section>
        </q-card>
      </q-page>
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
            <q-breadcrumbs-el label="Corporate Customer" icon="note_add" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />
        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio
              v-model="mode"
              val="Individual"
              label="Individual Customer"
              @input="togglecust"
            />
            <q-radio v-model="mode" val="Corporate" label="Corporate Customer" @input="togglecust" />
          </div>
        </q-card-section>

        <q-card-section>
          <form @submit.prevent="submitButton">
            <q-card class="my-card shadow-6 center" inline>
              <q-tabs
                v-model="tab"
                active-color="primary"
                indicator-color="primary"
                class="text-grey"
                align="justify"
                inline-label
              >
                <q-tab label="Customer" name="one"></q-tab>
                <q-tab label="Contact Info" name="two" @click="changeStatusTab1(), clearValidate()">
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab1"
                    v-validate="'required'"
                    data-vv-name="Contact Info Tab"
                    :error="errors.has('Contact Info Tab')"
                  />
                </q-tab>
                <q-tab label="Address" name="Address" />
                <q-tab
                  label="Branch Info"
                  name="three"
                  @click="changeStatusTab2(), clearValidate()"
                >
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab2"
                    v-validate="'required'"
                    data-vv-name="Branch Info Tab"
                    :error="errors.has('Branch Info Tab')"
                  />
                </q-tab>
                <q-tab label="Document" name="four" @click="changeStatusTab3(), clearValidate()">
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab3"
                    v-validate="'required'"
                    data-vv-name="Document Tab"
                    :error="errors.has('Document Tab')"
                  />
                </q-tab>
                <q-tab label="Tax Info" name="five" @click="changeStatusTab4(), clearValidate()">
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab4"
                    v-validate="'required'"
                    data-vv-name="Tax Info Tab"
                    :error="errors.has('Tax Info Tab')"
                  />
                </q-tab>
              </q-tabs>
              <span v-show="errors.has('Contact Info Tab')" class="error">
                {{
                errors.first('Contact Info Tab')
                }}
              </span>&nbsp;
              <!-- <br/> -->
              <span v-show="errors.has('Branch Info Tab')" class="error">
                {{
                errors.first('Branch Info Tab')
                }}
              </span>&nbsp;
              <!-- <br/> -->
              <span v-show="errors.has('Document Tab')" class="error">
                {{
                errors.first('Document Tab')
                }}
              </span>&nbsp;
              <!-- <br/> -->
              <span v-show="errors.has('Tax Info Tab')" class="error">
                {{
                errors.first('Tax Info Tab')
                }}
              </span>
              <q-separator />

              <q-tab-panels keep-alive v-model="tab" animated>
                <q-tab-panel name="one">
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Corporate Info</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            v-model="CompanyName"
                            label="Company Name"
                            v-validate="'required'"
                            data-vv-name="Company Name"
                            :error="errors.has('Company Name')"
                          />
                          <span
                            v-show="errors.has('Company Name')"
                            class="error"
                          >{{ errors.first('Company Name') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="SIUPNo"
                            label="SIUP No"
                            v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                            data-vv-name="SIUP No"
                            :error="errors.has('SIUP No')"
                          />
                          <span
                            v-show="errors.has('SIUP No')"
                            class="error"
                          >{{ errors.first('SIUP No') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="SIUPExpDate"
                            label="SIUP Expiration Date"
                            v-validate="'required|date_format:yyyy-mm-dd'"
                            data-vv-name="SIUP Exp Date"
                            :error="errors.has('SIUP Exp Date')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy7"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="SIUPExpDate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy7.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                          <span
                            v-show="errors.has('SIUP Exp Date')"
                            class="error"
                          >{{ errors.first('SIUP Exp Date') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="SKDNo"
                            label="SKD No"
                            v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                            data-vv-name="SKD No"
                            :error="errors.has('SKD No')"
                          />
                          <span
                            v-show="errors.has('SKD No')"
                            class="error"
                          >{{ errors.first('SKD No') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="SKDExpDate"
                            label="SKD Expiration Date"
                            v-validate="'required|date_format:yyyy-mm-dd'"
                            data-vv-name="SKD Exp Date"
                            :error="errors.has('SKD Exp Date')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy10"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="SKDExpDate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy10.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                          <span
                            v-show="errors.has('SKD Exp Date')"
                            class="error"
                          >{{ errors.first('SKD Exp Date') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-select
                            outlined
                            v-model="Status"
                            :options="optStatus"
                            label="Status *"
                            v-validate="'required'"
                            data-vv-name="Status"
                            stack-label
                            :option-label="
                                  optStatus => optStatus.dropdown_details_desc
                                "
                            :option-value="optStatus => optStatus"
                            emit-value
                            map-options
                            :error="errors.has('Status')"
                            :error-label="errors.first('Status')"
                            @blur="clearValidate()"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Status</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Status')"
                            class="error"
                          >{{ errors.first('Status') }}</span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">AD/ART</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-select
                            outlined
                            v-model="Ownership"
                            :options="optOwnership"
                            stack-label
                            :option-label="
                                  optOwnership =>
                                    optOwnership.dropdown_details_desc
                                "
                            :option-value="optOwnership => optOwnership"
                            emit-value
                            map-options
                            label="Ownership *"
                            v-validate="'required'"
                            data-vv-name="Ownership"
                            :error="errors.has('Ownership')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Ownership</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Ownership')"
                            class="error"
                          >{{ errors.first('Ownership') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="DateOfEstablishment"
                            label="Date Of Establishment"
                            v-validate="'required|date_format:yyyy-mm-dd'"
                            data-vv-name="Date Of Establishment"
                            :error="errors.has('Date Of Establishment')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy8"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="DateOfEstablishment"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy8.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                          <span v-show="errors.has('Date Of Establishment')" class="error">
                            {{
                            errors.first('Date Of Establishment')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="PlaceOfEstablishment"
                            label="Place Of Establishment *"
                            v-validate="'required'"
                            data-vv-name="Place Of Establishment"
                            :error="errors.has('Place Of Establishment')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Place Of Establishment</q-tooltip>
                          </q-input>
                          <span v-show="errors.has('Place Of Establishment')" class="error">
                            {{
                            errors.first('Place Of Establishment')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="CountryOfEstablishment"
                            label="Country Of Establishment *"
                            v-validate="'required'"
                            data-vv-name="Country Of Establishment"
                            :error="errors.has('Country Of Establishment')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Country Of Establishment</q-tooltip>
                          </q-input>
                          <span v-show="errors.has('Country Of Establishment')" class="error">
                            {{
                            errors.first('Country Of Establishment')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            v-model="ArticlesOfAssosiationNo"
                            label="Articles of Association No"
                            v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                            data-vv-name="Articles of Association No"
                            :error="
                                  errors.has('Articles of Association No')
                                "
                          />
                          <span
                            v-show="
                                  errors.has('Articles of Association No')
                                "
                            class="error"
                          >
                            {{
                            errors.first('Articles of Association No')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="CompanyType"
                            :options="optCompanyType"
                            stack-label
                            :option-label="
                                  optCompanyType =>
                                    optCompanyType.dropdown_details_desc
                                "
                            :option-value="optCompanyType => optCompanyType"
                            emit-value
                            map-options
                            label="Company Type *"
                            v-validate="'required'"
                            data-vv-name="Company Type"
                            :error="errors.has('Company Type')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Company Type</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Company Type')"
                            class="error"
                          >{{ errors.first('Company Type') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="CompanyCharacteristic"
                            :options="optCompanyCharacteristic"
                            stack-label
                            :option-label="
                                  optCompanyCharacteristic =>
                                    optCompanyCharacteristic.dropdown_details_desc
                                "
                            :option-value="
                                  optCompanyCharacteristic =>
                                    optCompanyCharacteristic
                                "
                            emit-value
                            map-options
                            label="Company Characteristic *"
                            v-validate="'required'"
                            data-vv-name="Company Characteristic"
                            :error="errors.has('Company Characteristic')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Company Characteristic</q-tooltip>
                          </q-select>
                          <span v-show="errors.has('Company Characteristic')" class="error">
                            {{
                            errors.first('Company Characteristic')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="IncomeLevel"
                            :options="optIncomeLevel"
                            stack-label
                            :option-label="
                                  optIncomeLevel =>
                                    optIncomeLevel.dropdown_details_desc
                                "
                            :option-value="optIncomeLevel => optIncomeLevel"
                            emit-value
                            map-options
                            label="Income Level (IDR)"
                            v-validate="'required'"
                            data-vv-name="Income Level"
                            :error="errors.has('Income Level')"
                          />
                          <span
                            v-show="errors.has('Income Level')"
                            class="error"
                          >{{ errors.first('Income Level') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="InvestorRiskProfile"
                            :options="optInvestorRiskProfile"
                            stack-label
                            :option-label="
                                  optInvestorRiskProfile =>
                                    optInvestorRiskProfile.dropdown_details_desc
                                "
                            :option-value="
                                  optInvestorRiskProfile =>
                                    optInvestorRiskProfile
                                "
                            emit-value
                            map-options
                            label="Investor's Risk Profile"
                            v-validate="'required'"
                            data-vv-name="Investor Risk Profile"
                            :error="errors.has('Investor Risk Profile')"
                          />
                          <span v-show="errors.has('Investor Risk Profile')" class="error">
                            {{
                            errors.first('Investor Risk Profile')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="InvestmentObjective"
                            :options="optInvestmentObjective"
                            stack-label
                            :option-label="
                                  optInvestmentObjective =>
                                    optInvestmentObjective.dropdown_details_desc
                                "
                            :option-value="
                                  optInvestmentObjective =>
                                    optInvestmentObjective
                                "
                            emit-value
                            map-options
                            label="Investment Objective"
                            v-validate="'required'"
                            data-vv-name="Investment Objective"
                            :error="errors.has('Investment Objective')"
                          />
                          <span v-show="errors.has('Investment Objective')" class="error">
                            {{
                            errors.first('Investment Objective')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="SourceOfFund"
                            :options="optSourceOfFund"
                            stack-label
                            :option-label="
                                  optSourceOfFund =>
                                    optSourceOfFund.dropdown_details_desc
                                "
                            :option-value="
                                  optSourceOfFund => optSourceOfFund
                                "
                            emit-value
                            map-options
                            label="Source Of Fund *"
                            v-validate="'required'"
                            data-vv-name="Source Of Fund"
                            :error="errors.has('Source Of Fund')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Source Of Fund</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Source Of Fund')"
                            class="error"
                          >{{ errors.first('Source Of Fund') }}</span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">Asset Information</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="AssetOwner"
                            label="Asset Owner"
                            v-validate="'required'"
                            data-vv-name="Asset Owner"
                            :error="errors.has('Asset Owner')"
                          />
                          <span
                            v-show="errors.has('Asset Owner')"
                            class="error"
                          >{{ errors.first('Asset Owner') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="StatementType"
                            :options="optStatementType"
                            stack-label
                            :option-label="
                                  optStatementType =>
                                    optStatementType.dropdown_details_desc
                                "
                            :option-value="
                                  optStatementType => optStatementType
                                "
                            emit-value
                            map-options
                            label="Statement Type"
                            v-validate="'required'"
                            data-vv-name="Statement Type"
                            :error="errors.has('Statement Type')"
                          />
                          <span
                            v-show="errors.has('Statement Type')"
                            class="error"
                          >{{ errors.first('Statement Type') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            v-model="AssetInfoLastYear"
                            label="For the Past 3 Years (IDR) - Last Year "
                            mask="############"
                            v-validate="'required|numeric'"
                            data-vv-name="Asset Info Last Year"
                            :error="errors.has('Asset Info Last Year')"
                          />
                          <span v-show="errors.has('Asset Info Last Year')" class="error">
                            {{
                            errors.first('Asset Info Last Year')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            mask="############"
                            v-model="AssetInfo2YearsAgo"
                            label="For the Past 3 Years (IDR) - 2 Years Ago"
                            v-validate="'required|numeric'"
                            data-vv-name="Asset Info 2 Years Ago"
                            :error="errors.has('Asset Info 2 Years Ago')"
                          />
                          <span v-show="errors.has('Asset Info 2 Years Ago')" class="error">
                            {{
                            errors.first('Asset Info 2 Years Ago')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            mask="############"
                            v-model="AssetInfo3YearsAgo"
                            label="For the Past 3 Years (IDR) - 3 Years Ago"
                            v-validate="'required|numeric'"
                            data-vv-name="Asset Info 3 Years Ago"
                            :error="errors.has('Asset Info 3 Years Ago')"
                          />
                          <span v-show="errors.has('Asset Info 3 Years Ago')" class="error">
                            {{
                            errors.first('Asset Info 3 Years Ago')
                            }}
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">Profit Information</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            mask="############"
                            v-model="ProfitInfoLastYear"
                            label="For the Past 3 Years (IDR) - Last Year "
                            v-validate="'required|numeric'"
                            data-vv-name="Profit Info Last Year"
                            :error="errors.has('Profit Info Last Year')"
                          />
                          <span v-show="errors.has('Profit Info Last Year')" class="error">
                            {{
                            errors.first('Profit Info Last Year')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            mask="############"
                            v-model="ProfitInfo2YearsAgo"
                            label="For the Past 3 Years (IDR) - 2 Years Ago"
                            v-validate="'required|numeric'"
                            data-vv-name="Profit Info 2 Years Ago"
                            :error="errors.has('Profit Info 2 Years Ago')"
                          />
                          <span v-show="errors.has('Profit Info 2 Years Ago')" class="error">
                            {{
                            errors.first('Profit Info 2 Years Ago')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-input
                            stack-label
                            outlined
                            mask="############"
                            v-model="ProfitInfo3YearsAgo"
                            label="For the Past 3 Years (IDR) - 3 Years Ago"
                            v-validate="'required|numeric'"
                            data-vv-name="Profit Info 3 Years Ago"
                            :error="errors.has('Profit Info 3 Years Ago')"
                            @blur="clearValidate()"
                          />
                          <span v-show="errors.has('Profit Info 3 Years Ago')" class="error">
                            {{
                            errors.first('Profit Info 3 Years Ago')
                            }}
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="Address">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-input
                          outlined
                          stack-label
                          v-model="Address"
                          label="Address"
                          type="textarea"
                          float-label="Textarea"
                          :max-height="100"
                          rows="5"
                          v-validate="'required'"
                          data-vv-name="Address"
                          :error="errors.has('Address')"
                        />
                        <span
                          v-show="errors.has('Address')"
                          class="error"
                        >{{ errors.first('Address') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="Email"
                          label="Email"
                          v-validate="'required|email'"
                          data-vv-name="Email"
                          :error="errors.has('Email')"
                        />
                        <span v-show="errors.has('Email')" class="error">
                          {{
                          errors.first('Email')
                          }}
                        </span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="Country"
                          :options="optCountry"
                          stack-label
                          :option-label="
                                optCountry => optCountry.country_name
                              "
                          :option-value="optCountry => optCountry"
                          emit-value
                          map-options
                          @input="FilterRegion(), ClearCountry()"
                          label="Country"
                          v-validate="'required'"
                          data-vv-name="Country"
                          :error="errors.has('Country')"
                        ></q-select>
                        <span
                          v-show="errors.has('Country')"
                          class="error"
                        >{{ errors.first('Country') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          mask="#############"
                          v-model="Phone1"
                          label="Phone 1"
                          v-validate="'required|min:10|max:13'"
                          data-vv-name="Phone"
                          :error="errors.has('Phone')"
                        />
                        <span v-show="errors.has('Phone')" class="error">
                          {{
                          errors.first('Phone')
                          }}
                        </span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          v-model="Phone2"
                          mask="##############"
                          label="Phone 2 "
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined v-model="Fax1" label="Fax 1" stack-label />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined v-model="Fax2" label="Fax 2" stack-label />
                      </div>
                    </div>
                    <br />
                    <br />
                    <q-card class="shadow-3">
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="Region"
                              :disable="Country === ''"
                              :options="optRegion"
                              stack-label
                              :option-label="
                                    optRegion => optRegion.region_name
                                  "
                              :option-value="optRegion => optRegion"
                              emit-value
                              map-options
                              @input="FilterCity(), ClearRegion()"
                              label="Region"
                              v-validate="'required'"
                              data-vv-name="Region"
                              :error="errors.has('Region')"
                            ></q-select>
                            <span
                              v-show="errors.has('Region')"
                              class="error"
                            >{{ errors.first('Region') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="City"
                              :options="optCity"
                              :disable="Region === ''"
                              stack-label
                              :option-label="optCity => optCity.city_name"
                              :option-value="optCity => optCity"
                              emit-value
                              map-options
                              @input="FilterSubdistrict(), ClearCity()"
                              label="City"
                              v-validate="'required'"
                              data-vv-name="City"
                              :error="errors.has('City')"
                            ></q-select>
                            <span
                              v-show="errors.has('City')"
                              class="error"
                            >{{ errors.first('City') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                              outlined
                              v-model="Subdistrict"
                              :options="optSubdistrict"
                              :disable="City === ''"
                              stack-label
                              :option-label="
                                    optSubdistrict =>
                                      optSubdistrict.subdisct_name
                                  "
                              :option-value="
                                    optSubdistrict => optSubdistrict
                                  "
                              emit-value
                              map-options
                              @input="FilterVillage(), ClearSubdistrict()"
                              label="Subdistrict"
                              v-validate="'required'"
                              data-vv-name="Subdistrict"
                              :error="errors.has('Subdistrict')"
                            ></q-select>
                            <span
                              v-show="errors.has('Subdistrict')"
                              class="error"
                            >{{ errors.first('Subdistrict') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-select
                              outlined
                              v-model="Village"
                              :options="optVillage"
                              :disable="Subdistrict === ''"
                              stack-label
                              :option-label="
                                    optVillage => optVillage.village_name
                                  "
                              :option-value="optVillage => optVillage"
                              emit-value
                              map-options
                              label="District"
                              v-validate="'required'"
                              data-vv-name="District"
                              :error="errors.has('District')"
                            ></q-select>
                            <span
                              v-show="errors.has('District')"
                              class="error"
                            >{{ errors.first('District') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-field outlined label="Postal Code" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Village.postal_code }}</div>
                              </template>
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                              >Postal Code</q-tooltip>
                            </q-field>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="two">
                  <q-card-section>
                    <div class="q-gutter-sm">
                      <q-btn
                        :loading="LoadDetail"
                        @click="ActionDetail"
                        color="primary"
                        icon="ion-add"
                        v-ripple
                        style="width:75px"
                      >
                        <q-tooltip>Add</q-tooltip>
                      </q-btn>
                      <q-btn
                        @click="DeleteDialogContact"
                        :disable="selectedAuthorized.length === 0"
                        color="negative"
                        icon="eva-trash-2"
                        v-ripple
                        style="width:75px"
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-table
                      title="Authorized Info"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="listData"
                      :columns="columnsAuthorized"
                      row-key="order_key"
                      selection="single"
                      :selected.sync="selectedAuthorized"
                      separator="cell"
                      :loading="loading"
                      color="primary"
                      wrap-cells
                    ></q-table>
                  </q-card-section>
                  <q-dialog v-model="AuthorizedAdd">
                    <q-card style="width: 400px; max-width: 80vw;">
                      <q-card-section style="width: 100%">
                        <form @submit.prevent="AddButton">
                          <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                            <div class="col-6">
                              <q-btn
                                @click="clearAuthorized"
                                label="Clear"
                                class="full-width"
                                dense
                                color="cyan-7"
                                style="width: 80px"
                              ></q-btn>
                            </div>
                            <div class="col-6">
                              <q-btn
                                class="full-width"
                                dense
                                label="Close"
                                color="negative"
                                v-close-popup
                              ></q-btn>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1FirstName"
                                label="First Name"
                                v-validate="'required|alpha'"
                                data-vv-name="First Name"
                                :error="errors.has('First Name')"
                              />
                              <span
                                v-show="errors.has('First Name')"
                                class="error"
                              >{{ errors.first('First Name') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1MiddleName"
                                label="Middle Name"
                              />
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1LastName"
                                label="Last Name"
                              />
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                v-model="AP1Position"
                                :options="optAP1Position"
                                stack-label
                                :option-label="
                                      optAP1Position =>
                                        optAP1Position.dropdown_details_desc
                                    "
                                :option-value="
                                      optAP1Position => optAP1Position
                                    "
                                emit-value
                                map-options
                                label="Position"
                                v-validate="'required'"
                                data-vv-name="Position"
                                :error="errors.has('Position')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Position</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Position')"
                                class="error"
                              >{{ errors.first('Position') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1MobilePhone"
                                mask="#############"
                                label="Mobile Phone"
                                v-validate="
                                      'required|numeric|min:10|max:12'
                                    "
                                data-vv-name="Mobile Phone"
                                :error="errors.has('Mobile Phone')"
                              />
                              <span
                                v-show="errors.has('Mobile Phone')"
                                class="error"
                              >{{ errors.first('Mobile Phone') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                stack-label
                                v-model="AP1Email"
                                label="Email"
                                v-validate="'required|email'"
                                data-vv-name="Email"
                                :error="errors.has('Email')"
                              />
                              <span
                                v-show="errors.has('Email')"
                                class="error"
                              >{{ errors.first('Email') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1Npwp"
                                mask="##.###.###.#-###.###"
                                label="NPWP"
                                v-validate="'required|min:20|max:20'"
                                data-vv-name="NPWP"
                                :error="errors.has('NPWP')"
                              />
                              <span
                                v-show="errors.has('NPWP')"
                                class="error"
                              >{{ errors.first('NPWP') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                stack-label
                                outlined
                                v-model="AP1IDType"
                                :options="optAP1IDType"
                                label="ID Type"
                                :option-label="
                                      optAP1IDType =>
                                        optAP1IDType.dropdown_details_desc
                                    "
                                :option-value="optAP1IDType => optAP1IDType"
                                emit-value
                                map-options
                                v-validate="'required'"
                                data-vv-name="ID Type"
                                :error="errors.has('ID Type')"
                              />
                              <span
                                v-show="errors.has('ID Type')"
                                class="error"
                              >{{ errors.first('ID Type') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1IDNumber"
                                mask="################"
                                label="ID Number"
                                v-validate="
                                      'required|numeric|min:16|max:16'
                                    "
                                data-vv-name="ID Number"
                                :error="errors.has('ID Number')"
                              />
                              <span
                                v-show="errors.has('ID Number')"
                                class="error"
                              >{{ errors.first('ID Number') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                dense
                                stack-label
                                outlined
                                v-model="AP1IDExpirationDate"
                                label="ID Expiration Date"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy3"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="AP1IDExpirationDate"
                                        mask="YYYY-MM-DD"
                                        @input="
                                              () => $refs.qDateProxy3.hide()
                                            "
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                v-model="CountryContact"
                                :options="optCountryContact"
                                stack-label
                                :option-label="
                                      optCountryContact =>
                                        optCountryContact.country_name
                                    "
                                :option-value="
                                      optCountryContact => optCountryContact
                                    "
                                emit-value
                                map-options
                                @input="
                                      FilterRegionContact(),
                                        ClearCountryContact()
                                    "
                                label="Country"
                                v-validate="'required'"
                                data-vv-name="Country"
                                :error="errors.has('Country')"
                              ></q-select>
                              <span
                                v-show="errors.has('Country')"
                                class="error"
                              >{{ errors.first('Country') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="CountryContact === ''"
                                v-model="RegionContact"
                                :options="optRegionContact"
                                stack-label
                                :option-label="
                                      optRegionContact =>
                                        optRegionContact.region_name
                                    "
                                :option-value="
                                      optRegionContact => optRegionContact
                                    "
                                emit-value
                                map-options
                                @input="
                                      FilterCityContact(), ClearRegionContact()
                                    "
                                label="Region"
                                v-validate="'required'"
                                data-vv-name="Region"
                                :error="errors.has('Region')"
                              ></q-select>
                              <span
                                v-show="errors.has('Region')"
                                class="error"
                              >{{ errors.first('Region') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="RegionContact === ''"
                                dense
                                outlined
                                v-model="CityContact"
                                :options="optCityContact"
                                stack-label
                                :option-label="
                                      optCityContact => optCityContact.city_name
                                    "
                                :option-value="
                                      optCityContact => optCityContact
                                    "
                                emit-value
                                map-options
                                @input="
                                      FilterSubdistrictContact(),
                                        ClearCityContact()
                                    "
                                label="City"
                                v-validate="'required'"
                                data-vv-name="City"
                                :error="errors.has('City')"
                              ></q-select>
                              <span
                                v-show="errors.has('City')"
                                class="error"
                              >{{ errors.first('City') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="CityContact === ''"
                                dense
                                outlined
                                v-model="SubdistrictContact"
                                :options="optSubdistrictContact"
                                stack-label
                                :option-label="
                                      optSubdistrictContact =>
                                        optSubdistrictContact.subdisct_name
                                    "
                                :option-value="
                                      optSubdistrictContact =>
                                        optSubdistrictContact
                                    "
                                emit-value
                                map-options
                                label="Subdistrict"
                                @input="
                                      FilterVillageContact(),
                                        ClearSubdistrictContact()
                                    "
                                v-validate="'required'"
                                data-vv-name="Subdistrict"
                                :error="errors.has('Subdistrict')"
                              ></q-select>
                              <span
                                v-show="errors.has('Subdistrict')"
                                class="error"
                              >{{ errors.first('Subdistrict') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="SubdistrictContact === ''"
                                v-model="VillageContact"
                                :options="optVillageContact"
                                stack-label
                                :option-label="
                                      optVillageContact =>
                                        optVillageContact.village_name
                                    "
                                :option-value="
                                      optVillageContact => optVillageContact
                                    "
                                emit-value
                                map-options
                                label="District"
                                v-validate="'required'"
                                data-vv-name="District"
                                :error="errors.has('District')"
                              ></q-select>
                              <span
                                v-show="errors.has('District')"
                                class="error"
                              >{{ errors.first('District') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field dense outlined label="Postal Code" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ VillageContact.postal_code }}</div>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Postal Code</q-tooltip>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                outlined
                                v-model="DomicileContact"
                                label="Domicile Address *"
                                type="textarea"
                                stack-label
                                float-label="Textarea"
                                :max-height="80"
                                rows="5"
                                v-validate="'required'"
                                data-vv-name="Domicile Address *"
                                :error="errors.has('Domicile Address *')"
                              ></q-input>
                              <span
                                v-show="errors.has('Domicile Address *')"
                                class="error"
                              >{{ errors.first('Domicile Address *') }}</span>
                            </div>
                            <div class="col-12">
                              <q-btn
                                class="full-width"
                                dense
                                :loading="adding"
                                @click="AddButton"
                                label="Add"
                                :disable="
                                      errors.any() ||
                                        AP1FirstName === '' ||
                                        AP1IDNumber === '' ||
                                        AP1Position === '' ||
                                        AP1MobilePhone === '' ||
                                        AP1Email === '' ||
                                        AP1IDType === '' ||
                                        AP1Npwp === '' ||
                                        CountryContact === '' ||
                                        RegionContact === '' ||
                                        CityContact === '' ||
                                        SubdistrictContact === '' ||
                                        VillageContact === '' ||
                                        DomicileContact === ''
                                    "
                                color="accent"
                              ></q-btn>
                            </div>
                          </div>
                        </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </q-tab-panel>

                <q-tab-panel name="three">
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">CIF Info</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field outlined label="Global Cif Number" stack-label>
                            <template v-slot:control>
                              <div class="self-center full-width no-outline" tabindex="0">{{ GlobalCifNumber }}</div>
                            </template>
                          </q-field>
                          <span v-show="errors.has('Global CIF Number')"
                            class="error">{{ errors.first('Global CIF Number') }}</span>
                        </div>-->
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="BranchName"
                            :options="optBranchName"
                            label="Branch Name *"
                            stack-label
                            :option-label="
                                  optBranchName => optBranchName.branch_name
                                "
                            :option-value="optBranchName => optBranchName"
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
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                                outlined
                                v-model="SalesName"
                                :options="optSalesName"
                                label="Sales Name *"
                                stack-label
                                :option-label="optSalesName => optSalesName.sales_name"
                                :option-value="optSalesName => optSalesName"
                                emit-value
                                @input="getWaperd"
                                map-options
                                v-validate="'required'"
                                data-vv-name="Sales Name"
                                :error="errors.has('Sales Name')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Sales Name</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Sales Name')"
                                class="error"
                              >{{ errors.first('Sales Name') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Branch WAPERD" stack-label>
                                <template v-slot:control>
                                  <div class="self-center full-width no-outline" tabindex="0">{{ BranchWaperd }}</div>
                                </template>
                              </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="WAPERD" stack-label>
                                <template v-slot:control>
                                  <div class="self-center full-width no-outline" tabindex="0">{{ Waperd }}</div>
                                </template>
                              </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Registration Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ RegistrationDate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Date Last Update" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ DateLastUpdate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="LobCode"
                            :options="optLobCode"
                            label="LOB Code"
                            stack-label
                            :option-label="
                                  optLobCode => optLobCode.dropdown_details_desc
                                "
                            :option-value="optLobCode => optLobCode"
                            emit-value
                            map-options
                            v-validate="'required'"
                            data-vv-name="LOB Code"
                            :error="errors.has('LOB Code')"
                          />
                          <span
                            v-show="errors.has('LOB Code')"
                            class="error"
                          >{{ errors.first('LOB Code') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="CustomerGroup"
                            :options="optCustomerGroup"
                            stack-label
                            :option-label="
                                  optCustomerGroup =>
                                    optCustomerGroup.dropdown_details_desc
                                "
                            :option-value="
                                  optCustomerGroup => optCustomerGroup
                                "
                            emit-value
                            map-options
                            label="Customer Group"
                            v-validate="'required'"
                            data-vv-name="Customer Group"
                            :error="errors.has('Customer Group')"
                          />
                          <span
                            v-show="errors.has('Customer Group')"
                            class="error"
                          >{{ errors.first('Customer Group') }}</span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="q-gutter-sm">
                        <q-btn
                          :loading="LoadDetail"
                          @click="ActionDetailBank"
                          style="width:75px"
                          color="primary"
                          icon="ion-add"
                          v-ripple
                        >
                          <q-tooltip>Add</q-tooltip>
                        </q-btn>
                        <q-btn
                          @click="DeleteDialogBank"
                          :disable="selectedBank.length === 0"
                          style="width:75px"
                          color="negative"
                          icon="eva-trash-2"
                          v-ripple
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </div>
                    </q-card-section>

                    <q-card-section>
                      <q-table
                        title="Account Info"
                        class="q-ml-sm q-mr-sm table-label-color"
                        :grid="$q.screen.xs"
                        :data="listDataBank"
                        :columns="columnsBank"
                        row-key="order_key"
                        selection="single"
                        :selected.sync="selectedBank"
                        separator="cell"
                        :loading="loading"
                        color="primary"
                        wrap-cells
                      ></q-table>
                    </q-card-section>
                    <q-dialog v-model="AccountInfo">
                      <q-card style="width: 400px; max-width: 80vw;">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent>
                            <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                              <div class="col-6">
                                <q-btn
                                  class="full-width"
                                  dense
                                  @click="clearBank"
                                  label="Clear"
                                  color="cyan-7"
                                  style="width: 80px"
                                ></q-btn>
                              </div>
                              <div class="col-6">
                                <q-btn
                                  class="full-width"
                                  dense
                                  label="Close"
                                  color="negative"
                                  v-close-popup
                                ></q-btn>
                              </div>
                              <div class="col-12">
                                <q-input
                                  stack-label
                                  outlined
                                  dense
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
                                <span v-show="errors.has('Account Number')" class="error">
                                  {{
                                  errors.first('Account Number')
                                  }}
                                </span>
                              </div>
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="Bank"
                                  :options="optBank"
                                  label="Bank *"
                                  v-validate="'required'"
                                  data-vv-name="Bank"
                                  stack-label
                                  :option-label="
                                        optBank => optBank.dropdown_details_desc
                                      "
                                  :option-value="optBank => optBank"
                                  emit-value
                                  map-options
                                  :error="errors.has('Bank')"
                                  :error-label="errors.first('Bank')"
                                >
                                  <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    content-style="font-size: 11px"
                                    :offset="[10, 10]"
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >Bank</q-tooltip>
                                </q-select>
                                <span
                                  v-show="errors.has('Bank')"
                                  class="error"
                                >{{ errors.first('Bank') }}</span>
                              </div>
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="AccountType"
                                  :options="optAccountType"
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
                                  label="Account Type *"
                                  v-validate="'required'"
                                  data-vv-name="Account Type"
                                  :error="errors.has('Account Type')"
                                  :error-label="
                                        errors.first('Account Type')
                                      "
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
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="Currency"
                                  :options="optCurrency"
                                  stack-label
                                  :option-label="
                                        optCurrency =>
                                          optCurrency.currencies_code
                                      "
                                  :option-value="optCurrency => optCurrency"
                                  emit-value
                                  map-options
                                  label="Currency *"
                                  v-validate="'required'"
                                  data-vv-name="Currency"
                                  :error="errors.has('Currency')"
                                  :error-label="errors.first('Currency')"
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
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="StatusBank"
                                  :options="optStatus"
                                  label="Status *"
                                  v-validate="'required'"
                                  data-vv-name="Status"
                                  stack-label
                                  :option-label="
                                        optStatus =>
                                          optStatus.dropdown_details_desc
                                      "
                                  :option-value="optStatus => optStatus"
                                  emit-value
                                  map-options
                                  :error="errors.has('Status')"
                                  :error-label="errors.first('Status')"
                                  @blur="clearValidate()"
                                >
                                  <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    content-style="font-size: 11px"
                                    :offset="[10, 10]"
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >Status</q-tooltip>
                                </q-select>
                                <span
                                  v-show="errors.has('Status')"
                                  class="error"
                                >{{ errors.first('Status') }}</span>
                              </div>
                              <div class="col-12">
                                <q-select
                                  dense
                                  disable
                                  outlined
                                  v-model="Default"
                                  :options="optDefault"
                                  label="Default"
                                  stack-label
                                >
                                  <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    content-style="font-size: 11px"
                                    :offset="[10, 10]"
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >Default</q-tooltip>
                                </q-select>
                              </div>
                              <div class="col-12">
                                <q-btn
                                  class="full-width"
                                  dense
                                  :loading="adding"
                                  @click="AddButtonBank"
                                  :disable="
                                        AccountNumber === '' ||
                                          Bank === '' ||
                                          Currency === '' ||
                                          AccountType === '' ||
                                          StatusBank === ''
                                      "
                                  label="Add"
                                  color="accent"
                                ></q-btn>
                              </div>
                            </div>
                          </form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="four">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-pa-sm">
                      <batm-upload
                        :Muser="userdata"
                        :ugAccessToken="token"
                        :optDocuments="optDocumentCategory"
                        :dataUpload="dataUploaded"
                        :status="multiple"
                        :callMethod="onGetOptDocuments"
                      ></batm-upload>
                    </div>
                    <br />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="five">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="TaxIdNumber"
                          mask="##.###.###.#-###.###"
                          label="Tax ID Number"
                          v-validate="'required|min:20|max:20'"
                          data-vv-name="Tax ID Number"
                          :error="errors.has('Tax ID Number')"
                        />
                        <span
                          v-show="errors.has('Tax ID Number')"
                          class="error"
                        >{{ errors.first('Tax ID Number') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="TinForeignTin"
                          mask="##.###.###.#-###.###"
                          label="TIN / Foreign TIN"
                          v-validate="'required|min:20|max:20'"
                          data-vv-name="TIN / Foreign TIN"
                          :error="errors.has('TIN / Foreign TIN')"
                        />
                        <span
                          v-show="errors.has('TIN / Foreign TIN')"
                          class="error"
                        >{{ errors.first('TIN / Foreign TIN') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="IssuanceCountry"
                          :options="optIssuanceCountry"
                          stack-label
                          :option-label="
                                optIssuanceCountry =>
                                  optIssuanceCountry.country_name
                              "
                          :option-value="
                                optIssuanceCountry => optIssuanceCountry
                              "
                          emit-value
                          map-options
                          label="Issuance Country *"
                          v-validate="'required'"
                          data-vv-name="Issuance Country"
                          :error="errors.has('Issuance Country')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >Issuance Country</q-tooltip>
                        </q-select>
                        <span
                          v-show="errors.has('Issuance Country')"
                          class="error"
                        >{{ errors.first('Issuance Country') }}</span>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="GIIN"
                          label="GIIN"
                          v-validate="'required'"
                          data-vv-name="GIIN"
                          :error="errors.has('GIIN')"
                        />
                        <span v-show="errors.has('GIIN')" class="error">
                          {{
                          errors.first('GIIN')
                          }}
                        </span>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-input
                          stack-label
                          outlined
                          v-model="SubsOwnerName"
                          label="Substantial U.S Owner Name"
                          v-validate="'required'"
                          data-vv-name="Subs U.S Owner Name"
                          :error="errors.has('Subs U.S Owner Name')"
                        />
                        <span
                          v-show="errors.has('Subs U.S Owner Name')"
                          class="error"
                        >{{ errors.first('Subs U.S Owner Name') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-input
                          stack-label
                          outlined
                          v-model="SubsOwnerAddress"
                          label="Domicile Address"
                          type="textarea"
                          float-label="Textarea"
                          :max-height="100"
                          rows="5"
                          v-validate="'required'"
                          data-vv-name="Domicile Address"
                          :error="errors.has('Domicile Address')"
                        />
                        <span
                          v-show="errors.has('Domicile Address')"
                          class="error"
                        >{{ errors.first('Domicile Address') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-input
                          stack-label
                          outlined
                          v-model="SubsOwnerTIN"
                          label="Substantial U.S Owner TIN"
                          v-validate="'required'"
                          data-vv-name="Subs U.S Owner TIN"
                          :error="errors.has('Subs U.S Owner TIN')"
                          @blur="clearValidate()"
                        />
                        <span
                          v-show="errors.has('Subs U.S Owner TIN')"
                          class="error"
                        >{{ errors.first('Subs U.S Owner TIN') }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </form>
        </q-card-section>

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
                :loading="submitting"
                @click="submitDialog"
                :disable="
                errors.any() ||
                  !isFormInValid ||
                  ProfitInfo3YearsAgo === '' ||
                  TaxIdNumber === '' ||
                  TinForeignTin === '' ||
                  IssuanceCountry === '' ||
                  GIIN === '' ||
                  SubsOwnerName === '' ||
                  SubsOwnerAddress === '' ||
                  SubsOwnerTIN === '' ||
                  Status === '' ||
                  listDataBank.length === 0 ||
                  dataUploaded.length === 0 ||
                  listData.length === 0
                  || draggingFab"
                label="Submit"
                color="accent"
                external-label
                label-position="left"
                icon="reply"
                push
              />
              <q-fab-action
                @click="cancelDialog"
                label="Cancel"
                color="negative"
                external-label
                label-position="left"
                push
                icon="clear"
                :disable="draggingFab"
              />
              <q-fab-action
                label="Clear"
                :disable=" draggingFab"
                @click="clearButton"
                color="cyan-7"
                external-label
                label-position="left"
                icon="cached"
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
              push
              padding="5px"
              :disable="draggingFab"
              v-touch-pan.prevent.mouse="moveFab"
            >
              <q-fab-action
                :loading="submitting"
                @click="submitDialog"
                :disable="
                errors.any() ||
                  !isFormInValid ||
                  ProfitInfo3YearsAgo === '' ||
                  TaxIdNumber === '' ||
                  TinForeignTin === '' ||
                  IssuanceCountry === '' ||
                  GIIN === '' ||
                  SubsOwnerName === '' ||
                  SubsOwnerAddress === '' ||
                  SubsOwnerTIN === '' ||
                  Status === '' ||
                  listDataBank.length === 0 ||
                  dataUploaded.length === 0 ||
                  listData.length === 0
                  || draggingFab"
                label="Submit"
                color="accent"
                icon="reply"
                push
                square
                label-position="bottom"
                padding="4px"
              />
              <q-fab-action
                @click="cancelDialog"
                label="Cancel"
                color="negative"
                push
                icon="clear"
                :disable="draggingFab"
                square
                label-position="bottom"
                padding="4px"
              />
              <q-fab-action
                label="Clear"
                :disable=" draggingFab"
                @click="clearButton"
                color="cyan-7"
                icon="cached"
                push
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
import { date } from 'quasar'
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import {
  InsCorporateCustomer,
  InsertCustCorporateDocument,
  GetGenerateCIFCorporate
} from 'src/graphql/Customer/CorporateCustomer'
import { GetBranch } from 'src/graphql/MasterBranch'
import { GetAllSales } from 'src/graphql/MasterSales'
import { GetMasterCountries } from 'src/graphql/Countries'
import { GetMasterCurrency } from 'src/graphql/Currency'
import {
  ViewFilterRegion,
  ViewFilterCities,
  ViewFilterSubdistrict,
  ViewFilterVillage
} from 'src/graphql/PostalCode'
import uploadDocument from 'components/UploadDocuments/UploadDocuments.vue'
import { mapState } from 'vuex'
export default {
  name: 'AddCustomerCorporate',
  props: ['Muser', 'ugAccessToken'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      // data generate
      GlobalCifNumberMaster: [],
      GlobalCifNumberNext: [],
      token: this.ugAccessToken,
      userdata: this.Muser,
      multiple: true,
      //
      submitting: false,
      tab: 'one',
      mode: 'Corporate',
      // tab one
      optOwnership: [],
      Ownership: '',
      CompanyName: '',
      SIUPNo: '',
      SIUPExpDate: '',
      SKDNo: '',
      SKDExpDate: '',
      DateOfEstablishment: '',
      PlaceOfEstablishment: '',
      optPlaceOfEstablishment1: [],
      CountryOfEstablishment: '',
      optCountryOfEstablishment: [],
      ArticlesOfAssosiationNo: '',
      CompanyType: '',
      optCompanyType: [],
      CompanyCharacteristic: '',
      optCompanyCharacteristic: [],
      IncomeLevel: '',
      optIncomeLevel: [],
      InvestorRiskProfile: '',
      optInvestorRiskProfile: [],
      InvestmentObjective: '',
      optInvestmentObjective: [],
      SourceOfFund: '',
      optSourceOfFund: [],
      AssetOwner: '',
      StatementType: '',
      optStatementType: [],
      AssetInfoLastYear: '',
      AssetInfo2YearsAgo: '',
      AssetInfo3YearsAgo: '',
      ProfitInfoLastYear: '',
      ProfitInfo2YearsAgo: '',
      ProfitInfo3YearsAgo: '',
      // tab two

      CountryContact: '',
      RegionContact: '',
      CityContact: '',
      ProvinceContact: '',
      SubdistrictContact: '',
      VillageContact: '',
      DomicileContact: '',
      optCountryContact: [],
      optRegionContact: [],
      optCityContact: [],
      optSubdistrictContact: [],
      optVillageContact: [],
      sortorder: 0,
      adding: false,
      LoadDetail: false,
      loading: false,
      AuthorizedAdd: false,
      selectedAuthorized: [],
      AP1FirstName: '',
      AP1MiddleName: '',
      AP1LastName: '',
      AP1Position: '',
      optAP1Position: [],
      AP1MobilePhone: '',
      AP1Email: '',
      AP1Npwp: '',
      AP1IDType: '',
      optAP1IDType: [],
      AP1IDNumber: '',
      AP1IDExpirationDate: '',
      columnsAuthorized: [
        {
          name: 'fullname',
          label: 'Full Name',
          field: 'fullname',
          align: 'Left'
        },
        {
          name: 'position',
          label: 'Position',
          field: 'position',
          align: 'Left'
        },
        {
          name: 'mobile_phone',
          label: 'Mobile Phone',
          field: 'mobile_phone',
          align: 'Left'
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'Left'
        },
        {
          name: 'domicile_address',
          label: 'Address',
          field: 'domicile_address',
          align: 'Left'
        }
      ],
      //
      Address: '',
      Email: '',
      Country: '',
      optCountry: [],
      Region: '',
      optRegion: [],
      City: '',
      optCity: [],
      Province: '',
      Subdistrict: '',
      optSubdistrict: [],
      Village: '',
      optVillage: [],
      PostCode: '',
      Phone1: '',
      Phone2: '',
      Fax1: '',
      Fax2: '',
      //
      // tab three
      GlobalCifNumber: '',
      BranchName: '',
      optBranchName: [],
      // optBranchName1: this.optBranchName,
      BranchSales: '',
      SalesName: '',
      Waperd: '',
      BranchWaperd: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: '',
      optLobCode: [],
      CustomerGroup: '',
      optCustomerGroup: [],
      AccountNumber: '',
      optStatus: [],
      Status: '',
      StatusBank: '',
      optDefault: [],
      Default: '',
      Bank: '',
      optBank: [],
      AccountType: '',
      optAccountType: [],
      Currency: '',
      optCurrency: [],
      listDataBank: [],
      selectedBank: [],
      AccountInfo: false,
      columnsBank: [
        {
          name: 'account_number',
          label: 'Account Number',
          field: 'account_number',
          align: 'Left',
          sortable: true
        },
        {
          name: 'bank',
          label: 'Bank',
          field: 'bank',
          align: 'Left'
        },
        {
          name: 'account_type',
          label: 'Account Type',
          field: 'account_type',
          align: 'Left'
        },
        {
          name: 'currency',
          label: 'Currency',
          field: 'currency',
          align: 'Left'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'Left'
        }
      ],
      // tab four
      listData: [],
      DocumentCategory: '',
      optDocumentCategory: [],
      file: null,
      preview: '',
      isFileOK: false,
      dataUploaded: [],
      DocumentUpload: '',
      selectedFile: [],
      selected2: [],
      dataSubmit: [],
      tableThs: [
        {
          name: 'Name',
          label: 'Name File',
          field: row => row.name,
          align: 'left',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Size',
          label: 'Size (byte)',
          field: row => row.size,
          align: 'center'
        }
      ],
      // tab five
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: '',
      optIssuanceCountry: [],
      GIIN: '',
      SubsOwnerName: '',
      SubsOwnerAddress: '',
      SubsOwnerTIN: '',
      shape: 'Corporate',
      //
      saveddata: [],
      saving: false,
      statedelete: '',
      money: {
        decimal: '.',
        thousands: ',',
        precision: 2,
        masked: false
      },
      ActiveTab1: '',
      ActiveTab2: '',
      ActiveTab3: '',
      ActiveTab4: ''
    }
  },
  components: {
    BatmUpload: uploadDocument
  },
  apollo: {
    optSalesName: {
      query: GetAllSales,
      update: data => data.wms_sales
    },
    optCountry: {
      query: GetMasterCountries,
      update: data => data.wms_countries
    },
    optRegion: {
      query: ViewFilterRegion,
      update: data => data.wms_region,
      variables: {
        code: init
      }
    },
    optCity: {
      query: ViewFilterCities,
      update: data => data.wms_cities,
      variables: {
        code: init
      }
    },
    optSubdistrict: {
      query: ViewFilterSubdistrict,
      update: data => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optVillage: {
      query: ViewFilterVillage,
      update: data => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optCountryContact: {
      query: GetMasterCountries,
      update: data => data.wms_countries
    },
    optRegionContact: {
      query: ViewFilterRegion,
      update: data => data.wms_region,
      variables: {
        code: init
      }
    },
    optCityContact: {
      query: ViewFilterCities,
      update: data => data.wms_cities,
      variables: {
        code: init
      }
    },
    optSubdistrictContact: {
      query: ViewFilterSubdistrict,
      update: data => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optVillageContact: {
      query: ViewFilterVillage,
      update: data => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optAccountType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Account Type'
      }
    },
    optOwnership: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Ownership'
      }
    },
    optBank: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Bank'
      }
    },
    optStatus: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Status'
      }
    },
    optCompanyType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Company Type'
      }
    },
    optCompanyCharacteristic: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Company Characteristic'
      }
    },
    onGetOptDocumentCategory: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Document Category'
      }
    },
    optIncomeLevel: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Income Level'
      }
    },
    optInvestorRiskProfile: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Risk Profile'
      }
    },
    optInvestmentObjective: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Investment Objective'
      }
    },
    optSourceOfFund: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Source Of Fund'
      }
    },
    optStatementType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Statement Type'
      }
    },
    optLobCode: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'LOB Code'
      }
    },
    optCustomerGroup: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Customer Group'
      }
    },
    optAP1Position: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Position'
      }
    },
    optAP1IDType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optBranchName: {
      query: GetBranch,
      update: data => data.wms_branches
    },
    optIssuanceCountry: {
      query: GetMasterCountries,
      update: data => data.wms_countries
    },
    optCurrency: {
      query: GetMasterCurrency,
      update: data => data.wms_currencies
    },
    loadgenerateCifCorporate: {
      query: GetGenerateCIFCorporate,
      update: data => data.wms_customer_corporate
    }
  },
  mounted() {
    localStorage.removeItem('dataUpload')
    this.RegistrationDate = this.now2
    this.DateLastUpdate = this.now2
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    isDocumentValid() {
      if (this.selectedFile.length > 0) {
        return true
      } else {
        return false
      }
    },
    isFormInValid() {
      this.$log.info('info call at function isFormInValids')
      let validate = Object.keys(this.field).some(
        key => this.field[key].validated
      )
      return validate
    },
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2: () => date.formatDate(Date.now(), 'YYYY-MM-DD')
  },
  methods: {
    onGetOptDocuments() {
      if (this.dataUploaded.length === 0) {
        this.optDocumentCategory = this.onGetOptDocumentCategory
        // return this.optDocumentCategory
      } else {
        let arrOpt = []
        this.dataUploaded = JSON.parse(localStorage.dataUpload)
        for (let i = 0; i < this.dataUploaded.length; i++) {
          arrOpt.push(this.dataUploaded[i].name)
        }
        setTimeout(() => {
          this.$apollo.queries.onGetOptDocumentCategory
            .refetch()
            .then((response) => {
              let data = response.data.wms_dropdownlist_details
              this.$nextTick(() => {
                this.optDocumentCategory = this.onGetOptDocumentary(
                  arrOpt,
                  data
                )
                // return this.optDocumentCategory
              })
            })
        }, 1000)
      }
    },
    onGetOptDocumentary(arrOpt, opt) {
      for (let i = 0; i < arrOpt.length; i++) {
        opt = opt.filter((val) => {
          return val.dropdown_details_desc !== arrOpt[i]
        })
      }
      return opt
    },
    async refreshDataUpload() {
      await this.onGetOptDocuments()
    },
    getWaperd() {
      if (this.SalesName === '') {
        this.BranchWaperd = ''
        this.Waperd = ''
      } else {
        this.Waperd = this.SalesName.sales_waperd_no
        this.BranchWaperd = this.SalesName.branch_desc.branch_name
      }
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    FilterRegion() {
      this.$q.loading.show()
      this.$apollo.queries.optRegion
        .refetch({
          code: this.Country.country_name
        })
        .then(response => {
          this.optRegion = response.data.wms_region
          this.$q.loading.hide()
        })
    },
    FilterCity() {
      this.$q.loading.show()
      this.$apollo.queries.optCity
        .refetch({
          code: this.Region.region_name
        })
        .then(response => {
          this.optCity = response.data.wms_cities
          this.$q.loading.hide()
        })
    },
    FilterSubdistrict() {
      this.$q.loading.show()
      this.$apollo.queries.optSubdistrict
        .refetch({
          code: this.City.city_name
        })
        .then(response => {
          this.optSubdistrict = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    FilterVillage() {
      this.$q.loading.show()
      this.$apollo.queries.optVillage
        .refetch({
          code: this.Subdistrict.subdisct_name
        })
        .then(response => {
          this.optVillage = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    ClearCountry() {
      this.Region = ''
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
      this.Village.postal_code = ''
    },
    ClearRegion() {
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
      this.Village.postal_code = ''
    },
    ClearCity() {
      this.Subdistrict = ''
      this.Village = ''
      this.Village.postal_code = ''
    },
    ClearSubdistrict() {
      this.Village = ''
      this.Village.postal_code = ''
    },
    FilterRegionContact() {
      this.$q.loading.show()
      this.$apollo.queries.optRegionContact
        .refetch({
          code: this.CountryContact.country_name
        })
        .then(response => {
          this.optRegionContact = response.data.wms_region
          this.$q.loading.hide()
        })
    },
    FilterCityContact() {
      this.$q.loading.show()
      this.$apollo.queries.optCityContact
        .refetch({
          code: this.RegionContact.region_name
        })
        .then(response => {
          this.optCityContact = response.data.wms_cities
          this.$q.loading.hide()
        })
    },
    FilterSubdistrictContact() {
      this.$q.loading.show()
      this.$apollo.queries.optSubdistrictContact
        .refetch({
          code: this.CityContact.city_name
        })
        .then(response => {
          this.optSubdistrict = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    FilterVillageContact() {
      this.$q.loading.show()
      this.$apollo.queries.optVillageContact
        .refetch({
          code: this.SubdistrictContact.subdisct_name
        })
        .then(response => {
          this.optVillage = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    ClearCountryContact() {
      this.RegionContact = ''
      this.CityContact = ''
      this.SubdistrictContact = ''
      this.VillageContact = ''
      this.VillageContact.postal_code = ''
    },
    ClearRegionContact() {
      this.CityContact = ''
      this.SubdistrictContact = ''
      this.VillageContact = ''
      this.VillageContact.postal_code = ''
    },
    ClearCityContact() {
      this.SubdistrictContact = ''
      this.VillageContact = ''
      this.VillageContact.postal_code = ''
    },
    ClearSubdistrictContact() {
      this.VillageContact = ''
      this.VillageContact.postal_code = ''
    },
    onLoadCustomerCorporate() {
      this.submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadgenerateCifCorporate
          .refetch()
          .then(response => {
            this.GlobalCifNumberMaster = response.data.wms_customer_corporate
            console.log(this.GlobalCifNumberMaster, '=======>>>>0101001')
            this.generateCIFNumber()
          })
      }, 2000)
    },
    AddButtonBank() {
      this.adding = true
      // Simulating a delay here.
      // When we are done, we reset "submitting"
      // Boolean to false to restore the
      // initial state.

      setTimeout(() => {
        this.adding = true
        this.sortorder += 1
        // delay simulated, we are done,
        // now restoring submit to its initial state
        this.listDataBank.push({
          order_key: this.sortorder,
          account_number: this.AccountNumber,
          id_bank: this.Bank.id_dropdownlist_detail,
          bank: this.Bank.dropdown_details_desc,
          id_account_type: this.AccountType.id_dropdownlist_detail,
          account_type: this.AccountType.dropdown_details_desc,
          id_currency: this.Currency.id,
          currency: this.Currency.currencies_code,
          id_status: this.Status.id_dropdownlist_detail,
          status: this.StatusBank.dropdown_details_desc,
          default: this.Default,
          created_by: this.userdata.name,
          created_date: this.now
        })
        this.adding = false
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message:
            'Account Number ' + this.AccountNumber + ' ' + 'Has Been Added'
        })
        this.ClearBankData()
      }, 3000)
    },
    delOrderKeyBank() {
      this.listDataBank.forEach(key => {
        Object.keys(key).forEach(val => {
          if (val === 'order_key') {
            delete key[`${val}`]
          }
          if (val === 'currency') {
            delete key[`${val}`]
          }
          if (val === 'account_type') {
            delete key[`${val}`]
          }
          if (val === 'bank') {
            delete key[`${val}`]
          }
          if (val === 'status') {
            delete key[`${val}`]
          }
        })
        console.log(this.listDataBank, '===data')
      })
    },
    DeleteDialogBank() {
      this.$log.info('info call at function DeleteDialog')
      this.$q
        .dialog({
          title: 'Confirmation',
          message: 'Do you want to remove data ?',

          persistent: true,

          ok: {
            icon: 'eva-trash-2',
            label: 'Delete',
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
          this.DeleteButtonBank()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    DeleteButtonBank() {
      for (let i = 0; i < this.listDataBank.length; i++) {
        if (this.listDataBank[i].order_key === this.selectedBank[0].order_key) {
          this.listDataBank.splice(i, 1)
        }
      }
      this.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'fas fa-exclamation-circle',
        message: 'The Data Has Been Removed'
      })
    },
    DeleteDialogContact() {
      this.$log.info('info call at function DeleteDialog')
      this.$q
        .dialog({
          title: 'Confirmation',
          message: 'Do you want to remove data ?',

          persistent: true,

          ok: {
            icon: 'eva-trash-2',
            label: 'Delete',
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
          this.DeleteButton()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    DeleteButton() {
      for (let i = 0; i < this.listData.length; i++) {
        if (
          this.listData[i].order_key === this.selectedAuthorized[0].order_key
        ) {
          this.listData.splice(i, 1)
        }
      }
      this.$q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'fas fa-exclamation-circle',
        message: 'The Data Has Been Removed'
      })
    },
    delOrderKey() {
      this.listData.forEach(key => {
        Object.keys(key).forEach(val => {
          if (val === 'order_key') {
            delete key[`${val}`]
          }
          if (val === 'position') {
            delete key[`${val}`]
          }
          if (val === 'gcif_number') {
            delete key[`${val}`]
          }
        })
        console.log(this.listData, '===data')
      })
    },
    AddButton() {
      this.adding = true
      // Simulating a delay here.
      // When we are done, we reset "submitting"
      // Boolean to false to restore the
      // initial state.

      setTimeout(() => {
        this.adding = true
        this.sortorder += 1
        // delay simulated, we are done,
        // now restoring submit to its initial state
        this.listData.push({
          order_key: this.sortorder,
          gcif_number: this.GlobalCifNumber,
          first_name: this.AP1FirstName,
          middle_name: this.AP1MiddleName,
          last_name: this.AP1LastName,
          id_position: this.AP1Position.id_dropdownlist_detail,
          mobile_phone: this.AP1MobilePhone,
          email: this.AP1Email,
          npwp: this.AP1Npwp,
          id_type: this.AP1IDType.id_dropdownlist_detail,
          id_number: this.AP1IDNumber,
          id_exp_date: this.AP1IDExpirationDate,
          fullname: this.AP1FirstName + ' ' + this.AP1LastName,
          position: this.AP1Position.dropdown_details_desc,
          domicile_address: this.DomicileContact,
          id_postalcode: this.VillageContact.id_postal_code,
          created_by: this.userdata.name,
          created_date: this.now
        })
        this.adding = false

        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Contact ' + this.AP1FirstName + ' Has Been Added'
        })
        this.cleardataAut()
      }, 3000)
    },
    cleardataAut() {
      this.AP1FirstName = ''
      this.AP1MiddleName = ''
      this.AP1LastName = ''
      this.AP1Position = ''
      this.AP1MobilePhone = ''
      this.AP1Email = ''
      this.AP1Npwp = ''
      this.AP1IDType = ''
      this.AP1IDNumber = ''
      this.AP1IDExpirationDate = ''
      this.CountryContact = ''
      this.RegionContact = ''
      this.CityContact = ''
      this.SubdistrictContact = ''
      this.VillageContact = ''
      this.DomicileContact = ''
      this.$validator.reset()
    },
    ClearBankData() {
      this.AccountNumber = ''
      this.Bank = ''
      this.AccountType = ''
      this.Currency = ''
      this.StatusBank = ''
      this.Default = ''
      this.$validator.reset()
    },
    clearBank() {
      this.$log.info('info call at function cancelDialog')
      this.AccountNumber = ''
      this.Bank = ''
      this.AccountType = ''
      this.Currency = ''
      this.StatusBank = ''
      this.Default = ''
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    clearAuthorized() {
      this.$log.info('info call at function cancelDialog')
      this.AP1FirstName = ''
      this.AP1MiddleName = ''
      this.AP1LastName = ''
      this.AP1Position = ''
      this.AP1MobilePhone = ''
      this.AP1Email = ''
      this.AP1Npwp = ''
      this.AP1IDType = ''
      this.AP1IDNumber = ''
      this.AP1IDExpirationDate = ''
      this.CountryContact = ''
      this.RegionContact = ''
      this.CityContact = ''
      this.SubdistrictContact = ''
      this.VillageContact = ''
      this.DomicileContact = ''
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    ActionDetailBank() {
      this.$log.info('info call at function ActionDetail')
      this.AccountInfo = true
    },
    ActionDetail() {
      this.$log.info('info call at function ActionDetail')
      this.AuthorizedAdd = true
    },
    formatCurrency(num) {
      if (num !== null) {
        num = +num
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    clearValidate() {
      if (this.errors.any()) {
        this.$nextTick(() => {
          this.$validator.reset()
        })
      }
    },
    changeStatusTab1() {
      if (this.ActiveTab1 === '') {
        this.ActiveTab1 = 'active'
      }
    },
    changeStatusTab2() {
      if (this.ActiveTab2 === '') {
        this.ActiveTab2 = 'active'
      }
    },
    changeStatusTab3() {
      if (this.ActiveTab3 === '') {
        this.ActiveTab3 = 'active'
      }
    },
    changeStatusTab4() {
      if (this.ActiveTab4 === '') {
        this.ActiveTab4 = 'active'
      }
    },
    filterPosition(val, update) {
      this.$log.info('info call at function filterPosition')
      if (val === '') {
        update(() => {
          this.optAP1Position1 = this.optAP1Position
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optAP1Position1 = this.optAP1Position.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCompanyCharacteristic(val, update) {
      this.$log.info('info call at function filterCompanyCharacteristic')
      if (val === '') {
        update(() => {
          this.optCompanyCharacteristic1 = this.optCompanyCharacteristic
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optCompanyCharacteristic1 = this.optCompanyCharacteristic.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCompanyType(val, update) {
      this.$log.info('info call at function filterCompanyType')
      if (val === '') {
        update(() => {
          this.optCompanyType1 = this.optCompanyType
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optCompanyType1 = this.optCompanyType.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterSourceOfFund(val, update) {
      this.$log.info('info call at function filterSourceOfFund')
      if (val === '') {
        update(() => {
          this.optSourceOfFund1 = this.optSourceOfFund
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optSourceOfFund1 = this.optSourceOfFund.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterBranchName(val, update) {
      this.$log.info('info call at function filterBranchName')
      if (val === '') {
        update(() => {
          this.optBranchName1 = this.optBranchName
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optBranchName1 = this.optBranchName.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCountryOfEstablishment(val, update) {
      this.$log.info('info call at function filterCountryOfEstablishment')
      if (val === '') {
        update(() => {
          this.optIssuanceCountry = this.optIssuanceCountry1
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optIssuanceCountry = this.optIssuanceCountry1.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterPlaceOfEstablishment(val, update) {
      this.$log.info('info call at function filterPlaceOfEstablishment')
      if (val === '') {
        update(() => {
          this.optPlaceOfEstablishment = this.optPlaceOfEstablishment1
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optPlaceOfEstablishment = this.optPlaceOfEstablishment1.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    generateDataSubmit() {
      for (let i = 0; i < this.dataUploaded.length; i++) {
        let obj = {
          gcif_number: this.GlobalCifNumber,
          document: this.dataUploaded[i].file,
          id_doc_category: this.dataUploaded[i].idname,
          created_by: this.userdata.name,
          created_date: this.now
        }
        this.dataSubmit.push(obj)
      }
      console.log(this.dataSubmit, 'apaaaaainiiiiii')
    },
    addUploadFile() {
      this.dataUploaded = []
      if (!this.isFileOK) {
        this.$q.dialog({
          title: 'Select File',
          message: 'Please select the file first.',
          color: 'error',
          ok: true
        })
      } else if (this.DocumentCategory === '') {
        this.$q.dialog({
          title: 'Select Category Document',
          message: 'Please select the Category Document first.',
          color: 'error',
          ok: true
        })
      } else {
        let checkData = this.filterDuplicateWithAttrObj(
          this.selectedFile,
          'name',
          this.DocumentCategory.dropdown_details_desc
        )
        if (checkData === -1) {
          this.selectedFile.push({
            idname: this.DocumentCategory.id_dropdownlist_detail,
            name: this.DocumentCategory.dropdown_details_desc,
            file: this.preview,
            size: this.file[0].size
          })
          console.log(this.preview, '===>')
          this.dataUploaded = this.selectedFile
          this.getValidForm()
          this.timer = setTimeout(() => {
            if (this.dataUploaded.length > 0) {
              this.$q.notify({
                color: 'secondary',
                icon: 'add',
                message:
                  'Document ' +
                  this.DocumentCategory.dropdown_details_desc +
                  ' Has Been Uploaded'
              })
            }
            this.removeImage()
            this.$q.loading.hide()
            this.timer = void 0
          }, 1000)
        } else {
          this.$q.notify({
            color: 'negative',
            icon: 'fas fa-exclamation-circle',
            message: `Duplicate Document Category`
          })
        }
      }
    },
    filterDuplicateWithAttrObj(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    },
    createImageBase64(file) {
      this.$log.info('info call at function createImageBase64')
      let reader = new FileReader()
      reader.onload = e => {
        this.preview = e.target.result
      }
      if (this.file) {
        reader.readAsDataURL(file)
        this.isFileOK = true
      }
    },
    removeImage() {
      this.$log.info('info call at function removeImage')
      this.$q.loading.show()
      this.timer = setTimeout(() => {
        this.preview = !this.preview
        this.DocumentCategory = ''
        this.isFileOK = false
        this.file = null
        this.$q.loading.hide()
        this.timer = void 0
      }, 200)
    },
    deleteFileSelected(file) {
      this.$log.info('info call at function deleteFileSelected')
      this.timer = setTimeout(() => {
        file = this.$refs.dataTable.selected[0]
        if (this.selectedFile.length > 0 && this.selected2.length > 0) {
          this.selectedFile.splice(this.selectedFile.indexOf(file), 1)
          this.getValidForm()
          this.$q.notify({
            color: 'secondary',
            icon: 'delete',
            message: 'Document ' + this.selected2[0].name + ' Has Been Removed'
          })
          this.checkValid = false
        } else {
          this.$q.dialog({
            title: 'Select File',
            message: 'Please select the file first.',
            color: 'error',
            ok: true
          })
        }
        if (this.selectedFile.length === 0) {
          this.selected2 = []
        }
        this.$q.loading.hide()
        this.timer = void 0
      }, 500)
    },
    getValidForm() {
      this.$log.info('info call at function getValidForm')
      if (this.selectedFile.length > 0) {
        this.DocumentUpload = this.selectedFile.length
      } else {
        this.DocumentUpload = ''
      }
    },
    onFileChange(file) {
      this.$log.info('info call at function onFileChange')
      this.file = file.target.files || file.dataTransfer.files
      let type = this.file[0].type
      if (
        type !== 'image/png' &&
        type !== 'image/jpg' &&
        type !== 'image/jpeg' &&
        type !== 'image/JPEG'
      ) {
        this.$q.dialog({
          title: 'Image format is not suitable',
          message: 'Only allowed to choose images (.jpg, .jpeg, atau .png).',
          color: 'error',
          ok: true
        })
        this.isFileOK = false
      } else {
        if (this.file[0].size > 25250000) {
          this.$q.dialog({
            title: 'Image size is too large',
            message: 'Maximum image size is 25MB',
            color: 'error',
            ok: true
          })
          this.file = null
          this.isFileOK = false
        } else {
          this.isFileOK = true
          this.createImageBase64(this.file[0])
        }
      }
    },
    showLoading() {
      this.$log.info('info call at function showLoading')
      this.$q.loading.show()
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    },
    cancelDialog() {
      this.$log.info('info call at function cancelDialog')
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
          this.$router.push({
            path: '/customer'
          })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    clearButton() {
      this.$log.info('info call at function cancelDialog')
      this.Prefix = ''
      this.CorporateName = ''
      this.SufixN = ''
      this.BusinessType = ''
      this.SubBusinessType = ''
      this.Established = ''
      this.EstablishedYear = ''
      this.ContactPersonName = ''
      this.Shareholder = ''
      this.AP1FirstName = ''
      this.AP1MiddleName = ''
      this.AP1LastName = ''
      this.AP1Position = ''
      this.AP1MobilePhone = ''
      this.AP1Email = ''
      this.AP1Npwp = ''
      this.AP1IDType = ''
      this.AP1IDNumber = ''
      this.AP1IDExpirationDate = ''
      this.AP2FirstName = ''
      this.AP2MiddleName = ''
      this.AP2LastName = ''
      this.AP2Position = ''
      this.AP2MobilePhone = ''
      this.AP2Email = ''
      this.AP2Npwp = ''
      this.AP2IDType = ''
      this.AP2IDNumber = ''
      this.AP2IDExpirationDate = ''
      this.GlobalCifNumber = ''
      this.BranchName = ''
      this.BranchSales = ''
      this.Waperd = ''
      this.BranchWaperd = ''
      this.RegistrationDate = ''
      this.DateLastUpdate = ''
      this.LobCode = ''
      this.CustomerGroup = ''
      this.TaxIdNumber = ''
      this.TinForeignTin = ''
      this.IssuanceCountry = ''
      this.GIIN = ''
      this.SubsOwnerName = ''
      this.SubsOwnerAddress = ''
      this.SubsOwnerTIN = ''
      this.CompanyName = ''
      this.SIUPNo = ''
      this.SIUPExpDate = ''
      this.SKDNo = ''
      this.Status = ''
      this.SKDExpDate = ''
      this.DateOfEstablishment = ''
      this.PlaceOfEstablishment = ''
      this.CountryOfEstablishment = ''
      this.ArticlesOfAssosiationNo = ''
      this.CompanyType = ''
      this.Ownership = ''
      this.CompanyCharacteristic = ''
      this.IncomeLevel = ''
      this.InvestorRiskProfile = ''
      this.InvestmentObjective = ''
      this.SourceOfFund = ''
      this.AssetOwner = ''
      this.StatementType = ''
      this.AssetInfoLastYear = ''
      this.AssetInfo2YearsAgo = ''
      this.AssetInfo3YearsAgo = ''
      this.ProfitInfoLastYear = ''
      this.ProfitInfo2YearsAgo = ''
      this.ProfitInfo3YearsAgo = ''
      this.Address = ''
      this.Email = ''
      this.Phone1 = ''
      this.Phone2 = ''
      this.Fax1 = ''
      this.Fax2 = ''
      this.Country = ''
      this.Village = ''
      this.Subdistrict = ''
      this.City = ''
      this.Region = ''
      this.DocumentUpload = ''
      this.selectedFile = []
      this.dataUploaded = []
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    generateCIFNumber() {
      this.$log.info('info call at function generateCIFNumber')
      this.GlobalCifNumberMaster.forEach(dataCIF => {
        this.GlobalCifNumberNext.push(dataCIF.gcif_number)
      })
      if (this.GlobalCifNumberNext[0] !== undefined) {
        this.GlobalCifNumberNext[0] = this.GlobalCifNumberNext[0].split('-')
        console.log(this.GlobalCifNumberNext[0], '>>>>>>>numbeeer')
        let x = +this.GlobalCifNumberNext[0][1] + 1
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
        this.GlobalCifNumber = 'CORP-' + y
        this.submitButton()
        return this.GlobalCifNumber
      } else {
        this.GlobalCifNumber = 'CORP-' + '0000001'
        this.submitButton()
        return this.GlobalCifNumber
      }
    },
    submitButton() {
      this.dataUploaded = JSON.parse(localStorage.dataUpload)
      this.generateDataSubmit()
      this.delOrderKey()
      this.delOrderKeyBank()
      this.$apollo
        .mutate({
          mutation: InsCorporateCustomer,
          variables: {
            objects: {
              company_name: this.CompanyName,
              siup_exp_date: this.SIUPExpDate,
              siup_no: this.SIUPNo,
              skd_no: this.SKDNo,
              skd_exp_date: this.SKDExpDate,
              id_status: this.Status.id_dropdownlist_detail,
              id_ownership: this.Ownership.id_dropdownlist_detail,
              date_establishment: this.DateOfEstablishment,
              place_establishment: this.PlaceOfEstablishment,
              country_establishment: this.CountryOfEstablishment,
              articles_association_no: this.ArticlesOfAssosiationNo,
              id_company_type: this.CompanyType.id_dropdownlist_detail,
              id_company_characteristic: this.CompanyCharacteristic
                .id_dropdownlist_detail,
              id_income_level: this.IncomeLevel.id_dropdownlist_detail,
              id_investor_risk_profile: this.InvestorRiskProfile
                .id_dropdownlist_detail,
              id_investment_objective: this.InvestmentObjective
                .id_dropdownlist_detail,
              id_source_of_fund: this.SourceOfFund.id_dropdownlist_detail,
              asset_owner: this.AssetOwner,
              id_statement_type: this.StatementType.id_dropdownlist_detail,
              asset_info_last_year: this.AssetInfoLastYear,
              asset_info_two_year: this.AssetInfo2YearsAgo,
              asset_info_three_year: this.AssetInfo3YearsAgo,
              profit_info_last_year: this.ProfitInfoLastYear,
              profit_info_two_year: this.ProfitInfo2YearsAgo,
              profit_info_three_year: this.ProfitInfo3YearsAgo,
              //
              corporate_address: this.Address,
              corporate_email: this.Email,
              corporate_phone1: this.Phone1,
              corporate_phone2: this.Phone2,
              corporate_fax1: this.Fax1,
              corporate_fax2: this.Fax2,
              id_postalcode: this.Village.id_postal_code,
              //
              gcif_number: this.GlobalCifNumber,
              id_branch: this.BranchName.id_branch,
              id_sales: this.SalesName.id_sales,
              branch_waperd: this.BranchWaperd,
              waperd: this.Waperd,
              registration_date: this.RegistrationDate,
              date_last_update: this.DateLastUpdate,
              id_lob_code: this.LobCode.id_dropdownlist_detail,
              id_customer_group: this.CustomerGroup.id_dropdownlist_detail,
              tax_id_number: this.TaxIdNumber,
              tin_foreign_tin: this.TinForeignTin,
              id_country: this.IssuanceCountry.id_country,
              giin: this.GIIN,
              subs_us_owner_name: this.SubsOwnerName,
              domicile_address: this.SubsOwnerAddress,
              subs_us_owner_tin: this.SubsOwnerTIN,
              fullname: this.CompanyName,
              created_date: this.now,
              created_by: this.userdata.name,
              customer_corporate_contact: { data: this.listData },
              customer_corporate_Account_Bank: { data: this.listDataBank }
            }
          }
        })
        .then(response => {
          this.$apollo.mutate({
            mutation: InsertCustCorporateDocument,
            variables: {
              objects: this.dataSubmit
            }
          })
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Customer ' + this.GlobalCifNumber + ' ' + 'Has Been Submitted'
          })
          this.AuditTrail()
          this.$router.push({ path: '/customer' })
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
    AuditTrail() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Add',
            date_auditrail: this.now,
            menu: 'Customer Registration',
            fullname: this.userdata.name,
            username: this.userdata.preferred_username,
            submenu: 'Customer Corporate',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    ClearButton() {
      this.$log.info('info call at function ClearButton')
      this.Prefix = ''
      this.CorporateName = ''
      this.SufixN = ''
      this.BusinessType = ''
      this.SubBusinessType = ''
      this.Established = ''
      this.EstablishedYear = ''
      this.ContactPersonName = ''
      this.Shareholder = ''
      this.AP1FirstName = ''
      this.AP1MiddleName = ''
      this.AP1LastName = ''
      this.AP1Position = ''
      this.AP1MobEmaililePhone = ''
      this.AP1Email = ''
      this.AP1Npwp = ''
      this.AP1IDType = ''
      this.AP1IDNumber = ''
      this.AP1IDExpirationDate = ''

      this.AP2FirstName = ''
      this.AP2MiddleName = ''
      this.AP2LastName = ''
      this.AP2Position = ''
      this.AP2MobEmaililePhone = ''
      this.AP2Email = ''
      this.AP2Npwp = ''
      this.AP2IDType = ''
      this.AP2IDNumber = ''
      this.AP2IDExpirationDate = ''
      this.GlobalCifNumber = ''
      this.BranchName = ''
      this.BranchSales = ''
      this.Waperd = ''
      this.BranchWaperd = ''
      this.RegistrationDate = ''
      this.DataLastUpdate = ''
      this.LobCode = ''
      this.CustomerGroup = ''
      this.TaxIdNumber = ''
      this.TinForeignTin = ''
      this.IssuanceCountry = ''
      this.GIIN = ''
      this.SubsOwnerName = ''
      this.SubsOwnerAddress = ''
      this.SubsOwnerTIN = ''
      this.CompanyName = ''
      this.SIUPNo = ''
      this.SIUPExpDate = ''
      this.SKDNo = ''
      this.SKDExpDate = ''
      this.DateOfEstablishment = ''
      this.PlaceOfEstablishment = ''
      this.CountryOfEstablishment = ''
      this.ArticlesOfAssosiationNo = ''
      this.CompanyType = ''
      this.CompanyCharacteristic = ''
      this.IncomeLevel = ''
      this.InvestorRiskProfile = ''
      this.InvestmentObjective = ''
      this.SourceOfFund = ''
      this.AssetOwner = ''
      this.StatementType = ''
      this.optStatementType = ''
      this.AssetInfoLastYear = ''
      this.AssetInfo2YearsAgo = ''
      this.AssetInfo3YearsAgo = ''
      this.ProfitInfoLastYear = ''
      this.ProfitInfo2YearsAgo = ''
      this.ProfitInfo3YearsAgo = ''
      this.Bank = ''
      this.AccountNumber = ''
      this.AccountType = ''
      this.Currency = ''
      this.Status = ''
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    submitDialog() {
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
              this.onLoadCustomerCorporate()
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
    togglecust() {
      this.$log.info('info call at function togglecust')
      if (this.mode === 'Individual') {
        this.$router.replace({
          path: '/customer/individualcustomer'
        })
      }
    }
  }
}
</script>

<style>
.error {
  color: #d6502f;
}

.form-input {
  display: none;
}
</style>
