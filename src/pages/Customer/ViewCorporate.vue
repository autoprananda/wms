<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="Corporate Customer" icon="details" />
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
                    <q-tab label="Corporate" name="one" />
                    <q-tab label="Contact Info" name="two" />
                    <q-tab label="Address" name="Address" />
                    <q-tab label="Branch Info" name="three" />
                    <q-tab label="Regulatory Info" name="four" />
                    <q-tab label="Document" name="five" />
                    <q-tab label="Tax Info" name="six" />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Corporate Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field Standard label="Company Name" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CompanyName }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="SIUP No" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ SIUPNo }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="SIUP Expiration Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ SIUPExpDate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="SKD No" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ SKDNo }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="SKD Expiration Date" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ SKDExpDate }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Status" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Status }}</div>
                                </template>
                              </q-field>
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
                              <q-field Standard label="Ownership" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Ownership }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Date Of Establishment" stack-label>
                                <template v-slot:append>
                                  <q-icon name="event" />
                                </template>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ DateOfEstablishment }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Place Of Establishment" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ PlaceOfEstablishment }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-field Standard label="Country Of Establishment" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CountryOfEstablishment }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field Standard label="Articles of Association No" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ ArticlesOfAssosiationNo }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Company Type" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CompanyType }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Company Characteristic" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ CompanyCharacteristic }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Income Level (IDR)" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ IncomeLevel }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Investor's Risk Profile" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ InvestorRiskProfile }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Investment Objective" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ InvestmentObjective }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Source Of Fund" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ SourceOfFund }}</div>
                                </template>
                              </q-field>
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
                              <q-field Standard label="Asset Owner" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ AssetOwner }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-field Standard label="Statement Type" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ StatementType }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - Last Year"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ AssetInfoLastYear }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - 2 Years Ago"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ AssetInfo2YearsAgo }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - 3 Years Ago"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ AssetInfo3YearsAgo }}</div>
                                </template>
                              </q-field>
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
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - Last Year"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ ProfitInfoLastYear }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - 2 Years Ago"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ ProfitInfo2YearsAgo }}</div>
                                </template>
                              </q-field>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-field
                                Standard
                                label="For the Past 3 Years (IDR) - 3 Years Ago"
                                stack-label
                              >
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ ProfitInfo3YearsAgo }}</div>
                                </template>
                              </q-field>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <q-card-section>
                          <q-table
                            title="Authorized Info"
                            class="q-ml-sm q-mr-sm table-label-color"
                            :grid="$q.screen.xs"
                            :data="loaddatauthorizedinfo"
                            :columns="columnsAuthorized"
                            separator="cell"
                            :loading="loading"
                            color="primary"
                            wrap-cells
                          >
                            <template v-slot:body="props">
                              <q-tr :props="props">
                                <q-td key="gcif_number" :props="props">{{ props.row.gcif_number }}</q-td>
                                <q-td key="fullname" :props="props">
                                  {{
                                  props.row.fullname
                                  }}
                                </q-td>
                                <q-td key="position.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.position.dropdown_details_desc
                                  }}
                                </q-td>
                                <q-td key="mobile_phone" :props="props">
                                  {{
                                  props.row.mobile_phone
                                  }}
                                </q-td>
                                <q-td key="email" :props="props">
                                  {{
                                  props.row.email
                                  }}
                                </q-td>
                                <q-td key="domicile_address" :props="props">
                                  {{
                                  props.row.domicile_address
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
                    <q-tab-panel name="Address">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-field Standard label="Address" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Address }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Email" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Email }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Country" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Country }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Phone 1" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Phone1 }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Phone 2" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Phone2 }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Fax 1" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Fax1 }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Fax 2" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Fax2 }}</div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                        <br />
                        <br />
                        <q-card class="shadow-3">
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="Region" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Region }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field Standard label="City" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ City }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-field Standard label="Subdistrict" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Subdistrict }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-field Standard label="District" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Village }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-field Standard label="Postal Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ PostalCode }}</div>
                                  </template>
                                </q-field>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </q-tab-panel>
                    <q-tab-panel name="three">
                      <q-card class="q-mt-lg shadow-3">
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
                                  >{{ DateLastUpdate }}</div>
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
                        <q-table
                          title="Account Info"
                          class="q-ml-sm q-mr-sm table-label-color"
                          :grid="$q.screen.xs"
                          :data="loaddatabank"
                          :columns="columnsBank"
                          row-key="order_key"
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
                      </q-card>
                    </q-tab-panel>
                    <q-tab-panel name="four">
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
                            <q-field Standard label="Client Code (S-Invest)" stack-label>
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
                    <q-tab-panel name="five">
                      <div class="q-pa-md">
                        <div class="row q-pa-xs">
                          <q-card class="col-12 text-center">
                            <q-card-section>
                              <div v-if="fileUploaded.length > 0">
                                <h4 class="q-pb-md" v-if="fileUploaded.length > 0">Document Upload</h4>
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
                                    :label="FileItem.doc_category.dropdown_details_desc"
                                  >
                                    <q-card>
                                      <q-card-section class="flex flex-center">
                                        <q-img :src="FileItem.document" style="max-width: 50%;">
                                          <div
                                            class="absolute-bottom text-subtitle1 text-center q-pa-xs"
                                          >{{FileItem.doc_category.dropdown_details_desc}}</div>
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
                    <q-tab-panel name="six">
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

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="GIIN" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ GIIN }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-field Standard label="Substantial U.S Owner Name" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SubsOwnerName }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-field Standard label="Domicile Address" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SubsOwnerAddress }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-12 col-md-12">
                            <q-field Standard label="Substantial U.S Owner TIN" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ SubsOwnerTIN }}</div>
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
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
            <q-breadcrumbs-el label="Corporate Customer" icon="details" />
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
                <q-tab label="Corporate" name="one" />
                <q-tab label="Contact Info" name="two" />
                <q-tab label="Address" name="Address" />
                <q-tab label="Branch Info" name="three" />
                <q-tab label="Regulatory Info" name="four" />
                <q-tab label="Document" name="five" />
                <q-tab label="Tax Info" name="six" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="one">
                  <q-card class="shadow-3">
                    <q-card-section>
                      <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Corporate Info</div>
                      <q-separator />
                      <div class="q-mb-md" />
                      <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field Standard label="Company Name" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CompanyName }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="SIUP No" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ SIUPNo }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="SIUP Expiration Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ SIUPExpDate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="SKD No" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ SKDNo }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="SKD Expiration Date" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ SKDExpDate }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Status" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Status }}</div>
                            </template>
                          </q-field>
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
                          <q-field Standard label="Ownership" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ Ownership }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Date Of Establishment" stack-label>
                            <template v-slot:append>
                              <q-icon name="event" />
                            </template>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ DateOfEstablishment }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Place Of Establishment" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ PlaceOfEstablishment }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-3 col-md-3">
                          <q-field Standard label="Country Of Establishment" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CountryOfEstablishment }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field Standard label="Articles of Association No" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ArticlesOfAssosiationNo }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Company Type" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CompanyType }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Company Characteristic" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ CompanyCharacteristic }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Income Level (IDR)" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ IncomeLevel }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Investor's Risk Profile" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ InvestorRiskProfile }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Investment Objective" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ InvestmentObjective }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Source Of Fund" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ SourceOfFund }}</div>
                            </template>
                          </q-field>
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
                          <q-field Standard label="Asset Owner" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ AssetOwner }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-field Standard label="Statement Type" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ StatementType }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - Last Year"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ AssetInfoLastYear }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - 2 Years Ago"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ AssetInfo2YearsAgo }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - 3 Years Ago"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ AssetInfo3YearsAgo }}</div>
                            </template>
                          </q-field>
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
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - Last Year"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ProfitInfoLastYear }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - 2 Years Ago"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ProfitInfo2YearsAgo }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                          <q-field
                            Standard
                            label="For the Past 3 Years (IDR) - 3 Years Ago"
                            stack-label
                          >
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ ProfitInfo3YearsAgo }}</div>
                            </template>
                          </q-field>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="two">
                  <div class="q-pl-xs q-pr-xs q-pb-sm">
                    <q-table
                      title="Authorized Info"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="loaddatauthorizedinfo"
                      :columns="columnsAuthorized"
                      separator="cell"
                      :loading="loading"
                      color="primary"
                      wrap-cells
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="gcif_number" :props="props">{{ props.row.gcif_number }}</q-td>
                          <q-td key="fullname" :props="props">
                            {{
                            props.row.fullname
                            }}
                          </q-td>
                          <q-td key="position.dropdown_details_desc" :props="props">
                            {{
                            props.row.position.dropdown_details_desc
                            }}
                          </q-td>
                          <q-td key="mobile_phone" :props="props">
                            {{
                            props.row.mobile_phone
                            }}
                          </q-td>
                          <q-td key="email" :props="props">
                            {{
                            props.row.email
                            }}
                          </q-td>
                          <q-td key="domicile_address" :props="props">
                            {{
                            props.row.domicile_address
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
                <q-tab-panel name="Address">
                  <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Address" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Address }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Email" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Email }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Country" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ Country }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Phone 1" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Phone1 }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Phone 2" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Phone2 }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Fax 1" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Fax1 }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Fax 2" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ Fax2 }}</div>
                          </template>
                        </q-field>
                      </div>
                    </div>
                    <br />

                    <q-card class="shadow-3">
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="Region" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ Region }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-field Standard label="City" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ City }}</div>
                              </template>
                            </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                           <q-field Standard label="Subdistrict" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Subdistrict }}</div>
                                  </template>
                                </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-field Standard label="District" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Village }}</div>
                                  </template>
                                </q-field>
                          </div>
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-field Standard label="Postal Code" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ PostalCode }}</div>
                              </template>
                            </q-field>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="three">
                  <q-card class="shadow-3">
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
                              >{{ DateLastUpdate }}</div>
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
                    <q-table
                      title="Account Info"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="loaddatabank"
                      :columns="columnsBank"
                      row-key="order_key"
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
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="four">
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
                            <div class="self-center full-width no-outline" tabindex="0">{{ IFUA }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="Client Code (S-Invest)" stack-label>
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
                <q-tab-panel name="five">
                  <div class="q-pa-md">
                    <div class="row q-pa-xs">
                      <q-card class="col-12 text-center">
                        <div v-if="fileUploaded.length > 0">
                          <h4 class="q-pb-md" v-if="fileUploaded.length > 0">Document Upload</h4>
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
                              :label="FileItem.doc_category.dropdown_details_desc"
                            >
                              <q-card>
                                <q-card-section class="flex flex-center">
                                  <q-img :src="FileItem.document" style="max-width: 50%;">
                                    <div
                                      class="absolute-bottom text-subtitle1 text-center q-pa-xs"
                                    >{{FileItem.doc_category.dropdown_details_desc}}</div>
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
                      </q-card>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="six">
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

                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field Standard label="GIIN" stack-label>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{ GIIN }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Substantial U.S Owner Name" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SubsOwnerName }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Domicile Address" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SubsOwnerAddress }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-field Standard label="Substantial U.S Owner TIN" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ SubsOwnerTIN }}</div>
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
    </div>
  </div>
