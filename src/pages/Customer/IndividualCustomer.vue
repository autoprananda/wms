<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el
                label="Customers"
                icon="fas fa-user"
                to="/customer"
              />
              <q-breadcrumbs-el label="Individual Customer" icon="note_add" />
            </q-breadcrumbs>
          </q-card-section>

          <q-separator inset />
          <q-card-section>
            <div class="q-gutter-sm">
              <q-radio
                v-model="shape"
                val="Individual"
                label="Individual Customer"
                @input="togglecust"
              />
              <q-radio
                v-model="shape"
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
                    <!-- <q-btn
                  :loading="saving"
                  @click="saveButton"
                  label="Save"
                  color="primary"
                  style="width: 80px"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                    </q-btn>-->
                    <!-- <q-btn
                  @click="loadSavedButton"
                  :disable="saveddata.length === 0"
                  label="Load"
                  color="primary"
                  style="width: 80px"
                    ></q-btn>-->
                    <q-btn
                      :loading="submitting"
                      @click="submitDialog"
                      :disable="
                        errors.any() ||
                        !isFormInValid ||
                        IncomeLevel === '' ||
                        BranchName === '' ||
                        TaxIdNumber === '' ||
                        TinForeignTin === '' ||
                        IssuanceCountry === '' ||
                        Gender === '' ||
                        dataUploaded.length === 0 ||
                        listDataBank.length === 0 ||
                        listData.length === 0 ||
                        CountryOfBirth === ''
                      "
                      label="Submit"
                      color="accent"
                      style="width: 80px"
                    ></q-btn>
                    <q-btn
                      @click="clearButton"
                      label="Clear"
                      color="cyan-7"
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
                    <q-tab
                      label="Contact Info"
                      name="three"
                      @click="changeStatusTab1(), clearValidate()"
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
                    <q-tab
                      label="Beneficiary"
                      name="four"
                      @click="changeStatusTab2(), clearValidate()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab2"
                        v-validate="'required'"
                        data-vv-name="Beneficiary Tab"
                        :error="errors.has('Beneficiary Tab')"
                      />
                    </q-tab>
                    <!-- <q-tab label="Regulatory Info" name="five" /> -->
                    <q-tab
                      label="Branch Info"
                      name="six"
                      @click="changeStatusTab3(), clearValidate()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab3"
                        v-validate="'required'"
                        data-vv-name="Branch Info Tab"
                        :error="errors.has('Branch Info Tab')"
                      />
                    </q-tab>
                    <q-tab
                      label="Document"
                      name="seven"
                      @click="
                        changeStatusTab4(), clearValidate(), onGetOptDocuments()
                      "
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab4"
                        v-validate="'required'"
                        data-vv-name="Document Tab"
                        :error="errors.has('Document Tab')"
                      />
                    </q-tab>
                    <q-tab
                      label="Tax Info"
                      name="eight"
                      @click="changeStatusTab5(), clearValidate()"
                    >
                      <q-input
                        class="form-input"
                        type="text"
                        v-model="ActiveTab5"
                        v-validate="'required'"
                        data-vv-name="Tax Info Tab"
                        :error="errors.has('Tax Info Tab')"
                      />
                    </q-tab>
                  </q-tabs>
                  <span v-show="errors.has('Beneficiary Tab')" class="error">
                    {{ errors.first('Beneficiary Tab') }} </span
                  >&nbsp;
                  <span v-show="errors.has('Branch Info Tab')" class="error">
                    {{ errors.first('Branch Info Tab') }} </span
                  >&nbsp;
                  <span v-show="errors.has('Tax Info Tab')" class="error">
                    {{ errors.first('Tax Info Tab') }}
                  </span>
                  <q-separator />

                  <q-tab-panels keep-alive v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div
                            class="col text-weight-bolder text-subtitle1 q-mb-sm"
                          >
                            Identifications
                          </div>
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
                                  (optNationality) =>
                                    optNationality.dropdown_details_desc
                                "
                                :option-value="
                                  (optNationality) => optNationality
                                "
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
                                  >Nationality</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Nationality')"
                                class="error"
                                >{{ errors.first('Nationality') }}</span
                              >
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
                                  (optCountryOfNationality) =>
                                    optCountryOfNationality.country_name
                                "
                                :option-value="
                                  (optCountryOfNationality) =>
                                    optCountryOfNationality
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
                                  >Country Of Nationality</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Country Of Nationality')"
                                class="error"
                                >{{
                                  errors.first('Country Of Nationality')
                                }}</span
                              >
                            </div>

                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="IDType"
                                :options="optIDType"
                                stack-label
                                :option-label="
                                  (optIDType) => optIDType.dropdown_details_desc
                                "
                                :option-value="(optIDType) => optIDType"
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
                                  >ID Type</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('ID Type')"
                                class="error"
                              >
                                {{ errors.first('ID Type') }}
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
                                >{{ errors.first('ID Number') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="IDNumberRegistrationDate"
                                label="ID Number Registration Date *"
                                v-validate="'required'"
                                data-vv-name="ID Number Registration Date"
                                :error="
                                  errors.has('ID Number Registration Date')
                                "
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
                                  >ID Number Registration Date</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="
                                  errors.has('ID Number Registration Date')
                                "
                                class="error"
                                >{{
                                  errors.first('ID Number Registration Date')
                                }}</span
                              >
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
                                  >ID Expiration Date</q-tooltip
                                >
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
                                  (optStatus) => optStatus.dropdown_details_desc
                                "
                                :option-value="(optStatus) => optStatus"
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
                                  >Status</q-tooltip
                                >
                              </q-select>
                              <span v-show="errors.has('Status')" class="error">
                                {{ errors.first('Status') }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div
                            class="col text-weight-bolder text-subtitle1 q-mb-sm"
                          >
                            Personal Informations
                          </div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-select
                                outlined
                                v-model="Salutation"
                                :options="optSalutation"
                                label="Salutation *"
                                stack-label
                                :option-label="
                                  (optSalutation) =>
                                    optSalutation.dropdown_details_desc
                                "
                                :option-value="(optSalutation) => optSalutation"
                                emit-value
                                map-options
                                v-validate="'required'"
                                data-vv-name="Salutation"
                                :error="errors.has('Salutation')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Salutation</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Salutation')"
                                class="error"
                                >{{ errors.first('Salutation') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                              <q-input
                                stack-label
                                outlined
                                v-model="FirstName"
                                label="First Name *"
                                v-validate="'required'"
                                data-vv-name="First Name"
                                :error="errors.has('First Name')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >First Name</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('First Name')"
                                class="error"
                                >{{ errors.first('First Name') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="MiddleName"
                                label="Middle Name"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Middle Name</q-tooltip
                                >
                              </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
                                outlined
                                v-model="LastName"
                                label="Last Name"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Last Name</q-tooltip
                                >
                              </q-input>
                            </div>
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-select
                                outlined
                                v-model="Gender"
                                :options="optGender"
                                stack-label
                                :option-label="
                                  (optGender) => optGender.dropdown_details_desc
                                "
                                :option-value="(optGender) => optGender"
                                emit-value
                                map-options
                                label="Gender *"
                                v-validate="'required'"
                                data-vv-name="Gender"
                                :error="errors.has('Gender')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Gender</q-tooltip
                                >
                              </q-select>
                              <span v-show="errors.has('Gender')" class="error">
                                {{ errors.first('Gender') }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-input
                                stack-label
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
                                  >Place Of Birth</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('Place Of Birth')"
                                class="error"
                                >{{ errors.first('Place Of Birth') }}</span
                              >
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
                                  >Country Of Birth</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('Country Of Birth')"
                                class="error"
                                >{{ errors.first('Country Of Birth') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="Religion"
                                :options="optReligion"
                                stack-label
                                :option-label="
                                  (optReligion) =>
                                    optReligion.dropdown_details_desc
                                "
                                :option-value="(optReligion) => optReligion"
                                emit-value
                                map-options
                                label="Religion *"
                                v-validate="'required'"
                                data-vv-name="Religion"
                                :error="errors.has('Religion')"
                                :error-label="errors.first('Religion')"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="bottom middle"
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Religion</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Religion')"
                                class="error"
                              >
                                {{ errors.first('Religion') }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Date Of Birth</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('Date Of Birth')"
                                class="error"
                                >{{ errors.first('Date Of Birth') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-select
                                outlined
                                v-model="MaritalStatus"
                                :options="optMaritalStatus"
                                stack-label
                                :option-label="
                                  (optMaritalStatus) =>
                                    optMaritalStatus.dropdown_details_desc
                                "
                                :option-value="
                                  (optMaritalStatus) => optMaritalStatus
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Marital Status</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Marital Status')"
                                class="error"
                                >{{ errors.first('Marital Status') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
                                stack-label
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Mother Maiden Name</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('Mother Maiden Name')"
                                class="error"
                                >{{ errors.first('Mother Maiden Name') }}</span
                              >
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div
                            class="text-weight-bolder text-subtitle1 q-mb-sm"
                          >
                            Others
                          </div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="EducationalBackground"
                                :options="optEducationalBackground"
                                label="Educational Background *"
                                stack-label
                                :option-label="
                                  (optEducationalBackground) =>
                                    optEducationalBackground.dropdown_details_desc
                                "
                                :option-value="
                                  (optEducationalBackground) =>
                                    optEducationalBackground
                                "
                                emit-value
                                map-options
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
                                  >Educational Background</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Educational Background')"
                                class="error"
                                >{{
                                  errors.first('Educational Background')
                                }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="InvestmentObjective"
                                :options="optInvestmentObjective"
                                label="Investment Objective *"
                                stack-label
                                :option-label="
                                  (optInvestmentObjective) =>
                                    optInvestmentObjective.dropdown_details_desc
                                "
                                :option-value="
                                  (optInvestmentObjective) =>
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
                                  >Investment Objective</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Investment Objective')"
                                class="error"
                                >{{
                                  errors.first('Investment Objective')
                                }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="Occupation"
                                :options="optOccupation"
                                label="Occupation *"
                                stack-label
                                :option-label="
                                  (optOccupation) =>
                                    optOccupation.dropdown_details_desc
                                "
                                :option-value="(optOccupation) => optOccupation"
                                emit-value
                                map-options
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
                                  >Occupation</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Occupation')"
                                class="error"
                                >{{ errors.first('Occupation') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="ResidenceStatus"
                                :options="optResidenceStatus"
                                stack-label
                                :option-label="
                                  (optResidenceStatus) =>
                                    optResidenceStatus.dropdown_details_desc
                                "
                                :option-value="
                                  (optResidenceStatus) => optResidenceStatus
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Residence Status</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Residence Status')"
                                class="error"
                                >{{ errors.first('Residence Status') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="IncomeLevel"
                                :options="optIncomeLevel"
                                stack-label
                                :option-label="
                                  (optIncomeLevel) =>
                                    optIncomeLevel.dropdown_details_desc
                                "
                                :option-value="
                                  (optIncomeLevel) => optIncomeLevel
                                "
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Income Level</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Income Level')"
                                class="error"
                                >{{ errors.first('Income Level') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Next Risk Assessment Date</q-tooltip
                                >
                              </q-input>
                              <span
                                v-show="errors.has('Next Risk Assessment Date')"
                                class="error"
                              >
                                {{ errors.first('Next Risk Assessment Date') }}
                              </span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              outlined
                              stack-label
                              v-model="SpouseName"
                              label="Spouse Name"
                            ></q-input>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="SpouseID"
                              :options="optSpouseIDType"
                              stack-label
                              :option-label="
                                (optSpouseIDType) =>
                                  optSpouseIDType.dropdown_details_desc
                              "
                              :option-value="
                                (optSpouseIDType) => optSpouseIDType
                              "
                              emit-value
                              map-options
                              label="ID Type *"
                            ></q-select>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="SpouseIDNumber"
                              :mask="maskSpouse"
                              label="Spouse ID Number"
                            ></q-input>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="three">
                      <q-card-section>
                        <div class="q-gutter-sm">
                          <q-btn
                            style="width: 75px"
                            :loading="LoadDetail"
                            @click="ActionDetail"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            style="width: 75px"
                            @click="DeleteDialogContact"
                            :disable="selectedContact.length === 0"
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                      </q-card-section>
                      <q-table
                        title="Contact Info"
                        class="table-label-color"
                        :grid="$q.screen.xs"
                        :data="listData"
                        :columns="columns"
                        row-key="order_key"
                        selection="single"
                        :selected.sync="selectedContact"
                        separator="cell"
                        :loading="loading"
                        color="primary"
                        wrap-cells
                      ></q-table>
                      <q-dialog v-model="ContactAdd">
                        <q-card style="width: 400px; max-width: 80vw">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="AddButton">
                              <div
                                class="row q-col-gutter-y-md q-col-gutter-x-sm"
                              >
                                <div class="col-6">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    label="Clear"
                                    @click="ClearContactInfo"
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
                                  <q-select
                                    dense
                                    outlined
                                    v-model="CountryContact"
                                    :options="optCountryContact"
                                    stack-label
                                    :option-label="
                                      (optCountryContact) =>
                                        optCountryContact.country_name
                                    "
                                    :option-value="
                                      (optCountryContact) => optCountryContact
                                    "
                                    emit-value
                                    map-options
                                    @input="FilterRegion(), ClearCountry()"
                                    label="Country *"
                                    v-validate="'required'"
                                    data-vv-name="Country"
                                    :error="errors.has('Country')"
                                  />
                                  <span
                                    v-show="errors.has('Country')"
                                    class="error"
                                    >{{ errors.first('Country') }}</span
                                  >
                                </div>
                                <div class="col-12">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="CountryContact === ''"
                                    v-model="Region"
                                    :options="optRegion"
                                    stack-label
                                    :option-label="
                                      (optRegion) => optRegion.region_name
                                    "
                                    :option-value="(optRegion) => optRegion"
                                    emit-value
                                    map-options
                                    @input="FilterCity(), ClearRegion()"
                                    label="Region *"
                                    v-validate="'required'"
                                    data-vv-name="Region"
                                    :error="errors.has('Region')"
                                  />
                                  <span
                                    v-show="errors.has('Region')"
                                    class="error"
                                    >{{ errors.first('Region') }}</span
                                  >
                                </div>
                                <div class="col-12">
                                  <q-select
                                    :disable="Region === ''"
                                    dense
                                    outlined
                                    v-model="City"
                                    :options="optCity"
                                    stack-label
                                    :option-label="
                                      (optCity) => optCity.city_name
                                    "
                                    :option-value="(optCity) => optCity"
                                    emit-value
                                    map-options
                                    @input="FilterSubdistrict(), ClearCity()"
                                    label="City *"
                                    v-validate="'required'"
                                    data-vv-name="City"
                                    :error="errors.has('City')"
                                  />
                                  <span
                                    v-show="errors.has('City')"
                                    class="error"
                                  >
                                    {{ errors.first('City') }}
                                  </span>
                                </div>
                                <div class="col-12">
                                  <q-select
                                    :disable="City === ''"
                                    dense
                                    outlined
                                    v-model="Subdistrict"
                                    :options="optSubdistrict"
                                    stack-label
                                    :option-label="
                                      (optSubdistrict) =>
                                        optSubdistrict.subdisct_name
                                    "
                                    :option-value="
                                      (optSubdistrict) => optSubdistrict
                                    "
                                    emit-value
                                    map-options
                                    label="Subdistrict *"
                                    @input="FilterVillage(), ClearSubdistrict()"
                                    v-validate="'required'"
                                    data-vv-name="Subdistrict"
                                    :error="errors.has('Subdistrict')"
                                  />
                                  <span
                                    v-show="errors.has('Subdistrict')"
                                    class="error"
                                    >{{ errors.first('Subdistrict') }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-select
                                    dense
                                    outlined
                                    :disable="Subdistrict === ''"
                                    v-model="Village"
                                    :options="optVillage"
                                    stack-label
                                    :option-label="
                                      (optVillage) => optVillage.village_name
                                    "
                                    :option-value="(optVillage) => optVillage"
                                    emit-value
                                    map-options
                                    label="District *"
                                    v-validate="'required'"
                                    data-vv-name="District"
                                    :error="errors.has('District')"
                                  />
                                  <span
                                    v-show="errors.has('District')"
                                    class="error"
                                    >{{ errors.first('District') }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-field
                                    dense
                                    outlined
                                    label="Postal Code *"
                                    stack-label
                                  >
                                    <template v-slot:control>
                                      <div
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >
                                        {{ Village.postal_code }}
                                      </div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-12">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="DomicileAddress"
                                    label="Domicile Address *"
                                    type="textarea"
                                    stack-label
                                    float-label="Textarea"
                                    :max-height="60"
                                    rows="3"
                                    v-validate="'required'"
                                    data-vv-name="Domicile Address"
                                    :error="errors.has('Domicile Address')"
                                  />
                                  <span
                                    v-show="errors.has('Domicile Address')"
                                    class="error"
                                    >{{
                                      errors.first('Domicile Address')
                                    }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-input
                                    dense
                                    outlined
                                    stack-label
                                    v-model="EmailAddress"
                                    label="Email *"
                                    v-validate="'required|email'"
                                    data-vv-name="Email"
                                    :error="errors.has('Email')"
                                  />
                                  <span
                                    v-show="errors.has('Email')"
                                    class="error"
                                    >{{ errors.first('Email') }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="MobilePhone"
                                    mask="#############"
                                    label="Mobile Phone *"
                                    stack-label
                                    v-validate="'required|min:10|max:13'"
                                    data-vv-name="Mobile Phone"
                                    :error="errors.has('Mobile Phone')"
                                  />
                                  <span
                                    v-show="errors.has('Mobile Phone')"
                                    class="error"
                                    >{{ errors.first('Mobile Phone') }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="HomePhone"
                                    mask="#############"
                                    label="Home Phone *"
                                    stack-label
                                    v-validate="'required|min:10|max:23'"
                                    data-vv-name="Home Phone"
                                    :error="errors.has('Home Phone')"
                                  />
                                  <span
                                    v-show="errors.has('Home Phone')"
                                    class="error"
                                    >{{ errors.first('Home Phone') }}</span
                                  >
                                </div>
                                <div class="col-6">
                                  <q-input
                                    dense
                                    outlined
                                    v-model="FaxNumber"
                                    mask="#############"
                                    label="Fax Number"
                                    stack-label
                                    v-validate="'required'"
                                    data-vv-name="Fax Number *"
                                    :error="errors.has('Fax Number')"
                                  />
                                  <span
                                    v-show="errors.has('Fax Number')"
                                    class="error"
                                    >{{ errors.first('Fax Number') }}</span
                                  >
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    dense
                                    :loading="adding"
                                    @click="AddButton"
                                    :disable="
                                      errors.any() ||
                                      Village === '' ||
                                      FaxNumber === '' ||
                                      HomePhone === '' ||
                                      MobilePhone === ''
                                    "
                                    label="Add"
                                    color="accent"
                                    class="full-width"
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
                                >Beneficiary Name</q-tooltip
                              >
                            </q-input>
                            <span
                              v-show="errors.has('Beneficiary Name')"
                              class="error"
                              >{{ errors.first('Beneficiary Name') }}</span
                            >
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="BeneficiaryIDType"
                              :options="optBeneficiaryIDType"
                              stack-label
                              :option-label="
                                (optBeneficiaryIDType) =>
                                  optBeneficiaryIDType.dropdown_details_desc
                              "
                              :option-value="
                                (optBeneficiaryIDType) => optBeneficiaryIDType
                              "
                              emit-value
                              map-options
                              label="Beneficiary ID Type *"
                              v-validate="'required'"
                              data-vv-name="Beneficiary ID Type"
                              :error="errors.has('Beneficiary ID Type')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                                >Beneficiary ID Type</q-tooltip
                              >
                            </q-select>
                            <span
                              v-show="errors.has('Beneficiary ID Type')"
                              class="error"
                              >{{ errors.first('Beneficiary ID Type') }}</span
                            >
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
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
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                                >Beneficiary IDN umber</q-tooltip
                              >
                            </q-input>
                            <span
                              v-show="errors.has('Beneficiary ID Number')"
                              class="error"
                              >{{ errors.first('Beneficiary ID Number') }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="six">
                      <q-card class="shadow-3">
                        <q-card-section>
                          <div
                            class="text-weight-bolder text-subtitle1 q-mb-sm"
                          >
                            CIF Info
                          </div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="BranchName"
                                :options="optBranchName"
                                label="Branch Name *"
                                stack-label
                                :option-label="
                                  (optBranchName) => optBranchName.branch_name
                                "
                                :option-value="(optBranchName) => optBranchName"
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
                                  >Branch Name</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Branch Name')"
                                class="error"
                                >{{ errors.first('Branch Name') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="SalesName"
                                :options="optSalesName"
                                label="Sales Name *"
                                stack-label
                                :option-label="
                                  (optSalesName) => optSalesName.sales_name
                                "
                                :option-value="(optSalesName) => optSalesName"
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
                                  >Sales Name</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Sales Name')"
                                class="error"
                                >{{ errors.first('Sales Name') }}</span
                              >
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field
                                outlined
                                label="Branch WAPERD"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >
                                    {{ BranchWaperd }}
                                  </div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field outlined label="WAPERD" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >
                                    {{ Waperd }}
                                  </div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field
                                outlined
                                label="Registration Date"
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
                                    {{ RegistrationDate }}
                                  </div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field
                                outlined
                                label="Date Last Update"
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
                                    {{ DateLastUpdate }}
                                  </div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                stack-label
                                outlined
                                v-model="LobCode"
                                :options="optLobCode"
                                label="LOB Code *"
                                :option-label="
                                  (optLobCode) =>
                                    optLobCode.dropdown_details_desc
                                "
                                :option-value="(optLobCode) => optLobCode"
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Line Of Business Code</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('LOB Code')"
                                class="error"
                              >
                                {{ errors.first('LOB Code') }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                clearable
                                outlined
                                v-model="CustomerGroup"
                                :options="optCustomerGroup"
                                stack-label
                                :option-label="
                                  (optCustomerGroup) =>
                                    optCustomerGroup.dropdown_details_desc
                                "
                                :option-value="
                                  (optCustomerGroup) => optCustomerGroup
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
                                  content-style="font-size: 11px"
                                  :offset="[10, 10]"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  >Customer Group</q-tooltip
                                >
                              </q-select>
                              <span
                                v-show="errors.has('Customer Group')"
                                class="error"
                                >{{ errors.first('Customer Group') }}</span
                              >
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>

                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="q-gutter-sm">
                            <q-btn
                              style="width: 75px"
                              :loading="LoadDetail"
                              @click="ActionDetailBank"
                              color="primary"
                              icon="ion-add"
                              v-ripple
                            >
                              <q-tooltip>Add</q-tooltip>
                            </q-btn>
                            <q-btn
                              style="width: 75px"
                              @click="DeleteDialogBank"
                              :disable="selectedBank.length === 0"
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
                          <q-card style="width: 400px; max-width: 80vw">
                            <q-card-section style="width: 100%">
                              <form @submit.prevent>
                                <div
                                  class="row q-col-gutter-y-md q-col-gutter-x-sm"
                                >
                                  <div class="col-6">
                                    <q-btn
                                      dense
                                      class="full-width"
                                      label="Clear"
                                      color="cyan-7"
                                      @click="ClearButtonBank"
                                    ></q-btn>
                                  </div>
                                  <div class="col-6">
                                    <q-btn
                                      dense
                                      class="full-width"
                                      label="Close"
                                      color="negative"
                                      v-close-popup
                                    ></q-btn>
                                  </div>
                                  <div class="col-12">
                                    <q-input
                                      dense
                                      stack-label
                                      outlined
                                      mask="################"
                                      v-model="AccountNumber"
                                      label="Account Number *"
                                      v-validate="'required'"
                                      data-vv-name="Account Number"
                                      :error="errors.has('Account Number')"
                                      :error-label="
                                        errors.first('Account Number')
                                      "
                                    ></q-input>
                                    <span
                                      v-show="errors.has('Account Number')"
                                      class="error"
                                      >{{
                                        errors.first('Account Number')
                                      }}</span
                                    >
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      dense
                                      outlined
                                      v-model="Bank"
                                      :options="optBank"
                                      label="Bank *"
                                      v-validate="'required'"
                                      data-vv-name="Bank"
                                      stack-label
                                      :option-label="
                                        (optBank) =>
                                          optBank.dropdown_details_desc
                                      "
                                      :option-value="(optBank) => optBank"
                                      emit-value
                                      map-options
                                      :error="errors.has('Bank')"
                                      :error-label="errors.first('Bank')"
                                    ></q-select>
                                    <span
                                      v-show="errors.has('Bank')"
                                      class="error"
                                      >{{ errors.first('Bank') }}</span
                                    >
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="AccountType"
                                      :options="optAccountType"
                                      stack-label
                                      :option-label="
                                        (optAccountType) =>
                                          optAccountType.dropdown_details_desc
                                      "
                                      :option-value="
                                        (optAccountType) => optAccountType
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
                                    ></q-select>
                                    <span
                                      v-show="errors.has('Account Type')"
                                      class="error"
                                      >{{ errors.first('Account Type') }}</span
                                    >
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      outlined
                                      dense
                                      v-model="Currency"
                                      :options="optCurrency"
                                      stack-label
                                      :option-label="
                                        (optCurrency) =>
                                          optCurrency.currencies_code
                                      "
                                      :option-value="
                                        (optCurrency) => optCurrency
                                      "
                                      emit-value
                                      map-options
                                      label="Currency *"
                                      v-validate="'required'"
                                      data-vv-name="Currency"
                                      :error="errors.has('Currency')"
                                      :error-label="errors.first('Currency')"
                                    ></q-select>
                                    <span
                                      v-show="errors.has('Currency')"
                                      class="error"
                                      >{{ errors.first('Currency') }}</span
                                    >
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
                                        (optStatus) =>
                                          optStatus.dropdown_details_desc
                                      "
                                      :option-value="(optStatus) => optStatus"
                                      emit-value
                                      map-options
                                      :error="errors.has('Status')"
                                      :error-label="errors.first('Status')"
                                      @blur="clearValidate()"
                                    ></q-select>
                                    <span
                                      v-show="errors.has('Status')"
                                      class="error"
                                      >{{ errors.first('Status') }}</span
                                    >
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
                                    ></q-select>
                                  </div>
                                  <div class="col-12">
                                    <q-btn
                                      dense
                                      class="full-width"
                                      :loading="adding"
                                      @click="AddButtonBank"
                                      :disable="
                                        errors.any() ||
                                        AccountNumber === '' ||
                                        Bank === '' ||
                                        AccountType === '' ||
                                        StatusBank === '' ||
                                        Currency === ''
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

                    <q-tab-panel name="seven">
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

                    <q-tab-panel name="eight">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="TaxIdNumber"
                              mask="##.###.###.#-###.###"
                              label="Tax ID Number *"
                              v-validate="'required||min:20|max:20'"
                              data-vv-name="Tax ID Number"
                              :error="errors.has('Tax ID Number')"
                              :error-label="errors.first('Tax ID Number')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                                >Tax ID Number</q-tooltip
                              >
                            </q-input>
                            <span
                              v-show="errors.has('Tax ID Number')"
                              class="error"
                              >{{ errors.first('Tax ID Number') }}</span
                            >
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="TinForeignTin"
                              mask="##.###.###.#-###.###"
                              label="TIN / Foreign TIN *"
                              v-validate="'required|min:20|max:20'"
                              data-vv-name="TIN / Foreign TIN"
                              :error="errors.has('TIN / Foreign TIN')"
                            >
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                content-style="font-size: 11px"
                                :offset="[10, 10]"
                                transition-show="scale"
                                transition-hide="scale"
                                >TIN / Foreign TIN</q-tooltip
                              >
                            </q-input>
                            <span
                              v-show="errors.has('TIN / Foreign TIN')"
                              class="error"
                              >{{ errors.first('TIN / Foreign TIN') }}</span
                            >
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="IssuanceCountry"
                              :options="optCountryOfNationality"
                              stack-label
                              :option-label="
                                (optCountryOfNationality) =>
                                  optCountryOfNationality.country_name
                              "
                              :option-value="
                                (optCountryOfNationality) =>
                                  optCountryOfNationality
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
                                >Issuance Country</q-tooltip
                              >
                            </q-select>
                            <span
                              v-show="errors.has('Issuance Country')"
                              class="error"
                              >{{ errors.first('Issuance Country') }}</span
                            >
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
            <q-breadcrumbs-el
              label="Customers"
              icon="fas fa-user"
              to="/customer"
            />
            <q-breadcrumbs-el label="Individual Customer" icon="note_add" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />
        <q-card-section>
          <div class="q-gutter-sm">
            <q-radio
              v-model="shape"
              val="Individual"
              label="Individual Customer"
              @input="togglecust"
            />
            <q-radio
              v-model="shape"
              val="Corporate"
              label="Corporate Customer"
              @input="togglecust"
            />
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
                <q-tab label="Customer" name="one" />
                <q-tab
                  v-show="MaritalStatus.dropdown_details_desc === 'Married'"
                  label="Spouse"
                  name="two"
                />
                <q-tab
                  label="Contact Info"
                  name="three"
                  @click="
                    changeStatusTab1(), clearValidate(), refreshDataUpload()
                  "
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
                <q-tab
                  label="Beneficiary"
                  name="four"
                  @click="changeStatusTab2(), clearValidate()"
                >
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab2"
                    v-validate="'required'"
                    data-vv-name="Beneficiary Tab"
                    :error="errors.has('Beneficiary Tab')"
                  />
                </q-tab>
                <!-- <q-tab label="Regulatory Info" name="five" /> -->
                <q-tab
                  label="Branch Info"
                  name="six"
                  @click="changeStatusTab3(), clearValidate()"
                >
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab3"
                    v-validate="'required'"
                    data-vv-name="Branch Info Tab"
                    :error="errors.has('Branch Info Tab')"
                  />
                </q-tab>
                <q-tab
                  label="Document"
                  name="seven"
                  @click="
                    changeStatusTab4(), clearValidate(), refreshDataUpload()
                  "
                >
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab4"
                    v-validate="'required'"
                    data-vv-name="Document Tab"
                    :error="errors.has('Document Tab')"
                  />
                </q-tab>
                <q-tab
                  label="Tax Info"
                  name="eight"
                  @click="changeStatusTab5(), clearValidate()"
                >
                  <q-input
                    class="form-input"
                    type="text"
                    v-model="ActiveTab5"
                    v-validate="'required'"
                    data-vv-name="Tax Info Tab"
                    :error="errors.has('Tax Info Tab')"
                  />
                </q-tab>
              </q-tabs>
              <span v-show="errors.has('Beneficiary Tab')" class="error">
                {{ errors.first('Beneficiary Tab') }} </span
              >&nbsp;
              <span v-show="errors.has('Branch Info Tab')" class="error">
                {{ errors.first('Branch Info Tab') }} </span
              >&nbsp;
              <span v-show="errors.has('Tax Info Tab')" class="error">
                {{ errors.first('Tax Info Tab') }}
              </span>
              <q-separator />

              <q-tab-panels keep-alive v-model="tab" animated>
                <q-tab-panel name="one">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div
                        class="col text-weight-bolder text-subtitle1 q-mb-sm"
                      >
                        Identifications
                      </div>
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
                              (optNationality) =>
                                optNationality.dropdown_details_desc
                            "
                            :option-value="(optNationality) => optNationality"
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
                              >Nationality</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Nationality')"
                            class="error"
                            >{{ errors.first('Nationality') }}</span
                          >
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
                              (optCountryOfNationality) =>
                                optCountryOfNationality.country_name
                            "
                            :option-value="
                              (optCountryOfNationality) =>
                                optCountryOfNationality
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
                              >Country Of Nationality</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Country Of Nationality')"
                            class="error"
                            >{{ errors.first('Country Of Nationality') }}</span
                          >
                        </div>

                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-select
                            outlined
                            v-model="IDType"
                            :options="optIDType"
                            stack-label
                            :option-label="
                              (optIDType) => optIDType.dropdown_details_desc
                            "
                            :option-value="(optIDType) => optIDType"
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
                              >ID Type</q-tooltip
                            >
                          </q-select>
                          <span v-show="errors.has('ID Type')" class="error">
                            {{ errors.first('ID Type') }}
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
                            >{{ errors.first('ID Number') }}</span
                          >
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
                              >ID Number Registration Date</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('ID Number Registration Date')"
                            class="error"
                            >{{
                              errors.first('ID Number Registration Date')
                            }}</span
                          >
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
                              >ID Expiration Date</q-tooltip
                            >
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
                              (optStatus) => optStatus.dropdown_details_desc
                            "
                            :option-value="(optStatus) => optStatus"
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
                              >Status</q-tooltip
                            >
                          </q-select>
                          <span v-show="errors.has('Status')" class="error">
                            {{ errors.first('Status') }}
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div
                        class="col text-weight-bolder text-subtitle1 q-mb-sm"
                      >
                        Personal Informations
                      </div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-select
                            outlined
                            v-model="Salutation"
                            :options="optSalutation"
                            label="Salutation *"
                            stack-label
                            :option-label="
                              (optSalutation) =>
                                optSalutation.dropdown_details_desc
                            "
                            :option-value="(optSalutation) => optSalutation"
                            emit-value
                            map-options
                            v-validate="'required'"
                            data-vv-name="Salutation"
                            :error="errors.has('Salutation')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Salutation</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Salutation')"
                            class="error"
                            >{{ errors.first('Salutation') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                          <q-input
                            stack-label
                            outlined
                            v-model="FirstName"
                            label="First Name *"
                            v-validate="'required'"
                            data-vv-name="First Name"
                            :error="errors.has('First Name')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >First Name</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('First Name')"
                            class="error"
                            >{{ errors.first('First Name') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="MiddleName"
                            label="Middle Name"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Middle Name</q-tooltip
                            >
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
                            outlined
                            v-model="LastName"
                            label="Last Name"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Last Name</q-tooltip
                            >
                          </q-input>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-select
                            outlined
                            v-model="Gender"
                            :options="optGender"
                            stack-label
                            :option-label="
                              (optGender) => optGender.dropdown_details_desc
                            "
                            :option-value="(optGender) => optGender"
                            emit-value
                            map-options
                            label="Gender *"
                            v-validate="'required'"
                            data-vv-name="Gender"
                            :error="errors.has('Gender')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Gender</q-tooltip
                            >
                          </q-select>
                          <span v-show="errors.has('Gender')" class="error">
                            {{ errors.first('Gender') }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-input
                            stack-label
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
                              >Place Of Birth</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('Place Of Birth')"
                            class="error"
                            >{{ errors.first('Place Of Birth') }}</span
                          >
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
                              >Country Of Birth</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('Country Of Birth')"
                            class="error"
                            >{{ errors.first('Country Of Birth') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-select
                            outlined
                            v-model="Religion"
                            :options="optReligion"
                            stack-label
                            :option-label="
                              (optReligion) => optReligion.dropdown_details_desc
                            "
                            :option-value="(optReligion) => optReligion"
                            emit-value
                            map-options
                            label="Religion *"
                            v-validate="'required'"
                            data-vv-name="Religion"
                            :error="errors.has('Religion')"
                            :error-label="errors.first('Religion')"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Religion</q-tooltip
                            >
                          </q-select>
                          <span v-show="errors.has('Religion')" class="error">
                            {{ errors.first('Religion') }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Date Of Birth</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('Date Of Birth')"
                            class="error"
                            >{{ errors.first('Date Of Birth') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-select
                            outlined
                            v-model="MaritalStatus"
                            :options="optMaritalStatus"
                            stack-label
                            :option-label="
                              (optMaritalStatus) =>
                                optMaritalStatus.dropdown_details_desc
                            "
                            :option-value="
                              (optMaritalStatus) => optMaritalStatus
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Marital Status</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Marital Status')"
                            class="error"
                            >{{ errors.first('Marital Status') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-input
                            stack-label
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Mother Maiden Name</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('Mother Maiden Name')"
                            class="error"
                            >{{ errors.first('Mother Maiden Name') }}</span
                          >
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">
                        Others
                      </div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="EducationalBackground"
                            :options="optEducationalBackground"
                            label="Educational Background *"
                            stack-label
                            :option-label="
                              (optEducationalBackground) =>
                                optEducationalBackground.dropdown_details_desc
                            "
                            :option-value="
                              (optEducationalBackground) =>
                                optEducationalBackground
                            "
                            emit-value
                            map-options
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
                              >Educational Background</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Educational Background')"
                            class="error"
                            >{{ errors.first('Educational Background') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="InvestmentObjective"
                            :options="optInvestmentObjective"
                            label="Investment Objective *"
                            stack-label
                            :option-label="
                              (optInvestmentObjective) =>
                                optInvestmentObjective.dropdown_details_desc
                            "
                            :option-value="
                              (optInvestmentObjective) => optInvestmentObjective
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
                              >Investment Objective</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Investment Objective')"
                            class="error"
                            >{{ errors.first('Investment Objective') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="Occupation"
                            :options="optOccupation"
                            label="Occupation *"
                            stack-label
                            :option-label="
                              (optOccupation) =>
                                optOccupation.dropdown_details_desc
                            "
                            :option-value="(optOccupation) => optOccupation"
                            emit-value
                            map-options
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
                              >Occupation</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Occupation')"
                            class="error"
                            >{{ errors.first('Occupation') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="ResidenceStatus"
                            :options="optResidenceStatus"
                            stack-label
                            :option-label="
                              (optResidenceStatus) =>
                                optResidenceStatus.dropdown_details_desc
                            "
                            :option-value="
                              (optResidenceStatus) => optResidenceStatus
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Residence Status</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Residence Status')"
                            class="error"
                            >{{ errors.first('Residence Status') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="IncomeLevel"
                            :options="optIncomeLevel"
                            stack-label
                            :option-label="
                              (optIncomeLevel) =>
                                optIncomeLevel.dropdown_details_desc
                            "
                            :option-value="(optIncomeLevel) => optIncomeLevel"
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Income Level</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Income Level')"
                            class="error"
                            >{{ errors.first('Income Level') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Next Risk Assessment Date</q-tooltip
                            >
                          </q-input>
                          <span
                            v-show="errors.has('Next Risk Assessment Date')"
                            class="error"
                          >
                            {{ errors.first('Next Risk Assessment Date') }}
                          </span>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="two">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          stack-label
                          v-model="SpouseName"
                          label="Spouse Name"
                        ></q-input>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="SpouseID"
                          :options="optSpouseIDType"
                          stack-label
                          :option-label="
                            (optSpouseIDType) =>
                              optSpouseIDType.dropdown_details_desc
                          "
                          :option-value="(optSpouseIDType) => optSpouseIDType"
                          emit-value
                          map-options
                          label="ID Type *"
                        ></q-select>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="SpouseIDNumber"
                          :mask="maskSpouse"
                          label="Spouse ID Number"
                        ></q-input>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="three">
                  <q-card-section>
                    <div class="q-gutter-sm">
                      <q-btn
                        style="width: 75px"
                        :loading="LoadDetail"
                        @click="ActionDetail"
                        color="primary"
                        icon="ion-add"
                        v-ripple
                      >
                        <q-tooltip>Add</q-tooltip>
                      </q-btn>
                      <q-btn
                        style="width: 75px"
                        @click="DeleteDialogContact"
                        :disable="selectedContact.length === 0"
                        color="negative"
                        icon="eva-trash-2"
                        v-ripple
                      >
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </div>
                  </q-card-section>
                  <q-table
                    title="Contact Info"
                    class="table-label-color"
                    :grid="$q.screen.xs"
                    :data="listData"
                    :columns="columns"
                    row-key="order_key"
                    selection="single"
                    :selected.sync="selectedContact"
                    separator="cell"
                    :loading="loading"
                    color="primary"
                    wrap-cells
                  ></q-table>
                  <q-dialog v-model="ContactAdd">
                    <q-card style="width: 400px; max-width: 80vw">
                      <q-card-section style="width: 100%">
                        <form @submit.prevent="AddButton">
                          <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                            <div class="col-6">
                              <q-btn
                                class="full-width"
                                dense
                                label="Clear"
                                @click="ClearContactInfo"
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
                              <q-select
                                dense
                                outlined
                                v-model="CountryContact"
                                :options="optCountryContact"
                                stack-label
                                :option-label="
                                  (optCountryContact) =>
                                    optCountryContact.country_name
                                "
                                :option-value="
                                  (optCountryContact) => optCountryContact
                                "
                                emit-value
                                map-options
                                @input="FilterRegion(), ClearCountry()"
                                label="Country *"
                                v-validate="'required'"
                                data-vv-name="Country"
                                :error="errors.has('Country')"
                              />
                              <span
                                v-show="errors.has('Country')"
                                class="error"
                                >{{ errors.first('Country') }}</span
                              >
                            </div>
                            <div class="col-12">
                              <q-select
                                dense
                                outlined
                                :disable="CountryContact === ''"
                                v-model="Region"
                                :options="optRegion"
                                stack-label
                                :option-label="
                                  (optRegion) => optRegion.region_name
                                "
                                :option-value="(optRegion) => optRegion"
                                emit-value
                                map-options
                                @input="FilterCity(), ClearRegion()"
                                label="Region *"
                                v-validate="'required'"
                                data-vv-name="Region"
                                :error="errors.has('Region')"
                              />
                              <span
                                v-show="errors.has('Region')"
                                class="error"
                                >{{ errors.first('Region') }}</span
                              >
                            </div>
                            <div class="col-12">
                              <q-select
                                :disable="Region === ''"
                                dense
                                outlined
                                v-model="City"
                                :options="optCity"
                                stack-label
                                :option-label="(optCity) => optCity.city_name"
                                :option-value="(optCity) => optCity"
                                emit-value
                                map-options
                                @input="FilterSubdistrict(), ClearCity()"
                                label="City *"
                                v-validate="'required'"
                                data-vv-name="City"
                                :error="errors.has('City')"
                              />
                              <span v-show="errors.has('City')" class="error">
                                {{ errors.first('City') }}
                              </span>
                            </div>
                            <div class="col-12">
                              <q-select
                                :disable="City === ''"
                                dense
                                outlined
                                v-model="Subdistrict"
                                :options="optSubdistrict"
                                stack-label
                                :option-label="
                                  (optSubdistrict) =>
                                    optSubdistrict.subdisct_name
                                "
                                :option-value="
                                  (optSubdistrict) => optSubdistrict
                                "
                                emit-value
                                map-options
                                label="Subdistrict *"
                                @input="FilterVillage(), ClearSubdistrict()"
                                v-validate="'required'"
                                data-vv-name="Subdistrict"
                                :error="errors.has('Subdistrict')"
                              />
                              <span
                                v-show="errors.has('Subdistrict')"
                                class="error"
                                >{{ errors.first('Subdistrict') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-select
                                dense
                                outlined
                                :disable="Subdistrict === ''"
                                v-model="Village"
                                :options="optVillage"
                                stack-label
                                :option-label="
                                  (optVillage) => optVillage.village_name
                                "
                                :option-value="(optVillage) => optVillage"
                                emit-value
                                map-options
                                label="District *"
                                v-validate="'required'"
                                data-vv-name="District"
                                :error="errors.has('District')"
                              />
                              <span
                                v-show="errors.has('District')"
                                class="error"
                                >{{ errors.first('District') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-field
                                dense
                                outlined
                                label="Postal Code *"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >
                                    {{ Village.postal_code }}
                                  </div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-12">
                              <q-input
                                dense
                                outlined
                                v-model="DomicileAddress"
                                label="Domicile Address *"
                                type="textarea"
                                stack-label
                                float-label="Textarea"
                                :max-height="60"
                                rows="3"
                                v-validate="'required'"
                                data-vv-name="Domicile Address"
                                :error="errors.has('Domicile Address')"
                              />
                              <span
                                v-show="errors.has('Domicile Address')"
                                class="error"
                                >{{ errors.first('Domicile Address') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-input
                                dense
                                outlined
                                stack-label
                                v-model="EmailAddress"
                                label="Email *"
                                v-validate="'required|email'"
                                data-vv-name="Email"
                                :error="errors.has('Email')"
                              />
                              <span
                                v-show="errors.has('Email')"
                                class="error"
                                >{{ errors.first('Email') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-input
                                dense
                                outlined
                                v-model="MobilePhone"
                                mask="#############"
                                label="Mobile Phone *"
                                stack-label
                                v-validate="'required|min:10|max:13'"
                                data-vv-name="Mobile Phone"
                                :error="errors.has('Mobile Phone')"
                              />
                              <span
                                v-show="errors.has('Mobile Phone')"
                                class="error"
                                >{{ errors.first('Mobile Phone') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-input
                                dense
                                outlined
                                v-model="HomePhone"
                                mask="#############"
                                label="Home Phone *"
                                stack-label
                                v-validate="'required|min:10|max:23'"
                                data-vv-name="Home Phone"
                                :error="errors.has('Home Phone')"
                              />
                              <span
                                v-show="errors.has('Home Phone')"
                                class="error"
                                >{{ errors.first('Home Phone') }}</span
                              >
                            </div>
                            <div class="col-6">
                              <q-input
                                dense
                                outlined
                                v-model="FaxNumber"
                                mask="#############"
                                label="Fax Number"
                                stack-label
                                v-validate="'required'"
                                data-vv-name="Fax Number *"
                                :error="errors.has('Fax Number')"
                              />
                              <span
                                v-show="errors.has('Fax Number')"
                                class="error"
                                >{{ errors.first('Fax Number') }}</span
                              >
                            </div>
                            <div class="col-12">
                              <q-btn
                                dense
                                :loading="adding"
                                @click="AddButton"
                                :disable="
                                  errors.any() ||
                                  Village === '' ||
                                  FaxNumber === '' ||
                                  HomePhone === '' ||
                                  MobilePhone === ''
                                "
                                label="Add"
                                color="accent"
                                class="full-width"
                              ></q-btn>
                            </div>
                          </div>
                        </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </q-tab-panel>

                <q-tab-panel name="four">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
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
                            >Beneficiary Name</q-tooltip
                          >
                        </q-input>
                        <span
                          v-show="errors.has('Beneficiary Name')"
                          class="error"
                          >{{ errors.first('Beneficiary Name') }}</span
                        >
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="BeneficiaryIDType"
                          :options="optBeneficiaryIDType"
                          stack-label
                          :option-label="
                            (optBeneficiaryIDType) =>
                              optBeneficiaryIDType.dropdown_details_desc
                          "
                          :option-value="
                            (optBeneficiaryIDType) => optBeneficiaryIDType
                          "
                          emit-value
                          map-options
                          label="Beneficiary ID Type *"
                          v-validate="'required'"
                          data-vv-name="Beneficiary ID Type"
                          :error="errors.has('Beneficiary ID Type')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                            >Beneficiary ID Type</q-tooltip
                          >
                        </q-select>
                        <span
                          v-show="errors.has('Beneficiary ID Type')"
                          class="error"
                          >{{ errors.first('Beneficiary ID Type') }}</span
                        >
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
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
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                            >Beneficiary IDN umber</q-tooltip
                          >
                        </q-input>
                        <span
                          v-show="errors.has('Beneficiary ID Number')"
                          class="error"
                          >{{ errors.first('Beneficiary ID Number') }}</span
                        >
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="six">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">
                        CIF Info
                      </div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="BranchName"
                            :options="optBranchName"
                            label="Branch Name *"
                            stack-label
                            :option-label="
                              (optBranchName) => optBranchName.branch_name
                            "
                            :option-value="(optBranchName) => optBranchName"
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
                              >Branch Name</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Branch Name')"
                            class="error"
                            >{{ errors.first('Branch Name') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            outlined
                            v-model="SalesName"
                            :options="optSalesName"
                            label="Sales Name *"
                            stack-label
                            :option-label="
                              (optSalesName) => optSalesName.sales_name
                            "
                            :option-value="(optSalesName) => optSalesName"
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
                              >Sales Name</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Sales Name')"
                            class="error"
                            >{{ errors.first('Sales Name') }}</span
                          >
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="Branch WAPERD" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >
                                {{ BranchWaperd }}
                              </div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field outlined label="WAPERD" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >
                                {{ Waperd }}
                              </div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field
                            outlined
                            label="Registration Date"
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
                                {{ RegistrationDate }}
                              </div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field
                            outlined
                            label="Date Last Update"
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
                                {{ DateLastUpdate }}
                              </div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            stack-label
                            outlined
                            v-model="LobCode"
                            :options="optLobCode"
                            label="LOB Code *"
                            :option-label="
                              (optLobCode) => optLobCode.dropdown_details_desc
                            "
                            :option-value="(optLobCode) => optLobCode"
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Line Of Business Code</q-tooltip
                            >
                          </q-select>
                          <span v-show="errors.has('LOB Code')" class="error">
                            {{ errors.first('LOB Code') }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-select
                            clearable
                            outlined
                            v-model="CustomerGroup"
                            :options="optCustomerGroup"
                            stack-label
                            :option-label="
                              (optCustomerGroup) =>
                                optCustomerGroup.dropdown_details_desc
                            "
                            :option-value="
                              (optCustomerGroup) => optCustomerGroup
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
                              content-style="font-size: 11px"
                              :offset="[10, 10]"
                              transition-show="scale"
                              transition-hide="scale"
                              >Customer Group</q-tooltip
                            >
                          </q-select>
                          <span
                            v-show="errors.has('Customer Group')"
                            class="error"
                            >{{ errors.first('Customer Group') }}</span
                          >
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <div class="q-gutter-sm">
                        <q-btn
                          style="width: 75px"
                          :loading="LoadDetail"
                          @click="ActionDetailBank"
                          color="primary"
                          icon="ion-add"
                          v-ripple
                        >
                          <q-tooltip>Add</q-tooltip>
                        </q-btn>
                        <q-btn
                          style="width: 75px"
                          @click="DeleteDialogBank"
                          :disable="selectedBank.length === 0"
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
                      <q-card style="width: 400px; max-width: 80vw">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent>
                            <div
                              class="row q-col-gutter-y-md q-col-gutter-x-sm"
                            >
                              <div class="col-6">
                                <q-btn
                                  dense
                                  class="full-width"
                                  label="Clear"
                                  color="cyan-7"
                                  @click="ClearButtonBank"
                                ></q-btn>
                              </div>
                              <div class="col-6">
                                <q-btn
                                  dense
                                  class="full-width"
                                  label="Close"
                                  color="negative"
                                  v-close-popup
                                ></q-btn>
                              </div>
                              <div class="col-12">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  mask="################"
                                  v-model="AccountNumber"
                                  label="Account Number *"
                                  v-validate="'required'"
                                  data-vv-name="Account Number"
                                  :error="errors.has('Account Number')"
                                  :error-label="errors.first('Account Number')"
                                ></q-input>
                                <span
                                  v-show="errors.has('Account Number')"
                                  class="error"
                                  >{{ errors.first('Account Number') }}</span
                                >
                              </div>
                              <div class="col-12">
                                <q-select
                                  dense
                                  outlined
                                  v-model="Bank"
                                  :options="optBank"
                                  label="Bank *"
                                  v-validate="'required'"
                                  data-vv-name="Bank"
                                  stack-label
                                  :option-label="
                                    (optBank) => optBank.dropdown_details_desc
                                  "
                                  :option-value="(optBank) => optBank"
                                  emit-value
                                  map-options
                                  :error="errors.has('Bank')"
                                  :error-label="errors.first('Bank')"
                                ></q-select>
                                <span
                                  v-show="errors.has('Bank')"
                                  class="error"
                                  >{{ errors.first('Bank') }}</span
                                >
                              </div>
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="AccountType"
                                  :options="optAccountType"
                                  stack-label
                                  :option-label="
                                    (optAccountType) =>
                                      optAccountType.dropdown_details_desc
                                  "
                                  :option-value="
                                    (optAccountType) => optAccountType
                                  "
                                  emit-value
                                  map-options
                                  label="Account Type *"
                                  v-validate="'required'"
                                  data-vv-name="Account Type"
                                  :error="errors.has('Account Type')"
                                  :error-label="errors.first('Account Type')"
                                ></q-select>
                                <span
                                  v-show="errors.has('Account Type')"
                                  class="error"
                                  >{{ errors.first('Account Type') }}</span
                                >
                              </div>
                              <div class="col-12">
                                <q-select
                                  outlined
                                  dense
                                  v-model="Currency"
                                  :options="optCurrency"
                                  stack-label
                                  :option-label="
                                    (optCurrency) => optCurrency.currencies_code
                                  "
                                  :option-value="(optCurrency) => optCurrency"
                                  emit-value
                                  map-options
                                  label="Currency *"
                                  v-validate="'required'"
                                  data-vv-name="Currency"
                                  :error="errors.has('Currency')"
                                  :error-label="errors.first('Currency')"
                                ></q-select>
                                <span
                                  v-show="errors.has('Currency')"
                                  class="error"
                                  >{{ errors.first('Currency') }}</span
                                >
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
                                    (optStatus) =>
                                      optStatus.dropdown_details_desc
                                  "
                                  :option-value="(optStatus) => optStatus"
                                  emit-value
                                  map-options
                                  :error="errors.has('Status')"
                                  :error-label="errors.first('Status')"
                                  @blur="clearValidate()"
                                ></q-select>
                                <span
                                  v-show="errors.has('Status')"
                                  class="error"
                                  >{{ errors.first('Status') }}</span
                                >
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
                                ></q-select>
                              </div>
                              <div class="col-12">
                                <q-btn
                                  dense
                                  class="full-width"
                                  :loading="adding"
                                  @click="AddButtonBank"
                                  :disable="
                                    errors.any() ||
                                    AccountNumber === '' ||
                                    Bank === '' ||
                                    AccountType === '' ||
                                    StatusBank === '' ||
                                    Currency === ''
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

                <q-tab-panel name="seven">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
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

                <q-tab-panel name="eight">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="TaxIdNumber"
                          mask="##.###.###.#-###.###"
                          label="Tax ID Number *"
                          v-validate="'required||min:20|max:20'"
                          data-vv-name="Tax ID Number"
                          :error="errors.has('Tax ID Number')"
                          :error-label="errors.first('Tax ID Number')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                            >Tax ID Number</q-tooltip
                          >
                        </q-input>
                        <span
                          v-show="errors.has('Tax ID Number')"
                          class="error"
                          >{{ errors.first('Tax ID Number') }}</span
                        >
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="TinForeignTin"
                          mask="##.###.###.#-###.###"
                          label="TIN / Foreign TIN *"
                          v-validate="'required|min:20|max:20'"
                          data-vv-name="TIN / Foreign TIN"
                          :error="errors.has('TIN / Foreign TIN')"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            content-style="font-size: 11px"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                            >TIN / Foreign TIN</q-tooltip
                          >
                        </q-input>
                        <span
                          v-show="errors.has('TIN / Foreign TIN')"
                          class="error"
                          >{{ errors.first('TIN / Foreign TIN') }}</span
                        >
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-select
                          outlined
                          v-model="IssuanceCountry"
                          :options="optCountryOfNationality"
                          stack-label
                          :option-label="
                            (optCountryOfNationality) =>
                              optCountryOfNationality.country_name
                          "
                          :option-value="
                            (optCountryOfNationality) => optCountryOfNationality
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
                            >Issuance Country</q-tooltip
                          >
                        </q-select>
                        <span
                          v-show="errors.has('Issuance Country')"
                          class="error"
                          >{{ errors.first('Issuance Country') }}</span
                        >
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
                  IncomeLevel === '' ||
                  BranchName === '' ||
                  TaxIdNumber === '' ||
                  TinForeignTin === '' ||
                  IssuanceCountry === '' ||
                  Gender === '' ||
                  dataUploaded.length === 0 ||
                  listDataBank.length === 0 ||
                  listData.length === 0 ||
                  CountryOfBirth === '' ||
                  draggingFab
                "
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
                :disable="draggingFab"
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
                  IncomeLevel === '' ||
                  BranchName === '' ||
                  TaxIdNumber === '' ||
                  TinForeignTin === '' ||
                  IssuanceCountry === '' ||
                  Gender === '' ||
                  dataUploaded.length === 0 ||
                  listDataBank.length === 0 ||
                  listData.length === 0 ||
                  CountryOfBirth === '' ||
                  draggingFab
                "
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
                :disable="draggingFab"
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
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import { GetBranch } from 'src/graphql/MasterBranch'
import {
  ViewFilterRegion,
  ViewFilterCities,
  ViewFilterSubdistrict,
  ViewFilterVillage
} from 'src/graphql/PostalCode'
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetAllSales } from 'src/graphql/MasterSales'
import { GetMasterCountries } from 'src/graphql/Countries'
import { GetMasterCurrency } from 'src/graphql/Currency'
import {
  InsCustomerIndividual,
  InsertCustIndividualDocument,
  // GetAllCustomerIndividual,
  GetGenerateCIFIndividual
} from 'src/graphql/Customer/IndividualCustomer'
import uploadDocument from 'components/UploadDocuments/UploadDocuments.vue'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'AddCustomer',
  props: ['Muser', 'ugAccessToken'],
  data() {
    return {
      draggingFab: false,
      submitting: false,
      token: this.ugAccessToken,
      userdata: this.Muser,
      multiple: true,
      fabPos: [18, 18],
      // data generate
      GlobalCifNumberMaster: [],
      GlobalCifNumberNext: [],
      //
      tab: 'one',
      shape: 'Individual',
      // tab one
      optNationality: [],
      Nationality: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Salutation: '',
      optSalutation: [],
      CountryOfNationality: '',
      optCountryOfNationality: [],
      IDType: '',
      optIDType: [],
      Status: '',
      IDNumber: '',
      IDNumberRegistrationDate: '',
      IDExpirationDate: '',
      CountryOfBirth: '',
      PlaceOfBirth: '',
      optPlaceOfBirth1: [],
      optPlaceOfBirth: this.optPlaceOfBirth1,
      InvestmentObjective: '',
      optInvestmentObjective: [],
      ResidenceStatus: '',
      optResidenceStatus: [],
      BeneficiaryIDType: '',
      optBeneficiaryIDType: [],
      BeneficiaryName: '',
      BeneficiaryIDNumber: '',
      DateOfBirth: '',
      Gender: '',
      optGender: [],
      EducationalBackground: '',
      optEducationalBackground: [],
      MotherMaidenName: '',
      Religion: '',
      optReligion: [],
      Occupation: '',
      optOccupation: [],
      IncomeLevel: '',
      optIncomeLevel: [],
      MaritalStatus: '',
      optMaritalStatus: [],
      SpouseName: '',
      SpouseID: '',
      optSpouseIDType: [],
      SpouseIDNumber: '',
      NextRiskAssessmentDate: '',
      // tab two
      loading: false,
      listData: [],
      selectedContact: [],
      LoadDetail: false,
      DomicileAddress: '',
      City: '',
      Region: '',
      optRegion: [],
      PostalCode: '',
      optPostalCode: [],
      Subdistrict: '',
      optSubdistrict: [],
      Village: '',
      optVillage: [],
      HomePhone: '',
      MobilePhone: '',
      FaxNumber: '',
      EmailAddress: '',
      adding: false,
      ContactAdd: false,
      sortorder: 0,
      CountryContact: '',
      optCountryContact: [],
      columns: [
        // {
        //   name: 'gcif_number',
        //   label: 'GCIF Number',
        //   field: 'gcif_number',
        //   align: 'Left',
        //   sortable: true
        // },
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
          name: 'city',
          label: 'City',
          field: 'city',
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
      BranchName: '',
      optBranchName: [],
      BranchSales: '',
      SalesName: '',
      BranchWaperd: '',
      Waperd: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: '',
      optLobCode: [],
      CustomerGroup: '',
      optCustomerGroup: [],
      // tab five
      listDataBank: [],
      selectedBank: [],
      AccountInfo: false,
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
      // tab six
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: '',
      optIssuanceCountry: [],
      saveddata: [],
      saving: false,
      statedelete: '',
      // upload
      DocumentCategory: '',
      optDocumentCategory: [],
      file: null,
      preview: '',
      isFileOK: false,
      dataUploaded: [],
      DocumentUpload: '',
      dataSubmit: [],
      selectedFile: [],
      selected2: [],
      noAccountBank: [],
      tableThs: [
        {
          name: 'Name',
          label: 'Name File',
          field: (row) => row.name,
          align: 'left',
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'Size',
          label: 'Size (byte)',
          field: (row) => row.size,
          align: 'center'
        }
      ],
      mask: '',
      rule: '',
      maskSpouse: '',
      ruleSpouse: '',
      maskBeneficiary: '',
      ruleBeneficiary: '',
      ActiveTab1: '',
      ActiveTab2: '',
      ActiveTab3: '',
      ActiveTab4: '',
      ActiveTab5: ''
    }
  },
  components: {
    BatmUpload: uploadDocument
  },
  apollo: {
    optNationality: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Nationality For Individual'
      }
    },
    optBeneficiaryIDType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optIDType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optSpouseIDType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optSalutation: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Salutation'
      }
    },
    optGender: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Gender'
      }
    },
    optReligion: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Religion'
      }
    },
    optMaritalStatus: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Marital Status'
      }
    },
    onGetOptDocumentCategory: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Document Category'
      }
    },
    optEducationalBackground: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Education'
      }
    },
    optInvestmentObjective: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Investment Objective'
      }
    },
    optOccupation: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Occupation'
      }
    },
    optResidenceStatus: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Resident Status'
      }
    },
    optIncomeLevel: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Income Level'
      }
    },
    optLobCode: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'LOB Code'
      }
    },
    optCustomerGroup: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Customer Group'
      }
    },
    optBank: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Bank'
      }
    },
    optAccountType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Account Type'
      }
    },
    optStatus: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Status'
      }
    },
    optCountryOfNationality: {
      query: GetMasterCountries,
      update: (data) => data.wms_countries
    },
    optBranchName: {
      query: GetBranch,
      update: (data) => data.wms_branches
    },
    optSalesName: {
      query: GetAllSales,
      update: (data) => data.wms_sales
    },
    optCurrency: {
      query: GetMasterCurrency,
      update: (data) => data.wms_currencies
    },
    optCountryContact: {
      query: GetMasterCountries,
      update: (data) => data.wms_countries
    },
    optRegion: {
      query: ViewFilterRegion,
      update: (data) => data.wms_region,
      variables: {
        code: init
      }
    },
    optCity: {
      query: ViewFilterCities,
      update: (data) => data.wms_cities,
      variables: {
        code: init
      }
    },
    optSubdistrict: {
      query: ViewFilterSubdistrict,
      update: (data) => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optVillage: {
      query: ViewFilterVillage,
      update: (data) => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    loadgenerateCifIndividual: {
      query: GetGenerateCIFIndividual,
      update: (data) => data.wms_customer_individual
    }
  },
  mounted() {
    localStorage.removeItem('dataUpload')
    this.RegistrationDate = this.now2
    this.DateLastUpdate = this.now2
    this.onGetOptDocuments()
  },
  beforeDestroy() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
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
        (key) => this.field[key].validated
      )
      return validate
    },
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      this.$log.info('info call at function now2')
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    }
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
    ClearButtonBank() {
      this.AccountNumber = ''
      this.Bank = ''
      this.AccountType = ''
      this.AccountType = ''
      this.Currency = ''
      this.StatusBank = ''
      this.Default = ''

      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          timeout: 300,
          color: 'cyan-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    ClearContactInfo() {
      this.CountryContact = ''
      this.Region = ''
      this.City = ''
      this.Village = ''
      this.Subdistrict = ''
      this.DomicileAddress = ''
      this.FaxNumber = ''
      this.HomePhone = ''
      this.MobilePhone = ''
      this.EmailAddress = ''

      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
        this.submitting = false
        this.$q.notify({
          timeout: 300,
          color: 'cyan-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    OnLoadCIFIndividual() {
      this.submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadgenerateCifIndividual
          .refetch()
          .then((response) => {
            this.GlobalCifNumberMaster = response.data.wms_customer_individual
            console.log(this.GlobalCifNumberMaster, '=======>>>>')
            this.generateCIFNumber()
          })
      }, 2000)
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
          // gcif_number: this.GlobalCifNumber,
          domicile_address: this.DomicileAddress,
          id_country: this.CountryContact.id_country,
          id_postalcode: this.Village.id_postal_code,
          home_phone: this.HomePhone,
          fax_number: this.FaxNumber,
          mobile_phone: this.MobilePhone,
          email_address: this.EmailAddress,
          city: this.City.city_name,
          created_by: this.userdata.name,
          created_date: this.now
        })
        this.adding = false

        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Address ' + this.DomicileAddress + ' ' + 'Has Been Added'
        })
        this.cleardata()
      }, 1000)
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
          id_status: this.StatusBank.id_dropdownlist_detail,
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
        this.clearBank()
      }, 1000)
    },
    clearBank() {
      this.AccountNumber = ''
      this.Bank = ''
      this.AccountType = ''
      this.Currency = ''
      this.StatusBank = ''
      this.Default = ''
      this.$validator.reset()
    },
    cleardata() {
      this.CountryContact = ''
      this.Region = ''
      this.City = ''
      this.Village = ''
      this.Subdistrict = ''
      this.DomicileAddress = ''
      this.FaxNumber = ''
      this.HomePhone = ''
      this.MobilePhone = ''
      this.EmailAddress = ''
      this.$validator.reset()
    },
    delOrderKey() {
      this.listData.forEach((key) => {
        Object.keys(key).forEach((val) => {
          if (val === 'order_key') {
            delete key[`${val}`]
          }
          if (val === 'city') {
            delete key[`${val}`]
          }
          // if (val === 'gcif_number') {
          //   delete key[`${val}`]
          // }
        })
        console.log(this.listData, '===data')
      })
    },
    delOrderKeyBank() {
      this.listDataBank.forEach((key) => {
        Object.keys(key).forEach((val) => {
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
        if (this.listData[i].order_key === this.selectedContact[0].order_key) {
          this.listData.splice(i, 1)
        }
      }
      this.$q.notify({
        timeout: 300,
        color: 'negative',
        textColor: 'white',
        icon: 'fas fa-exclamation-circle',
        message: 'The Data Has Been Removed'
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
        timeout: 300,
        color: 'negative',
        textColor: 'white',
        icon: 'fas fa-exclamation-circle',
        message: 'The Data Has Been Removed'
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
        .then((response) => {
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
        .then((response) => {
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
        .then((response) => {
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
        .then((response) => {
          this.optVillage = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    ClearButtonContact() {
      this.$log.info('info call at function ClearButton')
      this.Name = ''
      this.Salutation = ''
      this.SalutationEdit = ''
      this.Phone = ''
      this.Mail = ''
      this.DefaultContact = ''
      this.status = ''
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
    ActionDetailBank() {
      this.$log.info('info call at function ActionDetail')
      this.AccountInfo = true
    },
    ActionDetail() {
      this.$log.info('info call at function ActionDetail')
      this.ContactAdd = true
    },
    checkValid() {
      console.log('masukkk')
      if (this.NextRiskAssessmentDate !== '') {
        this.$validator.validateAll()
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
    changeStatusTab5() {
      if (this.ActiveTab5 === '') {
        this.ActiveTab5 = 'active'
      }
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
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
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    submitButton() {
      this.dataUploaded = JSON.parse(localStorage.dataUpload)
      this.generateDataSubmit()
      this.delOrderKey()
      this.delOrderKeyBank()
      this.$apollo
        .mutate({
          mutation: InsCustomerIndividual,
          variables: {
            objects: {
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
              created_by: this.userdata.name,
              created_date: this.now,
              fullname: this.FirstName + ' ' + this.LastName,
              customer_individual_contact: { data: this.listData },
              customer_individual_Account_Bank: { data: this.listDataBank },

              spouse_name: this.SpouseName,
              id_spouse: this.SpouseID.id_dropdownlist_detail,
              spouse_id_number: this.SpouseIDNumber
            }
          }
        })
        .then((response) => {
          this.$apollo.mutate({
            mutation: InsertCustIndividualDocument,
            variables: {
              objects: this.dataSubmit
            }
          })
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Customer ' + this.GlobalCifNumber + 'Has Been Submitted'
          })
          this.AuditTrail()
          this.$router.push({ path: '/customer' })
        })
        .catch((err) => {
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
            action_button: 'Add',
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
    clearButton() {
      this.$log.info('info call at function clearButton')
      this.clearValidate()
      this.Nationality = ''
      this.IDType = ''
      this.FirstName = ''
      this.MiddleName = ''
      this.LastName = ''
      this.Salutation = ''
      this.CountryOfNationality = ''
      this.IDNumber = ''
      this.IDNumberRegistrationDate = ''
      this.IDExpirationDate = ''
      this.CountryOfBirth = ''
      this.PlaceOfBirth = ''
      this.InvestmentObjective = ''
      this.ResidenceStatus = ''
      this.BeneficiaryIDType = ''
      this.BeneficiaryName = ''
      this.BeneficiaryIDNumber = ''
      this.DateOfBirth = ''
      this.Gender = ''
      this.EducationalBackground = ''
      this.MotherMaidenName = ''
      this.Religion = ''
      this.Occupation = ''
      this.IncomeLevel = ''
      this.MaritalStatus = ''
      this.SpouseName = ''
      this.SpouseID = ''
      this.SpouseIDNumber = ''
      this.NextRiskAssessmentDate = ''
      this.DomicileAddress = ''
      this.City = ''
      this.Country = ''
      this.HomePhone = ''
      this.MobilePhone = ''
      this.FaxNumber = ''
      this.EmailAddress = ''
      this.StatmentType = ''
      this.FatcaStatus = ''
      this.SIDNumber = ''
      this.IFUA = ''
      this.ClientCode = ''
      this.GlobalCifNumber = ''
      this.BranchName = ''
      this.SalesName = ''
      this.BranchWaperd = ''
      this.Waperd = ''
      this.RegistrationDate = ''
      this.DateLastUpdate = ''
      this.LobCode = ''
      this.CustomerGroup = ''
      this.TaxIdNumber = ''
      this.TinForeignTin = ''
      this.IssuanceCountry = ''
      this.DocumentUpload = ''
      this.Bank = ''
      this.AccountNumber = ''
      this.AccountType = ''
      this.Currency = ''
      this.Status = ''
      this.selectedFile = []
      this.dataUploaded = []
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          timeout: 300,
          color: 'cyan-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    generateDataSubmit() {
      for (let i = 0; i < this.dataUploaded.length; i++) {
        let obj = {
          gcif_number: this.GlobalCifNumber,
          document: this.dataUploaded[i].file,
          id_document_cat: this.dataUploaded[i].idname,
          created_by: this.userdata.name,
          created_date: this.now
        }
        this.dataSubmit.push(obj)
      }
      console.log(this.dataSubmit, 'apaaaaa')
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
      reader.onload = (e) => {
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
            color: 'negative',
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
    generateCIFNumber() {
      this.$log.info('info call at function generateCIFNumber')
      this.GlobalCifNumberMaster.forEach((dataCIF) => {
        this.GlobalCifNumberNext.push(dataCIF.gcif_number)
      })
      if (this.GlobalCifNumberNext[0] !== undefined) {
        this.GlobalCifNumberNext[0] = this.GlobalCifNumberNext[0].split('-')
        console.log(this.GlobalCifNumberNext[0], '>>>>>>>numb')
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
        this.GlobalCifNumber = 'INDI-' + y
        console.log(this.GlobalCifNumber, '=======>>> apakah ini adaaaa')
        this.submitButton()
        return this.GlobalCifNumber
      } else {
        this.GlobalCifNumber = 'INDI-' + '0000001'
        console.log(this.GlobalCifNumber, '=======>>> apakah ini adaaaa')
        this.submitButton()
        return this.GlobalCifNumber
      }
    },
    submitDialog() {
      this.$log.info('info call at function submitDialog')
      this.$validator.validateAll().then((result) => {
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
              this.OnLoadCIFIndividual()
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
      if (this.shape === 'Corporate') {
        this.$router.replace({ path: '/customer/corporatecustomer' })
      }
    },
    clearValidate() {
      if (this.errors.any()) {
        this.$nextTick(() => {
          this.$validator.reset()
        })
      }
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
    }
    // validateSalutation() {
    //   console.log(typeof this.Salutation, '==>')
    //   if (this.Salutation !== null) {
    //     if (this.Salutation.dropdown_details_desc === 'Miss' || this.Salutation.dropdown_details_desc === 'Mrs.') {
    //       this.Gender = this.Gender.dropdown_details_desc = 'Female'
    //     } else if (this.Salutation.dropdown_details_desc === 'Mr.') {
    //       this.Gender = 'Male'
    //     }
    //   } else {
    //     this.Gender = ''
    //   }
    // }
    // validateFieldCountry() {
    //   const country = value =>
    //     new Promise(resolve => {
    //       setTimeout(() => {
    //         let input = value
    //         input = this.CountryOfNationality
    //         if (input === null || input === '') {
    //           this.IDType = ''
    //           this.IDNumber = ''
    //           this.SpouseID = ''
    //           this.SpouseIDNumber = ''
    //           this.BeneficiaryID = ''
    //           this.BeneficiaryIDNumber = ''
    //           return resolve({
    //             invalid: true,
    //             valid: false,
    //             data: {
    //               message: `Please fill Country Of Nationality field first.`
    //             }
    //           })
    //         }
    //         return resolve({
    //           invalid: false,
    //           valid: true
    //         })
    //       }, 50)
    //     })
    //   this.$validator.extend('country', {
    //     validate: country,
    //     getMessage: (field, params, data) => data.message
    //   })
    // },
    // validateFielType() {
    //   const type = value =>
    //     new Promise(resolve => {
    //       setTimeout(() => {
    //         let input = value
    //         input = this.IDType || this.SpouseID || this.BeneficiaryIDType
    //         if (input === null || input === '') {
    //           this.IDType = ''
    //           this.IDNumber = ''
    //           this.SpouseID = ''
    //           this.SpouseIDNumber = ''
    //           this.BeneficiaryID = ''
    //           this.BeneficiaryIDNumber = ''
    //           return resolve({
    //             invalid: true,
    //             valid: false,
    //             data: {
    //               message: `Please fill TypeID field first.`
    //             }
    //           })
    //         }
    //         return resolve({
    //           invalid: false,
    //           valid: true
    //         })
    //       }, 50)
    //     })
    //   this.$validator.extend('type', {
    //     validate: type,
    //     getMessage: (field, params, data) => data.message
    //   })
    // }
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
