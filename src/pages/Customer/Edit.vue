<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
               <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customer" icon="fas fa-user" to="/customer" />
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
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field outlined label="Global CIF Number" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ GlobalCifNumber }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
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
                                      <div class="col-xs-12 col-sm-4 col-md-4">
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
                                      :data="dataBank"
                                      :columns="columnsBank"
                                      row-key="id"
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
                                                dense
                                                stack-label
                                                outlined
                                                v-model="AccountNumber"
                                                label="Account Number*"
                                                mask="################"
                                              >
                                              </q-input>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                dense
                                                outlined
                                                stack-label
                                                v-model="Bank"
                                                :options="optBank"
                                                label="Bank*"
                                                :option-label="
                                                  optBank => optBank.dropdown_details_desc
                                                "
                                                :option-value="optBank => optBank"
                                                emit-value
                                                map-options
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                dense
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
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                dense
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
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                dense 
                                                outlined
                                                v-model="StatusBank"
                                                :options="optStatus"
                                                label="Status*"
                                                stack-label
                                                :option-label="
                                                  optStatus =>
                                                    optStatus.dropdown_details_desc
                                                "
                                                :option-value="optStatus => optStatus"
                                                emit-value
                                                map-options
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-btn
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
                                        <form>
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
                                              >
                                              </q-input>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                outlined
                                                v-model="BankEdit"
                                                :options="optBank"
                                                label="Bank*"
                                                stack-label
                                                :option-label="
                                                  optBank => optBank.dropdown_details_desc
                                                "
                                                :option-value="optBank => optBank"
                                                emit-value
                                                map-options
                                              >
                                              </q-select>
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
                                              >
                                              </q-select>
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
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-select
                                                outlined
                                                v-model="StatusBankEdit"
                                                :options="optStatus"
                                                label="Status*"
                                                stack-label
                                                :option-label="
                                                  optStatus =>
                                                    optStatus.dropdown_details_desc
                                                "
                                                :option-value="optStatus => optStatus"
                                                emit-value
                                                map-options
                                              >
                                              </q-select>
                                            </div>
                                            <div class="col-12">
                                              <q-btn
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
let init = ''
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import { GetMasterCountries } from 'src/graphql/Countries'
import { GetBranch } from 'src/graphql/MasterBranch'
import { GetMasterCurrency } from 'src/graphql/Currency'
import { EditCustomer } from 'src/graphql/Customer/Customer'
import { getBankCustomer, InsertBank, EditBank, DeleteBank } from 'src/graphql/Customer/CustomerBank'

