<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="Edit Individual Customer" icon="edit" />
            </q-breadcrumbs>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <form @submit.prevent="SubmitButton">
              <q-card class="my-card shadow-6 center" inline>
                <q-card-section>
                  <div class="q-ma-xs q-gutter-sm">
                    <q-btn
                      :loading="submitting"
                      @click="submitDialog"
                      :disable="errors.any() || !isFormInValid || IncomeLevel === '' ||
                      BranchName === '' ||
                      TaxIdNumber === '' ||
                      TinForeignTin === '' ||
                      IssuanceCountry === '' ||
                      Gender === '' || CountryOfBirth === ''|| loaddatacontactinfo.length === 0 || loaddatabank.length === 0"
                      label="Submit"
                      color="accent"
                      style="width: 80px"
                    ></q-btn>
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
                    <q-tab label="Customer" name="one" />
                    <q-tab
                      v-show="MaritalStatus.dropdown_details_desc === 'Married'"
                      label="Spouse"
                      name="two"
                    />
                    <q-tab label="Contact Info" name="three" />
                    <q-tab label="Beneficiary" name="four" />
                    <q-tab label="Branch Info" name="six" />
                    <q-tab label="Document" name="Doc" />
                    <q-tab label="Tax Info" name="eight" />

                  </q-tabs>

                  <q-separator />

                  <q-tab-panels keep-alive v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Identifications</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="Nationality"
                                :options="optNationality"
                                stack-label
                                :option-label="
                                optNationality =>
                                optNationality.dropdown_details_desc"
                                :option-value="optNationality => optNationality"
                                emit-value
                                map-options
                                label="Nationality *"
                                v-validate="'required'"
                                data-vv-name="Nationality"
                                :error="errors.has('Nationality')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Nationality</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Nationality')"
                                class="error"
                              >{{ errors.first('Nationality') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="CountryOfNationality"
                                :options="optCountryOfNationality"
                                label="Country Of Nationality *"
                                use-input
                                input-debounce="0"
                                stack-label
                                :option-label="
                              optCountryOfNationality =>
                                optCountryOfNationality.country_name
                            "
                                :option-value="
                              optCountryOfNationality => optCountryOfNationality
                            "
                                emit-value
                                map-options
                                v-validate="'required'"
                                data-vv-name="Country Of Nationality"
                                :error="errors.has('Country Of Nationality')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Country Of Nationality</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Country Of Nationality')"
                                class="error"
                              >{{ errors.first('Country Of Nationality') }}</span>
                            </div>

                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="IDType"
                                :options="optIDType"
                                stack-label
                                :option-label="
                              optIDType => optIDType.dropdown_details_desc
                            "
                                :option-value="optIDType => optIDType"
                                emit-value
                                map-options
                                label="ID Type *"
                                v-validate="'required'"
                                data-vv-name="ID Type"
                                :error="errors.has('ID Type')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Type</q-tooltip>
                              </q-select>
                              <span v-show="errors.has('ID Type')" class="error">
                                {{
                                errors.first('ID Type')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                mask="################"
                                v-model="IDNumber"
                                label="ID Number *"
                                v-validate="'required|min:16|max:16'"
                                data-vv-name="ID Number"
                                :error="errors.has('ID Number')"
                                :error-label="errors.first('ID Number')"
                              ></q-input>
                              <span
                                v-show="errors.has('ID Number')"
                                class="error"
                              >{{ errors.first('ID Number') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="IDNumberRegistrationDate"
                                label="ID Number Registration Date *"
                                v-validate="'required'"
                                data-vv-name="ID Number Registration Date"
                                :error="errors.has('ID Number Registration Date')"
                                :error-label="
                              errors.first('ID Number Registration Date')
                            "
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
                                        v-model="IDNumberRegistrationDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy1.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Number Registration Date</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('ID Number Registration Date')"
                                class="error"
                              >{{ errors.first('ID Number Registration Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="IDExpirationDate"
                                label="ID Expiration Date"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy2"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="IDExpirationDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy2.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Expiration Date</q-tooltip>
                              </q-input>
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
                              <span v-show="errors.has('Status')" class="error">
                                {{
                                errors.first('Status')
                                }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div
                            class="col text-weight-bolder text-subtitle1 q-mb-sm"
                          >Personal Informations</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-select
                                outlined
                                v-model="Salutation"
                                :options="optSalutation"
                                label="Salutation *"
                                v-validate="'required'"
                                data-vv-name="Salutation"
                                stack-label
                                :option-label="
                                  optSalutation =>
                                    optSalutation.dropdown_details_desc
                                "
                                :option-value="optSalutation => optSalutation"
                                emit-value
                                map-options
                                :error="errors.has('Salutation')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Salutation</q-tooltip>
                                <span
                                  v-show="errors.has('Salutation')"
                                  class="error"
                                >{{ errors.first('Salutation') }}</span>
                              </q-select>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                              <q-input
                                outlined
                                v-model="FirstName"
                                label="First Name *"
                                v-validate="'required'"
                                data-vv-name="Firstname"
                                :error="errors.has('Firstname')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >First Name</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Firstname')"
                                class="error"
                              >{{ errors.first('Firstname') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input outlined v-model="MiddleName" label="Middle Name">
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Middle Name</q-tooltip>
                              </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input outlined v-model="LastName" label="Last Name">
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Last Name</q-tooltip>
                              </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-select
                                outlined
                                v-model="Gender"
                                :options="optGender"
                                stack-label
                                :option-label="
                                  optGender => optGender.dropdown_details_desc
                                "
                                :option-value="optGender => optGender"
                                emit-value
                                map-options
                                label="Gender"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Gender</q-tooltip>
                              </q-select>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-input
                                outlined
                                v-model="PlaceOfBirth"
                                label="Place Of Birth *"
                                v-validate="'required'"
                                data-vv-name="Place Of Birth"
                                :error="errors.has('Place Of Birth')"
                                :error-label="errors.first('Place Of Birth')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Place Of Birth</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Place Of Birth')"
                                class="error"
                              >{{ errors.first('Place Of Birth') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="CountryOfBirth"
                                label="Country Of Birth *"
                                v-validate="'required'"
                                data-vv-name="Country Of Birth"
                                :error="errors.has('Country Of Birth')"
                                :error-label="errors.first('Country Of Birth')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Country Of Birth</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('CountryOfBirth')"
                                class="error"
                              >{{ errors.first('CountryOfBirth') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="Religion"
                                :options="optReligion"
                                stack-label
                                :option-label="
                                  optReligion =>
                                    optReligion.dropdown_details_desc
                                "
                                :option-value="optReligion => optReligion"
                                emit-value
                                map-options
                                label="Religion"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Religion</q-tooltip>
                              </q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                outlined
                                v-model="DateOfBirth"
                                label="Date Of Birth *"
                                v-validate="'required'"
                                data-vv-name="Date Of Birth"
                                :error="errors.has('Date Of Birth')"
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
                                        v-model="DateOfBirth"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy3.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Date Of Birth</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Date Of Birth')"
                                class="error"
                              >{{ errors.first('Date Of Birth') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="MaritalStatus"
                                :options="optMaritalStatus"
                                stack-label
                                :option-label="
                                  optMaritalStatus =>
                                    optMaritalStatus.dropdown_details_desc
                                "
                                :option-value="
                                  optMaritalStatus => optMaritalStatus
                                "
                                emit-value
                                map-options
                                label="Marital Status *"
                                v-validate="'required'"
                                data-vv-name="Marital Status"
                                :error="errors.has('Marital Status')"
                                :error-label="errors.first('Marital Status')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Marital Status</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Marital Status')"
                                class="error"
                              >{{ errors.first('Marital Status') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                outlined
                                v-model="MotherMaidenName"
                                label="Mother Maiden Name *"
                                v-validate="'required'"
                                data-vv-name="Mother Maiden Name"
                                :error="errors.has('Mother Maiden Name')"
                                :error-label="
                                  errors.first('Mother Maiden Name')
                                "
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Mother Maiden Name</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Mother Maiden Name')"
                                class="error"
                              >{{ errors.first('Mother Maiden Name') }}</span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="text-weight-bolder text-subtitle1 q-mb-sm">Others</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="EducationalBackground"
                                :options="optEducationalBackground"
                                stack-label
                                :option-label="
                                  optEducationalBackground =>
                                    optEducationalBackground.dropdown_details_desc
                                "
                                :option-value="
                                  optEducationalBackground =>
                                    optEducationalBackground
                                "
                                emit-value
                                map-options
                                label="Educational Background *"
                                v-validate="'required'"
                                data-vv-name="Educational Background"
                                :error="errors.has('Educational Background')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Educational Background</q-tooltip>
                              </q-select>
                              <span v-show="errors.has('Educational Background')" class="error">
                                {{
                                errors.first('Educational Background')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="InvestmentObjective"
                                :options="optInvestmentObjective"
                                label="Investment Objective *"
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
                                v-validate="'required'"
                                data-vv-name="Investment Objective"
                                :error="errors.has('Investment Objective')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Investment Objective</q-tooltip>
                              </q-select>
                              <span v-show="errors.has('Investment Objective')" class="error">
                                {{
                                errors.first('Investment Objective')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="Occupation"
                                :options="optOccupation"
                                stack-label
                                :option-label="
                                  optOccupation =>
                                    optOccupation.dropdown_details_desc
                                "
                                :option-value="optOccupation => optOccupation"
                                emit-value
                                map-options
                                label="Occupation *"
                                v-validate="'required'"
                                data-vv-name="Occupation"
                                :error="errors.has('Occupation')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Occupation</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Occupation')"
                                class="error"
                              >{{ errors.first('Occupation') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="ResidenceStatus"
                                :options="optResidenceStatus"
                                stack-label
                                :option-label="
                                  optResidenceStatus =>
                                    optResidenceStatus.dropdown_details_desc
                                "
                                :option-value="
                                  optResidenceStatus => optResidenceStatus
                                "
                                emit-value
                                map-options
                                label="Residence Status *"
                                v-validate="'required'"
                                data-vv-name="Residence Status"
                                :error="errors.has('Residence Status')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Residence Status</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Residence Status')"
                                class="error"
                              >{{ errors.first('Residence Status') }}</span>
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
                                label="Income Level *"
                                v-validate="'required'"
                                data-vv-name="Income Level"
                                :error="errors.has('Income Level')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Income Level</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Income Level')"
                                class="error"
                              >{{ errors.first('Income Level') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                outlined
                                v-model="NextRiskAssessmentDate"
                                label="Next Risk Assessment Date *"
                                v-validate="'required'"
                                data-vv-name="Next Risk Assessment Date"
                                :error="errors.has('Next Risk Assessment Date')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy4"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="NextRiskAssessmentDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy4.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Next Risk Assessment Date</q-tooltip>
                              </q-input>
                              <span v-show="errors.has('Next Risk Assessment Date')" class="error">
                                {{
                                errors.first('Next Risk Assessment Date')
                                }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="q-gutter-md">
                          <q-input outlined v-model="SpouseName" label="Spouse Name" stack-label>
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Spouse Name</q-tooltip>
                          </q-input>
                          <q-select
                            outlined
                            v-model="SpouseID"
                            :options="optSpouseIDType"
                            stack-label
                            :option-label="
                              optSpouseIDType =>
                                optSpouseIDType.dropdown_details_desc
                            "
                            :option-value="optSpouseIDType => optSpouseIDType"
                            emit-value
                            map-options
                            label="ID Type"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >ID Type</q-tooltip>
                          </q-select>
                          <q-input
                            outlined
                            v-model="SpouseIDNumber"
                            mask="################"
                            label="Spouse ID Number"
                            stack-label
                            v-validate="'numeric|min:16|max:16'"
                            data-vv-name="Spouse ID Number"
                            :error="errors.has('Spouse ID Number')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Spouse ID Number</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Spouse ID Number')"
                            class="error"
                          >{{ errors.first('Spouse ID Number') }}</span>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="three">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-gutter-sm q-pb-md">
                          <q-btn
                            style="width:75px"
                            @click="onGetContactInfo"
                            color="grey-7"
                            icon="ion-refresh"
                            v-ripple
                          >
                            <q-tooltip>Refresh</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width:75px"
                            @click="ActionDetail"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width:75px"
                            @click="OnUpdateContactInfo"
                            color="accent"
                            :disable="selectedcontact.length === 0"
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width:75px"
                            @click="DeleteDialogContact"
                            :disable="selectedcontact.length === 0"
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                        <q-table
                          title="Contact Info"
                          class="q-ml-sm q-mr-sm table-label-color"
                          :grid="$q.screen.xs"
                          :data="loaddatacontactinfo"
                          :columns="columnsContact"
                          row-key="id_customer_individual"
                          selection="single"
                          :selected.sync="selectedcontact"
                          separator="cell"
                          :loading="loading"
                          color="primary"
                          wrap-cells
                        >
                          <template v-slot:body="props">
                            <q-tr :props="props">
                              <q-td auto-width>
                                <q-checkbox dense v-model="props.selected"></q-checkbox>
                              </q-td>
                              <q-td key="gcif_number" :props="props">
                                {{
                                props.row.gcif_number
                                }}
                              </q-td>
                              <q-td
                                key="domicile_address"
                                :props="props"
                              >{{ props.row.domicile_address }}</q-td>
                              <q-td key="mobile_phone" :props="props">{{ props.row.mobile_phone }}</q-td>
                              <q-td
                                key="postal_code.city.city_name"
                                :props="props"
                              >{{ props.row.postal_code.city.city_name }}</q-td>
                              <q-td key="email_address" :props="props">{{ props.row.email_address }}</q-td>
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                      <q-dialog v-model="ContactAdd">
                        <q-card style="width: 400px; max-width: 80vw;">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="SubmitButtonContactInfo">
                              <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                <div class="col-6">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    @click="ClearContactInfo"
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
                                  <q-field dense outlined label="Global CIF Number" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ GlobalCifNumber }}</div>
                                    </template>
                                  </q-field>
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
                                    @input="FilterRegion(), ClearCountry()"
                                    label="Country"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="CountryContact === ''"
                                    v-model="Region"
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
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="Region === ''"
                                    dense
                                    outlined
                                    v-model="City"
                                    :options="optCity"
                                    stack-label
                                    :option-label="optCity => optCity.city_name"
                                    :option-value="optCity => optCity"
                                    emit-value
                                    map-options
                                    @input="FilterSubdistrict(), ClearCity()"
                                    label="City"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="City === ''"
                                    dense
                                    outlined
                                    v-model="Subdistrict"
                                    :options="optSubdistrict"
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
                                    label="Subdistrict"
                                    @input="FilterVillage(), ClearSubdistrict()"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="Subdistrict === ''"
                                    v-model="Village"
                                    :options="optVillage"
                                    stack-label
                                    :option-label="
                                      optVillage => optVillage.village_name
                                    "
                                    :option-value="optVillage => optVillage"
                                    emit-value
                                    map-options
                                    label="District"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field dense outlined label="Postal Code" stack-label>
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
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    outlined
                                    v-model="DomicileAddress"
                                    stack-label
                                    label="Domicile Address *"
                                    type="textarea"
                                    float-label="Textarea"
                                    :max-height="80"
                                    rows="5"
                                  ></q-input>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    stack-label
                                    v-model="EmailAddress"
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
                                    outlined
                                    mask="################"
                                    v-model="MobilePhone"
                                    label="Mobile Phone"
                                    stack-label
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    mask="################"
                                    v-model="HomePhone"
                                    label="Home Phone"
                                    stack-label
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    mask="################"
                                    v-model="FaxNumber"
                                    label="Fax Number"
                                    stack-label
                                  />
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    :loading="submittingContactInfo"
                                    @click="SubmitButtonContactInfo"
                                    class="full-width"
                                    dense
                                    :disable="
                                      errors.any() ||
                                        Village === '' ||
                                        DomicileAddress === '' ||
                                        HomePhone === '' ||
                                        FaxNumber === '' ||
                                        EmailAddress === '' ||
                                        MobilePhone === ''
                                    "
                                    label="Submit"
                                    color="accent"
                                  ></q-btn>
                                </div>
                              </div>
                            </form>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                      <q-dialog v-model="ContactEdit">
                        <q-card style="width: 400px; max-width: 80vw;">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="SubmitButtonEditContactInfo">
                              <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                <div class="col-12">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    label="Close"
                                    color="negative"
                                    v-close-popup
                                  ></q-btn>
                                </div>
                                <div class="col-12">
                                  <q-field dense outlined label="Global CIF Number" stack-label>
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ GlobalCifNumber }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    v-model="CountryContactEdit"
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
                                      FilterRegionEdit(), ClearCountryEdit()
                                    "
                                    label="Country"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="CountryContactEdit === ''"
                                    v-model="RegionEdit"
                                    :options="optRegion"
                                    stack-label
                                    :option-label="
                                      optRegion => optRegion.region_name
                                    "
                                    :option-value="optRegion => optRegion"
                                    emit-value
                                    map-options
                                    @input="FilterCityEdit(), ClearRegionEdit()"
                                    label="Region"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="RegionEdit === ''"
                                    dense
                                    outlined
                                    v-model="CityEdit"
                                    :options="optCity"
                                    stack-label
                                    :option-label="optCity => optCity.city_name"
                                    :option-value="optCity => optCity"
                                    emit-value
                                    map-options
                                    @input="
                                      FilterSubdistrictEdit(), ClearCityEdit()
                                    "
                                    label="City"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="CityEdit === ''"
                                    dense
                                    outlined
                                    v-model="SubdistrictEdit"
                                    :options="optSubdistrict"
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
                                    label="Subdistrict"
                                    @input="
                                      FilterVillageEdit(),
                                        ClearSubdistrictEdit()
                                    "
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="SubdistrictEdit === ''"
                                    v-model="VillageEdit"
                                    :options="optVillage"
                                    stack-label
                                    :option-label="
                                      optVillage => optVillage.village_name
                                    "
                                    :option-value="optVillage => optVillage"
                                    emit-value
                                    map-options
                                    label="District"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field dense outlined label="Postal Code" stack-label>
                                    <template v-slot:control>
                                      <div
                                        v-show="
                                          VillageEdit.postal_code !== undefined
                                        "
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ VillageEdit.postal_code }}</div>
                                      <div
                                        v-show="
                                          VillageEdit.postal_code === undefined
                                        "
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ PostalCodeEdit }}</div>
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
                                    v-model="DomicileAddressEdit"
                                    label="Domicile Address *"
                                    type="textarea"
                                    float-label="Textarea"
                                    :max-height="80"
                                    rows="5"
                                  ></q-input>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    stack-label
                                    v-model="EmailAddressEdit"
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
                                    outlined
                                    v-model="MobilePhoneEdit"
                                    mask="################"
                                    label="Mobile Phone"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="HomePhoneEdit"
                                    mask="################"
                                    label="Home Phone"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="FaxNumberEdit"
                                    mask="################"
                                    label="Fax Number"
                                  />
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    :loading="submittingContactInfo"
                                    @click="SubmitButtonEditContactInfo"
                                    class="full-width"
                                    dense
                                    :disable="
                                      errors.any() ||
                                        VillageEdit === '' ||
                                        DomicileAddressEdit === '' ||
                                        HomePhoneEdit === '' ||
                                        FaxNumberEdit === '' ||
                                        EmailAddressEdit === '' ||
                                        MobilePhoneEdit === ''
                                    "
                                    label="Submit"
                                    color="accent"
                                  ></q-btn>
                                </div>
                              </div>
                            </form>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                    </q-tab-panel>

                    <q-tab-panel name="four">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
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
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                              >Beneficiary Name</q-tooltip>
                            </q-input>
                            <span
                              v-show="errors.has('Beneficiary Name')"
                              class="error"
                            >{{ errors.first('Beneficiary Name') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="BeneficiaryIDType"
                              :options="optBeneficiaryIDType"
                              stack-label
                              :option-label="
                                optBeneficiaryIDType =>
                                  optBeneficiaryIDType.dropdown_details_desc
                              "
                              :option-value="
                                optBeneficiaryIDType => optBeneficiaryIDType
                              "
                              emit-value
                              map-options
                              label="Beneficiary ID Type *"
                              v-validate="'required'"
                              data-vv-name="Beneficiary ID Type"
                              :error="errors.has('Beneficiary ID Type')"
                              :error-label="errors.first('Beneficiary ID Type')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                              >Beneficiary ID Type</q-tooltip>
                            </q-select>
                            <span
                              v-show="errors.has('Beneficiary ID Type')"
                              class="error"
                            >{{ errors.first('Beneficiary ID Type') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              outlined
                              v-model="BeneficiaryIDNumber"
                              mask="################"
                              label="Beneficiary ID Number *"
                              v-validate="'required|min:16|max:16'"
                              data-vv-name="Beneficiary ID Number"
                              :error="errors.has('Beneficiary ID Number')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                              >Beneficiary ID Number</q-tooltip>
                            </q-input>
                            <span
                              v-show="errors.has('Beneficiary ID Number')"
                              class="error"
                            >{{ errors.first('Beneficiary ID Number') }}</span>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="six">
                      <q-card class="q-mt-md shadow-3">
                        <q-card-section>
                          <div class="text-weight-bolder text-subtitle1 q-mb-sm">CIF Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field outlined label="Global CIF Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ GlobalCifNumber }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="BranchName"
                                :options="optBranchName"
                                stack-label
                                :option-label="
                                  optBranchName => optBranchName.branch_name
                                "
                                :option-value="optBranchName => optBranchName"
                                emit-value
                                map-options
                                label="Branch Name *"
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
                              <q-input
                                outlined
                                v-model="RegistrationDate"
                                label="Registration Date *"
                                v-validate="'required'"
                                data-vv-name="Registration Date"
                                :error="errors.has('Registration Date')"
                                :error-label="errors.first('Registration Date')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy5"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="RegistrationDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy5.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Registration Date</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Registration Date')"
                                class="error"
                              >{{ errors.first('Registration Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                outlined
                                v-model="DateLastUpdate"
                                label="Date Last Update *"
                                v-validate="'required'"
                                data-vv-name="Date Last Update"
                                :error="errors.has('Date Last Update')"
                                :error-label="errors.first('Date Last Update')"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy6"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="DateLastUpdate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy6.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Data Last Update</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('Date Last Update')"
                                class="error"
                              >{{ errors.first('Date Last Update') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="LobCode"
                                :options="optLobCode"
                                label="LOB Code *"
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
                                :error-label="errors.first('LOB Code')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Line Of Business Code</q-tooltip>
                              </q-select>
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
                                label="Customer Group *"
                                v-validate="'required'"
                                data-vv-name="Customer Group"
                                :error="errors.has('Customer Group')"
                                :error-label="errors.first('Customer Group')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Customer Group</q-tooltip>
                              </q-select>
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
                          <div class="row q-gutter-sm q-pb-md">
                            <q-btn
                              style="width:75px"
                              @click="onGetDataBankInfo"
                              color="grey-7"
                              icon="ion-refresh"
                              v-ripple
                            >
                              <q-tooltip>Refresh</q-tooltip>
                            </q-btn>
                            <q-btn
                              style="width:75px"
                              @click="ActionDetailBank"
                              color="primary"
                              icon="ion-add"
                              v-ripple
                            >
                              <q-tooltip>Add</q-tooltip>
                            </q-btn>
                            <q-btn
                              style="width:75px"
                              @click="OnUpdateAccountInfo"
                              color="accent"
                              :disable="selectedbank.length === 0"
                              icon="fas fa-pencil-alt"
                              v-ripple
                            >
                              <q-tooltip>Edit</q-tooltip>
                            </q-btn>
                            <q-btn
                              style="width:75px"
                              @click="DeleteDialogBank"
                              :disable="selectedbank.length === 0"
                              color="negative"
                              icon="eva-trash-2"
                              v-ripple
                            >
                              <q-tooltip>Delete</q-tooltip>
                            </q-btn>
                          </div>
                          <q-table
                            title="Account Info"
                            class="q-ml-sm q-mr-sm table-label-color"
                            :grid="$q.screen.xs"
                            :data="loaddatabank"
                            :columns="columnsBank"
                            row-key="id_bank_info"
                            selection="single"
                            :selected.sync="selectedbank"
                            separator="cell"
                            :loading="loading"
                            color="primary"
                            wrap-cells
                          >
                            <template v-slot:body="props">
                              <q-tr :props="props">
                                <q-td auto-width>
                                  <q-checkbox dense v-model="props.selected"></q-checkbox>
                                </q-td>
                                <q-td key="account_number" :props="props">
                                  {{
                                  props.row.account_number
                                  }}
                                </q-td>
                                <q-td
                                  key="bank.dropdown_details_desc"
                                  :props="props"
                                >{{ props.row.bank.dropdown_details_desc }}</q-td>
                                <q-td key="account_type.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.account_type.dropdown_details_desc
                                  }}
                                </q-td>
                                <q-td
                                  key="currency.currencies_code"
                                  :props="props"
                                >{{ props.row.currency.currencies_code }}</q-td>
                                <q-td
                                  key="status.dropdown_details_desc"
                                  :props="props"
                                >{{ props.row.status.dropdown_details_desc }}</q-td>
                              </q-tr>
                            </template>
                          </q-table>
                        </q-card-section>
                        <q-dialog v-model="AccountInfo">
                          <q-card style="width: 400px; max-width: 80vw;">
                            <q-card-section style="width: 100%">
                              <form @submit.prevent="SubmitButtonBank">
                                <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                  <div class="col-6">
                                    <q-btn
                                      class="full-width"
                                      dense
                                      @click="ClearBank"
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
                                      v-model="AccountNumber"
                                      label="Account Number*"
                                      mask="################"
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
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      v-model="Bank"
                                      :options="optBank"
                                      label="Bank*"
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
                                      label="Account Type*"
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
                                      label="Currency*"
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
                                      v-model="StatusBank"
                                      :options="optStatus"
                                      label="Status*"
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
                                      disable
                                      outlined
                                      v-model="Default"
                                      :options="optDefault"
                                      label="Default"
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
                                      :loading="submittingButtonBank"
                                      @click="SubmitButtonBank"
                                      class="full-width"
                                      dense
                                      :disable="
                                        AccountNumber === '' ||
                                          Bank === '' ||
                                          Currency === '' ||
                                          AccountType === '' ||
                                          StatusBank === ''
                                      "
                                      label="Submit"
                                      color="accent"
                                    ></q-btn>
                                  </div>
                                </div>
                              </form>
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                        <q-dialog v-model="AccountInfoEdit">
                          <q-card style="width: 400px; max-width: 80vw;">
                            <q-card-section style="width: 100%">
                              <form @submit.prevent="SubmitEditButtonBank">
                                <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                  <div class="col-12">
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
                                      v-model="AccountNumberEdit"
                                      label="Account Number*"
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
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      v-model="BankEdit"
                                      :options="optBank"
                                      label="Bank*"
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
                                      v-model="AccountTypeEdit"
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
                                      label="Account Type*"
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
                                      v-model="CurrencyEdit"
                                      :options="optCurrency"
                                      stack-label
                                      :option-label="
                                        optCurrency =>
                                          optCurrency.currencies_code
                                      "
                                      :option-value="optCurrency => optCurrency"
                                      emit-value
                                      map-options
                                      label="Currency*"
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
                                      v-model="StatusBankEdit"
                                      :options="optStatus"
                                      label="Status*"
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
                                      disable
                                      outlined
                                      v-model="DefaultEdit"
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
                                      :loading="submittingButtonBank"
                                      @click="SubmitEditButtonBank"
                                      class="full-width"
                                      dense
                                      :disable="
                                        AccountNumberEdit === '' ||
                                          BankEdit === '' ||
                                          CurrencyEdit === '' ||
                                          AccountTypeEdit === '' ||
                                          StatusBankEdit === ''
                                      "
                                      label="Submit"
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

                    <q-tab-panel name="eight">
                      <div class="q-pa-md">
                        <div class="q-gutter-md">
                          <q-input
                            outlined
                            v-model="TaxIdNumber"
                            mask="##.###.###.#-###.###"
                            label="Tax ID Number *"
                            v-validate="'required|regex:^[.0-9\-]+$'"
                            data-vv-name="Tax ID Number"
                            :error="errors.has('Tax ID Number')"
                            :error-label="errors.first('Tax ID Number')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Tax ID Number</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Tax ID Number')"
                            class="error"
                          >{{ errors.first('Tax ID Number') }}</span>
                          <q-input
                            outlined
                            v-model="TinForeignTin"
                            mask="##.###.###.#-###.###"
                            label="TIN / Foreign TIN"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >TIN / Foreign TIN</q-tooltip>
                          </q-input>
                          <q-select
                            outlined
                            v-model="IssuanceCountry"
                            :options="optCountryOfNationality"
                            stack-label
                            :option-label="
                              optCountryOfNationality =>
                                optCountryOfNationality.country_name
                            "
                            :option-value="
                              optCountryOfNationality => optCountryOfNationality
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
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="Doc">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-gutter-sm q-pb-md">
                          <q-btn
                            style="width:75px"
                            @click="onGetDocument"
                            color="grey-7"
                            icon="ion-refresh"
                            v-ripple
                          >
                            <q-tooltip>Refresh</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width:75px"
                            @click="onAddDocument"
                            :disable="fileUploaded.length === optDataDocumentCategory.length"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width: 80px"
                            @click="onViewDocument"
                            color="cyan-7"
                            :disable="
                            selectedDoc.length === 0
                            "
                            icon="details"
                            v-ripple
                          >
                            <q-tooltip>View</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width:75px"
                            @click="DeleteDialogDocument"
                            :disable="selectedDoc.length === 0"
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                        <q-table
                          title="Document"
                          class="q-ml-sm q-mr-sm table-label-color"
                          :grid="$q.screen.xs"
                          :data="fileUploaded"
                          :columns="columnsDocument"
                          row-key="id_document"
                          selection="single"
                          :selected.sync="selectedDoc"
                          separator="cell"
                          :loading="loading"
                          color="primary"
                          wrap-cells
                        >
                          <template v-slot:body="props">
                            <q-tr :props="props">
                              <q-td auto-width>
                                <q-checkbox dense v-model="props.selected"></q-checkbox>
                              </q-td>
                              <q-td
                                @click.native="onView(props.row)"
                                key="document_id.dropdown_details_desc"
                                :props="props"
                              >{{ props.row.document_id.dropdown_details_desc }}</q-td>
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                      <q-dialog v-model="ViewDocument">
                        <q-card style="width: 500px">
                          <q-card-section style="width: 100%">
                            <div>
                              <q-img
                              class="justify-center q-pa-md"
                              :src="DocumentView"
                              style="max-width: 100%;"
                            >
                            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                              {{DocumentCategoryView}}
                            </div>
                              <template v-slot:loading>
                                  <q-spinner-ios />
                              </template>
                            </q-img>
                            </div>
                            <br>
                            <div class="col-12">
                              <q-btn class="full-width" dense label="Close" color="negative" v-close-popup></q-btn>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                      <q-dialog v-model="AddDocument" persistent>
                        <q-card style="width: 700px; max-width: 80vw;">
                          <batm-upload :Muser="userdata" :ugAccessToken="token" :optDocuments="optDocumentCategory" :status="mode" :gcif="GlobalCifNumber" :callMethod="refreshDataUpload"></batm-upload>
                        </q-card>
                      </q-dialog>
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
            <q-breadcrumbs-el label="Edit Individual Customer" icon="edit" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <form @submit.prevent="SubmitButton">
            <q-card class="my-card shadow-6 center" inline>
              <q-tabs
                v-model="tab"
                active-color="primary"
                indicator-color="primary"
                class="text-grey"
                align="justify"
                inline-label
              >
                <q-tab label="Customer" name="one" />
                <q-tab
                  v-show="MaritalStatus.dropdown_details_desc === 'Married'"
                  label="Spouse"
                  name="two"
                />
                <q-tab label="Contact Info" name="three" />
                <q-tab label="Beneficiary" name="four" />
                <q-tab label="Branch Info" name="six" />
                <q-tab label="Document" name="Doc" />
                <q-tab label="Tax Info" name="eight" />
              </q-tabs>

              <q-separator />

              <q-tab-panels keep-alive v-model="tab" animated>
                <q-tab-panel name="one">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Identifications</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="Nationality"
                                :options="optNationality"
                                stack-label
                                :option-label="
                                optNationality =>
                                optNationality.dropdown_details_desc"
                                :option-value="optNationality => optNationality"
                                emit-value
                                map-options
                                label="Nationality *"
                                v-validate="'required'"
                                data-vv-name="Nationality"
                                :error="errors.has('Nationality')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Nationality</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Nationality')"
                                class="error"
                              >{{ errors.first('Nationality') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="CountryOfNationality"
                                :options="optCountryOfNationality"
                                label="Country Of Nationality *"
                                use-input
                                input-debounce="0"
                                stack-label
                                :option-label="
                              optCountryOfNationality =>
                                optCountryOfNationality.country_name
                            "
                                :option-value="
                              optCountryOfNationality => optCountryOfNationality
                            "
                                emit-value
                                map-options
                                v-validate="'required'"
                                data-vv-name="Country Of Nationality"
                                :error="errors.has('Country Of Nationality')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >Country Of Nationality</q-tooltip>
                              </q-select>
                              <span
                                v-show="errors.has('Country Of Nationality')"
                                class="error"
                              >{{ errors.first('Country Of Nationality') }}</span>
                            </div>

                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="IDType"
                                :options="optIDType"
                                stack-label
                                :option-label="
                              optIDType => optIDType.dropdown_details_desc
                            "
                                :option-value="optIDType => optIDType"
                                emit-value
                                map-options
                                label="ID Type *"
                                v-validate="'required'"
                                data-vv-name="ID Type"
                                :error="errors.has('ID Type')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Type</q-tooltip>
                              </q-select>
                              <span v-show="errors.has('ID Type')" class="error">
                                {{
                                errors.first('ID Type')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                mask="################"
                                v-model="IDNumber"
                                label="ID Number *"
                                v-validate="'required|min:16|max:16'"
                                data-vv-name="ID Number"
                                :error="errors.has('ID Number')"
                                :error-label="errors.first('ID Number')"
                              ></q-input>
                              <span
                                v-show="errors.has('ID Number')"
                                class="error"
                              >{{ errors.first('ID Number') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="IDNumberRegistrationDate"
                                label="ID Number Registration Date *"
                                v-validate="'required'"
                                data-vv-name="ID Number Registration Date"
                                :error="errors.has('ID Number Registration Date')"
                                :error-label="
                              errors.first('ID Number Registration Date')
                            "
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
                                        v-model="IDNumberRegistrationDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy1.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Number Registration Date</q-tooltip>
                              </q-input>
                              <span
                                v-show="errors.has('ID Number Registration Date')"
                                class="error"
                              >{{ errors.first('ID Number Registration Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="IDExpirationDate"
                                label="ID Expiration Date"
                              >
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy
                                      ref="qDateProxy2"
                                      transition-show="scale"
                                      transition-hide="scale"
                                    >
                                      <q-date
                                        today-btn
                                        v-model="IDExpirationDate"
                                        mask="YYYY-MM-DD"
                                        @input="() => $refs.qDateProxy2.hide()"
                                      />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >ID Expiration Date</q-tooltip>
                              </q-input>
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
                              <span v-show="errors.has('Status')" class="error">
                                {{
                                errors.first('Status')
                                }}
                              </span>
                            </div>
                          </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div
                        class="col text-weight-bolder text-subtitle1 q-mb-sm"
                      >Personal Informations</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-select
                            outlined
                            v-model="Salutation"
                            :options="optSalutation"
                            label="Salutation *"
                            v-validate="'required'"
                            data-vv-name="Salutation"
                            stack-label
                            :option-label="
                              optSalutation =>
                                optSalutation.dropdown_details_desc
                            "
                            :option-value="optSalutation => optSalutation"
                            emit-value
                            map-options
                            :error="errors.has('Salutation')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Salutation</q-tooltip>
                            <span
                              v-show="errors.has('Salutation')"
                              class="error"
                            >{{ errors.first('Salutation') }}</span>
                          </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                          <q-input
                            outlined
                            v-model="FirstName"
                            label="First Name *"
                            v-validate="'required'"
                            data-vv-name="Firstname"
                            :error="errors.has('Firstname')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >First Name</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Firstname')"
                            class="error"
                          >{{ errors.first('Firstname') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input outlined v-model="MiddleName" label="Middle Name">
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Middle Name</q-tooltip>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input outlined v-model="LastName" label="Last Name">
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Last Name</q-tooltip>
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-select
                            outlined
                            v-model="Gender"
                            :options="optGender"
                            stack-label
                            :option-label="
                              optGender => optGender.dropdown_details_desc
                            "
                            :option-value="optGender => optGender"
                            emit-value
                            map-options
                            label="Gender"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Gender</q-tooltip>
                          </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-input
                            outlined
                            v-model="PlaceOfBirth"
                            label="Place Of Birth *"
                            v-validate="'required'"
                            data-vv-name="Place Of Birth"
                            :error="errors.has('Place Of Birth')"
                            :error-label="errors.first('Place Of Birth')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Place Of Birth</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Place Of Birth')"
                            class="error"
                          >{{ errors.first('Place Of Birth') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            v-model="CountryOfBirth"
                            label="Country Of Birth *"
                            v-validate="'required'"
                            data-vv-name="Country Of Birth"
                            :error="errors.has('Country Of Birth')"
                            :error-label="errors.first('Country Of Birth')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Country Of Birth</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('CountryOfBirth')"
                            class="error"
                          >{{ errors.first('CountryOfBirth') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="Religion"
                            :options="optReligion"
                            stack-label
                            :option-label="
                              optReligion => optReligion.dropdown_details_desc
                            "
                            :option-value="optReligion => optReligion"
                            emit-value
                            map-options
                            label="Religion"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Religion</q-tooltip>
                          </q-select>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            outlined
                            v-model="DateOfBirth"
                            label="Date Of Birth *"
                            v-validate="'required'"
                            data-vv-name="Date Of Birth"
                            :error="errors.has('Date Of Birth')"
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
                                    v-model="DateOfBirth"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy3.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Date Of Birth</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Date Of Birth')"
                            class="error"
                          >{{ errors.first('Date Of Birth') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="MaritalStatus"
                            :options="optMaritalStatus"
                            stack-label
                            :option-label="
                              optMaritalStatus =>
                                optMaritalStatus.dropdown_details_desc
                            "
                            :option-value="optMaritalStatus => optMaritalStatus"
                            emit-value
                            map-options
                            label="Marital Status *"
                            v-validate="'required'"
                            data-vv-name="Marital Status"
                            :error="errors.has('Marital Status')"
                            :error-label="errors.first('Marital Status')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Marital Status</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Marital Status')"
                            class="error"
                          >{{ errors.first('Marital Status') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            outlined
                            v-model="MotherMaidenName"
                            label="Mother Maiden Name *"
                            v-validate="'required'"
                            data-vv-name="Mother Maiden Name"
                            :error="errors.has('Mother Maiden Name')"
                            :error-label="errors.first('Mother Maiden Name')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Mother Maiden Name</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Mother Maiden Name')"
                            class="error"
                          >{{ errors.first('Mother Maiden Name') }}</span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">Others</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="EducationalBackground"
                            :options="optEducationalBackground"
                            stack-label
                            :option-label="
                              optEducationalBackground =>
                                optEducationalBackground.dropdown_details_desc
                            "
                            :option-value="
                              optEducationalBackground =>
                                optEducationalBackground
                            "
                            emit-value
                            map-options
                            label="Educational Background *"
                            v-validate="'required'"
                            data-vv-name="Educational Background"
                            :error="errors.has('Educational Background')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Educational Background</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Educational Background')"
                            class="error"
                          >{{ errors.first('Educational Background') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="InvestmentObjective"
                            :options="optInvestmentObjective"
                            label="Investment Objective *"
                            stack-label
                            :option-label="
                              optInvestmentObjective =>
                                optInvestmentObjective.dropdown_details_desc
                            "
                            :option-value="
                              optInvestmentObjective => optInvestmentObjective
                            "
                            emit-value
                            map-options
                            v-validate="'required'"
                            data-vv-name="Investment Objective"
                            :error="errors.has('Investment Objective')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Investment Objective</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Investment Objective')"
                            class="error"
                          >{{ errors.first('Investment Objective') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="Occupation"
                            :options="optOccupation"
                            stack-label
                            :option-label="
                              optOccupation =>
                                optOccupation.dropdown_details_desc
                            "
                            :option-value="optOccupation => optOccupation"
                            emit-value
                            map-options
                            label="Occupation *"
                            v-validate="'required'"
                            data-vv-name="Occupation"
                            :error="errors.has('Occupation')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Occupation</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Occupation')"
                            class="error"
                          >{{ errors.first('Occupation') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="ResidenceStatus"
                            :options="optResidenceStatus"
                            stack-label
                            :option-label="
                              optResidenceStatus =>
                                optResidenceStatus.dropdown_details_desc
                            "
                            :option-value="
                              optResidenceStatus => optResidenceStatus
                            "
                            emit-value
                            map-options
                            label="Residence Status *"
                            v-validate="'required'"
                            data-vv-name="Residence Status"
                            :error="errors.has('Residence Status')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Residence Status</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Residence Status')"
                            class="error"
                          >{{ errors.first('Residence Status') }}</span>
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
                            label="Income Level *"
                            v-validate="'required'"
                            data-vv-name="Income Level"
                            :error="errors.has('Income Level')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Income Level</q-tooltip>
                          </q-select>
                          <span
                            v-show="errors.has('Income Level')"
                            class="error"
                          >{{ errors.first('Income Level') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            outlined
                            v-model="NextRiskAssessmentDate"
                            label="Next Risk Assessment Date *"
                            v-validate="'required'"
                            data-vv-name="Next Risk Assessment Date"
                            :error="errors.has('Next Risk Assessment Date')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy4"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="NextRiskAssessmentDate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy4.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Next Risk Assessment Date</q-tooltip>
                          </q-input>
                          <span v-show="errors.has('Next Risk Assessment Date')" class="error">
                            {{
                            errors.first('Next Risk Assessment Date')
                            }}
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="two">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="q-gutter-md">
                      <q-input outlined v-model="SpouseName" label="Spouse Name" stack-label>
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          transition-show="scale"
                          transition-hide="scale"
                        >Spouse Name</q-tooltip>
                      </q-input>
                      <q-select
                        outlined
                        v-model="SpouseID"
                        :options="optSpouseIDType"
                        stack-label
                        :option-label="
                          optSpouseIDType =>
                            optSpouseIDType.dropdown_details_desc
                        "
                        :option-value="optSpouseIDType => optSpouseIDType"
                        emit-value
                        map-options
                        label="ID Type"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          transition-show="scale"
                          transition-hide="scale"
                        >ID Type</q-tooltip>
                      </q-select>
                      <q-input
                        outlined
                        v-model="SpouseIDNumber"
                        mask="################"
                        label="Spouse ID Number"
                        stack-label
                        v-validate="'numeric|min:16|max:16'"
                        data-vv-name="Spouse ID Number"
                        :error="errors.has('Spouse ID Number')"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          transition-show="scale"
                          transition-hide="scale"
                        >Spouse ID Number</q-tooltip>
                      </q-input>
                      <span
                        v-show="errors.has('Spouse ID Number')"
                        class="error"
                      >{{ errors.first('Spouse ID Number') }}</span>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="three">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="row q-gutter-sm q-pb-md">
                      <q-btn
                        style="width:75px"
                        @click="onGetContactInfo"
                        color="grey-7"
                        icon="ion-refresh"
                        v-ripple
                      >
                        <q-tooltip>Refresh</q-tooltip>
                      </q-btn>
                      <q-btn
                        style="width:75px"
                        @click="ActionDetail"
                        color="primary"
                        icon="ion-add"
                        v-ripple
                      >
                        <q-tooltip>Add</q-tooltip>
                      </q-btn>
                      <q-btn
                        style="width:75px"
                        @click="OnUpdateContactInfo"
                        color="accent"
                        :disable="selectedcontact.length === 0"
                        icon="fas fa-pencil-alt"
                        v-ripple
                      >
                        <q-tooltip>Edit</q-tooltip>
                      </q-btn>
                      <q-btn
                        style="width:75px"
                        @click="DeleteDialogContact"
                        :disable="selectedcontact.length === 0"
                        color="negative"
                        icon="eva-trash-2"
                        v-ripple
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                    <q-table
                      title="Contact Info"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="loaddatacontactinfo"
                      :columns="columnsContact"
                      row-key="id_customer_individual"
                      selection="single"
                      :selected.sync="selectedcontact"
                      separator="cell"
                      :loading="loading"
                      color="primary"
                      wrap-cells
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-checkbox dense v-model="props.selected"></q-checkbox>
                          </q-td>
                          <q-td key="gcif_number" :props="props">
                            {{
                            props.row.gcif_number
                            }}
                          </q-td>
                          <q-td
                            key="domicile_address"
                            :props="props"
                          >{{ props.row.domicile_address }}</q-td>
                          <q-td key="mobile_phone" :props="props">{{ props.row.mobile_phone }}</q-td>
                          <q-td
                            key="postal_code.city.city_name"
                            :props="props"
                          >{{ props.row.postal_code.city.city_name }}</q-td>
                          <q-td key="email_address" :props="props">{{ props.row.email_address }}</q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                  <q-dialog v-model="ContactAdd">
                    <q-card style="width: 400px; max-width: 80vw;">
                      <q-card-section style="width: 100%">
                        <form @submit.prevent="SubmitButtonContactInfo">
                          <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                            <div class="col-6">
                              <q-btn
                                class="full-width"
                                dense
                                @click="ClearContactInfo"
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
                              <q-field dense outlined label="Global CIF Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ GlobalCifNumber }}</div>
                                </template>
                              </q-field>
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
                                @input="FilterRegion(), ClearCountry()"
                                label="Country"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="CountryContact === ''"
                                v-model="Region"
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
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="Region === ''"
                                dense
                                outlined
                                v-model="City"
                                :options="optCity"
                                stack-label
                                :option-label="optCity => optCity.city_name"
                                :option-value="optCity => optCity"
                                emit-value
                                map-options
                                @input="FilterSubdistrict(), ClearCity()"
                                label="City"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="City === ''"
                                dense
                                outlined
                                v-model="Subdistrict"
                                :options="optSubdistrict"
                                stack-label
                                :option-label="
                                  optSubdistrict => optSubdistrict.subdisct_name
                                "
                                :option-value="optSubdistrict => optSubdistrict"
                                emit-value
                                map-options
                                label="Subdistrict"
                                @input="FilterVillage(), ClearSubdistrict()"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="Subdistrict === ''"
                                v-model="Village"
                                :options="optVillage"
                                stack-label
                                :option-label="
                                  optVillage => optVillage.village_name
                                "
                                :option-value="optVillage => optVillage"
                                emit-value
                                map-options
                                label="District"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field dense outlined label="Postal Code" stack-label>
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
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
                                outlined
                                v-model="DomicileAddress"
                                stack-label
                                label="Domicile Address *"
                                type="textarea"
                                float-label="Textarea"
                                :max-height="80"
                                rows="5"
                              ></q-input>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                stack-label
                                v-model="EmailAddress"
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
                                outlined
                                mask="################"
                                v-model="MobilePhone"
                                label="Mobile Phone"
                                stack-label
                              />
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                mask="################"
                                v-model="HomePhone"
                                label="Home Phone"
                                stack-label
                              />
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                mask="################"
                                v-model="FaxNumber"
                                label="Fax Number"
                                stack-label
                              />
                            </div>
                            <div class="col-12">
                              <q-btn
                                :loading="submittingContactInfo"
                                @click="SubmitButtonContactInfo"
                                class="full-width"
                                dense
                                :disable="
                                  errors.any() ||
                                    Village === '' ||
                                    DomicileAddress === '' ||
                                    HomePhone === '' ||
                                    FaxNumber === '' ||
                                    EmailAddress === '' ||
                                    MobilePhone === ''
                                "
                                label="Submit"
                                color="accent"
                              ></q-btn>
                            </div>
                          </div>
                        </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                  <q-dialog v-model="ContactEdit">
                    <q-card style="width: 400px; max-width: 80vw;">
                      <q-card-section style="width: 100%">
                        <form @submit.prevent="SubmitButtonEditContactInfo">
                          <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                            <div class="col-12">
                              <q-btn
                                class="full-width"
                                dense
                                label="Close"
                                color="negative"
                                v-close-popup
                              ></q-btn>
                            </div>
                            <div class="col-12">
                              <q-field dense outlined label="Global CIF Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ GlobalCifNumber }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                v-model="CountryContactEdit"
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
                                @input="FilterRegionEdit(), ClearCountryEdit()"
                                label="Country"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="CountryContactEdit === ''"
                                v-model="RegionEdit"
                                :options="optRegion"
                                stack-label
                                :option-label="
                                  optRegion => optRegion.region_name
                                "
                                :option-value="optRegion => optRegion"
                                emit-value
                                map-options
                                @input="FilterCityEdit(), ClearRegionEdit()"
                                label="Region"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="RegionEdit === ''"
                                dense
                                outlined
                                v-model="CityEdit"
                                :options="optCity"
                                stack-label
                                :option-label="optCity => optCity.city_name"
                                :option-value="optCity => optCity"
                                emit-value
                                map-options
                                @input="
                                  FilterSubdistrictEdit(), ClearCityEdit()
                                "
                                label="City"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                :disable="CityEdit === ''"
                                dense
                                outlined
                                v-model="SubdistrictEdit"
                                :options="optSubdistrict"
                                stack-label
                                :option-label="
                                  optSubdistrict => optSubdistrict.subdisct_name
                                "
                                :option-value="optSubdistrict => optSubdistrict"
                                emit-value
                                map-options
                                label="Subdistrict"
                                @input="
                                  FilterVillageEdit(), ClearSubdistrictEdit()
                                "
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                dense
                                outlined
                                :disable="SubdistrictEdit === ''"
                                v-model="VillageEdit"
                                :options="optVillage"
                                stack-label
                                :option-label="
                                  optVillage => optVillage.village_name
                                "
                                :option-value="optVillage => optVillage"
                                emit-value
                                map-options
                                label="District"
                              ></q-select>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field dense outlined label="Postal Code" stack-label>
                                <template v-slot:control>
                                  <div
                                    v-show="
                                      VillageEdit.postal_code !== undefined
                                    "
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ VillageEdit.postal_code }}</div>
                                  <div
                                    v-show="
                                      VillageEdit.postal_code === undefined
                                    "
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ PostalCodeEdit }}</div>
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
                                v-model="DomicileAddressEdit"
                                label="Domicile Address *"
                                type="textarea"
                                float-label="Textarea"
                                :max-height="80"
                                rows="5"
                              ></q-input>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                stack-label
                                v-model="EmailAddressEdit"
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
                                outlined
                                v-model="MobilePhoneEdit"
                                mask="################"
                                label="Mobile Phone"
                              />
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                v-model="HomePhoneEdit"
                                mask="################"
                                label="Home Phone"
                              />
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                dense
                                outlined
                                v-model="FaxNumberEdit"
                                mask="################"
                                label="Fax Number"
                              />
                            </div>
                            <div class="col-12">
                              <q-btn
                                :loading="submittingContactInfo"
                                @click="SubmitButtonEditContactInfo"
                                class="full-width"
                                dense
                                :disable="
                                  errors.any() ||
                                    VillageEdit === '' ||
                                    DomicileAddressEdit === '' ||
                                    HomePhoneEdit === '' ||
                                    FaxNumberEdit === '' ||
                                    EmailAddressEdit === '' ||
                                    MobilePhoneEdit === ''
                                "
                                label="Submit"
                                color="accent"
                              ></q-btn>
                            </div>
                          </div>
                        </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </q-tab-panel>

                <q-tab-panel name="four">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
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
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >Beneficiary Name</q-tooltip>
                        </q-input>
                        <span
                          v-show="errors.has('Beneficiary Name')"
                          class="error"
                        >{{ errors.first('Beneficiary Name') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="BeneficiaryIDType"
                          :options="optBeneficiaryIDType"
                          stack-label
                          :option-label="
                            optBeneficiaryIDType =>
                              optBeneficiaryIDType.dropdown_details_desc
                          "
                          :option-value="
                            optBeneficiaryIDType => optBeneficiaryIDType
                          "
                          emit-value
                          map-options
                          label="Beneficiary ID Type *"
                          v-validate="'required'"
                          data-vv-name="Beneficiary ID Type"
                          :error="errors.has('Beneficiary ID Type')"
                          :error-label="errors.first('Beneficiary ID Type')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >Beneficiary ID Type</q-tooltip>
                        </q-select>
                        <span
                          v-show="errors.has('Beneficiary ID Type')"
                          class="error"
                        >{{ errors.first('Beneficiary ID Type') }}</span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          v-model="BeneficiaryIDNumber"
                          mask="################"
                          label="Beneficiary ID Number *"
                          v-validate="'required|min:16|max:16'"
                          data-vv-name="Beneficiary ID Number"
                          :error="errors.has('Beneficiary ID Number')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >Beneficiary ID Number</q-tooltip>
                        </q-input>
                        <span
                          v-show="errors.has('Beneficiary ID Number')"
                          class="error"
                        >{{ errors.first('Beneficiary ID Number') }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="six">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">CIF Info</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field outlined label="Global CIF Number" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ GlobalCifNumber }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="BranchName"
                            :options="optBranchName"
                            stack-label
                            :option-label="
                              optBranchName => optBranchName.branch_name
                            "
                            :option-value="optBranchName => optBranchName"
                            emit-value
                            map-options
                            label="Branch Name *"
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
                          <q-input
                            outlined
                            v-model="RegistrationDate"
                            label="Registration Date *"
                            v-validate="'required'"
                            data-vv-name="Registration Date"
                            :error="errors.has('Registration Date')"
                            :error-label="errors.first('Registration Date')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy5"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="RegistrationDate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy5.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Registration Date</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Registration Date')"
                            class="error"
                          >{{ errors.first('Registration Date') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            outlined
                            v-model="DateLastUpdate"
                            label="Date Last Update *"
                            v-validate="'required'"
                            data-vv-name="Date Last Update"
                            :error="errors.has('Date Last Update')"
                            :error-label="errors.first('Date Last Update')"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  ref="qDateProxy6"
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    today-btn
                                    v-model="DateLastUpdate"
                                    mask="YYYY-MM-DD"
                                    @input="() => $refs.qDateProxy6.hide()"
                                  />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Data Last Update</q-tooltip>
                          </q-input>
                          <span
                            v-show="errors.has('Date Last Update')"
                            class="error"
                          >{{ errors.first('Date Last Update') }}</span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="LobCode"
                            :options="optLobCode"
                            label="LOB Code *"
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
                            :error-label="errors.first('LOB Code')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Line Of Business Code</q-tooltip>
                          </q-select>
                          <span v-show="errors.has('LOB Code')" class="error">
                            {{
                            errors.first('LOB Code')
                            }}
                          </span>
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
                            :option-value="optCustomerGroup => optCustomerGroup"
                            emit-value
                            map-options
                            label="Customer Group *"
                            v-validate="'required'"
                            data-vv-name="Customer Group"
                            :error="errors.has('Customer Group')"
                            :error-label="errors.first('Customer Group')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                            >Customer Group</q-tooltip>
                          </q-select>
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
                      <div class="row q-gutter-sm q-pb-md">
                        <q-btn
                          style="width:75px"
                          @click="onGetDataBankInfo"
                          color="grey-7"
                          icon="ion-refresh"
                          v-ripple
                        >
                          <q-tooltip>Refresh</q-tooltip>
                        </q-btn>
                        <q-btn
                          style="width:75px"
                          @click="ActionDetailBank"
                          color="primary"
                          icon="ion-add"
                          v-ripple
                        >
                          <q-tooltip>Add</q-tooltip>
                        </q-btn>
                        <q-btn
                          style="width:75px"
                          @click="OnUpdateAccountInfo"
                          color="accent"
                          :disable="selectedbank.length === 0"
                          icon="fas fa-pencil-alt"
                          v-ripple
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          style="width:75px"
                          @click="DeleteDialogBank"
                          :disable="selectedbank.length === 0"
                          color="negative"
                          icon="eva-trash-2"
                          v-ripple
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </div>
                      <q-table
                        title="Account Info"
                        class="q-ml-sm q-mr-sm table-label-color"
                        :grid="$q.screen.xs"
                        :data="loaddatabank"
                        :columns="columnsBank"
                        row-key="id_bank_info"
                        selection="single"
                        :selected.sync="selectedbank"
                        separator="cell"
                        :loading="loading"
                        color="primary"
                        wrap-cells
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td auto-width>
                              <q-checkbox dense v-model="props.selected"></q-checkbox>
                            </q-td>
                            <q-td key="account_number" :props="props">
                              {{
                              props.row.account_number
                              }}
                            </q-td>
                            <q-td
                              key="bank.dropdown_details_desc"
                              :props="props"
                            >{{ props.row.bank.dropdown_details_desc }}</q-td>
                            <q-td
                              key="account_type.dropdown_details_desc"
                              :props="props"
                            >{{ props.row.account_type.dropdown_details_desc }}</q-td>
                            <q-td
                              key="currency.currencies_code"
                              :props="props"
                            >{{ props.row.currency.currencies_code }}</q-td>
                            <q-td
                              key="status.dropdown_details_desc"
                              :props="props"
                            >{{ props.row.status.dropdown_details_desc }}</q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </q-card-section>
                    <q-dialog v-model="AccountInfo">
                      <q-card style="width: 400px; max-width: 80vw;">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent="SubmitButtonBank">
                            <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                              <div class="col-6">
                                <q-btn
                                  class="full-width"
                                  dense
                                  @click="ClearBank"
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
                                  v-model="AccountNumber"
                                  label="Account Number*"
                                  mask="################"
                                  v-validate="'required'"
                                  data-vv-name="Account Number"
                                  :error="errors.has('Account Number')"
                                  :error-label="errors.first('Account Number')"
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
                              <div class="col-12">
                                <q-select
                                  outlined
                                  v-model="Bank"
                                  :options="optBank"
                                  label="Bank*"
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
                                  label="Account Type*"
                                  v-validate="'required'"
                                  data-vv-name="Account Type"
                                  :error="errors.has('Account Type')"
                                  :error-label="errors.first('Account Type')"
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
                                  v-model="Currency"
                                  :options="optCurrency"
                                  stack-label
                                  :option-label="
                                    optCurrency => optCurrency.currencies_code
                                  "
                                  :option-value="optCurrency => optCurrency"
                                  emit-value
                                  map-options
                                  label="Currency*"
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
                                  v-model="StatusBank"
                                  :options="optStatus"
                                  label="Status*"
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
                                  disable
                                  outlined
                                  v-model="Default"
                                  :options="optDefault"
                                  label="Default"
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
                                  :loading="submittingButtonBank"
                                  @click="SubmitButtonBank"
                                  class="full-width"
                                  dense
                                  :disable="
                                    AccountNumber === '' ||
                                      Bank === '' ||
                                      Currency === '' ||
                                      AccountType === '' ||
                                      StatusBank === ''
                                  "
                                  label="Submit"
                                  color="accent"
                                ></q-btn>
                              </div>
                            </div>
                          </form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
                    <q-dialog v-model="AccountInfoEdit">
                      <q-card style="width: 400px; max-width: 80vw;">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent="SubmitEditButtonBank">
                            <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                              <div class="col-12">
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
                                  v-model="AccountNumberEdit"
                                  label="Account Number*"
                                  v-validate="'required'"
                                  data-vv-name="Account Number"
                                  :error="errors.has('Account Number')"
                                  :error-label="errors.first('Account Number')"
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
                              <div class="col-12">
                                <q-select
                                  outlined
                                  v-model="BankEdit"
                                  :options="optBank"
                                  label="Bank*"
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
                                  v-model="AccountTypeEdit"
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
                                  label="Account Type*"
                                  v-validate="'required'"
                                  data-vv-name="Account Type"
                                  :error="errors.has('Account Type')"
                                  :error-label="errors.first('Account Type')"
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
                                  v-model="CurrencyEdit"
                                  :options="optCurrency"
                                  stack-label
                                  :option-label="
                                    optCurrency => optCurrency.currencies_code
                                  "
                                  :option-value="optCurrency => optCurrency"
                                  emit-value
                                  map-options
                                  label="Currency*"
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
                                  v-model="StatusBankEdit"
                                  :options="optStatus"
                                  label="Status*"
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
                                  disable
                                  outlined
                                  v-model="DefaultEdit"
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
                                  :loading="submittingButtonBank"
                                  @click="SubmitEditButtonBank"
                                  class="full-width"
                                  dense
                                  :disable="
                                    AccountNumberEdit === '' ||
                                      BankEdit === '' ||
                                      CurrencyEdit === '' ||
                                      AccountTypeEdit === '' ||
                                      StatusBankEdit === ''
                                  "
                                  label="Submit"
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

                <q-tab-panel name="Doc">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-gutter-sm q-pb-md">
                      <q-btn style="width:75px" @click="onGetDocument" color="grey-7" icon="ion-refresh" v-ripple>
                        <q-tooltip>Refresh</q-tooltip>
                      </q-btn>
                      <q-btn style="width:75px" @click="onAddDocument" :disable="fileUploaded.length === optDataDocumentCategory.length" color="primary" icon="ion-add"
                        v-ripple>
                        <q-tooltip>Add</q-tooltip>
                      </q-btn>
                      <q-btn style="width: 80px" @click="onViewDocument" color="cyan-7" :disable="
                            selectedDoc.length === 0
                            " icon="details" v-ripple>
                        <q-tooltip>View</q-tooltip>
                      </q-btn>
                      <q-btn style="width:75px" @click="DeleteDialogDocument" :disable="selectedDoc.length === 0"
                        color="negative" icon="eva-trash-2" v-ripple>
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                    <q-table title="Document" class="q-ml-sm q-mr-sm table-label-color" :grid="$q.screen.xs"
                      :data="fileUploaded" :columns="columnsDocument" row-key="id_document" selection="single"
                      :selected.sync="selectedDoc" separator="cell" :loading="loading" color="primary" wrap-cells>
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-checkbox dense v-model="props.selected"></q-checkbox>
                          </q-td>
                          <q-td @click.native="onView(props.row)" key="document_id.dropdown_details_desc"
                            :props="props">{{ props.row.document_id.dropdown_details_desc }}</q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                  <q-dialog v-model="ViewDocument">
                    <q-card style="width: 500px">
                      <q-card-section style="width: 100%">
                        <div>
                          <q-img class="justify-center q-pa-md" :src="DocumentView" style="max-width: 100%;">
                            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                              {{DocumentCategoryView}}
                            </div>
                            <template v-slot:loading>
                              <q-spinner-ios />
                            </template>
                          </q-img>
                        </div>
                        <br>
                        <div class="col-12">
                          <q-btn class="full-width" dense label="Close" color="negative" v-close-popup></q-btn>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                  <q-dialog v-model="AddDocument" persistent>
                    <q-card style="width: 700px; max-width: 80vw;">
                      <batm-upload :Muser="userdata" :ugAccessToken="token" :optDocuments="optDocumentCategory" :status="mode" :gcif="GlobalCifNumber" :callMethod="refreshDataUpload"></batm-upload>
                    </q-card>
                  </q-dialog>
                </q-tab-panel>

                <q-tab-panel name="eight">
                  <div class="q-pa-md">
                    <div class="q-gutter-md">
                      <q-input
                        outlined
                        v-model="TaxIdNumber"
                        mask="##.###.###.#-###.###"
                        label="Tax ID Number *"
                        v-validate="'required|min:20|max:20'"
                        data-vv-name="Tax ID Number"
                        :error="errors.has('Tax ID Number')"
                        :error-label="errors.first('Tax ID Number')"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          transition-show="scale"
                          transition-hide="scale"
                        >Tax ID Number</q-tooltip>
                      </q-input>
                      <span
                        v-show="errors.has('Tax ID Number')"
                        class="error"
                      >{{ errors.first('Tax ID Number') }}</span>
                      <q-input
                        outlined
                        v-model="TinForeignTin"
                        mask="##.###.###.#-###.###"
                        label="TIN / Foreign TIN"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          transition-show="scale"
                          transition-hide="scale"
                        >TIN / Foreign TIN</q-tooltip>
                      </q-input>
                      <q-select
                        outlined
                        v-model="IssuanceCountry"
                        :options="optCountryOfNationality"
                        stack-label
                        :option-label="
                          optCountryOfNationality =>
                            optCountryOfNationality.country_name
                        "
                        :option-value="
                          optCountryOfNationality => optCountryOfNationality
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
                :loading="submitting"
                @click="submitDialog"
                :disable="errors.any() || !isFormInValid || IncomeLevel === '' ||
                BranchName === '' ||
                TaxIdNumber === '' ||
                TinForeignTin === '' ||
                IssuanceCountry === '' ||
                Gender === '' || CountryOfBirth === '' || loaddatacontactinfo.length === 0 || loaddatabank.length === 0 || draggingFab"
                label="Submit"
                color="accent"
                icon="reply"
                label-position="left"
                external-label
                push
              />
              <q-fab-action
                @click="cancelDialog"
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
                label="Submit"
                color="accent"
                icon="reply"
                square
                label-position="bottom"
                padding="4px"
                :loading="submitting"
                @click="submitDialog"
                :disable="errors.any() || !isFormInValid || IncomeLevel === '' ||
                BranchName === '' ||
                TaxIdNumber === '' ||
                TinForeignTin === '' ||
                IssuanceCountry === '' ||
                Gender === '' || CountryOfBirth === '' || loaddatacontactinfo.length === 0 || loaddatabank.length === 0 || draggingFab"
                push
              />
              <q-fab-action
                @click="cancelDialog"
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
let init = ''
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import { GetBranch } from 'src/graphql/MasterBranch'
import {
  ViewFilterRegion,
  ViewFilterCities,
  ViewFilterSubdistrict,
  ViewFilterVillage
} from 'src/graphql/PostalCode'
import { GetAllSales } from 'src/graphql/MasterSales'
import {
  GetAllAccountBankInfoIndi,
  GetAllContantInfo,
  DelContactInfoIndividual,
  InsCustomerIndividualContactInfo,
  EditCustomerIndividualContactInfo,
  InsAccountBankInfo,
  DelAccountBankInfo,
  EditAccountBankInfo,
  EditCustomerIndividual,
  GetAllDocumentIndividual,
  DelDocument
} from 'src/graphql/Customer/IndividualCustomer'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetMasterCountries } from 'src/graphql/Countries'
import { GetMasterCurrency } from 'src/graphql/Currency'
import uploadDocument from 'components/UploadDocuments/UploadDocumentsEdit.vue'
import { date } from 'quasar'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'EditIndividualCustomer',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      token: this.ugAccessToken,
      userdata: this.Muser,
      tab: 'one',
      mode: 'individual',
      // tab one
      OldGcif: '',
      optNationality: [],
      Nationality: {},
      IDType: {},
      optIDType: [],
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Salutation: {},
      optSalutation: [],
      CountryOfNationality: {},
      optCountryOfNationality: [],
      Gender: {},
      optGender: [],
      Status: {},
      // optCountryOfNationality: this.optCountryOfNationality1,
      IDNumber: '',
      IDNumberRegistrationDate: '',
      IDExpirationDate: '',
      CountryOfBirth: '',
      optCountryOfBirth1: [],
      optCountryOfBirth: this.optCountryOfBirth1,
      PlaceOfBirth: '',
      optPlaceOfBirth1: [],
      optPlaceOfBirth: this.optPlaceOfBirth1,
      InvestmentObjective: {},
      optInvestmentObjective: [],
      ResidenceStatus: {},
      optResidenceStatus: [],
      BeneficiaryIDType: {},
      optBeneficiaryIDType: [],
      BeneficiaryName: '',
      BeneficiaryIDNumber: '',
      DateOfBirth: '',
      EducationalBackground: {},
      optEducationalBackground: [],
      MotherMaidenName: '',
      Religion: {},
      optReligion: [],
      Occupation: {},
      optOccupation: [],
      IncomeLevel: {},
      optIncomeLevel: [],
      MaritalStatus: {},
      optMaritalStatus: [],
      SpouseName: '',
      SpouseID: {},
      optSpouseIDType: [],
      SpouseIDNumber: '',
      NextRiskAssessmentDate: '',
      // tab two
      CountryContact: '',
      optCountryContact: [],
      Region: '',
      optRegion: [],
      City: '',
      optCity: [],

      Subdistrict: '',
      optSubdistrict: [],
      submittingContactInfo: false,
      Village: '',
      optVillage: [],
      loading: false,
      selectedcontact: [],
      DomicileAddress: '',
      PostalCode: '',
      optPostalCode: [],
      Country: '',
      HomePhone: '',
      MobilePhone: '',
      FaxNumber: '',
      EmailAddress: '',
      CountryContactEdit: {},
      CityEdit: {},
      SubdistrictEdit: {},
      VillageEdit: {},
      RegionEdit: {},
      DomicileAddressEdit: '',
      EmailAddressEdit: '',
      MobilePhoneEdit: '',
      HomePhoneEdit: '',
      FaxNumberEdit: '',
      PostalCodeEdit: '',
      ContactAdd: false,
      ContactEdit: false,
      code: '',
      columnsContact: [
        {
          name: 'gcif_number',
          label: 'GCIF Number',
          field: 'gcif_number',
          align: 'Left',
          sortable: true
        },
        {
          name: 'domicile_address',
          label: 'Domicile Address',
          field: 'domicile_address',
          align: 'Left'
        },
        {
          name: 'mobile_phone',
          label: 'Mobile Phone',
          field: 'mobile_phone',
          align: 'Left'
        },
        {
          name: 'postal_code.city.city_name',
          label: 'City',
          field: 'postal_code.city.city_name',
          align: 'Left'
        },
        {
          name: 'email_address',
          label: 'Email',
          field: 'email_address',
          align: 'Left'
        }
      ],
      // tab three
      StatmentType: '',
      FatcaStatus: '',
      SIDNumber: '',
      IFUA: '',
      ClientCode: '',
      // tab four
      GlobalCifNumber: '',
      BranchName: {},
      optBranchName: [],
      BranchSales: '',
      BranchWaperd: '',
      Waperd: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: {},
      optLobCode: [],
      CustomerGroup: {},
      optCustomerGroup: [],
      // tab five
      submittingButtonBank: false,
      AccountInfo: false,
      AccountInfoEdit: false,
      AccountNumberEdit: '',
      BankEdit: {},
      AccountTypeEdit: {},
      CurrencyEdit: {},
      StatusBankEdit: {},
      DefaultEdit: '',
      Bank: '',
      AccountNumber: '',
      AccountType: '',
      Currency: '',
      Default: '',
      StatusBank: '',
      optBank: [],
      optAccountType: [],
      optCurrency: [],
      optDefault: [],
      optStatus: [],
      selectedbank: [],
      codeidbank: '',
      columnsBank: [
        {
          name: 'account_number',
          label: 'Account Number',
          field: 'account_number',
          align: 'Left',
          sortable: true
        },
        {
          name: 'bank.dropdown_details_desc',
          label: 'Bank',
          field: 'bank.dropdown_details_desc',
          align: 'Left'
        },
        {
          name: 'account_type.dropdown_details_desc',
          label: 'Account Type',
          field: 'account_type.dropdown_details_desc',
          align: 'Left'
        },
        {
          name: 'currency.currencies_code',
          label: 'Currency',
          field: 'currency.currencies_code',
          align: 'Left'
        },
        {
          name: 'status.dropdown_details_desc',
          label: 'Status',
          field: 'status.dropdown_details_desc',
          align: 'Left'
        }
      ],
      // tab six
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: {},
      Modify_Date: '',
      optIssuanceCountry: [],
      selected: JSON.parse(localStorage.selectedData),
      uuid: null,
      submitting: false,
      // upload
      AddDocument: false,
      ViewDocument: false,
      DocumentView: null,
      DocumentCategoryView: '',
      columnsDocument: [
        {
          name: 'document_id.dropdown_details_desc',
          label: 'Document Category',
          field: 'document_id.dropdown_details_desc',
          align: 'Left'
        }
      ],
      selectedDoc: [],
      optDocumentCategory: [],
      optDataDocumentCategory: [],
      loaddatacontactinfo: [],
      loaddatabank: [],
      data: [],
      fileUploaded: [],
      mask: '',
      rule: '',
      SalesName: {}
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
    optDataDocumentCategory: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Document Category'
      }
    },
    loaddatabank: {
      query: GetAllAccountBankInfoIndi,
      update: data => data.wms_customer_individual_bank_info,
      variables: {
        code: init
      }
    },
    loaddatacontactinfo: {
      query: GetAllContantInfo,
      update: data => data.wms_customer_individual_contact_person,
      variables: {
        code: init
      }
    },
    optNationality: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Nationality For Individual'
      }
    },
    optBeneficiaryIDType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optIDType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optSpouseIDType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optSalutation: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Salutation'
      }
    },
    optGender: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Gender'
      }
    },
    optReligion: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Religion'
      }
    },
    optMaritalStatus: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Marital Status'
      }
    },
    optEducationalBackground: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Education'
      }
    },
    optInvestmentObjective: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Investment Objective'
      }
    },
    optOccupation: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Occupation'
      }
    },
    optResidenceStatus: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Resident Status'
      }
    },
    optIncomeLevel: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Income Level'
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
    optBank: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Bank'
      }
    },
    optAccountType: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Account Type'
      }
    },
    optStatus: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: 'Status'
      }
    },
    optCountryOfNationality: {
      query: GetMasterCountries,
      update: data => data.wms_countries
    },
    optBranchName: {
      query: GetBranch,
      update: data => data.wms_branches
    },
    optCurrency: {
      query: GetMasterCurrency,
      update: data => data.wms_currencies
    },
    optCountryContact: {
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
    GetDocument: {
      query: GetAllDocumentIndividual,
      update: data => data.wms_document_individual,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    localStorage.removeItem('dataUpload')
    this.onBindData()
    this.onGetDataBankInfo()
    this.onGetContactInfo()
    this.onGetDocument()
    // this.getDataSpouse()
    // this.DateLastUpdate = this.now2
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  beforeDestroy() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    isFormInValid() {
      let validate = Object.keys(this.field).some(
        key => this.field[key].validated
      )
      let valid = Object.keys(this.field).some(key => this.field[key].valid)
      return { valid, validate }
    },
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2: () => date.formatDate(Date.now(), 'YYYY-MM-DD')
  },
  methods: {
    getWaperd() {
      if (this.SalesName === '') {
        this.BranchWaperd = ''
        this.Waperd = ''
      } else {
        this.Waperd = this.SalesName.sales_waperd_no
        this.BranchWaperd = this.SalesName.branch_desc.branch_name
      }
    },
    async onAddDocument() {
      await this.onGetDocument()
      this.AddDocument = true
    },
    async refreshDataUpload() {
      await this.onGetDocument()
      this.AddDocument = false
      this.selectedDoc = []
    },
    onGetDocument() {
      this.$log.info('info call at function onLoadData')
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.GetDocument
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.fileUploaded = response.data.wms_document_individual
            let arrOpt = []
            for (let i = 0; i < this.fileUploaded.length; i++) {
              arrOpt.push(this.fileUploaded[i].document_id.dropdown_details_desc)
            }
            this.$nextTick(() => {
              this.optDocumentCategory = this.onGetOptDocumentary(arrOpt, this.optDataDocumentCategory)
            })
            this.loading = false
          })
      }, 500)
    },
    onGetOptDocumentary(arrOpt, opt) {
      for (let i = 0; i < arrOpt.length; i++) {
        opt = opt.filter(val => {
          return val.dropdown_details_desc !== arrOpt[i]
        })
      }
      return opt
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    OnUpdateAccountInfo() {
      this.AccountInfoEdit = true
      this.codeidbank = this.selectedbank[0].id_bank_info
      this.GlobalCifNumber = this.selectedbank[0].gcif_number
      this.AccountNumberEdit = this.selectedbank[0].account_number
      this.BankEdit.dropdown_details_desc = this.selectedbank[0].bank.dropdown_details_desc
      this.AccountTypeEdit.dropdown_details_desc = this.selectedbank[0].account_type.dropdown_details_desc
      this.CurrencyEdit.currencies_code = this.selectedbank[0].currency.currencies_code
      this.StatusBankEdit.dropdown_details_desc = this.selectedbank[0].status.dropdown_details_desc
      this.DefaultEdit = this.selectedbank[0].default
    },
    ActionDetailBank() {
      this.AccountInfo = true
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
          this.onDeleteBank()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onDeleteBank() {
      setTimeout(() => {
        this.loading = true
        this.$apollo.mutate({
          mutation: DelAccountBankInfo,
          variables: {
            code: this.selectedbank[0].id_bank_info
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onGetDataBankInfo()
        this.selectedbank = []
        this.loading = false
      })
    },
    SubmitEditButtonBank() {
      this.submittingButtonBank = true
      this.$apollo
        .mutate({
          mutation: EditAccountBankInfo,
          variables: {
            code: this.codeidbank,
            changes: {
              gcif_number: this.GlobalCifNumber,
              account_number: this.AccountNumberEdit,
              id_bank: this.BankEdit.id_dropdownlist_detail,
              id_account_type: this.AccountTypeEdit.id_dropdownlist_detail,
              id_currency: this.CurrencyEdit.id,
              default: this.Default,
              id_status: this.StatusBankEdit.id_dropdownlist_detail,
              modified_by: this.userdata.name,
              modified_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingButtonBank = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Account Number ' +
              this.AccountNumberEdit +
              ' ' +
              'Has Been Updated'
          })
          this.AccountInfoEdit = false
          this.onGetDataBankInfo()
          this.selectedbank = []
        })
        .catch(err => {
          this.submittingButtonBank = false

          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
    },
    SubmitButtonBank() {
      this.submittingButtonBank = true
      this.$apollo
        .mutate({
          mutation: InsAccountBankInfo,
          variables: {
            objects: {
              gcif_number: this.GlobalCifNumber,
              account_number: this.AccountNumber,
              id_bank: this.Bank.id_dropdownlist_detail,
              id_account_type: this.AccountType.id_dropdownlist_detail,
              id_currency: this.Currency.id,
              default: this.Default,
              id_status: this.StatusBank.id_dropdownlist_detail,
              created_by: this.userdata.name,
              created_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingButtonBank = false
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Account Number ' +
              this.AccountNumber +
              ' ' +
              'Has Been Submitted'
          })
          this.onGetDataBankInfo()
          this.ClearBankData()
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
    ClearBankData() {
      this.AccountNumber = ''
      this.AccountType = ''
      this.Currency = ''
      this.Default = ''
      this.StatusBank = ''
      this.Bank = ''
      this.$validator.reset()
    },
    SubmitButtonEditContactInfo() {
      this.submittingContactInfo = true
      this.$apollo
        .mutate({
          mutation: EditCustomerIndividualContactInfo,
          variables: {
            code: this.code,
            changes: {
              domicile_address: this.DomicileAddressEdit,
              id_country: this.CountryContactEdit.id_country,
              id_postalcode: this.VillageEdit.id_postal_code,
              home_phone: this.HomePhoneEdit,
              fax_number: this.FaxNumberEdit,
              mobile_phone: this.MobilePhoneEdit,
              email_address: this.EmailAddressEdit,
              modified_by: this.userdata.name,
              modified_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingContactInfo = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Address ' + this.DomicileAddressEdit + ' ' + 'Has Been Updated'
          })
          this.ContactEdit = false
          this.onGetContactInfo()
          this.selectedcontact = []
        })
        .catch(err => {
          this.submittingContactInfo = false

          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
    },
    onViewDocument() {
      this.ViewDocument = true
      this.DocumentView = this.selectedDoc[0].document
      this.DocumentCategoryView = this.selectedDoc[0].document_id.dropdown_details_desc
    },
    onView(row) {
      console.log(row, '???')
      this.ViewDocument = true
      this.DocumentView = row.document
      this.DocumentCategoryView = row.document_id.dropdown_details_desc
    },
    OnUpdateContactInfo() {
      this.ContactEdit = true
      this.code = this.selectedcontact[0].id_customer_individual
      this.GlobalCifNumber = this.selectedcontact[0].gcif_number
      this.CountryContactEdit.country_name = this.selectedcontact[0].country.country_name
      this.RegionEdit.region_name = this.selectedcontact[0].postal_code.city.region.region_name
      this.CityEdit.city_name = this.selectedcontact[0].postal_code.city.city_name
      this.VillageEdit.village_name = this.selectedcontact[0].postal_code.village_name
      this.DomicileAddressEdit = this.selectedcontact[0].domicile_address
      this.EmailAddressEdit = this.selectedcontact[0].email_address
      this.MobilePhoneEdit = this.selectedcontact[0].mobile_phone
      this.HomePhoneEdit = this.selectedcontact[0].home_phone
      this.FaxNumberEdit = this.selectedcontact[0].fax_number
      this.SubdistrictEdit.subdisct_name = this.selectedcontact[0].postal_code.subdisct_name
      this.PostalCodeEdit = this.selectedcontact[0].postal_code.postal_code
      this.FilterRegionEdit()
      this.FilterCityEdit()
      this.FilterSubdistrictEdit()
      this.FilterVillageEdit()
    },
    ClearBank() {
      this.AccountNumber = ''
      this.AccountType = ''
      this.Currency = ''
      this.Default = ''
      this.StatusBank = ''
      this.Bank = ''
      this.$validator.reset()

      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
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
    ClearData() {
      this.CountryContact = ''
      this.Region = ''
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
      this.DomicileAddress = ''
      this.FaxNumber = ''
      this.HomePhone = ''
      this.MobilePhone = ''
      this.EmailAddress = ''
      this.$validator.reset()
    },
    ClearContactInfo() {
      this.CountryContact = ''
      this.Region = ''
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
      this.DomicileAddress = ''
      this.FaxNumber = ''
      this.HomePhone = ''
      this.MobilePhone = ''
      this.EmailAddress = ''
      this.$validator.reset()

      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    ClearCountry() {
      this.Region = ''
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
    },
    ClearRegion() {
      this.City = ''
      this.Subdistrict = ''
      this.Village = ''
    },
    ClearCity() {
      this.Subdistrict = ''
      this.Village = ''
    },
    ClearSubdistrict() {
      this.Village = ''
    },
    FilterRegion() {
      this.$q.loading.show()
      this.$apollo.queries.optRegion
        .refetch({
          code: this.CountryContact.country_name
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
    FilterRegionEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optRegion
        .refetch({
          code: this.CountryContactEdit.country_name
        })
        .then(response => {
          this.optRegion = response.data.wms_region
          this.$q.loading.hide()
        })
    },
    FilterCityEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optCity
        .refetch({
          code: this.RegionEdit.region_name
        })
        .then(response => {
          this.optCity = response.data.wms_cities
          this.$q.loading.hide()
        })
    },
    FilterSubdistrictEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optSubdistrict
        .refetch({
          code: this.CityEdit.city_name
        })
        .then(response => {
          this.optSubdistrict = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    FilterVillageEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optVillage
        .refetch({
          code: this.SubdistrictEdit.subdisct_name
        })
        .then(response => {
          this.optVillage = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    ClearCountryEdit() {
      if (this.PostalCodeEdit !== '') {
        this.RegionEdit = ''
        this.CityEdit = ''
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.RegionEdit = ''
        this.CityEdit = ''
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.VillageEdit.postal_code = ''
      }
    },
    ClearRegionEdit() {
      if (this.PostalCodeEdit !== '') {
        this.CityEdit = ''
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.CityEdit = ''
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.VillageEdit.postal_code = ''
      }
    },
    ClearCityEdit() {
      if (this.PostalCodeEdit !== '') {
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.SubdistrictEdit = ''
        this.VillageEdit = ''
        this.VillageEdit.postal_code = ''
      }
    },
    ClearSubdistrictEdit() {
      if (this.PostalCodeEdit !== '') {
        this.Village = ''
        this.PostalCodeEdit = ''
      } else {
        this.VillageEdit = ''
        this.VillageEdit.postal_code = ''
      }
    },
    onGetDataBankInfo() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddatabank
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.loaddatabank = response.data.wms_customer_individual_bank_info
            console.log(this.loaddatabank, 'isi data bank')
          })
        this.loading = false
      }, 2000)
    },
    onGetContactInfo() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddatacontactinfo
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.loaddatacontactinfo =
              response.data.wms_customer_individual_contact_person
            console.log(this.loaddatacontactinfo, 'isi data contact')
          })
        this.loading = false
      }, 2000)
    },
    ActionDetail() {
      this.$log.info('info call at function ActionDetail')
      this.ContactAdd = true
    },
    SubmitButtonContactInfo() {
      this.submittingContactInfo = true
      this.$apollo
        .mutate({
          mutation: InsCustomerIndividualContactInfo,
          variables: {
            objects: {
              gcif_number: this.GlobalCifNumber,
              domicile_address: this.DomicileAddress,
              id_country: this.CountryContact.id_country,
              id_postalcode: this.Village.id_postal_code,
              home_phone: this.HomePhone,
              fax_number: this.FaxNumber,
              mobile_phone: this.MobilePhone,
              email_address: this.EmailAddress,
              created_by: this.userdata.name,
              created_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingContactInfo = false
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Address ' + this.DomicileAddress + ' ' + 'Has Been Submitted'
          })
          this.onGetContactInfo()
          this.ClearData()
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
    DeleteDialogDocument() {
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
          this.onDeleteDocument()
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onDeleteDocument() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DelDocument,
          variables: {
            code: this.selectedDoc[0].id_document
          }
        })
        this.submitting = false
        this.$q.notify({
          timeout: 300,
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onGetDocument()
        this.selectedDoc = []
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
          this.onDelete()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onDelete() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DelContactInfoIndividual,
          variables: {
            code: this.selectedcontact[0].id_customer_individual
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onGetContactInfo()
        this.selectedcontact = []
      })
    },
    filterCountryOfNationality(val, update) {
      this.$log.info('info call at function filterCountryOfNationality')
      if (val === '') {
        update(() => {
          this.optCountryOfNationality = this.optCountryOfNationality1
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optCountryOfNationality = this.optCountryOfNationality1.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    onLoadCountryOfNationality() {
      this.$log.info('info call at function onLoadCountryOfNationality')
      this.$axios
        .get(this.baseUrl + '/api/batm/wms/WMS_Country_Master', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        .then(response => {
          this.optCountryOfNationality1 = response.data.entities
          this.$log.debug('Debug', response)
        })
    },
    getPostalCode() {
      this.PostalCode = this.City.WMS_Postal_Code
      return this.PostalCode
    },
    filterOccupation(val, update) {
      this.$log.info('info call at function filterOccupation')
      if (val === '') {
        update(() => {
          this.optOccupation1 = this.optOccupation
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optOccupation1 = this.optOccupation.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterInvestmentObjective(val, update) {
      this.$log.info('info call at function filterInvestmentObjective')
      if (val === '') {
        update(() => {
          this.optInvestmentObjective1 = this.optInvestmentObjective
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optInvestmentObjective1 = this.optInvestmentObjective.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterEducationalBackground(val, update) {
      this.$log.info('info call at function filterEducationalBackground')
      if (val === '') {
        update(() => {
          this.optEducationalBackground1 = this.optEducationalBackground
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optEducationalBackground1 = this.optEducationalBackground.filter(
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
    filterCity(val, update) {
      this.$log.info('info call at function filterCountryOfBirth')
      if (val === '') {
        update(() => {
          this.optPlaceOfBirth = this.optPlaceOfBirth1
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optPlaceOfBirth = this.optPlaceOfBirth1.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCountryOfBirth(val, update) {
      this.$log.info('info call at function filterCountryOfBirth')
      if (val === '') {
        update(() => {
          this.optCountryOfBirth = this.optCountryOfBirth1
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.optCountryOfBirth = this.optCountryOfBirth1.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    typeFormat() {
      if (this.CountryOfNationality !== null) {
        if (this.CountryOfNationality.label === 'INDONESIA') {
          if (
            this.IDType !== null ||
            this.SpouseID !== null ||
            this.BeneficiaryIDType !== null
          ) {
            let inputType =
              this.IDType || this.SpouseID || this.BeneficiaryIDType
            console.log(inputType, '=================')
            if (inputType.label === 'KTP') {
              this.mask = '################'
              this.maskSpouse = '################'
              this.maskBeneficiary = '################'
              this.rule = 'numeric|min:16|max:16'
              this.ruleSpouse = 'numeric|min:16|max:16'
              this.ruleBeneficiary = 'numeric|min:16|max:16'
            } else if (inputType.label === 'Passport') {
              this.mask = 'A #######'
              this.maskSpouse = 'A #######'
              this.maskBeneficiary = 'A #######'
              this.rule = 'regex:^[A-Z 0-9\\ ]+$||min:9|max:9'
              this.ruleSpouse = 'regex:^[A-Z 0-9\\ ]+$||min:9|max:9'
              this.ruleBeneficiary = 'regex:^[A-Z 0-9\\ ]+$||min:9|max:9'
            } else {
              this.IDNumber = ''
              this.SpouseIDNumber = ''
              this.BeneficiaryIDNumber = ''
              this.mask = ''
              this.maskSpouse = ''
              this.maskBeneficiary = ''
              this.rule = ''
              this.ruleSpouse = ''
              this.ruleBeneficiary = ''
            }
          } else {
            this.IDNumber = ''
            this.SpouseIDNumber = ''
            this.BeneficiaryIDNumber = ''
            this.mask = ''
            this.maskSpouse = ''
            this.maskBeneficiary = ''
            this.rule = ''
            this.ruleSpouse = ''
            this.ruleBeneficiary = ''
          }
        } else if (this.CountryOfNationality.label !== 'INDONESIA') {
          if (
            this.IDType !== null ||
            this.SpouseID !== null ||
            this.BeneficiaryIDType !== null
          ) {
            let inputType =
              this.IDType || this.SpouseID || this.BeneficiaryIDType
            if (inputType.label === 'KTP') {
              this.mask = ''
              this.maskSpouse = ''
              this.maskBeneficiary = ''
              this.rule = 'required'
              this.ruleSpouse = ''
              this.ruleBeneficiary = 'required'
            } else if (inputType.label === 'Passport') {
              this.mask = ''
              this.maskSpouse = ''
              this.maskBeneficiary = ''
              this.rule = 'required'
              this.ruleSpouse = ''
              this.ruleBeneficiary = 'required'
            } else {
              this.IDNumber = ''
              this.SpouseIDNumber = ''
              this.BeneficiaryIDNumber = ''
              this.mask = ''
              this.maskSpouse = ''
              this.maskBeneficiary = ''
              this.rule = ''
              this.ruleSpouse = ''
              this.ruleBeneficiary = ''
            }
          } else {
            this.IDNumber = ''
            this.SpouseIDNumber = ''
            this.BeneficiaryIDNumber = ''
            this.mask = ''
            this.maskSpouse = ''
            this.maskBeneficiary = ''
            this.rule = ''
            this.ruleSpouse = ''
            this.ruleBeneficiary = ''
          }
        }
      } else {
        this.IDType = ''
        this.IDNumber = ''
        this.SpouseIDNumber = ''
        this.BeneficiaryIDNumber = ''
        this.mask = ''
        this.maskSpouse = ''
        this.maskBeneficiary = ''
        this.rule = ''
        this.ruleSpouse = ''
        this.ruleBeneficiary = ''
      }
    },
    typeFormat2() {
      if (this.CountryOfNationality !== null) {
        if (this.CountryOfNationality.label === 'INDONESIA') {
          if (this.SpouseID !== null) {
            let inputType = this.SpouseID
            if (inputType.label === 'KTP') {
              this.maskSpouse = '################'
              this.ruleSpouse = 'numeric|min:16|max:16'
            } else if (inputType.label === 'Passport') {
              this.maskSpouse = 'A #######'
              this.ruleSpouse = 'regex:^[A-Z 0-9\\ ]+$||min:9|max:9'
            } else {
              this.SpouseIDNumber = ''
              this.maskSpouse = ''
              this.ruleSpouse = ''
            }
          } else {
            this.SpouseIDNumber = ''
            this.maskSpouse = ''
            this.ruleSpouse = ''
          }
        } else if (this.CountryOfNationality.label !== 'INDONESIA') {
          if (this.SpouseID !== null) {
            let inputType = this.SpouseID
            if (inputType.label === 'KTP') {
              this.maskSpouse = ''
              this.ruleSpouse = ''
            } else if (inputType.label === 'Passport') {
              this.maskSpouse = ''
              this.ruleSpouse = ''
            } else {
              this.SpouseIDNumber = ''
              this.maskSpouse = ''
              this.ruleSpouse = ''
            }
          } else {
            this.SpouseIDNumber = ''
            this.maskSpouse = ''
            this.ruleSpouse = ''
          }
        }
      } else {
        this.SpouseID = ''
        this.SpouseIDNumber = ''
        this.ruleSpouse = ''
      }
    },
    typeFormat3() {
      if (this.CountryOfNationality !== null) {
        if (this.CountryOfNationality.label === 'INDONESIA') {
          if (this.BeneficiaryIDType !== null) {
            let inputType = this.BeneficiaryIDType
            if (inputType.label === 'KTP') {
              this.maskBeneficiary = '################'
              this.ruleBeneficiary = 'numeric|min:16|max:16'
            } else if (inputType.label === 'Passport') {
              this.maskBeneficiary = 'A #######'
              this.ruleBeneficiary = 'regex:^[A-Z 0-9\\ ]+$||min:9|max:9'
            } else {
              this.BeneficiaryIDNumber = ''
              this.maskBeneficiary = ''
              this.ruleBeneficiary = ''
            }
          } else {
            this.BeneficiaryIDNumber = ''
            this.maskBeneficiary = ''
            this.ruleBeneficiary = ''
          }
        } else if (this.CountryOfNationality.label !== 'INDONESIA') {
          if (this.BeneficiaryIDType !== null) {
            let inputType = this.BeneficiaryIDType
            if (inputType.label === 'KTP') {
              this.maskBeneficiary = ''
              this.ruleBeneficiary = 'required'
            } else if (inputType.label === 'Passport') {
              this.maskBeneficiary = ''
              this.ruleBeneficiary = 'required'
            } else {
              this.BeneficiaryIDNumber = ''
              this.maskBeneficiary = ''
              this.ruleBeneficiary = ''
            }
          } else {
            this.BeneficiaryIDNumber = ''
            this.maskBeneficiary = ''
            this.ruleBeneficiary = ''
          }
        }
      } else {
        this.BeneficiaryIDType = ''
        this.BeneficiaryIDNumber = ''
        this.ruleBeneficiary = ''
      }
    },
    validateFieldCountry() {
      const country = value =>
        new Promise(resolve => {
          setTimeout(() => {
            let input = value
            input = this.CountryOfNationality
            if (input === null || input === '') {
              this.IDType = ''
              this.IDNumber = ''
              this.SpouseID = ''
              this.SpouseIDNumber = ''
              this.BeneficiaryID = ''
              this.BeneficiaryIDNumber = ''
              return resolve({
                invalid: true,
                valid: false,
                data: {
                  message: `Please fill Country Of Nationality field first.`
                }
              })
            }
            return resolve({
              invalid: false,
              valid: true
            })
          }, 50)
        })
      this.$validator.extend('country', {
        validate: country,
        getMessage: (field, params, data) => data.message
      })
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
          this.$router.push({ path: '/customer' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    getDataSpouse() {
      if (this.selected[0]['WMS_CSpouseIDType'] !== undefined) {
        this.SpouseID = this.selected[0].WMS_CSpouseIDType
      }
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.OldGcif = this.selected[0].gcif_number
      this.Nationality.dropdown_details_desc = this.selected[0].nationality.dropdown_details_desc
      this.CountryOfNationality.country_name = this.selected[0].country.country_name
      this.IDType.dropdown_details_desc = this.selected[0].type_id.dropdown_details_desc
      this.IDNumber = this.selected[0].id_number
      this.IDNumberRegistrationDate = this.selected[0].id_registration_date
      this.IDExpirationDate = this.selected[0].id_expiration_date
      this.Salutation.dropdown_details_desc = this.selected[0].salutation.dropdown_details_desc
      this.FirstName = this.selected[0].first_name
      this.MiddleName = this.selected[0].middle_name
      this.LastName = this.selected[0].last_name
      this.Gender.dropdown_details_desc = this.selected[0].gender.dropdown_details_desc
      this.PlaceOfBirth = this.selected[0].place_of_birth
      this.CountryOfBirth = this.selected[0].country_of_birth
      this.DateOfBirth = this.selected[0].date_of_birth
      this.Religion.dropdown_details_desc = this.selected[0].religion.dropdown_details_desc
      this.MaritalStatus.dropdown_details_desc = this.selected[0].marital.dropdown_details_desc
      this.MotherMaidenName = this.selected[0].mother_maiden_name
      this.EducationalBackground.dropdown_details_desc = this.selected[0].educational.dropdown_details_desc
      this.InvestmentObjective.dropdown_details_desc = this.selected[0].investment_object.dropdown_details_desc
      this.Occupation.dropdown_details_desc = this.selected[0].occupation.dropdown_details_desc
      this.ResidenceStatus.dropdown_details_desc = this.selected[0].residence_status.dropdown_details_desc
      this.IncomeLevel.dropdown_details_desc = this.selected[0].income_level.dropdown_details_desc
      this.NextRiskAssessmentDate = this.selected[0].next_risk_date

      this.BeneficiaryName = this.selected[0].beneficiary_name
      this.BeneficiaryIDNumber = this.selected[0].beneficiary_id_number
      this.BeneficiaryIDType.dropdown_details_desc = this.selected[0].beneficiary.dropdown_details_desc

      this.GlobalCifNumber = this.selected[0].gcif_number
      this.BranchName.branch_name = this.selected[0].branch.branch_name
      this.BranchSales = this.selected[0].branch_sales
      this.BranchWaperd = this.selected[0].branch_waperd
      this.Waperd = this.selected[0].waperd
      this.RegistrationDate = this.selected[0].registration_date
      this.DateLastUpdate = this.selected[0].data_last_update
      this.LobCode.dropdown_details_desc = this.selected[0].lob.dropdown_details_desc
      this.CustomerGroup.dropdown_details_desc = this.selected[0].customer_group.dropdown_details_desc

      this.TaxIdNumber = this.selected[0].tin_number
      this.TinForeignTin = this.selected[0].tin_number
      this.IssuanceCountry.country_name = this.selected[0].issuance_country.country_name
      if (this.selected[0].id_status !== null) {
        this.Status.dropdown_details_desc = this.selected[0].status.dropdown_details_desc
      }
      if (this.selected[0].spouse_name !== null) {
        this.SpouseName = this.selected[0].spouse_name
      }
      if (this.selected[0].spouse_id_number !== null) {
        this.SpouseIDNumber = this.selected[0].spouse_id_number
      }
      if (this.selected[0].id_spouse !== null) {
        this.SpouseID.dropdown_details_desc = this.selected[0].spouse.dropdown_details_desc
      }
      if (this.selected[0].id_sales !== null) {
        this.SalesName.sales_name = this.selected[0].sales_customer.sales_name
      }
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
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditCustomerIndividual,
          variables: {
            code: this.OldGcif,
            changes: {
              id_nationality: this.Nationality.id_dropdownlist_detail,
              id_country: this.CountryOfNationality.id_country,
              id_type: this.IDType.id_dropdownlist_detail,
              id_number: this.IDNumber,
              id_registration_date: this.IDNumberRegistrationDate,
              id_expiration_date: this.IDExpirationDate,
              id_salutation: this.Salutation.id_dropdownlist_detail,
              first_name: this.FirstName,
              middle_name: this.MiddleName,
              last_name: this.LastName,
              id_gender: this.Gender.id_dropdownlist_detail,
              place_of_birth: this.PlaceOfBirth,
              country_of_birth: this.CountryOfBirth,
              id_religion: this.Religion.id_dropdownlist_detail,
              date_of_birth: this.DateOfBirth,
              id_marital: this.MaritalStatus.id_dropdownlist_detail,
              mother_maiden_name: this.MotherMaidenName,
              id_educational: this.EducationalBackground.id_dropdownlist_detail,
              id_investment_object: this.InvestmentObjective
                .id_dropdownlist_detail,
              id_occupation: this.Occupation.id_dropdownlist_detail,
              id_residence_status: this.ResidenceStatus.id_dropdownlist_detail,
              id_income_level: this.IncomeLevel.id_dropdownlist_detail,
              next_risk_date: this.NextRiskAssessmentDate,
              spouse_name: this.SpouseName,
              id_spouse: this.SpouseID.id_dropdownlist_detail,
              spouse_id_number: this.SpouseIDNumber,
              beneficiary_name: this.BeneficiaryName,
              id_beneficiary: this.BeneficiaryIDType.id_dropdownlist_detail,
              beneficiary_id_number: this.BeneficiaryIDNumber,
              gcif_number: this.GlobalCifNumber,
              id_branch: this.BranchName.id_branch,
              id_sales: this.SalesName.id_sales,
              branch_waperd: this.BranchWaperd,
              waperd: this.Waperd,
              registration_date: this.RegistrationDate,
              data_last_update: this.DateLastUpdate,
              id_lob: this.LobCode.id_dropdownlist_detail,
              id_customer_group: this.CustomerGroup.id_dropdownlist_detail,
              tax_id: this.TaxIdNumber,
              tin_number: this.TinForeignTin,
              id_issuance_country: this.IssuanceCountry.id_country,
              id_status: this.Status.id_dropdownlist_detail,
              fullname: this.FirstName + ' ' + this.LastName,
              modified_by: this.userdata.name,
              modified_date: this.now
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Customer ' + this.GlobalCifNumber + ' ' + 'Has Been Updated'
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
    },
    AuditTrail() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Edit',
            date_auditrail: this.now,
            menu: 'Customer Registration',
            fullname: this.userdata.name,
            username: this.userdata.preferred_username,
            submenu: 'Customer Individual',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    }
  }
}
</script>

<style>
.error {
  color: #d6502f;
}
.h2 {
  font-size: 20px;
  color: dimgray;
}
</style>
