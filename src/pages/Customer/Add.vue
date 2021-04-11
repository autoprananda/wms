<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
               <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customer" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="Add" icon="note_add" />
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
                          @click="ClearButton"
                          label="Clear"
                          color="cyan-7"
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
                                label="Customer"
                                name="one"
                              />
                              <q-tab
                                label="Branch Info"
                                name="two"
                              >
                              </q-tab>
                              <q-tab
                                label="Tax Info"
                                name="three"
                              >
                              </q-tab>
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="tab" animated>
                              <q-tab-panel name="one">
                               <q-card class="q-mt-lg shadow-3">
                                 <q-card-section>
                                   <div class="col text-weight-bolder text-subtitle1 q-mb-sm">
                                     Identifications
                                   </div>
                                   <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
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
                                          >
                                          </q-select>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-select
                                          outlined
                                          v-model="CountryOfNationality"
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
                                          label="Country Of Nationality *"
                                        >
                                        </q-select>
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
                                          >
                                          </q-select>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-input
                                            stack-label
                                            outlined
                                            mask="################"
                                            v-model="IDNumber"
                                            label="ID Number *"
                                          ></q-input>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-input
                                            stack-label
                                            outlined
                                            v-model="IDNumberRegistrationDate"
                                            label="ID Number Registration Date *"
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
                                          </q-input>
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
                                          </q-input>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-select
                                            outlined
                                            v-model="Status"
                                            :options="optStatus"
                                            label="Status *"
                                            stack-label
                                            :option-label="
                                              (optStatus) => optStatus.dropdown_details_desc
                                            "
                                            :option-value="(optStatus) => optStatus"
                                            emit-value
                                            map-options
                                          >
                                          </q-select>
                                        </div>
                                     </div>
                                   </div>
                                 </q-card-section>
                               </q-card>
                              <q-card class="q-mt-lg shadow-3">
                                  <q-card-section>
                                    <div class="col text-weight-bolder text-subtitle1 q-mb-sm">
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
                                          map-options>
                                        </q-select>
                                        
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="FirstName"
                                          label="First Name *"
                                        
                                        >
                                        </q-input>
                                        
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="MiddleName"
                                          label="Middle Name"
                                        >
                                        </q-input>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="LastName"
                                          label="Last Name *"
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
                                          >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="PlaceOfBirth"
                                          label="Place Of Birth *"
                                        >
                                        </q-input>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="CountryOfBirth"
                                          label="Country Of Birth *"
                                        >
                                        </q-input>
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
                                        >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="DateOfBirth"
                                          label="Date Of Birth *"
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
                                        </q-input>
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
                                        >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="MotherMaidenName"
                                          label="Mother Maiden Name *"
                                        >
                                        </q-input>
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
                                      <div class="col-xs-12 col-sm-4 col-md-4">
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
                                        >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
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
                                        >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
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
                                        >
                                        </q-select>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </q-tab-panel>
                              <q-tab-panel name="two">
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
                                          :options="optBranch"
                                          stack-label
                                          :option-label="
                                            (optBranch) =>
                                              optBranch.branch_name
                                          "
                                          :option-value="(optBranch) => optBranch"
                                          emit-value
                                          map-options
                                          label="Branch Name *"
                                        >
                                        </q-select>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                         <q-input
                                            stack-label
                                            outlined
                                            v-model="SalesName"
                                            label="Sales Name *"
                                          ></q-input>
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
                                        >
                                        </q-select>
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
                                        >
                                        </q-select>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                                <q-card class="q-mt-lg shadow-3">
                                  <q-card-section>
                                    <div class="q-gutter-sm">
                                      <q-btn
                                        style="width: 75px"
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
                                              ></q-input>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                dense
                                                outlined
                                                v-model="Bank"
                                                :options="optBank"
                                                label="Bank *"
                                                stack-label
                                                :option-label="
                                                  (optBank) =>
                                                    optBank.dropdown_details_desc
                                                "
                                                :option-value="(optBank) => optBank"
                                                emit-value
                                                map-options
                                              ></q-select>
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
                                              ></q-select>
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
                                              ></q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                outlined
                                                dense
                                                v-model="StatusBank"
                                                :options="optStatus"
                                                label="Status *"
                                                stack-label
                                                :option-label="
                                                  (optStatus) =>
                                                    optStatus.dropdown_details_desc
                                                "
                                                :option-value="(optStatus) => optStatus"
                                                emit-value
                                                map-options
                                              ></q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-btn
                                                dense
                                                class="full-width"
                                                :loading="adding"
                                                @click="AddButtonBank"
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
                              <q-tab-panel name="three">
                                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                                    <div class="row q-col-gutter-md">
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="TaxIdNumber"
                                          mask="##.###.###.#-###.###"
                                          label="Tax ID Number *"
                                        >
                                        </q-input>
                                      </div>

                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-input
                                          stack-label
                                          outlined
                                          v-model="TinForeignTin"
                                          mask="##.###.###.#-###.###"
                                          label="TIN / Foreign TIN *"
                                        >
                                        </q-input>
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
                                        >
                                        </q-select>
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
        </q-card>
      </q-page>
    </div>