import { mapState } from 'vuex'
import { date } from 'quasar'
export default {
  name: 'AddProduct',
  props: ['Muser'],
  data() {
    return {
      submitting: false,
      user: this.$q.sessionStorage.getItem('username'),
      selected: JSON.parse(localStorage.selectedData),
      tab: 'one',
      loading: false,
      // tab one
      
      GlobalCifNumberMaster: [],
      GlobalCifNumberNext: [],
      optStatus: [],
      Status: {},
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
      //
      //two
      //
      GlobalCifNumber: '',
      BranchName: {},
      optBranch: [],
      BranchSales: '',
      SalesName: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: {},
      optLobCode: [],
      CustomerGroup: {},
      optCustomerGroup: [],
      //
      dataBank: [],
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
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: {},
      optIssuanceCountry: [],
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  apollo: {
    loadDataBank: {
      query: getBankCustomer,
      update: data => data.wms_customer_bank,
      variables: {
        code: init
      }
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
    this.onBindData()
    this.onGetDataBankInfo()
  },
  methods: {
    onBindData() {
      this.OldGcif = this.selected[0].gcif_number
      this.Nationality.dropdown_details_desc = this.selected[0].nationality.dropdown_details_desc
      this.CountryOfNationality.country_name = this.selected[0].country.country_name
      this.IDType.dropdown_details_desc = this.selected[0].type_id.dropdown_details_desc
      this.IDNumber = this.selected[0].id_number
      this.IDNumberRegistrationDate = this.selected[0].id_registration_date
      this.IDExpirationDate = this.selected[0].id_expiration_date
      this.Status.dropdown_details_desc = this.selected[0].status.dropdown_details_desc

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
      this.IncomeLevel.dropdown_details_desc = this.selected[0].income_level.dropdown_details_desc

      this.GlobalCifNumber = this.selected[0].gcif_number
      this.SalesName  = this.selected[0].sales_name
      this.BranchName.branch_name = this.selected[0].branch.branch_name
      this.RegistrationDate = this.selected[0].registration_date
      this.DateLastUpdate = this.selected[0].data_last_update
      this.LobCode.dropdown_details_desc = this.selected[0].lob.dropdown_details_desc
      this.CustomerGroup.dropdown_details_desc = this.selected[0].customer_group.dropdown_details_desc

      this.TaxIdNumber = this.selected[0].tin_number
      this.TinForeignTin = this.selected[0].tin_number
      this.IssuanceCountry.country_name = this.selected[0].issuance_country.country_name
      
    },
    onGetDataBankInfo() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loadDataBank
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.dataBank = response.data.wms_customer_bank
          })
        this.loading = false
      }, 2000)
    },
    ActionDetailBank() {
      this.AccountInfo = true
    },
    SubmitButtonBank() {
      this.$apollo
        .mutate({
          mutation: InsertBank,
          variables: {
            objects: {
              gcif_number: this.GlobalCifNumber,
              account_number: this.AccountNumber,
              id_bank_info: this.Bank.id_dropdownlist_detail,
              id_account_type: this.AccountType.id_dropdownlist_detail,
              id_currency: this.Currency.id,
              id_status: this.StatusBank.id_dropdownlist_detail,
              created_by: this.user,
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
      this.StatusBank = ''
      this.Bank = ''
    },
    ClearBank() {
      this.AccountNumber = ''
      this.AccountType = ''
      this.Default = ''
      this.StatusBank = ''
      this.Bank = ''

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
    OnUpdateAccountInfo() {
      this.AccountInfoEdit = true
      this.codeidbank = this.selectedbank[0].id
      this.GlobalCifNumber = this.selectedbank[0].gcif_number
      this.AccountNumberEdit = this.selectedbank[0].account_number
      this.BankEdit.dropdown_details_desc = this.selectedbank[0].bank.dropdown_details_desc
      this.AccountTypeEdit.dropdown_details_desc = this.selectedbank[0].account_type.dropdown_details_desc
      this.CurrencyEdit.currencies_code = this.selectedbank[0].currency.currencies_code
      this.StatusBankEdit.dropdown_details_desc = this.selectedbank[0].status.dropdown_details_desc
    },
    SubmitEditButtonBank() {
      this.$apollo
        .mutate({
          mutation: EditBank,
          variables: {
            code: this.codeidbank,
            changes: {
              gcif_number: this.GlobalCifNumber,
              account_number: this.AccountNumberEdit,
              id_bank_info: this.BankEdit.id_dropdownlist_detail,
              id_account_type: this.AccountTypeEdit.id_dropdownlist_detail,
              id_currency: this.CurrencyEdit.id,
              id_status: this.StatusBankEdit.id_dropdownlist_detail,
              modified_by: this.user,
              modified_date: this.now
            }
          }
        })
        .then(response => {
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
          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
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
          this.onDeleteBank()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onDeleteBank() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DeleteBank,
          variables: {
            code: this.selectedbank[0].id
          }
        })
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onGetDataBankInfo()
        this.selectedbank = []
      })
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditCustomer,
          variables: {
            code: this.GlobalCifNumber,
            changes: {
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
              modified_date: this.now,
              modified_by: this.user
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Customer ' + this.GlobalCifNumber + ' ' + 'Has Been Updated'
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
          this.$router.push({ path: '/customer' })
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    ...mapState('showcase', {
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    now2() {
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'YYYY-MM-DD')
    }
  }
}
</script>

<style></style>
