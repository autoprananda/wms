<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="Individual Customer" icon="details" />
            </q-breadcrumbs>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <form @submit.prevent="SubmitButton">
              <q-card class="my-card shadow-6 center" inline>
                <q-card-section>
                  <div class="q-ma-xs q-gutter-sm">
                    <q-btn
                      @click="$router.go(-1)"
                      label="Back"
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
                    <q-tab v-show="MaritalStatus === 'Married'" label="Spouse" name="two" />
                    <q-tab label="Contact Info" name="three" />
                    <q-tab label="Beneficiary" name="four" />
                    <q-tab label="Regulatory Info" name="five" />
                    <q-tab label="Branch Info" name="six" />
                    <q-tab label="Document" name="seven" />
                    <q-tab label="Tax Info" name="eight" />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Identifications</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Nationality" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Nationality }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Country Of Nationality" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CountryOfNationality }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-field Standard label="ID Type" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IDType }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-field Standard label="ID Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IDNumber }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="ID Number Registration Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IDNumberRegistrationDate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="ID Expiration Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IDExpirationDate }}</div>
                                </template>
                              </q-field>
                            </div>

                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Status" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ status }}</div>
                                </template>
                              </q-field>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>

                      <q-card class="q-mt-lg">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Personal Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-field Standard label="Salutation" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Salutation }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-field Standard label="First Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ FirstName }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Middle Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ MiddleName }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Last Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ LastName }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-2 col-md-2">
                              <q-field Standard label="Gender" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Gender }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-field Standard label="Place Of Birth" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ PlaceOfBirth }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Country Of Birth" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CountryOfBirth }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Religion" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Religion }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Date Of Birth" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ DateOfBirth }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Marital Status" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ MaritalStatus }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Mother Maiden Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ MotherMaidenName }}</div>
                                </template>
                              </q-field>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>

                      <q-card class="q-mt-lg">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Others</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Educational Background" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ EducationalBackground }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Investment Objective" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ InvesmentObjective }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Occupation" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Occupation }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Residence Status" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ ResidensceStatus }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Income Level" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IncomeLevel }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Next Risk Assessment Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ NextRiskAssessmentDate }}</div>
                                </template>
                              </q-field>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Spouse Name" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SpouseName }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="ID Type" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SpouseID }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Spouse ID Number" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SpouseIdNumber }}</div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="three">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <q-card-section>
                          <q-table
                            title="Contact Info"
                            class="q-ml-sm q-mr-sm table-label-color"
                            :grid="$q.screen.xs"
                            :data="loaddatacontactinfo"
                            :columns="columnsContact"
                            separator="cell"
                            :loading="loading"
                            color="primary"
                            wrap-cells
                          >
                            <template v-slot:body="props">
                              <q-tr :props="props">
                                <q-td key="gcif_number" :props="props">{{ props.row.gcif_number }}</q-td>
                                <q-td key="domicile_address" :props="props">
                                  {{
                                  props.row.domicile_address
                                  }}
                                </q-td>
                                <q-td key="mobile_phone" :props="props">
                                  {{
                                  props.row.mobile_phone
                                  }}
                                </q-td>
                                <q-td key="postal_code.city.city_name" :props="props">
                                  {{
                                  props.row.postal_code.city.city_name
                                  }}
                                </q-td>
                                <q-td key="email_address" :props="props">
                                  {{
                                  props.row.email_address
                                  }}
                                </q-td>
                                <q-td key="WKF_Info" style="width: 1px">
                                  <div class="center">
                                    <q-icon color="grey" name="fas fa-info-circle" size="25px">
                                      <q-tooltip
                                        anchor="center left"
                                        self="center left"
                                        transition-show="scale"
                                        transition-hide="scale"
                                        content-class="bg-primary shadow-24"
                                      >
                                        <q-markup-table
                                          class="bg-primary text-white shadow-3"
                                          wrap-cells
                                          dense
                                          flat
                                        >
                                          <tbody>
                                            <tr>
                                              <td class="text-weight-bolder text-subtitle1">Created Date</td>
                                              <td>:</td>
                                              <td>{{ getTime(props.row.created_date) }}</td>
                                            </tr>
                                          </tbody>
                                          <tbody>
                                            <tr>
                                              <td class="text-weight-bolder text-subtitle1">Created By</td>
                                              <td>:</td>
                                              <td>{{ props.row.created_by }}</td>
                                            </tr>
                                          </tbody>
                                          <tbody>
                                            <tr>
                                              <td class="text-weight-bolder text-subtitle1">Modify Date</td>
                                              <td>:</td>
                                              <td>{{ getTime(props.row.modified_date) }}</td>
                                            </tr>
                                          </tbody>
                                          <tbody>
                                            <tr>
                                              <td class="text-weight-bolder text-subtitle1">Modify By</td>
                                              <td>:</td>
                                              <td>{{ props.row.modified_by }}</td>
                                            </tr>
                                          </tbody>
                                        </q-markup-table>
                                      </q-tooltip>
                                    </q-icon>
                                  </div>
                                </q-td>
                              </q-tr>
                            </template>
                          </q-table>
                        </q-card-section>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="four">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Beneficiary Name" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ BeneficiaryName }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Beneficiary ID Type" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ BeneficiaryIDType }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Beneficiary ID Number" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ BeneficiaryIDNumber }}</div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="five">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Statement Type" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ StatmentType }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Fatca (Status)" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ FatcaStatus }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="S.I.D Number" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SIDNumber }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="IFUA" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ IFUA }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Client Code (S-Invest) " stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ ClientCode }}</div>
                              </template>
                            </q-field>
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
                              <q-field Standard label="Global CIF Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ GlobalCifNumber }}</div>
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
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Sales Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ BranchSales }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Branch WAPERD" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ BranchWaperd }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="WAPERD" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Waperd }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Registration Date" stack-label>
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
                              <q-field Standard label="Date Last Update" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ DataLastUpdate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="LOB Code" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ LobCode }}</div>
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
                          </div>
                        </q-card-section>
                      </q-card>

                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <q-table
                            title="Account Info"
                            class="q-ml-sm q-mr-sm table-label-color"
                            :grid="$q.screen.xs"
                            :data="loaddatabank"
                            :columns="columnsBank"
                            separator="cell"
                            :loading="loading"
                            color="primary"
                            wrap-cells
                          >
                            <template v-slot:body="props">
                              <q-tr :props="props">
                                <q-td
                                  key="account_number"
                                  :props="props"
                                >{{ props.row.account_number }}</q-td>
                                <q-td key="bank.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.bank.dropdown_details_desc
                                  }}
                                </q-td>
                                <q-td key="account_type.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.account_type.dropdown_details_desc
                                  }}
                                </q-td>
                                <q-td key="currency.currencies_code" :props="props">
                                  {{
                                  props.row.currency.currencies_code
                                  }}
                                </q-td>
                                <q-td key="status.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.status.dropdown_details_desc
                                  }}
                                </q-td>
                                <q-td key="WKF_Info" style="width: 1px">
                                <div class="center">
                                  <q-icon color="grey" name="fas fa-info-circle" size="25px">
                                    <q-tooltip
                                      anchor="center left"
                                      self="center left"
                                      transition-show="scale"
                                      transition-hide="scale"
                                      content-class="bg-primary shadow-24"
                                    >
                                      <q-markup-table
                                        class="bg-primary text-white shadow-3"
                                        wrap-cells
                                        dense
                                        flat
                                      >
                                        <tbody>
                                          <tr>
                                            <td class="text-weight-bolder text-subtitle1">Created Date</td>
                                            <td>:</td>
                                            <td>{{ getTime(props.row.created_date) }}</td>
                                          </tr>
                                        </tbody>
                                        <tbody>
                                          <tr>
                                            <td class="text-weight-bolder text-subtitle1">Created By</td>
                                            <td>:</td>
                                            <td>{{ props.row.created_by }}</td>
                                          </tr>
                                        </tbody>
                                        <tbody>
                                          <tr>
                                            <td class="text-weight-bolder text-subtitle1">Modify Date</td>
                                            <td>:</td>
                                            <td>{{ getTime(props.row.modified_date) }}</td>
                                          </tr>
                                        </tbody>
                                        <tbody>
                                          <tr>
                                            <td class="text-weight-bolder text-subtitle1">Modify By</td>
                                            <td>:</td>
                                            <td>{{ props.row.modified_by }}</td>
                                          </tr>
                                        </tbody>
                                      </q-markup-table>
                                    </q-tooltip>
                                  </q-icon>
                                </div>
                              </q-td>
                              </q-tr>
                            </template>
                          </q-table>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="seven">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-pa-xs">
                          <q-card class="col-12 text-center">
                            <q-card-section v-if="isFileOK === false">
                              <div v-if="fileUploaded.length > 0">
                                <h4 class="q-pb-sm">Document Upload</h4>
                                <br />
                                <q-list
                                  v-for=" (FileItem, index) in fileUploaded"
                                  :key="index"
                                  class="rounded-borders row justify-center q-pa-xs"
                                >
                                  <q-expansion-item
                                    popup
                                    class="col-12 justify-center q-pa-xs text-weight-bolder"
                                    group="some"
                                    expand-separator
                                    icon="list"
                                    :label="FileItem.document_id.dropdown_details_desc"
                                  >
                                    <q-card>
                                      <q-card-section class="flex flex-center">
                                        <q-img :src="FileItem.document" style="max-width: 50%;">
                                          <div
                                            class="absolute-bottom text-subtitle1 text-center q-pa-xs"
                                          >{{FileItem.document_id.dropdown_details_desc}}</div>
                                          <template v-slot:loading>
                                            <div class="text-yellow">
                                              <q-spinner-ios />
                                              <div class="q-mt-md">Loading...</div>
                                            </div>
                                          </template>
                                        </q-img>
                                      </q-card-section>
                                    </q-card>
                                  </q-expansion-item>
                                </q-list>
                              </div>
                              <div v-else>
                                <div class="row justify-center q-pa-xs">
                                  <div class="col-12 q-gutter-y-md" style="max-width: 400px;">
                                    <h4 class="q-pt-xl">No Document Upload</h4>
                                  </div>
                                </div>
                              </div>
                            </q-card-section>
                          </q-card>
                        </div>
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="eight">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Tax ID Number" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ TaxIdNumber }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="TIN / Foreign TIN" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ TinForeignTin }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6" />
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Issuance Country" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ IssuanceCountry }}</div>
                              </template>
                            </q-field>
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
    </div>'
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
            <q-breadcrumbs-el label="Individual Customer" icon="details" />
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
                <q-tab v-show="MaritalStatus === 'Married'" label="Spouse" name="two" />
                <q-tab label="Contact Info" name="three" />
                <q-tab label="Beneficiary" name="four" />
                <q-tab label="Regulatory Info" name="five" />
                <q-tab label="Branch Info" name="six" />
                <q-tab label="Document" name="seven" />
                <q-tab label="Tax Info" name="eight" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="one">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Identifications</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Nationality" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Nationality }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Country Of Nationality" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CountryOfNationality }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-field Standard label="ID Type" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IDType }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-field Standard label="ID Number" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IDNumber }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="ID Number Registration Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IDNumberRegistrationDate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="ID Expiration Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IDExpirationDate }}</div>
                            </template>
                          </q-field>
                        </div>

                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Status" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ status }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="q-mt-lg">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Personal Info</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-field Standard label="Salutation" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Salutation }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-field Standard label="First Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ FirstName }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Middle Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ MiddleName }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Last Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ LastName }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2">
                          <q-field Standard label="Gender" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Gender }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-4 col-md-4">
                          <q-field Standard label="Place Of Birth" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ PlaceOfBirth }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Country Of Birth" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CountryOfBirth }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Religion" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Religion }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Date Of Birth" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ DateOfBirth }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Marital Status" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ MaritalStatus }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Mother Maiden Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ MotherMaidenName }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="q-mt-lg">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Others</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Educational Background" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ EducationalBackground }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Investment Objective" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ InvesmentObjective }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Occupation" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Occupation }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Residence Status" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ResidensceStatus }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Income Level" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IncomeLevel }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Next Risk Assessment Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ NextRiskAssessmentDate }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="two">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Spouse Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SpouseName }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="ID Type" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SpouseID }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Spouse ID Number" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SpouseIdNumber }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="three">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <q-table
                      title="Contact Info"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="loaddatacontactinfo"
                      :columns="columnsContact"
                      separator="cell"
                      :loading="loading"
                      color="primary"
                      wrap-cells
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="gcif_number" :props="props">{{ props.row.gcif_number }}</q-td>
                          <q-td key="domicile_address" :props="props">
                            {{
                            props.row.domicile_address
                            }}
                          </q-td>
                          <q-td key="mobile_phone" :props="props">
                            {{
                            props.row.mobile_phone
                            }}
                          </q-td>
                          <q-td key="postal_code.city.city_name" :props="props">
                            {{
                            props.row.postal_code.city.city_name
                            }}
                          </q-td>
                          <q-td key="email_address" :props="props">
                            {{
                            props.row.email_address
                            }}
                          </q-td>
                          <q-td key="WKF_Info" style="width: 1px">
                          <div class="center">
                            <q-icon color="grey" name="fas fa-info-circle" size="25px">
                              <q-tooltip
                                anchor="center left"
                                self="center left"
                                transition-show="scale"
                                transition-hide="scale"
                                content-class="bg-primary shadow-24"
                              >
                                <q-markup-table
                                  class="bg-primary text-white shadow-3"
                                  wrap-cells
                                  dense
                                  flat
                                >
                                  <tbody>
                                    <tr>
                                      <td class="text-weight-bolder text-subtitle1">Created Date</td>
                                      <td>:</td>
                                      <td>{{ getTime(props.row.created_date) }}</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td class="text-weight-bolder text-subtitle1">Created By</td>
                                      <td>:</td>
                                      <td>{{ props.row.created_by }}</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td class="text-weight-bolder text-subtitle1">Modify Date</td>
                                      <td>:</td>
                                      <td>{{ getTime(props.row.modified_date) }}</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td class="text-weight-bolder text-subtitle1">Modify By</td>
                                      <td>:</td>
                                      <td>{{ props.row.modified_by }}</td>
                                    </tr>
                                  </tbody>
                                </q-markup-table>
                              </q-tooltip>
                            </q-icon>
                          </div>
                        </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="four">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Beneficiary Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ BeneficiaryName }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Beneficiary ID Type" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ BeneficiaryIDType }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Beneficiary ID Number" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ BeneficiaryIDNumber }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="five">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Statement Type" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ StatmentType }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Fatca (Status)" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ FatcaStatus }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="S.I.D Number" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SIDNumber }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="IFUA" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ IFUA }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Client Code (S-Invest) " stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ ClientCode }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="six">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="text-weight-bolder text-subtitle1 q-mb-sm">Sales</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field Standard label="Global CIF Number" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ GlobalCifNumber }}</div>
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
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Sales Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ BranchSales }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Branch WAPERD" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ BranchWaperd }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="WAPERD" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Waperd }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Registration Date" stack-label>
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
                          <q-field Standard label="Date Last Update" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ DataLastUpdate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="LOB Code" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ LobCode }}</div>
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
                      </div>
                    </q-card-section>
                  </q-card>

                  <q-card class="q-mt-lg shadow-3">
                    <q-card-section>
                      <q-table
                        title="Account Info"
                        class="q-ml-sm q-mr-sm table-label-color"
                        :grid="$q.screen.xs"
                        :data="loaddatabank"
                        :columns="columnsBank"
                        separator="cell"
                        :loading="loading"
                        color="primary"
                        wrap-cells
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="account_number" :props="props">{{ props.row.account_number }}</q-td>
                            <q-td key="bank.dropdown_details_desc" :props="props">
                              {{
                              props.row.bank.dropdown_details_desc
                              }}
                            </q-td>
                            <q-td key="account_type.dropdown_details_desc" :props="props">
                              {{
                              props.row.account_type.dropdown_details_desc
                              }}
                            </q-td>
                            <q-td key="currency.currencies_code" :props="props">
                              {{
                              props.row.currency.currencies_code
                              }}
                            </q-td>
                            <q-td key="status.dropdown_details_desc" :props="props">
                              {{
                              props.row.status.dropdown_details_desc
                              }}
                            </q-td>
                            <q-td key="WKF_Info" style="width: 1px">
                            <div class="center">
                              <q-icon color="grey" name="fas fa-info-circle" size="25px">
                                <q-tooltip
                                  anchor="center left"
                                  self="center left"
                                  transition-show="scale"
                                  transition-hide="scale"
                                  content-class="bg-primary shadow-24"
                                >
                                  <q-markup-table
                                    class="bg-primary text-white shadow-3"
                                    wrap-cells
                                    dense
                                    flat
                                  >
                                    <tbody>
                                      <tr>
                                        <td class="text-weight-bolder text-subtitle1">Created Date</td>
                                        <td>:</td>
                                        <td>{{ getTime(props.row.created_date) }}</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td class="text-weight-bolder text-subtitle1">Created By</td>
                                        <td>:</td>
                                        <td>{{ props.row.created_by }}</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td class="text-weight-bolder text-subtitle1">Modify Date</td>
                                        <td>:</td>
                                        <td>{{ getTime(props.row.modified_date) }}</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td class="text-weight-bolder text-subtitle1">Modify By</td>
                                        <td>:</td>
                                        <td>{{ props.row.modified_by }}</td>
                                      </tr>
                                    </tbody>
                                  </q-markup-table>
                                </q-tooltip>
                              </q-icon>
                            </div>
                          </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="seven">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <div class="row q-pa-xs">
                      <q-card class="col-12 text-center">
                        <q-card-section v-if="isFileOK === false">
                          <div v-if="fileUploaded.length > 0">
                            <h4 class="q-pb-sm">Document Upload</h4>
                            <br />
                            <q-list
                              v-for=" (FileItem, index) in fileUploaded"
                              :key="index"
                              class="rounded-borders row justify-center q-pa-xs"
                            >
                              <q-expansion-item
                                popup
                                class="col-12 justify-center q-pa-xs text-weight-bolder"
                                group="some"
                                expand-separator
                                icon="list"
                                :label="FileItem.document_id.dropdown_details_desc"
                              >
                                <q-card>
                                  <q-card-section class="flex flex-center">
                                    <q-img :src="FileItem.document" style="max-width: 50%;">
                                      <div
                                        class="absolute-bottom text-subtitle1 text-center q-pa-xs"
                                      >{{FileItem.document_id.dropdown_details_desc}}</div>
                                      <template v-slot:loading>
                                        <div class="text-yellow">
                                          <q-spinner-ios />
                                          <div class="q-mt-md">Loading...</div>
                                        </div>
                                      </template>
                                    </q-img>
                                  </q-card-section>
                                </q-card>
                              </q-expansion-item>
                            </q-list>
                          </div>
                          <div v-else>
                            <div class="row justify-center q-pa-xs">
                              <div class="col-12 q-gutter-y-md" style="max-width: 400px;">
                                <h4 class="q-pt-xl">No Document Upload</h4>
                              </div>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="eight">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Tax ID Number" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ TaxIdNumber }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="TIN / Foreign TIN" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ TinForeignTin }}</div>
                          </template>
                        </q-field>
                      </div>

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Issuance Country" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ IssuanceCountry }}</div>
                          </template>
                        </q-field>
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
                @click="$router.go(-1)"
                label="Cancel"
                color="negative"
                icon="clear"
                external-label
                push
                :disable="draggingFab"
                label-position="left"
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
                @click="$router.go(-1)"
                label="Cancel"
                color="negative"
                icon="clear"
                push
                :disable="draggingFab"
                square
                label-position="bottom"
                padding="4px"
              />
            </q-fab>
          </q-page-sticky>
        </div>
      </q-page>
    </div>'
  </div>