</template>

<script>
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetMasterCountries } from 'src/graphql/Countries'
import { GetBranch } from 'src/graphql/MasterBranch'
import { GetMasterCurrency } from 'src/graphql/Currency'
import { InsertCustomer, GetGenerateCIF } from 'src/graphql/Customer/Customer'
import { date } from 'quasar'
export default {
  name: 'AddCustomer',
  props: ['userLogin'],
  data() {
    return {
      submitting: false,
      user: this.userLogin,
      tab: 'one',
      loading: false,
      
      GlobalCifNumberMaster: [],
      GlobalCifNumberNext: [],
      optStatus: [],
      Status: '',
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
      IDNumber: '',
      IDNumberRegistrationDate: '',
      IDExpirationDate: '',
      CountryOfBirth: '',
      PlaceOfBirth: '',
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
      IncomeLevel: '',
      optIncomeLevel: [],
      MaritalStatus: '',
      optMaritalStatus: [],
      NextRiskAssessmentDate: '',
      //
      //two
      //
      GlobalCifNumber: '',
      BranchName: '',
      optBranch: [],
      BranchSales: '',
      SalesName: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: '',
      optLobCode: [],
      CustomerGroup: '',
      optCustomerGroup: [],
      //
      AccountInfo: false,
      selectedBank: [],
      listDataBank: [],
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
      adding: false,
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
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: '',
      optIssuanceCountry: [],
    }
  },
  apollo: {
    loadCif: {
      query: GetGenerateCIF,
      update: (data) => data.wms_customer
    },
    optNationality: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Nationality'
      }
    },
    optCountryOfNationality: {
      query: GetMasterCountries,
      update: (data) => data.wms_countries
    },
    optIssuanceCountry: {
      query: GetMasterCountries,
      update: (data) => data.wms_countries
    },
    optBranch: {
      query: GetBranch,
      update: (data) => data.wms_branches
    },
    optIDType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'ID Type'
      }
    },
    optStatus: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Status'
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
    optCurrency: {
      query: GetMasterCurrency,
      update: (data) => data.wms_currencies
    },
    optAccountType: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Account Type'
      }
    },
    optBank: {
      query: GetDropDown,
      update: (data) => data.wms_dropdownlist_details,
      variables: {
        code: 'Custody Bank'
      }
    }
  },
  mounted() {
    this.RegistrationDate = this.now2
    this.DateLastUpdate = this.now2
  },
  methods: {
    ActionDetailBank() {
      this.AccountInfo = true
    },
    DeleteDialogBank() {
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
    AddButtonBank() {
      this.adding = true

      setTimeout(() => {
        this.adding = true
        this.sortorder += 1
        this.listDataBank.push({
          order_key: this.sortorder,
          account_number: this.AccountNumber,
          id_bank_info : this.Bank.id_dropdownlist_detail,
          bank: this.Bank.dropdown_details_desc,
          id_account_type: this.AccountType.id_dropdownlist_detail,
          account_type: this.AccountType.dropdown_details_desc,
          id_currency: this.Currency.id,
          currency: this.Currency.currencies_code,
          id_status: this.StatusBank.id_dropdownlist_detail,
          status: this.StatusBank.dropdown_details_desc,
          created_by: this.user.fullname,
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
    },
    ClearButtonBank() {
      this.AccountNumber = ''
      this.Bank = ''
      this.AccountType = ''
      this.AccountType = ''
      this.Currency = ''
      this.StatusBank = ''

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
    OnLoadCIFIndividual() {
      this.submitting = true
      setTimeout(() => {
        this.$apollo.queries.loadCif
          .refetch()
          .then((response) => {
            this.GlobalCifNumberMaster = response.data.wms_customer
            console.log(this.GlobalCifNumberMaster, '=======>>>>')
            this.generateCIFNumber()
          })
      }, 2000)
    },
    generateCIFNumber() {
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
        this.SubmitButton()
        return this.GlobalCifNumber
      } else {
        this.GlobalCifNumber = 'INDI-' + '0000001'
        this.SubmitButton()
        return this.GlobalCifNumber
      }
    },
    SubmitButton() {
      console.log(this.GlobalCifNumber, 'CIF')
      this.delOrderKeyBank()
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsertCustomer,
          variables: {
            objects: {
              id_nationality: this.Nationality.id_dropdownlist_detail,
              id_country: this.CountryOfNationality.id_country,
              id_type: this.IDType.id_dropdownlist_detail,
              id_number: +this.IDNumber,
              id_registration_date: this.IDNumberRegistrationDate,
              id_expiration_date: this.IDExpirationDate,
              id_status: this.Status.id_dropdownlist_detail,

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
              id_investment_object: this.InvestmentObjective.id_dropdownlist_detail,
              id_income_level: this.IncomeLevel.id_dropdownlist_detail,
              
              gcif_number: this.GlobalCifNumber,
              id_branch: this.BranchName.id_branch,
              sales_name: this.SalesName,
              registration_date: this.RegistrationDate,
              data_last_update: this.DateLastUpdate,
              id_lob: this.LobCode.id_dropdownlist_detail,
              id_customer_group: this.CustomerGroup.id_dropdownlist_detail,

              tax_id: this.TaxIdNumber,
              tin_number: this.TinForeignTin,
              id_issuance_country: this.IssuanceCountry.id_country,

              fullname: this.FirstName + ' ' + this.LastName,
              customer_account_bank: { data: this.listDataBank },
              created_by: this.user.fullname,
              created_date: this.now
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Customer ' + this.GlobalCifNumber + ' ' + 'Has Been Submitted'
          })
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
    ClearButton() {
      this.Nationality = ''
      this.CountryOfNationality = ''
      this.IDType = ''
      this.IDNumber = ''
      this.IDNumberRegistrationDate = ''
      this.IDExpirationDate = ''
      this.Status = ''

      this.Salutation = ''
      this.FirstName = ''
      this.MiddleName = ''
      this.LastName = ''
      this.Gender = ''
      this.PlaceOfBirth = ''
      this.CountryOfBirth = ''
      this.DateOfBirth = ''
      this.Religion = ''
      this.MaritalStatus = ''
      this.MotherMaidenName = ''

      this.EducationalBackground = ''
      this.InvestmentObjective = ''
      this.IncomeLevel = ''

      this.GlobalCifNumber = ''
      this.SalesName = ''
      this.BranchName = ''
      this.RegistrationDate = ''
      this.DateLastUpdate = ''
      this.LobCode = ''
      this.CustomerGroup = ''

      this.TaxIdNumber = ''
      this.TinForeignTin = ''
      this.IssuanceCountry = ''

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
          this.OnLoadCIFIndividual()
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
          this.$router.push({ path: '/customer' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    }
  }
}
</script>

<style></style>
