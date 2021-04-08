<template>
    <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
               <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Customer" icon="fas fa-user" to="/customer" />
              <q-breadcrumbs-el label="View" icon="far fa-eye" />
            </q-breadcrumbs>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <transition appear enter-active-class="animated zoomIn">
              <q-card class="my-card shadow-6 center" inline style="background-color:white;">
                <q-card-section>
                  <form>
                    <q-card-section>
                      <div class="q-ma-xs q-gutter-sm">
                        <q-btn label="Back" @click="onBack" color="negative" style="width: 80px"></q-btn>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <transition appear enter-active-class="animated zoomIn">
                        <q-card class="my-card shadow-6 center" inline style>
                          <q-card-section>
                            <q-tabs v-model="tab" active-color="primary" indicator-color="primary" class="text-grey"
                              align="justify" inline-label>
                              <q-tab label="Customer" name="one" />
                              <q-tab label="Branch Info" name="two">
                              </q-tab>
                              <q-tab label="Tax Info" name="three">
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
                                          <q-field Standard label="Nationality" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ Nationality }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="Country Of Nationality" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ CountryOfNationality }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>

                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="ID Type" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ IDType }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="ID Number" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ IDNumber }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="ID Number Registration Date" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ IDNumberRegistrationDate }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="ID Expiration Date" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ IDExpirationDate }}
                                              </div>
                                            </template>
                                          </q-field>
                                        </div>
                                        <div class="col-xs-12 col-sm-3 col-md-3">
                                          <q-field Standard label="Status" stack-label>
                                            <template v-slot:control>
                                              <div class="self-center full-width no-outline" tabindex="0">
                                                {{ Status }}
                                              </div>
                                            </template>
                                          </q-field>
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
                                        <q-field Standard label="Salutation" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ Salutation }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4 form-group">
                                        <q-field Standard label="First Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ FirstName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Middle Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ MiddleName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Last Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ LastName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-2 col-md-2">
                                        <q-field Standard label="Gender" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ Gender }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Place Of Birth" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ PlaceOfBirth }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="CountryOfBirth" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CountryOfBirth }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Religion" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ Religion }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Date Of Birth" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ DateOfBirth }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Marital Status" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ MaritalStatus }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-3 col-md-3">
                                        <q-field Standard label="Mother Maiden Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ MotherMaidenName }}
                                            </div>
                                          </template>
                                        </q-field>
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
                                        <q-field Standard label="Educational Background" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ EducationalBackground }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Investment Objective" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ InvestmentObjective }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Income Level" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ IncomeLevel }}
                                            </div>
                                          </template>
                                        </q-field>
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
                                        <q-field Standard label="Global CIF Number" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ GlobalCifNumber }}</div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Branch Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ BranchName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-4 col-md-4">
                                        <q-field Standard label="Sales Name" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ SalesName }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Registration Date" stack-label>
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ RegistrationDate }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Date Last Update" stack-label>
                                          <template v-slot:append>
                                            <q-icon name="event" />
                                          </template>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ DateLastUpdate }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="LOB Code" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ LobCode }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                      <div class="col-xs-12 col-sm-6 col-md-6">
                                        <q-field Standard label="Customer Group" stack-label>
                                          <template v-slot:control>
                                            <div class="self-center full-width no-outline" tabindex="0">
                                              {{ CustomerGroup }}
                                            </div>
                                          </template>
                                        </q-field>
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                                <q-card class="q-mt-lg shadow-3">
                                  <q-card-section>
                                    <q-table title="Account Info" class="q-ml-sm q-mr-sm table-label-color"
                                      :grid="$q.screen.xs" :data="dataBank" :columns="columnsBank" row-key="id"
                                      separator="cell" :loading="loading" color="primary" wrap-cells>
                                      <template v-slot:body="props">
                                        <q-tr :props="props">
                                          <q-td key="account_number" :props="props">
                                            {{
                                            props.row.account_number
                                            }}
                                          </q-td>
                                          <q-td key="bank.dropdown_details_desc" :props="props">
                                            {{ props.row.bank.dropdown_details_desc }}</q-td>
                                          <q-td key="account_type.dropdown_details_desc" :props="props">
                                            {{
                                            props.row.account_type.dropdown_details_desc
                                            }}
                                          </q-td>
                                          <q-td key="currency.currencies_code" :props="props">
                                            {{ props.row.currency.currencies_code }}</q-td>
                                          <q-td key="status.dropdown_details_desc" :props="props">
                                            {{ props.row.status.dropdown_details_desc }}</q-td>
                                        </q-tr>
                                      </template>
                                    </q-table>
                                  </q-card-section>
                                </q-card>
                              </q-tab-panel>
                              <q-tab-panel name="three">
                                <div class="q-pl-xs q-pr-xs q-pb-sm">
                                  <div class="row q-col-gutter-md">
                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Tax ID Number" stack-label>
                                        <template v-slot:control>
                                          <div class="self-center full-width no-outline" tabindex="0">
                                            {{ TaxIdNumber }}
                                          </div>
                                        </template>
                                      </q-field>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="TinForeignTin" stack-label>
                                        <template v-slot:control>
                                          <div class="self-center full-width no-outline" tabindex="0">
                                            {{ TinForeignTin }}
                                          </div>
                                        </template>
                                      </q-field>
                                    </div>

                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                      <q-field Standard label="Issuance Country" stack-label>
                                        <template v-slot:control>
                                          <div class="self-center full-width no-outline" tabindex="0">
                                            {{ IssuanceCountry }}
                                          </div>
                                        </template>
                                      </q-field>
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
import { getBankCustomer } from 'src/graphql/Customer/CustomerBank'
export default {
  name: 'View',
  props: ['Muser'],
  data() {
    return {
      submitting: false,
      user: this.$q.sessionStorage.getItem('username'),
      selected: JSON.parse(localStorage.selectedData),
      tab: 'one',
      loading: false,
      // tab one
      
      Status: '',
      OldGcif: '',
      Nationality: '',
      IDType: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Salutation: '',
      CountryOfNationality: '',
      Gender: '',
      IDNumber: '',
      IDNumberRegistrationDate: '',
      IDExpirationDate: '',
      CountryOfBirth: '',
      PlaceOfBirth: '',
      InvestmentObjective: '',
      ResidenceStatus: '',
      BeneficiaryIDType: '',
      BeneficiaryName: '',
      BeneficiaryIDNumber: '',
      DateOfBirth: '',
      EducationalBackground: '',
      MotherMaidenName: '',
      Religion: '',
      Occupation: '',
      IncomeLevel: '',
      MaritalStatus: '',
      SpouseName: '',
      SpouseID: '',
      SpouseIDNumber: '',
      NextRiskAssessmentDate: '',
      //
      //two
      //
      GlobalCifNumber: '',
      BranchName: '',
      BranchSales: '',
      SalesName: '',
      RegistrationDate: '',
      DateLastUpdate: '',
      LobCode: '',
      CustomerGroup: '',
      //
      dataBank: [],
      submittingButtonBank: false,
      AccountInfo: false,
      AccountInfoEdit: false,
      AccountNumberEdit: '',
      BankEdit: '',
      AccountTypeEdit: '',
      CurrencyEdit: '',
      StatusBankEdit: '',
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
      IssuanceCountry: '',
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
    }
  },
  mounted() {
    this.onBindData()
    this.onGetDataBankInfo()
  },
  methods: {
    onBindData() {
      this.OldGcif = this.selected.gcif_number
      this.Nationality = this.selected.nationality.dropdown_details_desc
      this.CountryOfNationality = this.selected.country.country_name
      this.IDType = this.selected.type_id.dropdown_details_desc
      this.IDNumber = this.selected.id_number
      this.IDNumberRegistrationDate = this.selected.id_registration_date
      this.IDExpirationDate = this.selected.id_expiration_date
      this.Status = this.selected.status.dropdown_details_desc

      this.Salutation = this.selected.salutation.dropdown_details_desc
      this.FirstName = this.selected.first_name
      this.MiddleName = this.selected.middle_name
      this.LastName = this.selected.last_name
      this.Gender = this.selected.gender.dropdown_details_desc
      this.PlaceOfBirth = this.selected.place_of_birth
      this.CountryOfBirth = this.selected.country_of_birth
      this.DateOfBirth = this.selected.date_of_birth
      this.Religion = this.selected.religion.dropdown_details_desc
      this.MaritalStatus = this.selected.marital.dropdown_details_desc
      this.MotherMaidenName = this.selected.mother_maiden_name

      this.EducationalBackground = this.selected.educational.dropdown_details_desc
      this.InvestmentObjective = this.selected.investment_object.dropdown_details_desc 
      this.IncomeLevel = this.selected.income_level.dropdown_details_desc

      this.GlobalCifNumber = this.selected.gcif_number
      this.SalesName  = this.selected.sales_name
      this.BranchName = this.selected.branch.branch_name
      this.RegistrationDate = this.selected.registration_date
      this.DateLastUpdate = this.selected.data_last_update
      this.LobCode = this.selected.lob.dropdown_details_desc
      this.CustomerGroup = this.selected.customer_group.dropdown_details_desc

      this.TaxIdNumber = this.selected.tin_number
      this.TinForeignTin = this.selected.tin_number
      this.IssuanceCountry = this.selected.issuance_country.country_name
      
    },
    onBack() {
      this.$router.push({ path: '/customer' })
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
    }
  }
}
</script>

<style></style>