</template>

<script>
let init = ''
import { date } from 'quasar'
import {
  GetAllAccountBankInfoCorpo,
  GetAllAuthorizedInfo,
  GetAllDocumentCorporate
} from 'src/graphql/Customer/CorporateCustomer'
export default {
  name: 'ViewCustomerCorporate',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      userdata: this.Muser,
      //
      tab: 'one',
      mode: 'Corporate',
      StatmentType: '',
      FatcaStatus: '',
      SIDNumber: '',
      IFUA: '',
      ClientCode: '',
      InvestmentObjective: '',
      Status: '',
      // tab one
      submitting: false,
      optOwnership: [],
      Ownership: '',
      CompanyName: '',
      SIUPNo: '',
      SIUPExpDate: '',
      SKDNo: '',
      SKDExpDate: '',
      DateOfEstablishment: '',
      PlaceOfEstablishment: '',
      CountryOfEstablishment: '',
      ArticlesOfAssosiationNo: '',
      CompanyType: '',
      optCompanyType: [],
      CompanyCharacteristic: '',
      IncomeLevel: '',
      InvestorRiskProfile: '',
      SourceOfFund: '',
      AssetOwner: '',
      StatementType: '',
      AssetInfoLastYear: '',
      AssetInfo2YearsAgo: '',
      AssetInfo3YearsAgo: '',
      ProfitInfoLastYear: '',
      ProfitInfo2YearsAgo: '',
      ProfitInfo3YearsAgo: '',
      //
      Address: null,
      email: null,
      Country: null,
      City: null,
      Province: null,
      Region: null,
      Village: null,
      Subdistrict: null,
      PostalCode: null,
      Phone1: null,
      Phone2: null,
      Fax1: null,
      Fax2: null,
      // tab two
      columnsAuthorized: [
        {
          name: 'gcif_number',
          label: 'GCIF Number',
          field: 'gcif_number',
          align: 'Left',
          sortable: true
        },
        {
          name: 'fullname',
          label: 'Full Name',
          field: 'fullname',
          align: 'Left'
        },
        {
          name: 'position.dropdown_details_desc',
          label: 'Position',
          field: 'position.dropdown_details_desc',
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
        },
        {
          name: 'WKF_Info',
          field: 'WKF_Info',
          align: 'Left'
        }
      ],
      // tab three
      GlobalCifNumber: '',
      BranchName: '',
      BranchSales: '',
      Waperd: '',
      BranchWaperd: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: '',
      CustomerGroup: '',
      loading: false,
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
      // tab four
      DocumentCategory: '',
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
      selected: JSON.parse(localStorage.selectedData),
      uuid: null
    }
  },
  apollo: {
    loaddatabank: {
      query: GetAllAccountBankInfoCorpo,
      update: data => data.wms_customer_corporate_bank_info,
      variables: {
        code: init
      }
    },
    loaddatauthorizedinfo: {
      query: GetAllAuthorizedInfo,
      update: data => data.wms_customer_corporate_contact_person,
      variables: {
        code: init
      }
    },
    fileUploaded: {
      query: GetAllDocumentCorporate,
      update: data => data.wms_document_corporate,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    this.onBindData()
    this.onGetDataBankInfo()
    this.onGetAuthorizedInfo()
    this.onGetDocument()
    // this.insertKey()
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
            this.loaddatabank = response.data.wms_customer_corporate_bank_info
            console.log(this.loaddatabank, 'isi data bank')
          })
      }, 2000)
      this.loading = false
    },
    onGetAuthorizedInfo() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddatauthorizedinfo
          .refetch({
            code: this.GlobalCifNumber
          })
          .then(response => {
            this.loaddatauthorizedinfo =
              response.data.wms_customer_corporate_contact_person
            console.log(this.loaddatauthorizedinfo, 'isi data Contact')
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
            this.fileUploaded = response.data.wms_document_corporate
            console.log(this.fileUploaded, 'isi data file')
          })
      }, 2000)
      this.loading = false
    },
    // insertKey() {
    //   this.$log.info('info call at function onBack')
    //   if (this.selected['WMS_CDocumentUpload'].length === undefined) {
    //     this.selected['WMS_CDocumentUpload'] = []
    //   } else {
    //     this.fileUploaded = this.selected.WMS_CDocumentUpload
    //   }
    // },
    formatCurrency2(num) {
      if (num !== null) {
        num = +num
        return num.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    onBack() {
      this.$log.info('info call at function onBack')
      this.$router.push({ path: '/customer' })
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.CompanyName = this.selected.company_name
      this.SIUPNo = this.selected.siup_no
      this.SIUPExpDate = this.selected.siup_exp_date
      this.SKDNo = this.selected.skd_no
      this.SKDExpDate = this.selected.skd_exp_date
      this.Ownership = this.selected.ownership.dropdown_details_desc
      this.DateOfEstablishment = this.selected.date_establishment
      this.PlaceOfEstablishment = this.selected.place_establishment
      this.CountryOfEstablishment = this.selected.country_establishment
      this.ArticlesOfAssosiationNo = this.selected.articles_association_no
      this.CompanyType = this.selected.company_type.dropdown_details_desc
      this.CompanyCharacteristic = this.selected.company_characteristic.dropdown_details_desc
      this.IncomeLevel = this.selected.income_level.dropdown_details_desc
      this.InvestorRiskProfile = this.selected.risk_profile.dropdown_details_desc
      this.InvestmentObjective = this.selected.investment_objective.dropdown_details_desc
      this.SourceOfFund = this.selected.source_of_fund.dropdown_details_desc
      this.AssetOwner = this.selected.asset_owner
      this.StatementType = this.selected.statement_type.dropdown_details_desc
      this.AssetInfoLastYear = this.selected.asset_info_last_year
      this.AssetInfo2YearsAgo = this.selected.asset_info_two_year
      this.AssetInfo3YearsAgo = this.selected.asset_info_three_year
      this.ProfitInfoLastYear = this.selected.profit_info_last_year
      this.ProfitInfo2YearsAgo = this.selected.profit_info_two_year
      this.ProfitInfo3YearsAgo = this.selected.profit_info_two_year
      //
      this.Address = this.selected.corporate_address
      this.Email = this.selected.corporate_email
      this.Country = this.selected.postal_code.city.region.country.country_name
      this.Phone1 = this.selected.corporate_phone1
      this.Phone2 = this.selected.corporate_phone2
      this.Fax1 = this.selected.corporate_fax1
      this.Fax2 = this.selected.corporate_phone2

      this.PostalCode = this.selected.postal_code.postal_code
      this.Subdistrict = this.selected.postal_code.subdisct_name
      this.City = this.selected.postal_code.city.city_name
      this.Village = this.selected.postal_code.village_name
      this.Region = this.selected.postal_code.city.region.region_name
      //
      this.GlobalCifNumber = this.selected.gcif_number
      this.BranchName = this.selected.branch.branch_name
      // this.BranchSales = this.selected.branch_sales
      this.BranchWaperd = this.selected.branch_waperd
      this.Waperd = this.selected.waperd
      this.RegistrationDate = this.selected.registration_date
      this.DateLastUpdate = this.selected.date_last_update
      this.LobCode = this.selected.lob_code.dropdown_details_desc
      this.CustomerGroup = this.selected.customer_group.dropdown_details_desc

      this.StatmentType = this.selected.state_type
      this.FatcaStatus = this.selected.fatca
      this.SIDNumber = this.selected.sid
      this.IFUA = this.selected.ifua
      this.ClientCode = this.selected.client_code

      this.TaxIdNumber = this.selected.tax_id_number
      this.TinForeignTin = this.selected.tin_foreign_tin
      this.IssuanceCountry = this.selected.country.country_name
      this.GIIN = this.selected.giin
      this.SubsOwnerName = this.selected.subs_us_owner_name
      this.SubsOwnerAddress = this.selected.domicile_address
      this.SubsOwnerTIN = this.selected.subs_us_owner_tin
      if (this.selected.id_status !== null) {
        this.Status = this.selected.status.dropdown_details_desc
      }
      if (this.selected.id_sales !== null) {
        this.BranchSales = this.selected.sales_customer.sales_name
      }
    }
  }
}
</script>

<style>
</style>