</template>

<script>
let init = ''
import { date } from 'quasar'
import {
  GetAllAccountBankInfoIndi,
  GetAllContantInfo,
  GetAllDocumentIndividual
} from 'src/graphql/Customer/IndividualCustomer'
export default {
  name: 'ViewIndividualCustomer',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      userdata: this.Muser,
      data: [],
      loading: false,
      IDType: '',
      Nationality: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Salutation: '',
      CountryOfNationality: '',
      IDNumber: '',
      IDNumberRegistrationDate: '',
      IDExpirationDate: '',
      status: '',
      CountryOfBirth: '',
      PlaceOfBirth: '',
      InvesmentObjective: '',
      ResidensceStatus: '',
      BeneficiaryIDType: '',
      BeneficiaryName: '',
      BeneficiaryIDNumber: '',
      DateOfBirth: '',
      Gender: '',
      EducationalBackground: '',
      MotherMaidenName: '',
      Religion: '',
      Occupation: '',
      IncomeLevel: '',
      MaritalStatus: '',
      SpouseName: '',
      SpouseID: '',
      optSpouseID: [],
      SpouseIdNumber: '',
      NextRiskAssessmentDate: '',
      //
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
        },
        {
          name: 'WKF_Info',
          field: 'WKF_Info',
          align: 'Left'
        }
      ],
      //
      StatmentType: '',
      FatcaStatus: '',
      SIDNumber: '',
      IFUA: '',
      ClientCode: '',
      //
      GlobalCifNumber: '',
      BranchName: '',
      BranchSales: '',
      BranchWaperd: '',
      Waperd: '',
      RegistrationDate: '',
      DataLastUpdate: '',
      LobCode: '',
      CustomerGroup: '',
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
        },
        {
          name: 'WKF_Info',
          field: 'WKF_Info',
          align: 'Left'
        }
      ],
      //
      Default: '',
      //
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: '',
      selected: JSON.parse(localStorage.selectedData),
      submitting: false,
      //
      tab: 'one',
      shape: 'Individual',
      // upload
      DocumentCategory: '',
      optDocumentCategory: [],
      file: null,
      preview: '',
      isFileOK: false,
      dataUploaded: [],
      fileUploaded: [],
      selectedFile: [],
      selected3: [],
      tableFileThs: [
        {
          name: 'name',
          required: true,
          label: 'Name File',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  apollo: {
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
    fileUploaded: {
      query: GetAllDocumentIndividual,
      update: data => data.wms_document_individual,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    this.insertKey()
    this.onBindData()
    this.onGetDocument()
    this.onGetDataBankInfo()
    this.onGetContactInfo()
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  methods: {
    getTime(file) {
      return date.formatDate(file, 'YYYY-MM-DD HH:mm:ss')
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
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
            console.log(this.loaddatabank, 'isi data contact')
          })
      }, 2000)
      this.loading = false
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
            console.log(this.loaddatacontactinfo, 'isi data bank')
          })
      }, 2000)
      this.loading = false
    },
    onGetDocument() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.fileUploaded
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.fileUploaded = response.data.wms_document_individual
            console.log(this.loaddatacontactinfo, 'isi data file')
          })
      }, 2000)
      this.loading = false
    },
    insertKey() {
      this.$log.info('info call at function insertKey')
      if (this.selected['WMS_CDocumentUpload'] === undefined) {
        this.selected['WMS_CDocumentUpload'] = []
      } else {
        this.fileUploaded = this.selected.WMS_CDocumentUpload
      }
    },
    onBack() {
      this.$log.info('info call at function onBack')
      this.$router.push({ path: '/customer' })
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.Nationality = this.selected.nationality.dropdown_details_desc
      this.CountryOfNationality = this.selected.country.country_name
      this.IDType = this.selected.type_id.dropdown_details_desc
      this.IDNumber = this.selected.id_number
      this.IDNumberRegistrationDate = this.selected.id_registration_date
      this.IDExpirationDate = this.selected.id_expiration_date
      this.Salutation = this.selected.salutation.dropdown_details_desc

      this.FirstName = this.selected.first_name
      this.MiddleName = this.selected.middle_name
      this.LastName = this.selected.last_name
      this.CountryOfBirth = this.selected.country_of_birth
      this.DateOfBirth = this.selected.date_of_birth
      this.Religion = this.selected.religion.dropdown_details_desc
      this.MaritalStatus = this.selected.marital.dropdown_details_desc
      this.MotherMaidenName = this.selected.mother_maiden_name
      this.EducationalBackground = this.selected.educational.dropdown_details_desc
      this.IncomeLevel = this.selected.income_level.dropdown_details_desc
      this.NextRiskAssessmentDate = this.selected.next_risk_date

      this.BeneficiaryName = this.selected.beneficiary_name
      this.BeneficiaryIDNumber = this.selected.beneficiary_id_number
      this.BeneficiaryIDType = this.selected.beneficiary.dropdown_details_desc

      this.PostalCode = this.selected.WMS_CPostalCode

      this.DomicileAddress = this.selected.WMS_CAddress1
      this.HomePhone = this.selected.WMS_CPhoneHome
      this.MobilePhone = this.selected.WMS_CMobilePhone
      this.FaxNumber = this.selected.WMS_CFaxNo
      this.EmailAddress = this.selected.WMS_CEmail

      this.StatmentType = this.selected.statement_type
      this.FatcaStatus = this.selected.fatca
      this.SIDNumber = this.selected.sid
      this.IFUA = this.selected.ifua
      this.ClientCode = this.selected.client_code

      this.GlobalCifNumber = this.selected.gcif_number
      this.BranchName = this.selected.branch.branch_name
      this.BranchWaperd = this.selected.branch_waperd
      this.Waperd = this.selected.waperd
      this.RegistrationDate = this.selected.registration_date
      this.DataLastUpdate = this.selected.data_last_update
      this.LobCode = this.selected.lob.dropdown_details_desc
      this.CustomerGroup = this.selected.customer_group.dropdown_details_desc

      this.TaxIdNumber = this.selected.tin_number
      this.TinForeignTin = this.selected.tin_number
      this.IssuanceCountry = this.selected.issuance_country.country_name

      this.PlaceOfBirth = this.selected.place_of_birth
      this.InvesmentObjective = this.selected.investment_object.dropdown_details_desc
      this.Occupation = this.selected.occupation.dropdown_details_desc
      this.ResidensceStatus = this.selected.residence_status.dropdown_details_desc
      this.Gender = this.selected.gender.dropdown_details_desc
      if (this.selected.id_sales !== null) {
        this.BranchSales = this.selected.sales_customer.sales_name
      }
      if (this.selected.id_status !== null) {
        this.status = this.selected.status.dropdown_details_desc
      }
      if (this.selected.spouse_name !== null) {
        this.SpouseName = this.selected.spouse_name
      }
      if (this.selected.id_spouse !== null) {
        this.SpouseID = this.selected.spouse.dropdown_details_desc
      }
      if (this.selected.spouse_id_number !== null) {
        this.SpouseIdNumber = this.selected.spouse_id_number
      }
    }
  }
}
</script>

<style>
</style>
