<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customers" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label=" Edit Corporate Customer" icon="edit" />
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
                      @click="SubmitDialog"
                      :disable="errors.any() || !isFormInValid || ProfitInfo3YearsAgo === '' ||
                      TaxIdNumber === '' ||
                      TinForeignTin === '' ||
                      IssuanceCountry === '' ||
                      GIIN === '' ||
                      SubsOwnerName === '' ||
                      SubsOwnerAddress === '' ||
                      SubsOwnerTIN === '' ||
                      Status === '' || loaddatauthorizedinfo.length === 0 || loaddatabank.length === 0 || fileUploaded.length === 0"
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
                    <q-tab label="Corporate" name="one" />
                    <q-tab label="Contact Info" name="two" />
                    <q-tab label="Address" name="Address" />
                    <q-tab label="Branch Info" name="three" />
                    <q-tab label="Document" name="Doc" />
                    <q-tab label="Tax Info" name="five" />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels keep-alive v-model="tab" animated>
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
                          row-key="id_document_corporate"
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
                                key="doc_category.dropdown_details_desc"
                                :props="props"
                              >{{ props.row.doc_category.dropdown_details_desc }}</q-td>
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                      <q-dialog v-model="ViewDocument">
                        <q-card style="width: 500px;">
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

                    <q-tab-panel name="one">
                      <q-card class="q-mt-lg shadow-3">
                        <q-card-section>
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Corporate Info</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                              <q-input
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
                                outlined
                                v-model="SIUPNo"
                                label="SIUP No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="SIUP No"
                                :error="errors.has('SIUP No')"
                              />
                              <span v-show="errors.has('SIUP No')" class="error">
                                {{
                                errors.first('SIUP No')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
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
                                outlined
                                v-model="SKDNo"
                                label="SKD No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="SKD No"
                                :error="errors.has('SKD No')"
                              />
                              <span v-show="errors.has('SKD No')" class="error">
                                {{
                                errors.first('SKD No')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <q-input
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
                          <div class="col text-weight-bolder text-subtitle1 q-mb-sm">AD/ART</div>
                          <q-separator />
                          <div class="q-mb-md" />
                          <div class="row q-col-gutter-md">
                            <div class="col-xs-12 col-sm-3 col-md-3">
                              <!-- <q-select clearable outlined v-model="Ownership" :options="optOwnership" label="Ownership"/> -->
                              <q-select
                                outlined
                                v-model="Ownership"
                                :options="optOwnership"
                                stack-label
                                :option-label="
                              optOwnership => optOwnership.dropdown_details_desc
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
                              <span
                                v-show="errors.has('Date Of Establishment')"
                                class="error"
                              >{{ errors.first('Date Of Establishment') }}</span>
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
                              <span
                                v-show="errors.has('Place Of Establishment')"
                                class="error"
                              >{{ errors.first('Place Of Establishment') }}</span>
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
                                outlined
                                v-model="ArticlesOfAssosiationNo"
                                label="Articles of Association No"
                                v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                                data-vv-name="Articles of Association No"
                                :error="errors.has('Articles of Association No')"
                              />
                              <span v-show="errors.has('Articles of Association No')" class="error">
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
                                label="Company Type *"
                                stack-label
                                :option-label="
                              optCompanyType =>
                                optCompanyType.dropdown_details_desc
                            "
                                :option-value="optCompanyType => optCompanyType"
                                emit-value
                                map-options
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
                                label="Company Characteristic *"
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
                              <span
                                v-show="errors.has('Company Characteristic')"
                                class="error"
                              >{{ errors.first('Company Characteristic') }}</span>
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
                              optInvestorRiskProfile => optInvestorRiskProfile
                            "
                                emit-value
                                map-options
                                label="Investor's Risk Profile"
                                v-validate="'required'"
                                data-vv-name="Investor Risk Profile"
                                :error="errors.has('Investor Risk Profile')"
                              />
                              <span
                                v-show="errors.has('Investor Risk Profile')"
                                class="error"
                              >{{ errors.first('Investor Risk Profile') }}</span>
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
                              optInvestmentObjective => optInvestmentObjective
                            "
                                emit-value
                                map-options
                                label="Investment Objective"
                                v-validate="'required'"
                                data-vv-name="Investment Objective"
                                :error="errors.has('Investment Objective')"
                              />
                              <span
                                v-show="errors.has('Investment Objective')"
                                class="error"
                              >{{ errors.first('Investment Objective') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                outlined
                                v-model="SourceOfFund"
                                :options="optSourceOfFund"
                                label="Source Of Fund *"
                                stack-label
                                :option-label="
                              optSourceOfFund =>
                                optSourceOfFund.dropdown_details_desc
                            "
                                :option-value="optSourceOfFund => optSourceOfFund"
                                emit-value
                                map-options
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
                                :option-value="optStatementType => optStatementType"
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
                                mask="############"
                                label="For the Past 3 Years (IDR) - Last Year "
                                v-validate="'required|numeric'"
                                data-vv-name="Asset Info Last Year"
                                :error="errors.has('Asset Info Last Year')"
                              />
                              <span
                                v-show="errors.has('Asset Info Last Year')"
                                class="error"
                              >{{ errors.first('Asset Info Last Year') }}</span>
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
                              <span
                                v-show="errors.has('Asset Info 2 Years Ago')"
                                class="error"
                              >{{ errors.first('Asset Info 2 Years Ago') }}</span>
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
                              <span
                                v-show="errors.has('Asset Info 3 Years Ago')"
                                class="error"
                              >{{ errors.first('Asset Info 3 Years Ago') }}</span>
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
                              <span
                                v-show="errors.has('Profit Info Last Year')"
                                class="error"
                              >{{ errors.first('Profit Info Last Year') }}</span>
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
                              <span
                                v-show="errors.has('Profit Info 2 Years Ago')"
                                class="error"
                              >{{ errors.first('Profit Info 2 Years Ago') }}</span>
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
                              />
                              <span
                                v-show="errors.has('Profit Info 3 Years Ago')"
                                class="error"
                              >{{ errors.first('Profit Info 3 Years Ago') }}</span>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                      <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                        <div class="row q-gutter-sm q-pb-md">
                          <q-btn
                            @click="onGetAuthorizedInfo"
                            color="grey-7"
                            style="width:75px"
                            icon="ion-refresh"
                            v-ripple
                          >
                            <q-tooltip>Refresh</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="ActionDetail"
                            color="primary"
                            style="width:75px"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="OnUpdateAuthorizedInfo"
                            color="accent"
                            style="width:75px"
                            :disable="selectedAuthorized.length === 0"
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="DeleteDialogContact"
                            :disable="selectedAuthorized.length === 0"
                            color="negative"
                            style="width:75px"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                        <q-table
                          title="Authorized Info"
                          class="q-ml-sm q-mr-sm table-label-color"
                          :grid="$q.screen.xs"
                          :data="loaddatauthorizedinfo"
                          :columns="columnsAuthorized"
                          row-key="id_corporate_contact_person"
                          selection="single"
                          :selected.sync="selectedAuthorized"
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
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                      <q-dialog v-model="AuthorizedAdd">
                        <q-card style="width: 400px; max-width: 80vw;">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="SubmitButtonAuthorizedInfo">
                              <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                                <div class="col-6">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    @click="clearAuthorized"
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
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1FirstName"
                                    label="First Name"
                                    v-validate="'required|alpha'"
                                    data-vv-name="Firstname"
                                    :error="
                                  errors.has('Firstname')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('Firstname')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first('Firstname')
                                    }}
                                  </span>
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
                                    :option-value="optAP1Position => optAP1Position"
                                    emit-value
                                    map-options
                                    label="Position"
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
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    mask="#############"
                                    v-model="AP1MobilePhone"
                                    label="Mobile Phone"
                                    v-validate="'required|numeric|min:10|max:13'"
                                    data-vv-name="Mobile Phone"
                                    :error="
                                  errors.has('Mobile Phone')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('Mobile Phone')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first(
                                    'Mobile Phone'
                                    )
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Email')" class="error">
                                    {{
                                    errors.first('Email')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1Npwp"
                                    mask="##.###.###.#-###.###"
                                    label="NPWP"
                                    v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                                    data-vv-name="NPWP"
                                    :error="errors.has('NPWP')"
                                  />
                                  <span v-show="errors.has('NPWP')" class="error">
                                    {{
                                    errors.first('NPWP')
                                    }}
                                  </span>
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
                                    v-validate="'required|numeric|min:16|max:16'"
                                    data-vv-name="ID Number"
                                    :error="
                                  errors.has('ID Number')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('ID Number')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first('ID Number')
                                    }}
                                  </span>
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
                                            @input="() => $refs.qDateProxy3.hide()"
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
                                  FilterRegionContact(), ClearCountryContact()
                                "
                                    label="Country"
                                  ></q-select>
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
                                  ></q-select>
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
                                    :option-value="optCityContact => optCityContact"
                                    emit-value
                                    map-options
                                    @input="
                                  FilterSubdistrictContact(), ClearCityContact()
                                "
                                    label="City"
                                  ></q-select>
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
                                  optSubdistrictContact => optSubdistrictContact
                                "
                                    emit-value
                                    map-options
                                    label="Subdistrict"
                                    @input="
                                  FilterVillageContact(),
                                    ClearSubdistrictContact()
                                "
                                  ></q-select>
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
                                  ></q-select>
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
                                  ></q-input>
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    :loading="submittingAuthorizedInfo"
                                    @click="SubmitButtonAuthorizedInfo"
                                    :disable="
                              errors.any() ||
                                AP1FirstName === '' ||
                                  AP1IDNumber === '' ||
                                  AP1Npwp === '' ||
                                  AP1Email === '' ||
                                  AP1MobilePhone === '' ||
                                  VillageContact === '' ||
                                  DomicileContact === '' ||
                                  AP1IDType === ''
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
                      <q-dialog v-model="AuthorizedEdit">
                        <q-card style="width: 400px; max-width: 80vw;">
                          <q-card-section style="width: 100%">
                            <form @submit.prevent="SubmitButtonEditAuthorizedInfo">
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
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1FirstNameEdit"
                                    label="First Name"
                                    v-validate="'required|alpha'"
                                    data-vv-name="Firstname"
                                    :error="
                                  errors.has('Firstname')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('Firstname')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first('Firstname')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1MiddleNameEdit"
                                    label="Middle Name"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-4">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1LastNameEdit"
                                    label="Last Name"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    outlined
                                    v-model="AP1PositionEdit"
                                    :options="optAP1Position"
                                    stack-label
                                    :option-label="
                                  optAP1Position =>
                                    optAP1Position.dropdown_details_desc
                                "
                                    :option-value="optAP1Position => optAP1Position"
                                    emit-value
                                    map-options
                                    label="Position"
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
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    mask="#############"
                                    v-model="AP1MobilePhoneEdit"
                                    label="Mobile Phone"
                                    v-validate="'required|numeric|min:10|max:13'"
                                    data-vv-name="Mobile Phone"
                                    :error="
                                  errors.has('Mobile Phone')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('Mobile Phone')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first(
                                    'Mobile Phone'
                                    )
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-input
                                    dense
                                    outlined
                                    stack-label
                                    v-model="AP1EmailEdit"
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
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1NpwpEdit"
                                    mask="##.###.###.#-###.###"
                                    label="NPWP"
                                    v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                                    data-vv-name="NPWP"
                                    :error="errors.has('NPWP')"
                                  />
                                  <span v-show="errors.has('NPWP')" class="error">
                                    {{
                                    errors.first('NPWP')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1IDTypeEdit"
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
                                    v-model="AP1IDNumberEdit"
                                    mask="################"
                                    label="ID Number"
                                    v-validate="'required|numeric|min:16|max:16'"
                                    data-vv-name="ID Number"
                                    :error="
                                  errors.has('ID Number')
                                "
                                  />
                                  <span
                                    v-show="
                                  errors.has('ID Number')
                                "
                                    class="error"
                                  >
                                    {{
                                    errors.first('ID Number')
                                    }}
                                  </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    dense
                                    stack-label
                                    outlined
                                    v-model="AP1IDExpirationDateEdit"
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
                                            v-model="AP1IDExpirationDateEdit"
                                            mask="YYYY-MM-DD"
                                            @input="() => $refs.qDateProxy3.hide()"
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
                                    v-model="CountryContactEdit"
                                    :options="optCountryContactEdit"
                                    stack-label
                                    :option-label="
                                  optCountryContactEdit =>
                                    optCountryContactEdit.country_name
                                "
                                    :option-value="
                                  optCountryContactEdit => optCountryContactEdit
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
                                    v-model="RegionContactEdit"
                                    :options="optRegionContactEdit"
                                    stack-label
                                    :option-label="
                                  optRegionContactEdit =>
                                    optRegionContactEdit.region_name
                                "
                                    :option-value="
                                  optRegionContactEdit => optRegionContactEdit
                                "
                                    emit-value
                                    map-options
                                    @input="FilterCityEdit(), ClearRegionEdit()"
                                    label="Region"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-select
                                    :disable="RegionContactEdit === ''"
                                    dense
                                    outlined
                                    v-model="CityContactEdit"
                                    :options="optCityContactEdit"
                                    stack-label
                                    :option-label="
                                  optCityContactEdit =>
                                    optCityContactEdit.city_name
                                "
                                    :option-value="
                                  optCityContactEdit => optCityContactEdit
                                "
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
                                    :disable="CityContactEdit === ''"
                                    dense
                                    outlined
                                    v-model="SubdistrictContactEdit"
                                    :options="optSubdistrictContactEdit"
                                    stack-label
                                    :option-label="
                                  optSubdistrictContactEdit =>
                                    optSubdistrictContactEdit.subdisct_name
                                "
                                    :option-value="
                                  optSubdistrictContactEdit =>
                                    optSubdistrictContactEdit
                                "
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
                                    :disable="SubdistrictContactEdit === ''"
                                    v-model="VillageContactEdit"
                                    :options="optVillageContactEdit"
                                    stack-label
                                    :option-label="
                                  optVillageContactEdit =>
                                    optVillageContactEdit.village_name
                                "
                                    :option-value="
                                  optVillageContactEdit => optVillageContactEdit
                                "
                                    emit-value
                                    map-options
                                    label="District"
                                  ></q-select>
                                </div>
                                <div class="col-xs-12 col-sm-6 col-md-6">
                                  <q-field outlined label="Postal Code" stack-label>
                                    <template v-slot:control>
                                      <div
                                        v-show="
                                      VillageContactEdit.postal_code !==
                                        undefined
                                    "
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ VillageContactEdit.postal_code }}</div>
                                      <div
                                        v-show="
                                      VillageContactEdit.postal_code ===
                                        undefined
                                    "
                                        class="self-center full-width no-outline"
                                        tabindex="0"
                                      >{{ PostalCodeEdit }}</div>
                                    </template>
                                  </q-field>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                  <q-input
                                    outlined
                                    v-model="DomicileContactEdit"
                                    label="Domicile Address *"
                                    type="textarea"
                                    stack-label
                                    float-label="Textarea"
                                    :max-height="80"
                                    rows="5"
                                  ></q-input>
                                </div>
                                <div class="col-12">
                                  <q-btn
                                    class="full-width"
                                    dense
                                    :loading="submittingAuthorizedInfo"
                                    @click="SubmitButtonEditAuthorizedInfo"
                                    :disable="
                              errors.any() ||
                                AP1FirstNameEdit === '' ||
                                  AP1PositionEdit === '' ||
                                  AP1MobilePhoneEdit === '' ||
                                  AP1EmailEdit === '' ||
                                  AP1NpwpEdit === '' ||
                                  AP1IDTypeEdit === '' ||
                                  AP1IDExpirationDateEdit === '' ||
                                  VillageContactEdit === '' ||
                                  DomicileContactEdit === ''
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
                            <span v-show="errors.has('Address')" class="error">
                              {{
                              errors.first('Address')
                              }}
                            </span>
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
                              :option-label="optCountry => optCountry.country_name"
                              :option-value="optCountry => optCountry"
                              emit-value
                              map-options
                              @input="FilterRegion(), ClearCountry()"
                              label="Country"
                              v-validate="'required'"
                              data-vv-name="Country"
                              :error="errors.has('Country')"
                            ></q-select>
                            <span v-show="errors.has('Country')" class="error">
                              {{
                              errors.first('Country')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              mask="##############"
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
                                  :option-label="optRegion => optRegion.region_name"
                                  :option-value="optRegion => optRegion"
                                  emit-value
                                  map-options
                                  @input="FilterCity(), ClearRegion()"
                                  label="Region"
                                  v-validate="'required'"
                                  data-vv-name="Region"
                                  :error="errors.has('Region')"
                                ></q-select>
                                <span v-show="errors.has('Region')" class="error">
                                  {{
                                  errors.first('Region')
                                  }}
                                </span>
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
                                  @input="FilterSusditrict(), ClearCity()"
                                  label="City"
                                  v-validate="'required'"
                                  data-vv-name="City"
                                  :error="errors.has('City')"
                                ></q-select>
                                <span v-show="errors.has('City')" class="error">
                                  {{
                                  errors.first('City')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-select
                                  outlined
                                  v-model="Subdistrict"
                                  :options="optSubdistrict"
                                  :disable="City === ''"
                                  stack-label
                                  :option-label="
                                optSubdistrict => optSubdistrict.subdisct_name
                              "
                                  :option-value="optSubdistrict => optSubdistrict"
                                  emit-value
                                  map-options
                                  @input="FilterVillage(), ClearSubdistrict()"
                                  label="Subdistrict"
                                  v-validate="'required'"
                                  data-vv-name="Subdistrict"
                                  :error="errors.has('Subdistrict')"
                                ></q-select>
                                <span v-show="errors.has('Subdistrict')" class="error">
                                  {{
                                  errors.first('Subdistrict')
                                  }}
                                </span>
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
                                <span v-show="errors.has('District')" class="error">
                                  {{
                                  errors.first('District')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-field outlined label="Postal Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      v-show="Village.postal_code !== undefined"
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ Village.postal_code }}</div>
                                    <div
                                      v-show="Village.postal_code === undefined"
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
                              <q-field dense outlined label="Global CIF Number" stack-label>
                                <template v-slot:control>
                                  <div
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ GlobalCifNumber }}</div>
                                </template>
                              </q-field>
                              <span
                                v-show="errors.has('Global CIF Number')"
                                class="error"
                              >{{ errors.first('Global CIF Number') }}</span>
                            </div>
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
                              <q-input
                                stack-label
                                outlined
                                v-model="RegistrationDate"
                                label="Registration Date"
                                v-validate="'required|date_format:yyyy-mm-dd'"
                                data-vv-name="Registration Date"
                                :error="errors.has('Registration Date')"
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
                              </q-input>
                              <span
                                v-show="errors.has('Registration Date')"
                                class="error"
                              >{{ errors.first('Registration Date') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-input
                                stack-label
                                outlined
                                v-model="DateLastUpdate"
                                label="Date Last Update"
                                v-validate="'required|date_format:yyyy-mm-dd'"
                                data-vv-name="Date Last Update"
                                :error="errors.has('Date Last Update')"
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
                              </q-input>
                              <span
                                v-show="errors.has('Date Last Update')"
                                class="error"
                              >{{ errors.first('Date Last Update') }}</span>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6">
                              <q-select
                                stack-label
                                outlined
                                v-model="LobCode"
                                :options="optLobCode"
                                label="LOB Code"
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
                          <div class="row q-gutter-sm q-pb-md">
                            <q-btn
                              @click="onGetDataBankInfo"
                              color="grey-7"
                              style="width:75px"
                              icon="ion-refresh"
                              v-ripple
                            >
                              <q-tooltip>Refresh</q-tooltip>
                            </q-btn>
                            <q-btn
                              @click="ActionDetailBank"
                              color="primary"
                              style="width:75px"
                              icon="ion-add"
                              v-ripple
                            >
                              <q-tooltip>Add</q-tooltip>
                            </q-btn>
                            <q-btn
                              @click="OnUpdateAccountInfo"
                              color="accent"
                              style="width:75px"
                              :disable="selectedbank.length === 0"
                              icon="fas fa-pencil-alt"
                              v-ripple
                            >
                              <q-tooltip>Edit</q-tooltip>
                            </q-btn>
                            <q-btn
                              @click="DeleteDialogBank"
                              :disable="selectedbank.length === 0"
                              color="negative"
                              style="width:75px"
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
                                <q-td key="status.dropdown_details_desc" :props="props">
                                  {{
                                  props.row.status.dropdown_details_desc
                                  }}
                                </q-td>
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
                                      mask="################"
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
                                    <span v-show="errors.has('Account Number')" class="error">
                                      {{
                                      errors.first('Account Number')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Bank')" class="error">
                                      {{
                                      errors.first('Bank')
                                      }}
                                    </span>
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
                                      :option-value="optAccountType => optAccountType"
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
                                    <span v-show="errors.has('Account Type')" class="error">
                                      {{
                                      errors.first('Account Type')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Currency')" class="error">
                                      {{
                                      errors.first('Currency')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Status')" class="error">
                                      {{
                                      errors.first('Status')
                                      }}
                                    </span>
                                  </div>
                                  <div class="col-12">
                                    <q-select
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
                                      :loading="submittingButtonBank"
                                      @click="SubmitButtonBank"
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
                                      mask="################"
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
                                    <span v-show="errors.has('Account Number')" class="error">
                                      {{
                                      errors.first('Account Number')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Bank')" class="error">
                                      {{
                                      errors.first('Bank')
                                      }}
                                    </span>
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
                                      :option-value="optAccountType => optAccountType"
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
                                    <span v-show="errors.has('Account Type')" class="error">
                                      {{
                                      errors.first('Account Type')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Currency')" class="error">
                                      {{
                                      errors.first('Currency')
                                      }}
                                    </span>
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
                                    <span v-show="errors.has('Status')" class="error">
                                      {{
                                      errors.first('Status')
                                      }}
                                    </span>
                                  </div>
                                  <div class="col-12">
                                    <q-select
                                      disable
                                      outlined
                                      v-model="DefaultEdit"
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
                                      class="full-width"
                                      dense
                                      :loading="submittingButtonBank"
                                      @click="SubmitEditButtonBank"
                                      :disable="
                                errors.any() ||
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
                              v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
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
                              v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                              data-vv-name="TIN/Foreign TIN"
                              :error="errors.has('TIN/Foreign TIN')"
                            />
                            <span
                              v-show="errors.has('TIN/Foreign TIN')"
                              class="error"
                            >{{ errors.first('TIN/Foreign TIN') }}</span>
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
                              outlined
                              v-model="SubsOwnerTIN"
                              label="Substantial U.S Owner TIN"
                              v-validate="'required'"
                              data-vv-name="Subs U.S Owner TIN"
                              :error="errors.has('Subs U.S Owner TIN')"
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
            <q-breadcrumbs-el label=" Edit Corporate Customer" icon="edit" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <form @submit.prevent="SubmitButton">
            <q-card class="my-card shadow-6 center" inline>
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
                  <!-- <q-tab label="Document" name="four" /> -->
                  <q-tab label="Document" name="Doc" />
                  <q-tab label="Tax Info" name="five" />
                </q-tabs>

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
                              outlined
                              v-model="SIUPNo"
                              label="SIUP No"
                              v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                              data-vv-name="SIUP No"
                              :error="errors.has('SIUP No')"
                            />
                            <span v-show="errors.has('SIUP No')" class="error">
                              {{
                              errors.first('SIUP No')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
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
                              outlined
                              v-model="SKDNo"
                              label="SKD No"
                              v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                              data-vv-name="SKD No"
                              :error="errors.has('SKD No')"
                            />
                            <span v-show="errors.has('SKD No')" class="error">
                              {{
                              errors.first('SKD No')
                              }}
                            </span>
                          </div>
                          <div class="col-xs-12 col-sm-3 col-md-3">
                            <q-input
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
                        <div class="col text-weight-bolder text-subtitle1 q-mb-sm">AD/ART</div>
                        <q-separator />
                        <div class="q-mb-md" />
                        <div class="row q-col-gutter-md">
                          <div class="col-xs-12 col-sm-3 col-md-3">
                            <!-- <q-select clearable outlined v-model="Ownership" :options="optOwnership" label="Ownership"/> -->
                            <q-select
                              outlined
                              v-model="Ownership"
                              :options="optOwnership"
                              stack-label
                              :option-label="
                              optOwnership => optOwnership.dropdown_details_desc
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
                            <span
                              v-show="errors.has('Date Of Establishment')"
                              class="error"
                            >{{ errors.first('Date Of Establishment') }}</span>
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
                            <span
                              v-show="errors.has('Place Of Establishment')"
                              class="error"
                            >{{ errors.first('Place Of Establishment') }}</span>
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
                              outlined
                              v-model="ArticlesOfAssosiationNo"
                              label="Articles of Association No"
                              v-validate="'required|regex:^[A-Za-z0-9./_-]+$'"
                              data-vv-name="Articles of Association No"
                              :error="errors.has('Articles of Association No')"
                            />
                            <span v-show="errors.has('Articles of Association No')" class="error">
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
                              label="Company Type *"
                              stack-label
                              :option-label="
                              optCompanyType =>
                                optCompanyType.dropdown_details_desc
                            "
                              :option-value="optCompanyType => optCompanyType"
                              emit-value
                              map-options
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
                              label="Company Characteristic *"
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
                            <span
                              v-show="errors.has('Company Characteristic')"
                              class="error"
                            >{{ errors.first('Company Characteristic') }}</span>
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
                              optInvestorRiskProfile => optInvestorRiskProfile
                            "
                              emit-value
                              map-options
                              label="Investor's Risk Profile"
                              v-validate="'required'"
                              data-vv-name="Investor Risk Profile"
                              :error="errors.has('Investor Risk Profile')"
                            />
                            <span
                              v-show="errors.has('Investor Risk Profile')"
                              class="error"
                            >{{ errors.first('Investor Risk Profile') }}</span>
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
                              optInvestmentObjective => optInvestmentObjective
                            "
                              emit-value
                              map-options
                              label="Investment Objective"
                              v-validate="'required'"
                              data-vv-name="Investment Objective"
                              :error="errors.has('Investment Objective')"
                            />
                            <span
                              v-show="errors.has('Investment Objective')"
                              class="error"
                            >{{ errors.first('Investment Objective') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              outlined
                              v-model="SourceOfFund"
                              :options="optSourceOfFund"
                              label="Source Of Fund *"
                              stack-label
                              :option-label="
                              optSourceOfFund =>
                                optSourceOfFund.dropdown_details_desc
                            "
                              :option-value="optSourceOfFund => optSourceOfFund"
                              emit-value
                              map-options
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
                              :option-value="optStatementType => optStatementType"
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
                              mask="############"
                              label="For the Past 3 Years (IDR) - Last Year "
                              v-validate="'required|numeric'"
                              data-vv-name="Asset Info Last Year"
                              :error="errors.has('Asset Info Last Year')"
                            />
                            <span
                              v-show="errors.has('Asset Info Last Year')"
                              class="error"
                            >{{ errors.first('Asset Info Last Year') }}</span>
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
                            <span
                              v-show="errors.has('Asset Info 2 Years Ago')"
                              class="error"
                            >{{ errors.first('Asset Info 2 Years Ago') }}</span>
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
                            <span
                              v-show="errors.has('Asset Info 3 Years Ago')"
                              class="error"
                            >{{ errors.first('Asset Info 3 Years Ago') }}</span>
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
                            <span
                              v-show="errors.has('Profit Info Last Year')"
                              class="error"
                            >{{ errors.first('Profit Info Last Year') }}</span>
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
                            <span
                              v-show="errors.has('Profit Info 2 Years Ago')"
                              class="error"
                            >{{ errors.first('Profit Info 2 Years Ago') }}</span>
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
                            />
                            <span
                              v-show="errors.has('Profit Info 3 Years Ago')"
                              class="error"
                            >{{ errors.first('Profit Info 3 Years Ago') }}</span>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="two">
                    <div class="q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
                      <div class="row q-gutter-sm q-pb-md">
                        <q-btn
                          @click="onGetAuthorizedInfo"
                          color="grey-7"
                          style="width:75px"
                          icon="ion-refresh"
                          v-ripple
                        >
                          <q-tooltip>Refresh</q-tooltip>
                        </q-btn>
                        <q-btn
                          @click="ActionDetail"
                          color="primary"
                          style="width:75px"
                          icon="ion-add"
                          v-ripple
                        >
                          <q-tooltip>Add</q-tooltip>
                        </q-btn>
                        <q-btn
                          @click="OnUpdateAuthorizedInfo"
                          color="accent"
                          style="width:75px"
                          :disable="selectedAuthorized.length === 0"
                          icon="fas fa-pencil-alt"
                          v-ripple
                        >
                          <q-tooltip>Edit</q-tooltip>
                        </q-btn>
                        <q-btn
                          @click="DeleteDialogContact"
                          :disable="selectedAuthorized.length === 0"
                          color="negative"
                          style="width:75px"
                          icon="eva-trash-2"
                          v-ripple
                        >
                          <q-tooltip>Delete</q-tooltip>
                        </q-btn>
                      </div>
                      <q-table
                        title="Authorized Info"
                        class="q-ml-sm q-mr-sm table-label-color"
                        :grid="$q.screen.xs"
                        :data="loaddatauthorizedinfo"
                        :columns="columnsAuthorized"
                        row-key="id_corporate_contact_person"
                        selection="single"
                        :selected.sync="selectedAuthorized"
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
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                    <q-dialog v-model="AuthorizedAdd">
                      <q-card style="width: 400px; max-width: 80vw;">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent="SubmitButtonAuthorizedInfo">
                            <div class="row q-col-gutter-y-md q-col-gutter-x-sm">
                              <div class="col-6">
                                <q-btn
                                  class="full-width"
                                  dense
                                  @click="clearAuthorized"
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
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1FirstName"
                                  label="First Name"
                                  v-validate="'required|alpha'"
                                  data-vv-name="Firstname"
                                  :error="
                                  errors.has('Firstname')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('Firstname')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first('Firstname')
                                  }}
                                </span>
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
                                  :option-value="optAP1Position => optAP1Position"
                                  emit-value
                                  map-options
                                  label="Position"
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
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  mask="#############"
                                  v-model="AP1MobilePhone"
                                  label="Mobile Phone"
                                  v-validate="'required|numeric|min:10|max:13'"
                                  data-vv-name="Mobile Phone"
                                  :error="
                                  errors.has('Mobile Phone')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('Mobile Phone')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first(
                                  'Mobile Phone'
                                  )
                                  }}
                                </span>
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
                                <span v-show="errors.has('Email')" class="error">
                                  {{
                                  errors.first('Email')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1Npwp"
                                  mask="##.###.###.#-###.###"
                                  label="NPWP"
                                  v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                                  data-vv-name="NPWP"
                                  :error="errors.has('NPWP')"
                                />
                                <span v-show="errors.has('NPWP')" class="error">
                                  {{
                                  errors.first('NPWP')
                                  }}
                                </span>
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
                                  v-validate="'required|numeric|min:16|max:16'"
                                  data-vv-name="ID Number"
                                  :error="
                                  errors.has('ID Number')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('ID Number')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first('ID Number')
                                  }}
                                </span>
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
                                          @input="() => $refs.qDateProxy3.hide()"
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
                                  FilterRegionContact(), ClearCountryContact()
                                "
                                  label="Country"
                                ></q-select>
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
                                ></q-select>
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
                                  :option-value="optCityContact => optCityContact"
                                  emit-value
                                  map-options
                                  @input="
                                  FilterSubdistrictContact(), ClearCityContact()
                                "
                                  label="City"
                                ></q-select>
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
                                  optSubdistrictContact => optSubdistrictContact
                                "
                                  emit-value
                                  map-options
                                  label="Subdistrict"
                                  @input="
                                  FilterVillageContact(),
                                    ClearSubdistrictContact()
                                "
                                ></q-select>
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
                                ></q-select>
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
                                ></q-input>
                              </div>
                              <div class="col-12">
                                <q-btn
                                  class="full-width"
                                  dense
                                  :loading="submittingAuthorizedInfo"
                                  @click="SubmitButtonAuthorizedInfo"
                                  :disable="
                              errors.any() ||
                                AP1FirstName === '' ||
                                  AP1IDNumber === '' ||
                                  AP1Npwp === '' ||
                                  AP1Email === '' ||
                                  AP1MobilePhone === '' ||
                                  VillageContact === '' ||
                                  DomicileContact === '' ||
                                  AP1IDType === ''
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
                    <q-dialog v-model="AuthorizedEdit">
                      <q-card style="width: 400px; max-width: 80vw;">
                        <q-card-section style="width: 100%">
                          <form @submit.prevent="SubmitButtonEditAuthorizedInfo">
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
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1FirstNameEdit"
                                  label="First Name"
                                  v-validate="'required|alpha'"
                                  data-vv-name="Firstname"
                                  :error="
                                  errors.has('Firstname')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('Firstname')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first('Firstname')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1MiddleNameEdit"
                                  label="Middle Name"
                                />
                              </div>
                              <div class="col-xs-12 col-sm-4 col-md-4">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1LastNameEdit"
                                  label="Last Name"
                                />
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  dense
                                  outlined
                                  v-model="AP1PositionEdit"
                                  :options="optAP1Position"
                                  stack-label
                                  :option-label="
                                  optAP1Position =>
                                    optAP1Position.dropdown_details_desc
                                "
                                  :option-value="optAP1Position => optAP1Position"
                                  emit-value
                                  map-options
                                  label="Position"
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
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  mask="#############"
                                  v-model="AP1MobilePhoneEdit"
                                  label="Mobile Phone"
                                  v-validate="'required|numeric|min:10|max:13'"
                                  data-vv-name="Mobile Phone"
                                  :error="
                                  errors.has('Mobile Phone')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('Mobile Phone')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first(
                                  'Mobile Phone'
                                  )
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  dense
                                  outlined
                                  stack-label
                                  v-model="AP1EmailEdit"
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
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1NpwpEdit"
                                  mask="##.###.###.#-###.###"
                                  label="NPWP"
                                  v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                                  data-vv-name="NPWP"
                                  :error="errors.has('NPWP')"
                                />
                                <span v-show="errors.has('NPWP')" class="error">
                                  {{
                                  errors.first('NPWP')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1IDTypeEdit"
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
                                  v-model="AP1IDNumberEdit"
                                  mask="################"
                                  label="ID Number"
                                  v-validate="'required|numeric|min:16|max:16'"
                                  data-vv-name="ID Number"
                                  :error="
                                  errors.has('ID Number')
                                "
                                />
                                <span
                                  v-show="
                                  errors.has('ID Number')
                                "
                                  class="error"
                                >
                                  {{
                                  errors.first('ID Number')
                                  }}
                                </span>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-input
                                  dense
                                  stack-label
                                  outlined
                                  v-model="AP1IDExpirationDateEdit"
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
                                          v-model="AP1IDExpirationDateEdit"
                                          mask="YYYY-MM-DD"
                                          @input="() => $refs.qDateProxy3.hide()"
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
                                  v-model="CountryContactEdit"
                                  :options="optCountryContactEdit"
                                  stack-label
                                  :option-label="
                                  optCountryContactEdit =>
                                    optCountryContactEdit.country_name
                                "
                                  :option-value="
                                  optCountryContactEdit => optCountryContactEdit
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
                                  v-model="RegionContactEdit"
                                  :options="optRegionContactEdit"
                                  stack-label
                                  :option-label="
                                  optRegionContactEdit =>
                                    optRegionContactEdit.region_name
                                "
                                  :option-value="
                                  optRegionContactEdit => optRegionContactEdit
                                "
                                  emit-value
                                  map-options
                                  @input="FilterCityEdit(), ClearRegionEdit()"
                                  label="Region"
                                ></q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-select
                                  :disable="RegionContactEdit === ''"
                                  dense
                                  outlined
                                  v-model="CityContactEdit"
                                  :options="optCityContactEdit"
                                  stack-label
                                  :option-label="
                                  optCityContactEdit =>
                                    optCityContactEdit.city_name
                                "
                                  :option-value="
                                  optCityContactEdit => optCityContactEdit
                                "
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
                                  :disable="CityContactEdit === ''"
                                  dense
                                  outlined
                                  v-model="SubdistrictContactEdit"
                                  :options="optSubdistrictContactEdit"
                                  stack-label
                                  :option-label="
                                  optSubdistrictContactEdit =>
                                    optSubdistrictContactEdit.subdisct_name
                                "
                                  :option-value="
                                  optSubdistrictContactEdit =>
                                    optSubdistrictContactEdit
                                "
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
                                  :disable="SubdistrictContactEdit === ''"
                                  v-model="VillageContactEdit"
                                  :options="optVillageContactEdit"
                                  stack-label
                                  :option-label="
                                  optVillageContactEdit =>
                                    optVillageContactEdit.village_name
                                "
                                  :option-value="
                                  optVillageContactEdit => optVillageContactEdit
                                "
                                  emit-value
                                  map-options
                                  label="District"
                                ></q-select>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field outlined label="Postal Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      v-show="
                                      VillageContactEdit.postal_code !==
                                        undefined
                                    "
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ VillageContactEdit.postal_code }}</div>
                                    <div
                                      v-show="
                                      VillageContactEdit.postal_code ===
                                        undefined
                                    "
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ PostalCodeEdit }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-12 col-md-12">
                                <q-input
                                  outlined
                                  v-model="DomicileContactEdit"
                                  label="Domicile Address *"
                                  type="textarea"
                                  stack-label
                                  float-label="Textarea"
                                  :max-height="80"
                                  rows="5"
                                ></q-input>
                              </div>
                              <div class="col-12">
                                <q-btn
                                  class="full-width"
                                  dense
                                  :loading="submittingAuthorizedInfo"
                                  @click="SubmitButtonEditAuthorizedInfo"
                                  :disable="
                              errors.any() ||
                                AP1FirstNameEdit === '' ||
                                  AP1PositionEdit === '' ||
                                  AP1MobilePhoneEdit === '' ||
                                  AP1EmailEdit === '' ||
                                  AP1NpwpEdit === '' ||
                                  AP1IDTypeEdit === '' ||
                                  AP1IDExpirationDateEdit === '' ||
                                  VillageContactEdit === '' ||
                                  DomicileContactEdit === ''
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
                          <span v-show="errors.has('Address')" class="error">
                            {{
                            errors.first('Address')
                            }}
                          </span>
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
                            :option-label="optCountry => optCountry.country_name"
                            :option-value="optCountry => optCountry"
                            emit-value
                            map-options
                            @input="FilterRegion(), ClearCountry()"
                            label="Country"
                            v-validate="'required'"
                            data-vv-name="Country"
                            :error="errors.has('Country')"
                          ></q-select>
                          <span v-show="errors.has('Country')" class="error">
                            {{
                            errors.first('Country')
                            }}
                          </span>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input
                            stack-label
                            outlined
                            mask="##############"
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
                                :option-label="optRegion => optRegion.region_name"
                                :option-value="optRegion => optRegion"
                                emit-value
                                map-options
                                @input="FilterCity(), ClearRegion()"
                                label="Region"
                                v-validate="'required'"
                                data-vv-name="Region"
                                :error="errors.has('Region')"
                              ></q-select>
                              <span v-show="errors.has('Region')" class="error">
                                {{
                                errors.first('Region')
                                }}
                              </span>
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
                                @input="FilterSusditrict(), ClearCity()"
                                label="City"
                                v-validate="'required'"
                                data-vv-name="City"
                                :error="errors.has('City')"
                              ></q-select>
                              <span v-show="errors.has('City')" class="error">
                                {{
                                errors.first('City')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-select
                                outlined
                                v-model="Subdistrict"
                                :options="optSubdistrict"
                                :disable="City === ''"
                                stack-label
                                :option-label="
                                optSubdistrict => optSubdistrict.subdisct_name
                              "
                                :option-value="optSubdistrict => optSubdistrict"
                                emit-value
                                map-options
                                @input="FilterVillage(), ClearSubdistrict()"
                                label="Subdistrict"
                                v-validate="'required'"
                                data-vv-name="Subdistrict"
                                :error="errors.has('Subdistrict')"
                              ></q-select>
                              <span v-show="errors.has('Subdistrict')" class="error">
                                {{
                                errors.first('Subdistrict')
                                }}
                              </span>
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
                              <span v-show="errors.has('District')" class="error">
                                {{
                                errors.first('District')
                                }}
                              </span>
                            </div>
                            <div class="col-xs-12 col-sm-4 col-md-4">
                              <q-field outlined label="Postal Code" stack-label>
                                <template v-slot:control>
                                  <div
                                    v-show="Village.postal_code !== undefined"
                                    class="self-center full-width no-outline"
                                    tabindex="0"
                                  >{{ Village.postal_code }}</div>
                                  <div
                                    v-show="Village.postal_code === undefined"
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
                            <q-field dense outlined label="Global CIF Number" stack-label>
                              <template v-slot:control>
                                <div
                                  class="self-center full-width no-outline"
                                  tabindex="0"
                                >{{ GlobalCifNumber }}</div>
                              </template>
                            </q-field>
                            <span
                              v-show="errors.has('Global CIF Number')"
                              class="error"
                            >{{ errors.first('Global CIF Number') }}</span>
                          </div>
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
                            <q-input
                              stack-label
                              outlined
                              v-model="RegistrationDate"
                              label="Registration Date"
                              v-validate="'required|date_format:yyyy-mm-dd'"
                              data-vv-name="Registration Date"
                              :error="errors.has('Registration Date')"
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
                            </q-input>
                            <span
                              v-show="errors.has('Registration Date')"
                              class="error"
                            >{{ errors.first('Registration Date') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              stack-label
                              outlined
                              v-model="DateLastUpdate"
                              label="Date Last Update"
                              v-validate="'required|date_format:yyyy-mm-dd'"
                              data-vv-name="Date Last Update"
                              :error="errors.has('Date Last Update')"
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
                            </q-input>
                            <span
                              v-show="errors.has('Date Last Update')"
                              class="error"
                            >{{ errors.first('Date Last Update') }}</span>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              stack-label
                              outlined
                              v-model="LobCode"
                              :options="optLobCode"
                              label="LOB Code"
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
                        <div class="row q-gutter-sm q-pb-md">
                          <q-btn
                            @click="onGetDataBankInfo"
                            color="grey-7"
                            style="width:75px"
                            icon="ion-refresh"
                            v-ripple
                          >
                            <q-tooltip>Refresh</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="ActionDetailBank"
                            color="primary"
                            style="width:75px"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="OnUpdateAccountInfo"
                            color="accent"
                            style="width:75px"
                            :disable="selectedbank.length === 0"
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="DeleteDialogBank"
                            :disable="selectedbank.length === 0"
                            color="negative"
                            style="width:75px"
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
                              <q-td key="status.dropdown_details_desc" :props="props">
                                {{
                                props.row.status.dropdown_details_desc
                                }}
                              </q-td>
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
                                    mask="################"
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
                                  <span v-show="errors.has('Account Number')" class="error">
                                    {{
                                    errors.first('Account Number')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Bank')" class="error">
                                    {{
                                    errors.first('Bank')
                                    }}
                                  </span>
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
                                    :option-value="optAccountType => optAccountType"
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
                                  <span v-show="errors.has('Account Type')" class="error">
                                    {{
                                    errors.first('Account Type')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Currency')" class="error">
                                    {{
                                    errors.first('Currency')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Status')" class="error">
                                    {{
                                    errors.first('Status')
                                    }}
                                  </span>
                                </div>
                                <div class="col-12">
                                  <q-select
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
                                    :loading="submittingButtonBank"
                                    @click="SubmitButtonBank"
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
                                    mask="################"
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
                                  <span v-show="errors.has('Account Number')" class="error">
                                    {{
                                    errors.first('Account Number')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Bank')" class="error">
                                    {{
                                    errors.first('Bank')
                                    }}
                                  </span>
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
                                    :option-value="optAccountType => optAccountType"
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
                                  <span v-show="errors.has('Account Type')" class="error">
                                    {{
                                    errors.first('Account Type')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Currency')" class="error">
                                    {{
                                    errors.first('Currency')
                                    }}
                                  </span>
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
                                  <span v-show="errors.has('Status')" class="error">
                                    {{
                                    errors.first('Status')
                                    }}
                                  </span>
                                </div>
                                <div class="col-12">
                                  <q-select
                                    disable
                                    outlined
                                    v-model="DefaultEdit"
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
                                    class="full-width"
                                    dense
                                    :loading="submittingButtonBank"
                                    @click="SubmitEditButtonBank"
                                    :disable="
                                errors.any() ||
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
                          row-key="id_document_corporate"
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
                                key="doc_category.dropdown_details_desc"
                                :props="props"
                              >{{ props.row.doc_category.dropdown_details_desc }}</q-td>
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                      <q-dialog v-model="ViewDocument">
                        <q-card style="width: 500px;">
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
                            v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
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
                            v-validate="'required|regex:^[.0-9\-]+$|min:20|max:20'"
                            data-vv-name="TIN/Foreign TIN"
                            :error="errors.has('TIN/Foreign TIN')"
                          />
                          <span
                            v-show="errors.has('TIN/Foreign TIN')"
                            class="error"
                          >{{ errors.first('TIN/Foreign TIN') }}</span>
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
                            outlined
                            v-model="SubsOwnerTIN"
                            label="Substantial U.S Owner TIN"
                            v-validate="'required'"
                            data-vv-name="Subs U.S Owner TIN"
                            :error="errors.has('Subs U.S Owner TIN')"
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
                @click="SubmitDialog"
                :disable="errors.any() || !isFormInValid || ProfitInfo3YearsAgo === '' ||
                TaxIdNumber === '' ||
                TinForeignTin === '' ||
                IssuanceCountry === '' ||
                GIIN === '' ||
                SubsOwnerName === '' ||
                SubsOwnerAddress === '' ||
                SubsOwnerTIN === '' ||
                Status === '' || loaddatauthorizedinfo.length === 0 || loaddatabank.length === 0 || fileUploaded.length
                === 0 || draggingFab"
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
                @click="SubmitDialog"
                :disable="errors.any() || !isFormInValid || ProfitInfo3YearsAgo === '' ||
                TaxIdNumber === '' ||
                TinForeignTin === '' ||
                IssuanceCountry === '' ||
                GIIN === '' ||
                SubsOwnerName === '' ||
                SubsOwnerAddress === '' ||
                SubsOwnerTIN === '' ||
                Status === '' || loaddatauthorizedinfo.length === 0 || loaddatabank.length === 0 || fileUploaded.length
                === 0 || draggingFab"
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
import { GetDropDown } from 'src/graphql/MasterDropDownListDetail'
import {
  EditCustomerCorporate,
  GetAllAccountBankInfoCorpo,
  GetAllAuthorizedInfo,
  DelAuthorizedInfo,
  DelAccountBankInfo,
  InsCustomerCorporateAuthorizedInfo,
  InsCustomerCorporateAccountBankInfo,
  EditCustomerCorporateAuthorizedInfo,
  EditAccountBankInfo,
  GetAllDocumentCorporate,
  DelDocument
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
import uploadDocument from 'components/UploadDocuments/UploadDocumentsEdit.vue'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'EditCustomerCorporate',
  props: ['Muser'],
  data() {
    return {
      //
      draggingFab: false,
      fabPos: [18, 18],
      token: this.ugAccessToken,
      userdata: this.Muser,
      tab: 'one',
      mode: 'corporate',
      submitting: false,
      OldGcif: '',
      // tab one
      Status: {},
      optStatus: [],
      optOwnership: [],
      Ownership: {},
      CompanyName: '',
      SIUPNo: '',
      SIUPExpDate: '',
      SKDNo: '',
      SKDExpDate: '',
      DateOfEstablishment: '',
      PlaceOfEstablishment: '',
      CountryOfEstablishment: '',
      ArticlesOfAssosiationNo: '',
      CompanyType: {},
      optCompanyType: [],
      CompanyCharacteristic: {},
      optCompanyCharacteristic: [],
      IncomeLevel: {},
      optIncomeLevel: [],
      InvestorRiskProfile: {},
      optInvestorRiskProfile: [],
      InvestmentObjective: {},
      optInvestmentObjective: [],
      SourceOfFund: {},
      optSourceOfFund: [],
      AssetOwner: '',
      StatementType: {},
      optStatementType: [],
      AssetInfoLastYear: '',
      AssetInfo2YearsAgo: '',
      AssetInfo3YearsAgo: '',
      ProfitInfoLastYear: '',
      ProfitInfo2YearsAgo: '',
      ProfitInfo3YearsAgo: '',
      // tab two
      submittingAuthorizedInfo: false,
      codeidauth: '',
      AuthorizedAdd: false,
      AuthorizedEdit: false,
      AP1FirstName: '',
      AP1MiddleName: '',
      AP1LastName: '',
      AP1Position: '',
      optAP1Position: [],
      selectedAuthorized: [],
      CountryContact: '',
      RegionContact: '',
      CityContact: '',
      SubdistrictContact: '',
      VillageContact: '',
      DomicileContact: '',
      optCountryContact: [],
      optRegionContact: [],
      optCityContact: [],
      optSubdistrictContact: [],
      optVillageContact: [],
      CountryContactEdit: {},
      optCountryContactEdit: [],
      RegionContactEdit: {},
      optRegionContactEdit: [],
      CityContactEdit: {},
      optCityContactEdit: [],
      SubdistrictContactEdit: {},
      optSubdistrictContactEdit: [],
      VillageContactEdit: {},
      optVillageContactEdit: [],
      PostalCodeEdit: '',
      DomicileContactEdit: '',
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
        }
      ],
      // optAP1Position1: this.optAP1Position,
      AP1MobilePhone: '',
      AP1Email: '',
      AP1Npwp: '',
      AP1IDType: '',
      optAP1IDType: [],
      AP1IDNumber: '',
      AP1IDExpirationDate: '',
      AP1FirstNameEdit: '',
      AP1MiddleNameEdit: '',
      AP1LastNameEdit: '',
      AP1PositionEdit: {},
      AP1MobilePhoneEdit: '',
      AP1EmailEdit: '',
      AP1NpwpEdit: '',
      AP1IDTypeEdit: {},
      AP1IDNumberEdit: '',
      AP1IDExpirationDateEdit: '',
      //
      //
      Address: '',
      Email: '',
      Country: {},
      optCountry: [],
      City: {},
      optCity: [],
      Village: {},
      optVillage: [],
      Province: [],
      Region: {},
      optRegion: [],
      Subdistrict: {},
      optSubditrict: [],
      PostalCode: {},
      Phone1: '',
      Phone2: '',
      Fax1: '',
      Fax2: '',
      //
      // tab three
      GlobalCifNumber: '',
      BranchName: {},
      optBranchName: [],
      // optBranchName1: this.optBranchName,
      BranchSales: '',
      Waperd: '',
      BranchWaperd: '',
      SalesName: {},
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: {},
      optLobCode: [],
      CustomerGroup: {},
      optCustomerGroup: [],
      AccountInfoEdit: false,
      AccountInfo: false,
      submittingButtonBank: false,
      selectedbank: [],
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
      loading: false,
      AccountNumberEdit: '',
      BankEdit: {},
      AccountTypeEdit: {},
      CurrencyEdit: {},
      StatusBankEdit: {},
      AccountNumber: '',
      DefaultEdit: '',
      optDefault: [],
      Bank: '',
      optBank: [],
      AccountType: '',
      optAccountType: [],
      Currency: '',
      Default: '',
      optCurrency: [],
      StatusBank: '',
      // tab four
      // upload
      AddDocument: false,
      ViewDocument: false,
      DocumentView: null,
      DocumentCategoryView: '',
      columnsDocument: [
        {
          name: 'doc_category.dropdown_details_desc',
          label: 'Document Category',
          field: 'doc_category.dropdown_details_desc',
          align: 'Left'
        }
      ],
      selectedDoc: [],
      optDocumentCategory: [],
      optDataDocumentCategory: [],
      loaddatacontactinfo: [],
      loaddatabank: [],
      loaddatauthorizedinfo: [],
      data: [],
      fileUploaded: [],
      // tab five
      TaxIdNumber: '',
      TinForeignTin: '',
      IssuanceCountry: {},
      optIssuanceCountry: [],
      GIIN: '',
      SubsOwnerName: '',
      SubsOwnerAddress: '',
      SubsOwnerTIN: '',
      Modify_Date: '',
      shape: 'Corporate',
      selected: JSON.parse(localStorage.selectedData)
      // uuid: null
      // optCompanyCharacteristic1: this.optCompanyCharacteristic,
      // optCompanyType1: this.optCompanyType,
      // optSourceOfFund1: this.optSourceOfFund
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
    optCountryContactEdit: {
      query: GetMasterCountries,
      update: data => data.wms_countries
    },
    optRegionContactEdit: {
      query: ViewFilterRegion,
      update: data => data.wms_region,
      variables: {
        code: init
      }
    },
    optCityContactEdit: {
      query: ViewFilterCities,
      update: data => data.wms_cities,
      variables: {
        code: init
      }
    },
    optSubdistrictContactEdit: {
      query: ViewFilterSubdistrict,
      update: data => data.wms_postal_code,
      variables: {
        code: init
      }
    },
    optVillageContactEdit: {
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
    optDataDocumentCategory: {
      query: GetDropDown,
      update: data => data.wms_dropdownlist_details,
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
    GetDocument: {
      query: GetAllDocumentCorporate,
      update: data => data.wms_document_corporate,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    localStorage.removeItem('dataUpload')
    this.onBindData()
    this.onGetDataBankInfo()
    this.onGetAuthorizedInfo()
    this.onGetDocument()
    this.FilterRegion()
    this.FilterCity()
    this.FilterSusditrict()
    this.FilterVillage()
    this.DateLastUpdate = this.now2
    this.FilterRegionEdit()
    this.FilterCityEdit()
    this.FilterSubdistrictEdit()
    this.FilterVillageEdit()
  },
  beforeDestroy() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
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
            this.fileUploaded = response.data.wms_document_corporate
            let arrOpt = []
            for (let i = 0; i < this.fileUploaded.length; i++) {
              arrOpt.push(this.fileUploaded[i].doc_category.dropdown_details_desc)
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
    onViewDocument() {
      this.ViewDocument = true
      this.DocumentView = this.selectedDoc[0].document
      this.DocumentCategoryView = this.selectedDoc[0].doc_category.dropdown_details_desc
    },
    onView(row) {
      console.log(row, '???')
      this.ViewDocument = true
      this.DocumentView = row.document
      this.DocumentCategoryView = row.doc_category.dropdown_details_desc
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
            code: this.selectedDoc[0].id_document_corporate
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
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    // add auth
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
          this.optSubdistrictContact = response.data.wms_postal_code
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
          this.optVillageContact = response.data.wms_postal_code
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
    // Edit Auth
    FilterRegionEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optRegionContactEdit
        .refetch({
          code: this.CountryContactEdit.country_name
        })
        .then(response => {
          this.optRegionContactEdit = response.data.wms_region
          this.$q.loading.hide()
        })
    },
    FilterCityEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optCityContactEdit
        .refetch({
          code: this.RegionContactEdit.region_name
        })
        .then(response => {
          this.optCityContactEdit = response.data.wms_cities
          this.$q.loading.hide()
        })
    },
    FilterSubdistrictEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optSubdistrictContactEdit
        .refetch({
          code: this.CityContactEdit.city_name
        })
        .then(response => {
          this.optSubdistrictContactEdit = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    FilterVillageEdit() {
      this.$q.loading.show()
      this.$apollo.queries.optVillageContactEdit
        .refetch({
          code: this.SubdistrictContactEdit.subdisct_name
        })
        .then(response => {
          this.optVillageContactEdit = response.data.wms_postal_code
          this.$q.loading.hide()
        })
    },
    ClearCountryEdit() {
      if (this.PostalCodeEdit !== '') {
        this.RegionContactEdit = ''
        this.CityContactEdit = ''
        this.SubdistrictContactEdit = ''
        this.VillageContactEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.RegionContactEdit = ''
        this.CityContactEdit = ''
        this.SubdistrictContactEdit = ''
        this.VillageContactEdit = ''
        this.VillageContactEdit.postal_code = ''
      }
    },
    ClearRegionEdit() {
      if (this.PostalCodeEdit !== '') {
        this.CityContactEdit = ''
        this.SubdistrictContactEdit = ''
        this.VillageContactEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.CityContactEdit = ''
        this.SubdistrictContactEdit = ''
        this.VillageContactEdit = ''
        this.VillageContactEdit.postal_code = ''
      }
    },
    ClearCityEdit() {
      if (this.PostalCodeEdit !== '') {
        this.Subdistrict = ''
        this.VillageContactEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.Subdistrict = ''
        this.VillageContactEdit = ''
        this.VillageContactEdit.postal_code = ''
      }
    },
    ClearSubdistrictEdit() {
      if (this.PostalCodeEdit !== '') {
        this.VillageContactEdit = ''
        this.PostalCodeEdit = ''
      } else {
        this.VillageContactEdit = ''
        this.VillageContactEdit.postal_code = ''
      }
    },
    // add tab address
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
    FilterSusditrict() {
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
      if (this.PostalCode !== '') {
        this.Region = ''
        this.City = ''
        this.Subdistrict = ''
        this.Village = ''
        this.PostalCode = ''
      } else {
        this.Region = ''
        this.City = ''
        this.Subdistrict = ''
        this.Village = ''
        this.Village.postal_code = ''
      }
    },
    ClearRegion() {
      if (this.PostalCode !== '') {
        this.City = ''
        this.Subdistrict = ''
        this.Village = ''
        this.PostalCode = ''
      } else {
        this.City = ''
        this.Subdistrict = ''
        this.Village = ''
        this.Village.postal_code = ''
      }
    },
    ClearCity() {
      if (this.PostalCode !== '') {
        this.Subdistrict = ''
        this.Village = ''
        this.PostalCode = ''
      } else {
        this.Subdistrict = ''
        this.Village = ''
        this.Village.postal_code = ''
      }
    },
    ClearSubdistrict() {
      if (this.PostalCode !== '') {
        this.Village = ''
        this.PostalCode = ''
      } else {
        this.Village = ''
        this.Village.postal_code = ''
      }
    },
    //
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
          mutation: InsCustomerCorporateAccountBankInfo,
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
        this.$apollo.mutate({
          mutation: DelAccountBankInfo,
          variables: {
            code: this.selectedbank[0].id_bank_info
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
    ClearBankData() {
      this.AccountNumber = ''
      this.AccountType = ''
      this.Currency = ''
      this.Default = ''
      this.StatusBank = ''
      this.Bank = ''
      this.$validator.reset()
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
          textColor: 'white',
          icon: 'fas fa-check-circle',
          timeout: 300,
          message: 'Clear Successful'
        })
      })
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
    SubmitButtonEditAuthorizedInfo() {
      this.submittingAuthorizedInfo = true
      this.$apollo
        .mutate({
          mutation: EditCustomerCorporateAuthorizedInfo,
          variables: {
            code: this.codeidauth,
            changes: {
              gcif_number: this.GlobalCifNumber,
              first_name: this.AP1FirstNameEdit,
              middle_name: this.AP1MiddleNameEdit,
              last_name: this.AP1LastNameEdit,
              id_position: this.AP1PositionEdit.id_dropdownlist_detail,
              mobile_phone: this.AP1MobilePhoneEdit,
              email: this.AP1EmailEdit,
              npwp: this.AP1NpwpEdit,
              id_type: this.AP1IDTypeEdit.id_dropdownlist_detail,
              id_number: this.AP1IDNumberEdit,
              id_exp_date: this.AP1IDExpirationDateEdit,
              fullname: this.AP1FirstNameEdit + ' ' + this.AP1LastNameEdit,
              domicile_address: this.DomicileContactEdit,
              id_postalcode: this.VillageContactEdit.id_postal_code,
              modified_by: this.userdata.name,
              modified_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingAuthorizedInfo = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Contact ' +
              this.AP1FirstNameEdit +
              ' ' +
              this.AP1LastNameEdit +
              ' ' +
              'Has Been Updated'
          })
          this.AuthorizedEdit = false
          this.onGetAuthorizedInfo()
          this.selectedAuthorized = []
        })
        .catch(err => {
          this.submittingAuthorizedInfo = false
          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
    },
    SubmitButtonAuthorizedInfo() {
      this.submittingAuthorizedInfo = true
      this.$apollo
        .mutate({
          mutation: InsCustomerCorporateAuthorizedInfo,
          variables: {
            objects: {
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
              domicile_address: this.DomicileContact,
              id_postalcode: this.VillageContact.id_postal_code,
              fullname: this.AP1FirstName + ' ' + this.AP1LastName,
              created_by: this.userdata.name,
              created_date: this.now
            }
          }
        })
        .then(response => {
          this.submittingAuthorizedInfo = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message:
              'Contact ' +
              this.AP1FirstName +
              ' ' +
              this.AP1LastName +
              ' ' +
              'Has Been Submitted'
          })
          this.onGetAuthorizedInfo()
          this.clearDataAut()
        })
        .catch(err => {
          this.submittingAuthorizedInfo = false
          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: `Submit Error: ${this.emessage}`
          })
        })
    },
    clearDataAut() {
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
      this.$validator.reset()
      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          textColor: 'white',
          timeout: 300,
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
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
          mutation: DelAuthorizedInfo,
          variables: {
            code: this.selectedAuthorized[0].id_corporate_contact_person
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onGetAuthorizedInfo()
        this.selectedAuthorized = []
      })
    },
    ActionDetail() {
      this.AuthorizedAdd = true
    },
    OnUpdateAuthorizedInfo() {
      this.AuthorizedEdit = true
      this.codeidauth = this.selectedAuthorized[0].id_corporate_contact_person
      this.AP1FirstNameEdit = this.selectedAuthorized[0].first_name
      this.AP1MiddleNameEdit = this.selectedAuthorized[0].middle_name
      this.AP1LastNameEdit = this.selectedAuthorized[0].last_name
      this.AP1PositionEdit.dropdown_details_desc = this.selectedAuthorized[0].position.dropdown_details_desc
      this.AP1MobilePhoneEdit = this.selectedAuthorized[0].mobile_phone
      this.AP1EmailEdit = this.selectedAuthorized[0].email
      this.AP1NpwpEdit = this.selectedAuthorized[0].npwp
      this.AP1IDTypeEdit.dropdown_details_desc = this.selectedAuthorized[0].type.dropdown_details_desc
      this.AP1IDNumberEdit = this.selectedAuthorized[0].id_number
      this.AP1IDExpirationDateEdit = this.selectedAuthorized[0].id_exp_date

      this.CountryContactEdit.country_name = this.selectedAuthorized[0].postal_code_contact.city.region.country.country_name
      this.RegionContactEdit.region_name = this.selectedAuthorized[0].postal_code_contact.city.region.region_name
      this.CityContactEdit.city_name = this.selectedAuthorized[0].postal_code_contact.city.city_name
      this.SubdistrictContactEdit.subdisct_name = this.selectedAuthorized[0].postal_code_contact.subdisct_name
      this.VillageContactEdit.village_name = this.selectedAuthorized[0].postal_code_contact.village_name
      this.PostalCodeEdit = this.selectedAuthorized[0].postal_code_contact.postal_code
      this.DomicileContactEdit = this.selectedAuthorized[0].domicile_address
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
        this.loading = false
      }, 2000)
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
            console.log(this.loaddatauthorizedinfo, 'isi data Authorized')
          })
        this.loading = false
      }, 2000)
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
    getDataAuthorize() {
      if (this.selected[0]['WMS_CMP_AUTH_Person2_Position'] !== undefined) {
        if (this.selected[0]['WMS_CMP_AUTH_Person2_IDtype'] !== undefined) {
          this.AP2Position = this.selected[0].WMS_CMP_AUTH_Person2_Position
          this.AP2IDType = this.selected[0].WMS_CMP_AUTH_Person2_IDtype
        }
      }
    },
    onBindData() {
      this.$log.info('info call at function onBindData')
      this.OldGcif = this.selected[0].gcif_number
      this.CompanyName = this.selected[0].company_name
      this.SIUPNo = this.selected[0].siup_no
      this.SIUPExpDate = this.selected[0].siup_exp_date
      this.SKDNo = this.selected[0].skd_no
      this.SKDExpDate = this.selected[0].skd_exp_date
      this.Ownership.dropdown_details_desc = this.selected[0].ownership.dropdown_details_desc
      this.DateOfEstablishment = this.selected[0].date_establishment
      this.PlaceOfEstablishment = this.selected[0].place_establishment
      this.CountryOfEstablishment = this.selected[0].country_establishment
      this.ArticlesOfAssosiationNo = this.selected[0].articles_association_no
      this.CompanyType.dropdown_details_desc = this.selected[0].company_type.dropdown_details_desc
      this.CompanyCharacteristic.dropdown_details_desc = this.selected[0].company_characteristic.dropdown_details_desc
      this.IncomeLevel.dropdown_details_desc = this.selected[0].income_level.dropdown_details_desc
      this.InvestorRiskProfile.dropdown_details_desc = this.selected[0].risk_profile.dropdown_details_desc
      this.InvestmentObjective.dropdown_details_desc = this.selected[0].investment_objective.dropdown_details_desc
      this.SourceOfFund.dropdown_details_desc = this.selected[0].source_of_fund.dropdown_details_desc
      this.AssetOwner = this.selected[0].asset_owner
      this.StatementType.dropdown_details_desc = this.selected[0].statement_type.dropdown_details_desc
      this.AssetInfoLastYear = this.selected[0].asset_info_last_year
      this.AssetInfo2YearsAgo = this.selected[0].asset_info_two_year
      this.AssetInfo3YearsAgo = this.selected[0].asset_info_three_year
      this.ProfitInfoLastYear = this.selected[0].profit_info_last_year
      this.ProfitInfo2YearsAgo = this.selected[0].profit_info_two_year
      this.ProfitInfo3YearsAgo = this.selected[0].profit_info_two_year
      //
      this.Address = this.selected[0].corporate_address
      this.Email = this.selected[0].corporate_email
      this.Country.country_name = this.selected[0].postal_code.city.region.country.country_name
      this.Phone1 = this.selected[0].corporate_phone1
      this.Phone2 = this.selected[0].corporate_phone2
      this.Fax1 = this.selected[0].corporate_fax1
      this.Fax2 = this.selected[0].corporate_phone2

      this.PostalCode = this.selected[0].postal_code.postal_code
      this.Subdistrict.subdisct_name = this.selected[0].postal_code.subdisct_name
      this.City.city_name = this.selected[0].postal_code.city.city_name
      this.Village.village_name = this.selected[0].postal_code.village_name
      this.Region.region_name = this.selected[0].postal_code.city.region.region_name
      //
      this.GlobalCifNumber = this.selected[0].gcif_number
      this.BranchName.branch_name = this.selected[0].branch.branch_name
      this.BranchSales = this.selected[0].branch_sales
      this.BranchWaperd = this.selected[0].branch_waperd
      this.Waperd = this.selected[0].waperd
      this.RegistrationDate = this.selected[0].registration_date
      this.DateLastUpdate = this.selected[0].date_last_update
      this.LobCode.dropdown_details_desc = this.selected[0].lob_code.dropdown_details_desc
      this.CustomerGroup.dropdown_details_desc = this.selected[0].customer_group.dropdown_details_desc

      this.TaxIdNumber = this.selected[0].tax_id_number
      this.TinForeignTin = this.selected[0].tin_foreign_tin
      this.IssuanceCountry.country_name = this.selected[0].country.country_name
      this.GIIN = this.selected[0].giin
      this.SubsOwnerName = this.selected[0].subs_us_owner_name
      this.SubsOwnerAddress = this.selected[0].domicile_address
      this.SubsOwnerTIN = this.selected[0].subs_us_owner_tin
      if (this.selected[0].id_status !== null) {
        this.Status.dropdown_details_desc = this.selected[0].status.dropdown_details_desc
      }
      if (this.selected[0].id_sales !== null) {
        this.SalesName.sales_name = this.selected[0].sales_customer.sales_name
      }
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditCustomerCorporate,
          variables: {
            code: this.OldGcif,
            changes: {
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
            submenu: 'Customer Corporate',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    SubmitDialog() {
      this.$log.info('info call at function SubmitDialog')
      this.$validator.validateAll().then(result => {
        console.log(result)
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
    }
  }
}
</script>

<style>
.error {
  color: #d6502f;
}
</style>
