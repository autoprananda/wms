<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <div v-show="tloading">
          <q-card bordered>
            <q-card-section>
              <q-breadcrumbs>
                <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
                <q-breadcrumbs-el label="Customers" icon="fas fa-user" />
              </q-breadcrumbs>
            </q-card-section>

            <q-separator inset />
            <q-card-section>
              <div class="q-pl-lg q-pr-md q-mt-sm q-mb-lg">
                <q-option-group
                  v-model="panel"
                  dense
                  inline
                  :options="[
                    { label: 'Individual', value: 'individual' },
                    { label: 'Corporate', value: 'corporate' }
                  ]"
                  @input="loadDataAll"
                />
              </div>
              <q-tab-panels v-model="panel" animated flat>
                <q-tab-panel name="individual" style="padding: 0px ">
                  <div class="q-pl-md q-pr-md q-pb-lg">
                    <q-form @submit="getSearchIndividual">
                      <q-expansion-item
                        dense
                        header-class="bg-primary text-white text-weight-bolder text-subtitle1"
                        label="Search"
                        icon="search"
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 20px; max-width: 540px"
                        expand-icon-class="text-white"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-9 col-md-9">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="cifIndividual"
                                      label="CIF"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="nameIndividual"
                                      label="Name"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-select
                                      dense
                                      outlined
                                      v-model="branchIndividual"
                                      :options="optBranchName"
                                      label="Branch Name"
                                      stack-label
                                      :option-label="
                                        optBranchName =>
                                          optBranchName.branch_name
                                      "
                                      :option-value="
                                        optBranchName => optBranchName
                                      "
                                      @input="resetDataInput"
                                    >
                                    </q-select>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="taxIdIndividual"
                                      label="Tax ID"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-sm-3 col-md-3 q-mt-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-12 col-md-12">
                                    <q-btn
                                      :disable="
                                        cifIndividual === '' &&
                                          nameIndividual === '' &&
                                          branchIndividual === '' &&
                                          taxIdIndividual === ''
                                      "
                                      class="full-width"
                                      rounded
                                      size="sm"
                                      color="accent"
                                      label="Search"
                                      type="submit"
                                    />
                                  </div>
                                  <div
                                    class="col-xs-12 col-sm-12 col-md-12 q-mt-sm"
                                  >
                                    <q-btn
                                      :disable="
                                        cifIndividual === '' &&
                                          nameIndividual === '' &&
                                          branchIndividual === '' &&
                                          taxIdIndividual === ''
                                      "
                                      class="full-width"
                                      rounded
                                      size="sm"
                                      color="negative"
                                      label="Clear"
                                      @click="clearButtonIndividual"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-form>
                  </div>
                  <q-separator inset />

                  <div v-if="$q.platform.is.desktop">
                    <div>
                      <batm-action-button
                        :selectDatas="selected"
                        :statusRights="actionRights"
                        :standard="statusButton"
                        :path="pathPage"
                        :dataExport="dataExport"
                        :dataDownload="loadGenerateCifIndividual"
                        :columnExport="columnExport"
                        :columnTemplate="templateImport"
                        :callMethodRefresh="onRefresh"
                        :callMethodAdd="onAdd"
                        :callMethodView="onView"
                        :callMethodUpdate="onUpdate"
                        :callMethodDelete="deleteDialog"
                        :callMethodActionImport="actionDetailImport"
                        :callMethodAuditTrailExport="auditTrailExport"
                        :callMethodRiskProfile="onRiskProfile"
                      >
                      </batm-action-button>
                    </div>
                  </div>

                  <q-card-section>
                    <q-table
                      class="q-ml-sm table-label-color"
                      title="Customers Individual List"
                      :grid="$q.screen.xs"
                      :data="loadDataCustIndividual"
                      :columns="dataIndividual"
                      row-key="id_customer_individual"
                      selection="single"
                      :selected.sync="selectedIndividual"
                      separator="cell"
                      :loading="loading"
                      :filter="filter"
                      :pagination.sync="pagination"
                      @request="onRequest"
                      binary-state-sort
                      color="primary"
                      wrap-cells
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-checkbox
                              dense
                              v-model="props.selected"
                            ></q-checkbox>
                          </q-td>
                          <q-td
                            key="gcif_number"
                            :props="props"
                            class="cursor-pointer"
                            @click.native="onViewclickIndividual(props.row)"
                            >{{ props.row.gcif_number }}</q-td
                          >
                          <q-td key="fullname" :props="props">
                            {{ props.row.fullname }}
                          </q-td>
                          <q-td key="branch.branch_name" :props="props">
                            {{ props.row.branch.branch_name }}
                          </q-td>
                          <q-td key="tax_id" :props="props">
                            {{ props.row.tax_id }}
                          </q-td>
                          <q-td key="country.country_name" :props="props">
                            {{ props.row.country.country_name }}
                          </q-td>
                          <q-td key="WKF_Info" style="width: 1px">
                            <div class="center">
                              <q-icon
                                color="grey"
                                name="fas fa-info-circle"
                                size="25px"
                              >
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
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Created Date
                                        </td>
                                        <td>:</td>
                                        <td>
                                          {{ getTime(props.row.created_date) }}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Created By
                                        </td>
                                        <td>:</td>
                                        <td>{{ props.row.created_by }}</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Modify Date
                                        </td>
                                        <td>:</td>
                                        <td>
                                          {{ getTime(props.row.modified_date) }}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Modify By
                                        </td>
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

                  <q-card-section class="invisible">
                    <div class="row">
                      <div class="col-xs-12 col-sm-6 col-md-5">
                        <q-btn-group class="q-ma-sm invisible" spread>
                          <q-btn
                            color="primary"
                            icon="ion-add"
                            :disable="actionRights.add === false"
                            v-ripple
                            no-caps
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            color="cyan-7"
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.view === false
                            "
                            icon="details"
                            v-ripple
                          >
                            <q-tooltip>View</q-tooltip>
                          </q-btn>
                          <q-btn
                            color="accent"
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.edit === false
                            "
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.delete === false
                            "
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </q-btn-group>
                      </div>
                    </div>
                  </q-card-section>
                </q-tab-panel>
                <q-tab-panel name="corporate" style="padding: 0px ">
                  <div class="q-pl-md q-pr-md q-pb-lg">
                    <q-form @submit="getSearchCorporate">
                      <q-expansion-item
                        dense
                        header-class="bg-primary text-white text-weight-bolder text-subtitle1"
                        label="Search"
                        icon="search"
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 20px; max-width: 540px"
                        expand-icon-class="text-white"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-9 col-md-9">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="cifCorporate"
                                      label="CIF"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="nameCorporate"
                                      label="Name"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-select
                                      dense
                                      outlined
                                      v-model="branchCorporate"
                                      :options="optBranchName"
                                      label="Branch Name"
                                      stack-label
                                      :option-label="
                                        optBranchName =>
                                          optBranchName.branch_name
                                      "
                                      :option-value="
                                        optBranchName => optBranchName
                                      "
                                      @input="resetDataInput"
                                    >
                                    </q-select>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="taxIdCorporate"
                                      label="Tax ID"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-sm-3 col-md-3 q-mt-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-12 col-md-12">
                                    <q-btn
                                      :disable="
                                        cifCorporate === '' &&
                                          nameCorporate === '' &&
                                          branchCorporate === '' &&
                                          taxIdCorporate === ''
                                      "
                                      class="full-width"
                                      size="sm"
                                      rounded
                                      color="accent"
                                      label="Search"
                                      type="submit"
                                    />
                                  </div>
                                  <div
                                    class="col-xs-12 col-sm-12 col-md-12 q-mt-sm"
                                  >
                                    <q-btn
                                      :disable="
                                        cifCorporate === '' &&
                                          nameCorporate === '' &&
                                          branchCorporate === '' &&
                                          taxIdCorporate === ''
                                      "
                                      rounded
                                      class="full-width"
                                      color="negative"
                                      size="sm"
                                      label="Clear"
                                      @click="clearButtonCorporate"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-form>
                  </div>
                  <q-separator inset />
                  <div v-if="$q.platform.is.desktop">
                    <div>
                      <batm-action-button
                        :selectDatas="selected"
                        :statusRights="actionRights"
                        :standard="statusButton"
                        :path="pathPage"
                        :dataExport="dataExport"
                        :dataDownload="loadGenerateCifIndividual"
                        :columnExport="columnExport"
                        :columnTemplate="templateImport"
                        :callMethodRefresh="onRefresh"
                        :callMethodAdd="onAdd"
                        :callMethodView="onView"
                        :callMethodUpdate="onUpdate"
                        :callMethodDelete="deleteDialog"
                        :callMethodActionImport="actionDetailImport"
                        :callMethodAuditTrailExport="auditTrailExport"
                        :callMethodRiskProfile="onRiskProfile"
                      >
                      </batm-action-button>
                    </div>
                  </div>

                  <q-card-section>
                    <q-table
                      class="q-ml-sm table-label-color"
                      title="Customers Corporate List"
                      :grid="$q.screen.xs"
                      :data="loadDataCustCorporate"
                      :columns="dataCorporate"
                      row-key="id_customer_corporate"
                      selection="single"
                      :selected.sync="selectedCorporate"
                      separator="cell"
                      :loading="loading"
                      :filter="filter2"
                      :pagination.sync="pagination2"
                      @request="onRequest2"
                      binary-state-sort
                      color="primary"
                      wrap-cells
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-checkbox
                              dense
                              v-model="props.selected"
                            ></q-checkbox>
                          </q-td>
                          <q-td
                            key="gcif_number"
                            :props="props"
                            class="cursor-pointer"
                            @click.native="onViewclickCorporate(props.row)"
                            >{{ props.row.gcif_number }}</q-td
                          >
                          <q-td key="fullname" :props="props">
                            {{ props.row.fullname }}
                          </q-td>
                          <q-td key="branch.branch_name" :props="props">
                            {{ props.row.branch.branch_name }}
                          </q-td>
                          <q-td key="tax_id_number" :props="props">
                            {{ props.row.tax_id_number }}
                          </q-td>
                          <q-td key="country.country_name" :props="props">
                            {{ props.row.country.country_name }}
                          </q-td>
                          <q-td key="WKF_Info" style="width: 1px">
                            <div class="center">
                              <q-icon
                                color="grey"
                                name="fas fa-info-circle"
                                size="25px"
                              >
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
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Created Date
                                        </td>
                                        <td>:</td>
                                        <td>
                                          {{ getTime(props.row.created_date) }}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Created By
                                        </td>
                                        <td>:</td>
                                        <td>{{ props.row.created_by }}</td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Modify Date
                                        </td>
                                        <td>:</td>
                                        <td>
                                          {{ getTime(props.row.modified_date) }}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr>
                                        <td
                                          class="text-weight-bolder text-subtitle1"
                                        >
                                          Modify By
                                        </td>
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

                  <q-card-section class="invisible">
                    <div class="row">
                      <div class="col-xs-12 col-sm-6 col-md-5">
                        <q-btn-group class="q-ma-sm invisible" spread>
                          <q-btn
                            color="primary"
                            icon="ion-add"
                            :disable="actionRights.add === false"
                            v-ripple
                            no-caps
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            color="cyan-7"
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.view === false
                            "
                            icon="details"
                            v-ripple
                          >
                            <q-tooltip>View</q-tooltip>
                          </q-btn>
                          <q-btn
                            color="accent"
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.edit === false
                            "
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            :disable="
                              selectedIndividual.length === 0 ||
                                actionRights.delete === false
                            "
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </q-btn-group>
                      </div>
                    </div>
                  </q-card-section>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[30, 25]"
            >
              <q-btn push fab icon="keyboard_arrow_up" color="negative" />
            </q-page-scroller>
          </q-card>
        </div>
        <q-dialog v-model="importIndividual">
          <q-carousel
            v-model="slide"
            control-color="primary"
            padding
            height="150px"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide :name="1" class="column no-wrap flex-center">
              <q-input
                outlined
                type="file"
                @change="loadCSV($event)"
                accept=".csv"
              />
              <!-- <q-input outlined type="file" @click="ImportData" /> -->
              <q-btn
                class="q-mt-md full-width"
                color="negative"
                push
                v-close-popup
                label="Close"
              />
            </q-carousel-slide>
          </q-carousel>
        </q-dialog>
        <q-dialog v-model="importCorporate">
          <q-carousel
            v-model="slide"
            control-color="primary"
            padding
            height="150px"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide :name="1" class="column no-wrap flex-center">
              <q-input
                outlined
                type="file"
                @change="loadCSVCorporate($event)"
                accept=".csv"
              />
              <!-- <q-input outlined type="file" @click="ImportData" /> -->
              <q-btn
                class="q-mt-md full-width"
                color="negative"
                push
                v-close-popup
                label="Close"
              />
            </q-carousel-slide>
          </q-carousel>
        </q-dialog>
      </q-page>
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <div v-show="tloading">
          <q-card>
            <q-card-section>
              <q-breadcrumbs>
                <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
                <q-breadcrumbs-el label="Customers" icon="fas fa-user" />
              </q-breadcrumbs>
            </q-card-section>

            <q-separator inset />
            <q-card-section>
              <div class="q-pl-lg q-pr-md q-mt-sm q-mb-lg">
                <q-option-group
                  v-model="panel"
                  dense
                  inline
                  :options="[
                    { label: 'Individual', value: 'individual' },
                    { label: 'Corporate', value: 'corporate' }
                  ]"
                  @input="loadDataAll"
                />
              </div>
              <q-tab-panels v-model="panel" animated flat>
                <q-tab-panel name="individual" style="padding: 0px ">
                  <div class="q-pl-md q-pr-md q-pb-lg">
                    <q-form>
                      <q-expansion-item
                        dense
                        header-class="bg-primary text-white text-weight-bolder text-subtitle1"
                        label="Search"
                        icon="search"
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 20px; max-width: 540px"
                        expand-icon-class="text-white"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-9 col-md-9">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="cifIndividual"
                                      label="CIF"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="nameIndividual"
                                      label="Name"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-select
                                      dense
                                      outlined
                                      v-model="branchIndividual"
                                      :options="optBranchName"
                                      label="Branch Name"
                                      stack-label
                                      :option-label="
                                        optBranchName =>
                                          optBranchName.branch_name
                                      "
                                      :option-value="
                                        optBranchName => optBranchName
                                      "
                                      @input="resetDataInput"
                                    >
                                    </q-select>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="taxIdIndividual"
                                      label="Tax ID"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-sm-3 col-md-3 q-mt-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-12 col-md-12">
                                    <q-btn
                                      :disable="
                                        cifIndividual === '' &&
                                          nameIndividual === '' &&
                                          branchIndividual === '' &&
                                          taxIdIndividual === ''
                                      "
                                      class="full-width"
                                      rounded
                                      size="sm"
                                      color="accent"
                                      label="Search"
                                      @click="getSearchIndividual"
                                    />
                                  </div>
                                  <div
                                    class="col-xs-12 col-sm-12 col-md-12 q-mt-sm"
                                  >
                                    <q-btn
                                      :disable="
                                        cifIndividual === '' &&
                                          nameIndividual === '' &&
                                          branchIndividual === '' &&
                                          taxIdIndividual === ''
                                      "
                                      class="full-width"
                                      rounded
                                      size="sm"
                                      color="negative"
                                      label="Clear"
                                      @click="clearButtonIndividual"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-form>
                  </div>
                  <q-separator inset />

                  <q-table
                    class="q-ml-sm q-mr-sm table-label-color"
                    title="Customers Individual List"
                    :grid="$q.screen.xs"
                    :data="loadDataCustIndividual"
                    :columns="dataIndividual"
                    row-key="id_customer_individual"
                    selection="single"
                    :selected.sync="selectedIndividual"
                    separator="cell"
                    :loading="loading"
                    :filter="filter"
                    :pagination.sync="pagination"
                    @request="onRequest"
                    binary-state-sort
                    color="primary"
                    wrap-cells
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td auto-width>
                          <q-checkbox
                            dense
                            v-model="props.selected"
                          ></q-checkbox>
                        </q-td>
                        <q-td
                          key="gcif_number"
                          :props="props"
                          class="cursor-pointer"
                          @click.native="onViewclickIndividual(props.row)"
                          >{{ props.row.gcif_number }}</q-td
                        >
                        <q-td key="fullname" :props="props">
                          {{ props.row.fullname }}
                        </q-td>
                        <q-td key="branch.branch_name" :props="props">
                          {{ props.row.branch.branch_name }}
                        </q-td>
                        <q-td key="tax_id" :props="props">
                          {{ props.row.tax_id }}
                        </q-td>
                        <q-td key="country.country_name" :props="props">
                          {{ props.row.country.country_name }}
                        </q-td>
                        <q-td key="WKF_Info" style="width: 1px">
                          <div class="center">
                            <q-icon
                              color="grey"
                              name="fas fa-info-circle"
                              size="25px"
                            >
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
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Created Date
                                      </td>
                                      <td>:</td>
                                      <td>
                                        {{ getTime(props.row.created_date) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Created By
                                      </td>
                                      <td>:</td>
                                      <td>{{ props.row.created_by }}</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Modify Date
                                      </td>
                                      <td>:</td>
                                      <td>
                                        {{ getTime(props.row.modified_date) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Modify By
                                      </td>
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
                          @click="onAddIndividual"
                          color="primary"
                          icon="add"
                          push
                          :disable="actionRights.add === false || draggingFab"
                          label="Add"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="onViewIndividual"
                          color="cyan-7"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.view === false ||
                              draggingFab
                          "
                          icon="details"
                          push
                          label="View"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="onUpdateindividual"
                          color="accent"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.edit === false ||
                              draggingFab
                          "
                          icon="edit"
                          push
                          label="Edit"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="deleteDialogIndividual"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.delete === false ||
                              draggingFab
                          "
                          color="negative"
                          icon="delete"
                          push
                          label="Delete"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          :loading="loadDetail"
                          @click="actionDetailImport"
                          color="purple"
                          icon="mdi-database-import"
                          :disable="
                            actionRights.import === false || draggingFab
                          "
                          label="Import"
                          label-position="left"
                          external-label
                          push
                        />
                        <q-fab-action
                          v-if="actionRights.export === false"
                          :disable="
                            selectedIndividual.length === 0 || draggingFab
                          "
                          color="orange"
                          icon="mdi-database-export"
                          @click="auditTrailExport"
                          label="Export"
                          label-position="left"
                          external-label
                          push
                        />
                        <download-excel
                          v-else-if="actionRights.export !== false"
                          :data="loadDataCustIndividual"
                          :fields="columnsExpIndividual"
                          type="xlsx"
                          name="Customer Individual Table.xls"
                        >
                          <q-fab-action
                            :disable="
                              selectedIndividual.length === 0 || draggingFab
                            "
                            color="orange"
                            icon="mdi-database-export"
                            @click="auditTrailExport"
                            label="Export"
                            label-position="left"
                            external-label
                            push
                          />
                        </download-excel>

                        <download-excel
                          :data="loadGenerateCifIndividual"
                          :fields="templateImport"
                          type="csv"
                          name="Customer Individual Template.csv"
                        >
                          <q-fab-action
                            :disable="draggingFab"
                            color="accent"
                            icon="fas fa-file-download"
                            label="Template Import"
                            label-position="left"
                            external-label
                            push
                          />
                        </download-excel>

                        <q-fab-action
                          icon="post_add"
                          color="primary"
                          label="Take Risk Profile"
                          label-position="left"
                          external-label
                          push
                          @click="onRiskProfile"
                          :disable="
                            selectedIndividual.length === 0 || draggingFab
                          "
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
                          @click="onAddIndividual"
                          color="primary"
                          icon="add"
                          push
                          :disable="actionRights.add === false || draggingFab"
                          label="Add"
                          square
                          label-position="bottom"
                          padding="4px"
                        />

                        <q-fab-action
                          @click="onViewIndividual"
                          color="cyan-7"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.view === false ||
                              draggingFab
                          "
                          icon="details"
                          push
                          label="View"
                          square
                          label-position="bottom"
                          padding="4px"
                        />

                        <q-fab-action
                          @click="onUpdateindividual"
                          color="accent"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.edit === false ||
                              draggingFab
                          "
                          icon="edit"
                          push
                          label="Edit"
                          square
                          label-position="bottom"
                          padding="4px"
                        />

                        <q-fab-action
                          @click="deleteDialogIndividual"
                          :disable="
                            selectedIndividual.length === 0 ||
                              actionRights.delete === false ||
                              draggingFab
                          "
                          color="negative"
                          icon="delete"
                          push
                          label="Delete"
                          square
                          label-position="bottom"
                          padding="4px"
                        />

                        <q-fab-action
                          :loading="loadDetail"
                          @click="actionDetailImport"
                          color="purple"
                          icon="mdi-database-import"
                          :disable="
                            actionRights.import === false || draggingFab
                          "
                          label="Import"
                          square
                          label-position="bottom"
                          padding="4px"
                          push
                        />

                        <download-excel
                          :data="loadDataCustIndividual"
                          :fields="columnsExpIndividual"
                          type="xlsx"
                          name="Customer Individual Table.xls"
                        >
                          <q-fab-action
                            :disable="
                              selectedIndividual.length === 0 || draggingFab
                            "
                            color="orange"
                            icon="mdi-database-export"
                            @click="auditTrailExport"
                            label="Export"
                            square
                            label-position="bottom"
                            padding="4px"
                            push
                          />
                        </download-excel>

                        <download-excel
                          :data="loadGenerateCifIndividual"
                          :fields="templateImport"
                          type="csv"
                          name="Customer Individual Template.csv"
                        >
                          <q-fab-action
                            :disable="draggingFab"
                            color="accent"
                            icon="fas fa-file-download"
                            label="Template Import"
                            square
                            label-position="bottom"
                            padding="4px"
                            push
                          />
                        </download-excel>

                        <q-fab-action
                          icon="post_add"
                          color="primary"
                          label="Take Risk Profile"
                          square
                          label-position="bottom"
                          padding="4px"
                          push
                          @click="onRiskProfile"
                          :disable="
                            selectedIndividual.length === 0 || draggingFab
                          "
                        />
                      </q-fab>
                    </q-page-sticky>
                  </div>
                </q-tab-panel>
                <q-tab-panel name="corporate" style="padding: 0px ">
                  <div class="q-pl-md q-pr-md q-pb-lg">
                    <q-form>
                      <q-expansion-item
                        dense
                        header-class="bg-primary text-white text-weight-bolder text-subtitle1"
                        label="Search"
                        icon="search"
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 20px; max-width: 540px"
                        expand-icon-class="text-white"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-9 col-md-9">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="cifCorporate"
                                      label="CIF"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="nameCorporate"
                                      label="Name"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-select
                                      dense
                                      outlined
                                      v-model="branchCorporate"
                                      :options="optBranchName"
                                      label="Branch Name"
                                      stack-label
                                      :option-label="
                                        optBranchName =>
                                          optBranchName.branch_name
                                      "
                                      :option-value="
                                        optBranchName => optBranchName
                                      "
                                      @input="resetDataInput"
                                    >
                                    </q-select>
                                  </div>
                                  <div class="col-xs-12 col-sm-6 col-md-6">
                                    <q-input
                                      stack-label
                                      dense
                                      outlined
                                      v-model="taxIdCorporate"
                                      label="Tax ID"
                                      @input="resetDataInput"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-12 col-sm-3 col-md-3 q-mt-sm">
                                <div class="row q-col-gutter-md">
                                  <div class="col-xs-12 col-sm-12 col-md-12">
                                    <q-btn
                                      :disable="
                                        cifCorporate === '' &&
                                          nameCorporate === '' &&
                                          branchCorporate === '' &&
                                          taxIdCorporate === ''
                                      "
                                      class="full-width"
                                      size="sm"
                                      rounded
                                      color="accent"
                                      label="Search"
                                      @click="getSearchCorporate"
                                    />
                                  </div>
                                  <div
                                    class="col-xs-12 col-sm-12 col-md-12 q-mt-sm"
                                  >
                                    <q-btn
                                      :disable="
                                        cifCorporate === '' &&
                                          nameCorporate === '' &&
                                          branchCorporate === '' &&
                                          taxIdCorporate === ''
                                      "
                                      rounded
                                      class="full-width"
                                      color="negative"
                                      size="sm"
                                      label="Clear"
                                      @click="clearButtonCorporate"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-form>
                  </div>
                  <q-separator inset />

                  <q-table
                    class="q-ml-sm q-mr-sm table-label-color"
                    title="Customers Corporate List"
                    :grid="$q.screen.xs"
                    :data="loadDataCustCorporate"
                    :columns="dataCorporate"
                    row-key="id_customer_corporate"
                    selection="single"
                    :selected.sync="selectedCorporate"
                    separator="cell"
                    :loading="loading"
                    :filter="filter2"
                    :pagination.sync="pagination2"
                    @request="onRequest2"
                    binary-state-sortcolor="primary"
                    wrap-cells
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td auto-width>
                          <q-checkbox
                            dense
                            v-model="props.selected"
                          ></q-checkbox>
                        </q-td>
                        <q-td
                          key="gcif_number"
                          :props="props"
                          class="cursor-pointer"
                          @click.native="onViewclickCorporate(props.row)"
                          >{{ props.row.gcif_number }}</q-td
                        >
                        <q-td key="fullname" :props="props">
                          {{ props.row.fullname }}
                        </q-td>
                        <q-td key="branch.branch_name" :props="props">
                          {{ props.row.branch.branch_name }}
                        </q-td>
                        <q-td key="tax_id_number" :props="props">
                          {{ props.row.tax_id_number }}
                        </q-td>
                        <q-td key="country.country_name" :props="props">
                          {{ props.row.country.country_name }}
                        </q-td>
                        <q-td key="WKF_Info" style="width: 1px">
                          <div class="center">
                            <q-icon
                              color="grey"
                              name="fas fa-info-circle"
                              size="25px"
                            >
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
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Created Date
                                      </td>
                                      <td>:</td>
                                      <td>
                                        {{ getTime(props.row.created_date) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Created By
                                      </td>
                                      <td>:</td>
                                      <td>{{ props.row.created_by }}</td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Modify Date
                                      </td>
                                      <td>:</td>
                                      <td>
                                        {{ getTime(props.row.modified_date) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr>
                                      <td
                                        class="text-weight-bolder text-subtitle1"
                                      >
                                        Modify By
                                      </td>
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
                          @click="onAddCorporate"
                          color="primary"
                          icon="add"
                          push
                          :disable="actionRights.add === false || draggingFab"
                          label="Add"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="onViewCorporate"
                          color="cyan-7"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.view === false ||
                              draggingFab
                          "
                          icon="details"
                          push
                          label="View"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="onUpdateCorporate"
                          color="accent"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.edit === false ||
                              draggingFab
                          "
                          icon="edit"
                          push
                          label="Edit"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          @click="deleteDialogCorporate"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.delete === false ||
                              draggingFab
                          "
                          color="negative"
                          icon="delete"
                          push
                          label="Delete"
                          label-position="left"
                          external-label
                        />

                        <q-fab-action
                          :loading="loadDetail"
                          @click="actionDetailImport"
                          color="purple"
                          icon="mdi-database-import"
                          :disable="
                            actionRights.import === false || draggingFab
                          "
                          label="Import"
                          label-position="left"
                          external-label
                          push
                        />
                        <q-fab-action
                          v-if="actionRights.export === false"
                          :disable="
                            loadDataCustCorporate.length === 0 ||
                              actionRights.export === false ||
                              draggingFab
                          "
                          color="orange"
                          icon="mdi-database-export"
                          label="Export"
                          label-position="left"
                          external-label
                          push
                        />
                        <download-excel
                          v-else-if="actionRights.export !== false"
                          :data="loadDataCustCorporate"
                          :fields="columnsExpCorporate"
                          type="xlsx"
                          name="Customer Corporate Table.xls"
                        >
                          <q-fab-action
                            :disable="
                              loadDataCustCorporate.length === 0 ||
                                actionRights.export === false ||
                                draggingFab
                            "
                            color="orange"
                            icon="mdi-database-export"
                            @click="auditTrailExport"
                            label="Export"
                            label-position="left"
                            external-label
                            push
                          />
                        </download-excel>

                        <download-excel
                          :data="loadGenerateCifIndividual"
                          :fields="templateImportCorp"
                          type="csv"
                          name="Customer Corporate Template.csv"
                        >
                          <q-fab-action
                            :disable="draggingFab"
                            color="accent"
                            icon="fas fa-file-download"
                            label="Template Import"
                            label-position="left"
                            external-label
                            push
                          />
                        </download-excel>
                        <q-fab-action
                          icon="post_add"
                          color="primary"
                          label="Take Risk Profile"
                          label-position="left"
                          external-label
                          push
                          @click="onRiskProfile"
                          :disable="
                            selectedCorporate.length === 0 || draggingFab
                          "
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
                          @click="onAddCorporate"
                          color="primary"
                          icon="add"
                          push
                          :disable="actionRights.add === false || draggingFab"
                          label="Add"
                          square
                          label-position="bottom"
                          padding="4px"
                        />
                        <q-fab-action
                          @click="onViewCorporate"
                          color="cyan-7"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.view === false ||
                              draggingFab
                          "
                          icon="details"
                          push
                          label="View"
                          square
                          label-position="bottom"
                          padding="4px"
                        />
                        <q-fab-action
                          @click="onUpdateCorporate"
                          color="accent"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.edit === false ||
                              draggingFab
                          "
                          icon="edit"
                          push
                          label="Edit"
                          square
                          label-position="bottom"
                          padding="4px"
                        />
                        <q-fab-action
                          @click="deleteDialogCorporate"
                          :disable="
                            selectedCorporate.length === 0 ||
                              actionRights.delete === false ||
                              draggingFab
                          "
                          color="negative"
                          icon="delete"
                          push
                          label="Delete"
                          square
                          label-position="bottom"
                          padding="4px"
                        />

                        <q-fab-action
                          :loading="loadDetail"
                          @click="actionDetailImport"
                          color="purple"
                          icon="mdi-database-import"
                          :disable="
                            actionRights.import === false || draggingFab
                          "
                          label="Import"
                          square
                          label-position="bottom"
                          padding="4px"
                          push
                        />
                        <q-fab-action
                          v-if="actionRights.export === false"
                          :disable="
                            loadDataCustCorporate.length === 0 ||
                              actionRights.export === false ||
                              draggingFab
                          "
                          color="orange"
                          icon="mdi-database-export"
                          @click="auditTrailExport"
                          label="Export"
                          square
                          label-position="bottom"
                          padding="4px"
                          push
                        />
                        <download-excel
                          v-else-if="actionRights.export !== false"
                          :data="loadDataCustCorporate"
                          :fields="columnsExpCorporate"
                          type="xlsx"
                          name="Customer Corporate Table.xls"
                        >
                          <q-fab-action
                            :disable="
                              loadDataCustCorporate.length === 0 ||
                                actionRights.export === false ||
                                draggingFab
                            "
                            color="orange"
                            icon="mdi-database-export"
                            @click="auditTrailExport"
                            label="Export"
                            square
                            label-position="bottom"
                            padding="4px"
                            push
                          />
                        </download-excel>
                        <download-excel
                          :data="loadGenerateCifIndividual"
                          :fields="templateImportCorp"
                          type="csv"
                          name="Customer Corporate Template.csv"
                        >
                          <q-fab-action
                            :disable="draggingFab"
                            color="accent"
                            icon="fas fa-file-download"
                            label="Template Import"
                            square
                            label-position="bottom"
                            padding="4px"
                            push
                          />
                        </download-excel>

                        <q-fab-action
                          icon="post_add"
                          color="primary"
                          label="Take Risk Profile"
                          square
                          label-position="bottom"
                          padding="4px"
                          push
                          @click="onRiskProfile"
                          :disable="
                            selectedCorporate.length === 0 || draggingFab
                          "
                        />
                      </q-fab>
                    </q-page-sticky>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
          </q-card>
        </div>
        <q-dialog v-model="importIndividual">
          <q-carousel
            v-model="slide"
            control-color="primary"
            padding
            height="150px"
            class="bg-white shadow-1 rounded-borders"
          >
            <q-carousel-slide :name="1" class="column no-wrap flex-center">
              <q-input
                outlined
                type="file"
                @change="loadCSV($event)"
                accept=".csv"
              />
              <!-- <q-input outlined type="file" @click="ImportData" /> -->
              <q-btn
                class="q-mt-md full-width"
                color="negative"
                push
                v-close-popup
                label="Close"
              />
            </q-carousel-slide>
          </q-carousel>
        </q-dialog>
      </q-page>
    </div>
  </div>
</template>

<script>
let init,
  limit,
  offset = ''
import { mapState } from 'vuex'
import { date } from 'quasar'
import actionButtons from 'components/ActionButtons/ActionButtons.vue'
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import {
  GetAllCustomerIndividual,
  GetCustomerIndividualPerPage,
  GetCustomerIndividualSearchPerPage,
  InsCustomerIndividual,
  DelCustomerIndividual,
  DelMainContactInfo,
  DelMainDocument,
  DelMainBankInfo,
  GetDataContact,
  GetBank,
  GetGenerateCIFIndividual
} from 'src/graphql/Customer/IndividualCustomer'
import {
  GetAllCustomerCorporate,
  GetCustomerCorporatePerPage,
  GetCustomerCorporateSearchPerPage,
  DelCustomerCorporate,
  DelMainAuthorizedInfo,
  DelMainCorpoDocument,
  DelMainCorpoBankInfo,
  InsCorporateCustomer
} from 'src/graphql/Customer/CorporateCustomer'
import { GetBranch } from 'src/graphql/MasterBranch'
export default {
  name: 'MainCustomer',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      template: [],
      userdata: this.Muser,
      actionRights: JSON.parse(localStorage.actionRights),
      globalCifNumberMaster: [],
      globalCifNumberNext: [],
      globalCifNumber: '',
      importIndividual: false,
      importCorporate: false,
      query: null,
      dataExport: [],
      dataImport: [],
      dataImportCorp: [],
      parseCsv: [],
      statetrue: [],
      resultSubmit: [],
      tloading: false,
      loading: false,
      statusButton: false,
      pathPage: this.$route.fullPath,
      sortStatus: false,
      sortStatus2: false,
      statusSearch: false,
      statusSearch2: false,
      loadDetail: null,
      panel: 'individual',
      select: [],
      selectedIndividual: [],
      selectedCorporate: [],
      loadDataCustIndividual: [],
      loadDataCustCorporate: [],
      dataContactIndi: [],
      dataBankIndi: [],
      cifIndividual: '',
      nameIndividual: '',
      branchIndividual: '',
      taxIdIndividual: '',
      cifCorporate: '',
      nameCorporate: '',
      branchCorporate: '',
      taxIdCorporate: '',
      filter: '',
      filter2: '',
      sort: 'no',
      sort2: 'no',
      slide: 1,
      data: [],
      currentPage: 1,
      currentPage2: 1,
      totalPageCount: null,
      totalPageCount2: null,
      pagination: {
        sortBy: 'gcif_number',
        descending: false,
        page: this.currentPage,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      pagination2: {
        sortBy: 'gcif_number',
        descending: false,
        page: this.currentPage2,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      newPage: 1,
      newPage2: 1,
      row: 5,
      row2: 5,
      offset: 0,
      offset2: 0,
      limit: 5,
      limit2: 5,
      templateImport: {
        GlobalCifNumber: 'null',
        Nationality: 'null',
        CountryOfNationality: 'null',
        IDType: 'null',
        IDNumber: 'null',
        IDNumberRegistrationDate: 'null',
        IDExpirationDate: 'null',
        Salutation: 'null',
        FirstName: 'null',
        MiddleName: 'null',
        LastName: 'null',
        Gender: 'null',
        PlaceOfBirth: 'null',
        CountryOfBirth: 'null',
        Religion: 'null',
        DateOfBirth: 'null',
        MaritalStatus: 'null',
        MotherMaidenName: 'null',
        EducationalBackground: 'null',
        InvestmentObjective: 'null',
        Occupation: 'null',
        ResidenceStatus: 'null',
        IncomeLevel: 'null',
        NextRiskAssessmentDate: 'null',
        BeneficiaryName: 'null',
        BeneficiaryIDType: 'null',
        BeneficiaryIDNumber: 'null',
        BranchName: 'null',
        BranchSales: 'null',
        BranchWaperd: 'null',
        Waperd: 'null',
        RegistrationDate: 'null',
        DateLastUpdate: 'null',
        LobCode: 'null',
        CustomerGroup: 'null',
        TaxIdNumber: 'null',
        TinForeignTin: 'null',
        IssuanceCountry: 'null'
      },
      templateImportCorp: {
        GlobalCifNumber: 'null',
        CompanyName: 'null',
        SIUPExpDate: 'null',
        SIUPNo: 'null',
        SKDNo: 'null',
        SKDExpDate: 'null',
        // Status: 'null',
        Ownership: 'null',
        DateOfEstablishment: 'null',
        PlaceOfEstablishment: 'null',
        CountryOfEstablishment: 'null',
        ArticlesOfAssosiationNo: 'null',
        CompanyType: 'null',
        CompanyCharacteristic: 'null',
        IncomeLevel: 'null',
        InvestorRiskProfile: 'null',
        InvestmentObjective: 'null',
        SourceOfFund: 'null',
        AssetOwner: 'null',
        StatementType: 'null',
        AssetInfoLastYear: 'null',
        AssetInfo2YearsAgo: 'null',
        AssetInfo3YearsAgo: 'null',
        ProfitInfoLastYear: 'null',
        ProfitInfo2YearsAgo: 'null',
        ProfitInfo3YearsAgo: 'null',
        //
        Address: 'null',
        Email: 'null',
        Phone1: 'null',
        Phone2: 'null',
        Fax1: 'null',
        Fax2: 'null',
        PostalCode: 'null',
        //
        BranchName: 'null',
        BranchSales: 'null',
        BranchWaperd: 'null',
        Waperd: 'null',
        RegistrationDate: 'null',
        DateLastUpdate: 'null',
        LobCode: 'null',
        CustomerGroup: 'null',
        TaxIdNumber: 'null',
        TinForeignTin: 'null',
        IssuanceCountry: 'null',
        GIIN: 'null',
        SubsOwnerName: 'null',
        SubsOwnerAddress: 'null',
        SubsOwnerTIN: 'null'
      },
      columnExport: {},
      columnsExpIndividual: {
        CIF: 'gcif_number',
        'Full Name': 'fullname',
        Nationality: 'nationality.dropdown_details_desc',
        'Country Of Nationality': 'country.country_name',
        'ID Type': 'type_id.dropdown_details_desc',
        'ID Number': 'id_number',
        'ID Number Registration Date': 'id_registration_date',
        'ID Expiration Date': 'id_expiration_date',
        Salutation: 'salutation.dropdown_details_desc',
        'First Name': 'first_name',
        'Middle Name': 'middle_name',
        'Last Name': 'last_name',
        Gender: 'gender.dropdown_details_desc',
        'Place Of Birth': 'place_of_birth',
        'Country Of Birth': 'country_of_birth',
        Religion: 'religion.dropdown_details_desc',
        'Date Of Birth': 'date_of_birth',
        'Marital Status': 'marital.dropdown_details_desc',
        'Mother Maiden Name': 'mother_maiden_name',
        'Educational Background': 'educational.dropdown_details_desc',
        'Investment Objective': 'investment_object.dropdown_details_desc',
        Occupation: 'occupation.dropdown_details_desc',
        'Residence Status': 'residence_status.dropdown_details_desc',
        'Income Level': 'income_level.dropdown_details_desc',
        'Next RiskAssessment Date': 'next_risk_date',

        Country: 'CountryContact',
        Region: 'RegionContact',
        City: 'CityInfos',
        Subdistrict: 'SubdistrictContact',
        District: 'DistrictContact',
        'Postal Code': 'PostalCodes',
        'Domicile Address': 'AddressContact',
        'Email Address': 'EmailAddressContact',
        'Mobile Phone': 'MobilePhoneContact',
        'Home Phone': 'HomePhoneContact',
        'Fax Number': 'FaxNumberContact',

        'Beneficiary Name': 'beneficiary_name',
        'Beneficiary ID Number': 'beneficiary_id_number',
        'Beneficiary ID Type': 'beneficiary.dropdown_details_desc',
        'Branch Name': 'branch.branch_name',
        'Branch Sales': 'branch_sales',
        'Branch Waperd': 'branch_waperd',
        Waperd: 'waperd',
        'Registration Date': 'registration_date',
        'Date Last Update': 'data_last_update',
        'Lob Code': 'lob.dropdown_details_desc',
        'Customer Group': 'customer_group.dropdown_details_desc',

        'Account Number': 'AccountNoBank',
        Bank: 'Bank',
        'Account Type': 'AcTypeBank',
        Currency: 'CurrencyBank',
        'Status Bank': 'StatusBank',
        Default: 'DefaultBank',

        'Tax ID Number': 'tin_number',
        'TIN/ Foreign TIN': 'tin_number',
        'Issuance Country': 'issuance_country.country_name'
      },
      columnsExpCorporate: {
        CIF: 'gcif_number',
        'Company Name': 'company_name',
        'SIUP No': 'siup_no',
        'SIUP Expiration Date': 'siup_exp_date',
        'SKD No': 'skd_no',
        'SKD Expiration Date': 'skd_exp_date',
        Status: 'status.dropdown_details_desc',
        Ownership: 'ownership.dropdown_details_desc',
        'Date Of Establishment': 'date_establishment',
        'Place Of Establishment': 'place_establishment',
        'Country Of Establishment': 'country_establishment',
        'Articles of Association N': 'articles_association_no',
        'Company Type': 'company_type.dropdown_details_desc',
        'Company Characteristic':
          'company_characteristic.dropdown_details_desc',
        'Income Level': 'income_level.dropdown_details_desc',
        'Investor Risk Profile': 'risk_profile.dropdown_details_desc',
        'Investment Objective': 'investment_objective.dropdown_details_desc',
        'Source Of Fund': 'source_of_fund.dropdown_details_desc',
        'Asset Owner': 'asset_owner',
        'Statement Type': 'statement_type.dropdown_details_desc',
        'For the Past 3 Years (IDR) - Last Year': 'asset_info_last_year',
        'For the Past 3 Years (IDR) - 2 Years Ago': 'asset_info_two_year',
        'For the Past 3 Years (IDR) - 3 Years Ago': 'asset_info_three_year',
        'For the Past 3 Years (IDR) - Last Year ': 'profit_info_last_year',
        'For the Past 3 Years (IDR) - 2 Years Ago ': 'profit_info_two_year',
        'For the Past 3 Years (IDR) - 3 Years Ago ': 'profit_info_two_year',
        Address: 'corporate_address',
        Email: 'corporate_email',
        Country: 'postal_code.city.region.country.country_name',
        'Phone 1': 'corporate_phone1',
        'Phone 2': 'corporate_phone2',
        'Fax 1': 'corporate_fax1',
        'Fax 2': 'corporate_phone2',
        Region: 'postal_code.city.region.region_name',
        City: 'postal_code.city.city_name',
        Subdistrict: 'postal_code.subdisct_name',
        District: 'postal_code.village_name',
        'Postal Code': 'postal_code.postal_code',
        'Branch Name': 'branch.branch_name',
        'Branch Sales': 'branch_sales',
        'Branch Waperd': 'branch_waperd',
        Waperd: 'waperd',
        'Registration Date': 'registration_date',
        'Date Last Update': 'date_last_update',
        'Lob Code': 'lob_code.dropdown_details_desc',
        'Customer Group': 'customer_group.dropdown_details_desc',

        'Statment Type': 'state_type',
        'Fatca Status': 'fatca',
        'SID Number': 'sid',
        IFUA: 'ifua',
        'Client Code': 'client_code',

        'Tax ID Number': 'tax_id_number',
        'TIN /Foreign TIN': 'tin_foreign_tin',
        'Issuance Country': 'country.country_name',
        GIIN: 'giin',
        'Substantial U.S Owner Name': 'subs_us_owner_name',
        'Substantial Domicile Address': 'domicile_address',
        'Substantial U.S Owner TIN': 'subs_us_owner_tin'
      },
      dataIndividual: [
        {
          name: 'gcif_number',
          label: 'CIF',
          field: row => row.gcif_number,
          align: 'Left',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'fullname',
          label: 'Full Name',
          field: 'fullname',
          align: 'Left',
          sortable: true
        },
        {
          name: 'branch.branch_name',
          label: 'Branch',
          field: 'branch.branch_name',
          align: 'Left',
          sortable: true
        },
        {
          name: 'tax_id',
          label: 'Tax ID',
          field: 'tax_id',
          align: 'Left',
          sortable: true
        },
        {
          name: 'country.country_name',
          label: 'Country',
          field: 'country.country_name',
          align: 'Left',
          sortable: true
        },
        {
          name: 'WKF_Info',
          field: 'WKF_Info',
          align: 'Left'
        }
      ],
      dataCorporate: [
        {
          name: 'gcif_number',
          label: 'CIF',
          field: row => row.gcif_number,
          align: 'Left',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'fullname',
          label: 'Full Name',
          field: 'fullname',
          align: 'Left',
          sortable: true
        },
        {
          name: 'branch.branch_name',
          label: 'Branch',
          field: 'branch.branch_name',
          align: 'Left',
          sortable: true
        },
        {
          name: 'tax_id_number',
          label: 'Tax ID',
          field: 'tax_id_number',
          align: 'Left',
          sortable: true
        },
        {
          name: 'country.country_name',
          label: 'Country',
          field: 'country.country_name',
          align: 'Left',
          sortable: true
        },
        {
          name: 'WKF_Info',
          field: 'WKF_Info',
          align: 'Left'
        }
      ]
    }
  },
  components: {
    BatmActionButton: actionButtons
  },
  watch: {
    actionRights(newactionRights) {
      localStorage.actionRights = newactionRights
    }
  },
  apollo: {
    optBranchName: {
      query: GetBranch,
      update: data => data.wms_branches
    },
    loadGenerateCifIndividual: {
      query: GetGenerateCIFIndividual,
      update: data => data.wms_customer_individual
    },
    loadDataCustIndiAll: {
      query: GetAllCustomerIndividual,
      update: data => data.wms_customer_individual
    },
    loadDataCustIndiPerPage: {
      query: GetCustomerIndividualPerPage,
      update: data => data.wms_customer_individual,
      variables: {
        limit: limit,
        offset: offset
      }
    },
    loadDataCustIndi: {
      query: GetCustomerIndividualSearchPerPage,
      update: data => data.wms_customer_individual,
      variables: {
        code: init,
        code1: init,
        code2: init,
        code3: init,
        limit: limit,
        offset: offset
      }
    },
    loadDataCustCorpoAll: {
      query: GetAllCustomerCorporate,
      update: data => data.wms_customer_corporate
    },
    loadDataCustCorpoPerPage: {
      query: GetCustomerCorporatePerPage,
      update: data => data.wms_customer_corporate,
      variables: {
        limit: limit,
        offset: offset
      }
    },
    loadDataCustCorp: {
      query: GetCustomerCorporateSearchPerPage,
      update: data => data.wms_customer_corporate,
      variables: {
        code: init,
        code1: init,
        code2: init,
        code3: init,
        limit: limit,
        offset: offset
      }
    }
  },
  mounted() {
    this.$q.loading.show()
    localStorage.removeItem('selectedData')
    localStorage.removeItem('pagination')
    localStorage.removeItem('pagination2')
    this.loadDataAll()
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    selected: {
      get: function() {
        return this.getSelected()
      },
      set: function() {
        return this.select
      }
    }
  },
  methods: {
    //= =======================================================================
    //= function action buttons
    //= =======================================================================
    onRefresh() {
      this.loadDataAll()
    },
    onAdd() {
      if (this.panel === 'individual') {
        this.onAddIndividual()
      } else {
        this.onAddCorporate()
      }
    },
    onView() {
      if (this.panel === 'individual') {
        this.onViewIndividual()
      } else {
        this.onViewCorporate()
      }
    },
    onUpdate() {
      if (this.panel === 'individual') {
        this.onUpdateindividual()
      } else {
        this.onUpdateCorporate()
      }
    },
    deleteDialog() {
      if (this.panel === 'individual') {
        this.deleteDialogIndividual()
      } else {
        this.deleteDialogCorporate()
      }
    },
    getSelected() {
      if (this.panel === 'individual') {
        return this.selectedIndividual
      } else {
        return this.selectedCorporate
      }
    },
    onRiskProfile() {
      if (this.panel === 'individual') {
        return this.onRiskProfileIndivual()
      } else {
        return this.onRiskProfileCorporate()
      }
    },
    //= =======================================================================
    //= run method request
    //= =======================================================================
    loadDataAll() {
      this.loading = true
      this.loadDataCustIndividual = []
      this.loadDataCustCorporate = []
      setTimeout(() => {
        if (this.panel === 'individual') {
          this.clearButtonCorporate()
          this.loadCustomerIndividualAll()
          this.loadCustomerIndividualPerPage()
          this.columnExport = this.columnsExpIndividual
          this.loading = false
          this.$q.loading.hide()
          this.tloading = true
        } else {
          this.clearButtonIndividual()
          this.loadCustomerCorporateAll()
          this.loadCustomerCorporatePerPage()
          this.columnExport = this.columnsExpCorporate
          this.loading = false
          this.$q.loading.hide()
          this.tloading = true
        }
      }, 1500)
    },
    //= =======================================================================
    //= load data individual
    //= =======================================================================
    loadCustomerIndividualAll() {
      this.$apollo.queries.loadDataCustIndiAll.refetch()
        .then(response => {
          let data = response.data.wms_customer_individual
          this.totalPageCount = data
          this.filter = `${this.cifIndividual}-${this.nameIndividual}-${this.branchIndividual}-${this.taxIdIndividual}`
          this.onRequest({
            pagination: this.pagination,
            filter: this.filter
          })
          return this.totalPageCount
        })
    },
    loadCustomerIndividualPerPage() {
      this.$apollo.queries.loadDataCustIndiPerPage
        .refetch({
          offset: this.offset,
          limit: this.limit
        })
        .then(response => {
          let data = response.data.wms_customer_individual
          this.data = data
          this.loadDataCustIndividual = this.data
          this.dataExport = this.loadDataCustIndividual
          this.sortData(this.data)
        })
    },
    getSearchIndividual() {
      if (this.filter !== '---' && this.statusSearch === true) {
        this.loading = true
        this.loadDataCustIndividual = []
        setTimeout(() => {
          this.loadSearchIndividual()
          this.loading = false
        }, 1500)
      } else {
        setTimeout(() => {
          this.statusSearch = true
          this.filter = `${this.cifIndividual}-${this.nameIndividual}-${this.branchIndividual}-${this.taxIdIndividual}`
          this.loading = false
        }, 1500)
      }
    },
    loadSearchIndividual() {
      if (
        this.cifIndividual.length === 1 ||
        this.nameIndividual.length === 1 ||
        this.taxIdIndividual.length === 1
      ) {
        this.$q.notify({
          color: 'negative',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: `Please Input Min 2 Character`
        })
      } else {
        this.loading = true
        if (this.limit === 1) {
          this.limit = 5
        } else {
          let pagination = JSON.parse(localStorage.pagination)
          if (this.sortStatus === true) {
            if (this.sort === 'yes') {
              this.offset = (this.pagination.page - 1) * pagination.row
            }
          } else {
            if (this.sort === 'no') {
              this.pagination.page = pagination.newPage
              this.offset = (pagination.newPage - 1) * pagination.row
            }
          }
        }
        let code = `%${this.cifIndividual}%`
        let code1 = `%${this.nameIndividual}%`
        let code2 = ''
        if (this.branchIndividual === '') {
          this.branchIndividual = ''
          code2 = `%${this.branchIndividual}%`
        } else {
          code2 = `%${this.branchIndividual.branch_name}%`
        }
        let code3 = `%${this.taxIdIndividual}%`

        this.$apollo.queries.loadDataCustIndi
          .refetch({
            code: code,
            code1: code1,
            code2: code2,
            code3: code3,
            offset: this.offset,
            limit: this.limit
          })
          .then(response => {
            let data = response.data.wms_customer_individual
            this.loadDataCustIndividual = data
            this.dataExport = this.loadDataCustIndividual
            this.sortData(this.loadDataCustIndividual)
            if (this.loadDataCustIndividual.length === 0) {
              this.loading = false
              this.$q.notify({
                color: 'negative',
                timeout: 300,
                textColor: 'white',
                icon: 'fas fa-exclamation-circle',
                message: `No Search Data`
              })
            } else {
              if (
                this.loadDataCustIndividual.length === 1 &&
                this.pagination.rowsNumber === 1
              ) {
                this.pagination.rowsPerPage = 1
              } else {
                this.pagination.rowsPerPage = 5
              }
              this.loading = false
              this.$q.notify({
                color: 'accent',
                timeout: 300,
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Search Data Successful'
              })
            }
          })
      }
    },
    //= =======================================================================
    //= request pagination and filter data table individual
    //= =======================================================================
    onRequest(props) {
      this.loading = true
      console.log('==================================================')
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      let filter = props.filter
      let currentRow = ''
      this.newPage = page

      if (localStorage.pagination !== undefined) {
        currentRow = JSON.parse(localStorage.pagination).row
      }

      if (
        (rowsPerPage === 1 || this.row === 1) &&
        this.statusSearch === false
      ) {
        rowsPerPage = 5
      } else {
        this.row = rowsPerPage
      }

      let pagination = {}
      pagination['newPage'] = this.newPage
      pagination['currentPage'] = this.currentPage
      pagination['row'] = this.row

      localStorage.setItem('pagination', JSON.stringify(pagination))
      if (this.row !== currentRow) {
        page = this.currentPage
      }

      if (descending === true) {
        if (this.sort === 'no') {
          let pagination = JSON.parse(localStorage.pagination)
          page = pagination.currentPage
          localStorage.setItem('pagination', JSON.stringify(pagination))
          this.sortStatus = descending
          this.sort = 'yes'
        }
      } else {
        if (this.sort === 'yes') {
          let pagination = JSON.parse(localStorage.pagination)
          page = pagination.currentPage
          pagination.newPage = page
          localStorage.setItem('pagination', JSON.stringify(pagination))
          this.sortStatus = descending
          this.sort = 'no'
        }
      }
      console.log(page, 'page')
      console.log(this.currentPage, 'current')
      console.log(rowsPerPage, 'row')
      console.log(this.sortStatus, 'status')
      setTimeout(() => {
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.offset = (page - 1) * rowsPerPage
        this.limit =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
        this.currentPage = page
        if (filter === '---' && this.statusSearch === false) {
          this.loadCustomerIndividualPerPage()
        } else {
          this.loadSearchIndividual()
        }
        this.loading = false
      }, 1000)
    },
    getRowsNumberCount(filter) {
      if (filter === '---') {
        return this.totalPageCount.length
      } else {
        filter = filter.split('-')
        let count = 0
        let gcif,
          name,
          branch,
          tax = ''
        let key = filter[0].toLowerCase()
        let key1 = filter[1].toLowerCase()
        let key2 = filter[2].toLowerCase()
        let key3 = filter[3].toLowerCase()
        this.totalPageCount.forEach(datas => {
          gcif = datas.gcif_number.toLowerCase()
          name = datas.fullname.toLowerCase()
          branch = datas.branch.branch_name.toLowerCase()
          tax = datas.tax_id.toLowerCase()
          if (key !== '' || key1 !== '' || key2 !== '' || key3 !== '') {
            if (
              gcif.includes(key) &&
              name.includes(key1) &&
              branch.includes(key2) &&
              tax.includes(key3)
            ) {
              ++count
            }
          }
        })
        return count
      }
    },
    //= =======================================================================
    //= load data corporate
    //= =======================================================================
    loadCustomerCorporateAll() {
      this.$apollo.queries.loadDataCustCorpoAll.refetch()
        .then(response => {
          let data = response.data.wms_customer_corporate
          this.totalPageCount2 = data
          this.filter2 = `${this.cifCorporate}-${this.nameCorporate}-${this.branchCorporate}-${this.taxIdCorporate}`
          this.onRequest2({
            pagination: this.pagination2,
            filter: this.filter2
          })
          return this.totalPageCount2
        })
    },
    loadCustomerCorporatePerPage() {
      this.$apollo.queries.loadDataCustCorpoPerPage
        .refetch({
          offset: this.offset2,
          limit: this.limit2
        })
        .then(response => {
          let data = response.data.wms_customer_corporate
          this.data = data
          this.loadDataCustCorporate = this.data
          this.dataExport = this.data
          this.sortData(this.data)
        })
    },
    getSearchCorporate() {
      if (this.filter2 !== '---' && this.statusSearch2 === true) {
        this.loading = true
        this.loadDataCustCorporate = []
        setTimeout(() => {
          this.loadSearchCorporate()
          this.loading = false
        }, 1500)
      } else {
        this.statusSearch2 = true
        setTimeout(() => {
          this.filter2 = `${this.cifCorporate}-${this.nameCorporate}-${this.branchCorporate}-${this.taxIdCorporate}`
          this.loading = false
        }, 1500)
      }
    },
    loadSearchCorporate() {
      if (
        this.cifCorporate.length === 1 ||
        this.nameCorporate.length === 1 ||
        this.taxIdCorporate.length === 1
      ) {
        this.$q.notify({
          color: 'negative',
          timeout: 300,
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: `Please Input Min 2 Character`
        })
      } else {
        this.loading = true
        if (this.limit2 === 1) {
          this.limit2 = 5
        } else {
          let pagination2 = JSON.parse(localStorage.pagination2)
          if (this.sortStatus2 === true) {
            if (this.sort2 === 'yes') {
              this.offset2 = (this.pagination2.page - 1) * pagination2.row
            }
          } else {
            if (this.sort2 === 'no') {
              this.pagination2.page = pagination2.newPage
              this.offset2 = (pagination2.newPage - 1) * pagination2.row
            }
          }
        }
        let code = `%${this.cifCorporate}%`
        let code1 = `%${this.nameCorporate}%`
        let code2 = ''
        if (this.branchCorporate === '') {
          this.branchCorporate = ''
          code2 = `%${this.branchCorporate}%`
        } else {
          code2 = `%${this.branchCorporate.branch_name}%`
        }
        let code3 = `%${this.taxIdCorporate}%`

        this.$apollo.queries.loadDataCustCorp
          .refetch({
            code: code,
            code1: code1,
            code2: code2,
            code3: code3,
            offset: this.offset2,
            limit: this.limit2
          })
          .then(response => {
            let data = response.data.wms_customer_corporate
            this.loadDataCustCorporate = data
            this.dataExport = this.loadDataCustCorporate
            this.sortData(this.loadDataCustCorporate)
            if (this.loadDataCustCorporate.length === 0) {
              this.loading = false
              this.$q.notify({
                color: 'negative',
                timeout: 300,
                textColor: 'white',
                icon: 'fas fa-exclamation-circle',
                message: `No Search Data`
              })
            } else {
              if (
                this.loadDataCustCorporate.length === 1 &&
                this.pagination2.rowsNumber === 1
              ) {
                this.pagination2.rowsPerPage = 1
              } else {
                this.pagination2.rowsPerPage = 5
              }
              this.loading = false
              this.$q.notify({
                color: 'accent',
                timeout: 300,
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Search Data Successful'
              })
            }
          })
      }
    },
    //= =======================================================================
    //= request pagination and filter data table corporate
    //= =======================================================================
    onRequest2(props) {
      this.loading = true
      console.log('==================================================2')
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      let filter = props.filter
      let currentRow = ''
      this.newPage2 = page

      if (localStorage.pagination2 !== undefined) {
        currentRow = JSON.parse(localStorage.pagination2).row
      }

      if (
        (rowsPerPage === 1 || this.row2 === 1) &&
        this.statusSearch2 === false
      ) {
        rowsPerPage = 5
      } else {
        this.row2 = rowsPerPage
      }

      let pagination = {}
      pagination['newPage'] = this.newPage2
      pagination['currentPage'] = this.currentPage2
      pagination['row'] = this.row2

      localStorage.setItem('pagination2', JSON.stringify(pagination))
      if (this.row2 !== currentRow) {
        page = this.currentPage2
      }

      if (descending === true) {
        if (this.sort2 === 'no') {
          let pagination = JSON.parse(localStorage.pagination2)
          page = pagination.currentPage
          localStorage.setItem('pagination2', JSON.stringify(pagination))
          this.sortStatus2 = descending
          this.sort2 = 'yes'
        }
      } else {
        if (this.sort2 === 'yes') {
          let pagination = JSON.parse(localStorage.pagination2)
          page = pagination.currentPage
          pagination.newPage = page
          localStorage.setItem('pagination2', JSON.stringify(pagination))
          this.sortStatus2 = descending
          this.sort2 = 'no'
        }
      }
      console.log(page, 'page2')
      console.log(this.currentPage2, 'current2')
      console.log(rowsPerPage, 'row2')
      console.log(this.sortStatus2, 'status2')
      setTimeout(() => {
        this.pagination2.rowsNumber = this.getRowsNumberCount2(filter)
        this.pagination2.page = page
        this.pagination2.rowsPerPage = rowsPerPage
        this.pagination2.sortBy = sortBy
        this.pagination2.descending = descending
        this.offset2 = (page - 1) * rowsPerPage
        this.limit2 =
          rowsPerPage === 0 ? this.pagination2.rowsNumber : rowsPerPage
        this.currentPage2 = page
        if (filter === '---' && this.statusSearch2 === false) {
          this.loadCustomerCorporatePerPage()
        } else {
          this.loadSearchCorporate()
        }
        this.loading = false
      }, 1000)
    },
    getRowsNumberCount2(filter) {
      if (filter === '---') {
        return this.totalPageCount2.length
      } else {
        filter = filter.split('-')
        let count = 0
        let gcif,
          name,
          branch,
          tax = ''
        let key = filter[0].toLowerCase()
        let key1 = filter[1].toLowerCase()
        let key2 = filter[2].toLowerCase()
        let key3 = filter[3].toLowerCase()
        this.totalPageCount2.forEach(datas => {
          gcif = datas.gcif_number.toLowerCase()
          name = datas.fullname.toLowerCase()
          branch = datas.branch.branch_name.toLowerCase()
          tax = datas.tax_id_number.toLowerCase()
          if (key !== '' || key1 !== '' || key2 !== '' || key3 !== '') {
            if (
              gcif.includes(key) &&
              name.includes(key1) &&
              branch.includes(key2) &&
              tax.includes(key3)
            ) {
              ++count
            }
          }
        })
        return count
      }
    },
    //= =======================================================================
    //= clear data
    //= =======================================================================
    clearButtonIndividual() {
      this.filter = '---'
      this.cifIndividual = ''
      this.nameIndividual = ''
      this.branchIndividual = ''
      this.taxIdIndividual = ''
      this.statusSearch = false
      this.sortStatus = false
      this.pagination.descending = false
      setTimeout(() => {
        this.filter = `${this.cifIndividual}-${this.nameIndividual}-${this.branchIndividual}-${this.taxIdIndividual}`
        if (this.loadDataCustIndividual.length !== 0) {
          this.pagination.rowsPerPage = 5
        }
        this.loadDataCustIndividual = []
        this.loading = false
      }, 1000)
      if (this.panel === 'individual') {
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
      }
    },
    clearButtonCorporate() {
      this.filter2 = '---'
      this.cifCorporate = ''
      this.nameCorporate = ''
      this.branchCorporate = ''
      this.taxIdCorporate = ''
      this.statusSearch2 = false
      this.sortStatus2 = false
      this.pagination2.descending = false
      setTimeout(() => {
        this.filter2 = `${this.cifCorporate}-${this.nameCorporate}-${this.branchCorporate}-${this.taxIdCorporate}`
        if (this.loadDataCustCorporate.length !== 0) {
          this.pagination2.rowsPerPage = 5
        }
        this.loadDataCustCorporate = []
        this.loading = false
      }, 1000)
      if (this.panel === 'corporate') {
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
      }
    },
    resetDataInput() {
      if (this.panel === 'individual') {
        if (
          this.cifIndividual === '' &&
          this.nameIndividual === '' &&
          this.branchIndividual === '' &&
          this.taxIdIndividual === ''
        ) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.loadDataCustIndividual = []
          }, 1500)
        }
      } else {
        if (
          this.cifCorporate === '' &&
          this.nameCorporate === '' &&
          this.branchCorporate === '' &&
          this.taxIdCorporate === ''
        ) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.loadDataCustCorporate = []
          }, 1500)
        }
      }
    },
    onRefreshIndividual() {
      setTimeout(() => {
        let code = `%${this.cifIndividual}%`
        let code1 = `%${this.nameIndividual}%`
        let code2 = `%${this.branchIndividual.branch_name}%`
        let code3 = `%${this.taxIdIndividual}%`

        this.$apollo.queries.loadDataCustIndi
          .refetch({
            code: code,
            code1: code1,
            code2: code2,
            code3: code3,
            offset: this.offset,
            limit: this.limit
          })
          .then(response => {
            this.loadDataCustIndividual = response.data.wms_customer_individual
            this.sortData(this.loadDataCustIndividual)
          })
        this.loading = false
      }, 1000)
    },
    onRefreshCorporate() {
      setTimeout(() => {
        let code = `%${this.cifCorporate}%`
        let code1 = `%${this.nameCorporate}%`
        let code2 = `%${this.branchCorporate.branch_name}%`
        let code3 = `%${this.taxIdCorporate}%`

        this.$apollo.queries.loadDataCustCorp
          .refetch({
            code: code,
            code1: code1,
            code2: code2,
            code3: code3,
            offset: this.offset2,
            limit: this.limit2
          })
          .then(response => {
            this.loadDataCustCorporate = response.data.wms_customer_corporate
            this.sortData(this.loadDataCustCorporate)
          })
        this.loading = false
      }, 1000)
    },
    //= =======================================================================
    //= sort data
    //= =======================================================================
    sortData(value) {
      let data = []
      if (this.sortStatus === true || this.sortStatus2 === true) {
        data = value.sort((a, b) => (b.gcif_number < a.gcif_number ? 1 : -1))
      } else {
        data = value.sort((a, b) => (b.gcif_number > a.gcif_number ? 1 : -1))
      }
      return data
    },
    //= =======================================================================
    //= load file csv
    //= =======================================================================
    loadCSV(file) {
      this.$log.info('info call at function loadCsv')
      // if (window.FileReader) {
      let reader = new FileReader()
      reader.readAsText(file.target.files[0])
      reader.onload = event => {
        let csv = event.target.result
        this.parseCsv = this.csvJSON(csv)
        if (this.parseCsv.length > 0) {
          this.dataImport = this.parseCsv
          this.actionSubmitFunction()
        }
      }
      reader.onerror = evt => {
        if (evt.target.error.name === 'NotReadableError') {
          alert("Canno't read file !")
        }
      }
    },
    loadCSVCorporate(file) {
      this.$log.info('info call at function loadCsv')
      // if (window.FileReader) {
      let reader = new FileReader()
      reader.readAsText(file.target.files[0])
      reader.onload = event => {
        let csv = event.target.result
        this.parseCsv = this.csvJSONCorp(csv)
        if (this.parseCsv.length > 0) {
          this.dataImportCorp = this.parseCsv
          this.actionSubmitFunctionCorp()
        }
      }
      reader.onerror = evt => {
        if (evt.target.error.name === 'NotReadableError') {
          alert("Canno't read file !")
        }
      }
    },
    //= =======================================================================
    //= convert csv
    //= =======================================================================
    csvJSON(csv) {
      let result = []
      let lines = csv.split('\n')
      let headers = lines[0].split(',')
      let keyLastIndex = headers[headers.length - 1]
      keyLastIndex = 'IssuanceCountry'
      headers.pop()
      headers.push(keyLastIndex)
      lines.map((line, indexLine) => {
        if (indexLine < 1) return

        let obj = {}
        let newlines = []
        let newlines1 = []
        let currentline = line.split(',')
        currentline.forEach(newline => {
          if (newline.match(/"=/g)) {
            newline = newline.replace(/["=]/g, '')
          }
          newlines.push(newline)
        })
        newlines.forEach(newlineValue => {
          if (newlineValue.match(/"/g)) {
            newlineValue = newlineValue.replace(/["]/g, '')
          }
          newlines1.push(newlineValue)
        })
        headers.forEach((header, indexHeader) => {
          obj[header] = newlines1[indexHeader]
        })
        result.push(obj)
      })
      result.pop()
      return result
    },
    csvJSONCorp(csv) {
      let result = []
      let lines = csv.split('\n')
      let headers = lines[0].split(',')
      let keyLastIndex = headers[headers.length - 1]
      keyLastIndex = 'SubsOwnerTIN'
      headers.pop()
      headers.push(keyLastIndex)
      lines.map((line, indexLine) => {
        if (indexLine < 1) return

        let obj = {}
        let newlines = []
        let newlines1 = []
        let currentline = line.split(',')
        currentline.forEach(newline => {
          if (newline.match(/"=/g)) {
            newline = newline.replace(/["=]/g, '')
          }
          newlines.push(newline)
        })
        newlines.forEach(newlineValue => {
          if (newlineValue.match(/"/g)) {
            newlineValue = newlineValue.replace(/["]/g, '')
          }
          newlines1.push(newlineValue)
        })
        headers.forEach((header, indexHeader) => {
          obj[header] = newlines1[indexHeader]
        })
        result.push(obj)
      })
      result.pop()
      return result
    },
    //= =======================================================================
    //= upload csv
    //= =======================================================================
    actionSubmitFunction() {
      for (let i = 0; i < this.dataImport.length; i++) {
        this.submitDataIndi(i)
        this.importIndividual = false
      }
    },
    actionSubmitFunctionCorp() {
      for (let i = 0; i < this.dataImportCorp.length; i++) {
        this.submitDataCorp(i)
        this.importCorporate = false
      }
    },
    submitDataCorp(i) {
      this.$log.info('info call at function submitDataIndi')
      this.submitting = true
      this.$q.loading.show()
      this.loading = true
      this.$apollo
        .mutate({
          mutation: InsCorporateCustomer,
          variables: {
            objects: {
              gcif_number: this.dataImportCorp[i].GlobalCifNumber,
              company_name: this.dataImportCorp[i].CompanyName,
              siup_exp_date: this.dataImportCorp[i].SIUPExpDate,
              siup_no: this.dataImportCorp[i].SIUPNo,
              skd_no: this.dataImportCorp[i].SKDNo,
              skd_exp_date: this.dataImportCorp[i].SKDExpDate,
              // id_status: this.dataImportCorp[i].Status,
              id_ownership: this.dataImportCorp[i].Ownership,
              date_establishment: this.dataImportCorp[i].DateOfEstablishment,
              place_establishment: this.dataImportCorp[i].PlaceOfEstablishment,
              country_establishment: this.dataImportCorp[i]
                .CountryOfEstablishment,
              articles_association_no: this.dataImportCorp[i]
                .ArticlesOfAssosiationNo,
              id_company_type: this.dataImportCorp[i].CompanyType,
              id_company_characteristic: this.dataImportCorp[i]
                .CompanyCharacteristic,
              id_income_level: this.dataImportCorp[i].IncomeLevel,
              id_investor_risk_profile: this.dataImportCorp[i]
                .InvestorRiskProfile,
              id_investment_objective: this.dataImportCorp[i]
                .InvestmentObjective,
              id_source_of_fund: this.dataImportCorp[i].SourceOfFund,
              asset_owner: this.dataImportCorp[i].AssetOwner,
              id_statement_type: this.dataImportCorp[i].StatementType,
              asset_info_last_year: this.dataImportCorp[i].AssetInfoLastYear,
              asset_info_two_year: this.dataImportCorp[i].AssetInfo2YearsAgo,
              asset_info_three_year: this.dataImportCorp[i].AssetInfo3YearsAgo,
              profit_info_last_year: this.dataImportCorp[i].ProfitInfoLastYear,
              profit_info_two_year: this.dataImportCorp[i].ProfitInfo2YearsAgo,
              profit_info_three_year: this.dataImportCorp[i]
                .ProfitInfo3YearsAgo,
              //
              corporate_address: this.dataImportCorp[i].Address,
              corporate_email: this.dataImportCorp[i].Email,
              corporate_phone1: this.dataImportCorp[i].Phone1,
              corporate_phone2: this.dataImportCorp[i].Phone2,
              corporate_fax1: this.dataImportCorp[i].Fax1,
              corporate_fax2: this.dataImportCorp[i].Fax2,
              id_postalcode: this.dataImportCorp[i].PostalCode,
              //
              id_branch: this.dataImportCorp[i].BranchName,
              id_sales: this.dataImportCorp[i].BranchSales,
              branch_waperd: this.dataImportCorp[i].BranchWaperd,
              waperd: this.dataImportCorp[i].Waperd,
              registration_date: this.dataImportCorp[i].RegistrationDate,
              date_last_update: this.dataImportCorp[i].DateLastUpdate,
              id_lob_code: this.dataImportCorp[i].LobCode,
              id_customer_group: this.dataImportCorp[i].CustomerGroup,
              tax_id_number: this.dataImportCorp[i].TaxIdNumber,
              tin_foreign_tin: this.dataImportCorp[i].TinForeignTin,
              id_country: this.dataImportCorp[i].IssuanceCountry,
              giin: this.dataImportCorp[i].GIIN,
              subs_us_owner_name: this.dataImportCorp[i].SubsOwnerName,
              domicile_address: this.dataImportCorp[i].SubsOwnerAddress,
              subs_us_owner_tin: this.dataImportCorp[i].SubsOwnerTIN,
              fullname: this.dataImportCorp[i].CompanyName,
              created_date: this.now,
              created_by: this.userdata.name
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.resultSubmit.push(response)
          if (i === 0 && this.resultSubmit.length !== 0) {
            setTimeout(() => {
              this.$q.notify({
                color: 'accent',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'The Data Has Been Uploaded'
              })
            }, 3000)
          }
          // this.auditTrailImport()
        })
        .catch(err => {
          if (i === 0 && this.resultSubmit.length === 0) {
            setTimeout(() => {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: `Submit Error: ${this.emessage}`
              })
            }, 3000)
          }
          this.submitting = false
          this.emessage = err
        })
      setTimeout(() => {
        this.submitting = false
        this.loading = false
        this.$q.loading.hide()
        this.tloading = true
        // this.onRefreshIndividual()
      }, 1000)
    },
    submitDataIndi(i) {
      this.$log.info('info call at function submitDataIndi')
      this.submitting = true
      this.$q.loading.show()
      this.loading = true
      this.$apollo
        .mutate({
          mutation: InsCustomerIndividual,
          variables: {
            objects: {
              gcif_number: this.dataImport[i].GlobalCifNumber,
              id_nationality: this.dataImport[i].Nationality,
              id_country: this.dataImport[i].CountryOfNationality,
              id_type: this.dataImport[i].IDType,
              id_number: this.dataImport[i].IDNumber,
              id_registration_date: this.dataImport[i].IDNumberRegistrationDate,
              id_expiration_date: this.dataImport[i].IDExpirationDate,
              id_salutation: this.dataImport[i].Salutation,
              first_name: this.dataImport[i].FirstName,
              middle_name: this.dataImport[i].MiddleName,
              last_name: this.dataImport[i].LastName,
              id_gender: this.dataImport[i].Gender,
              place_of_birth: this.dataImport[i].PlaceOfBirth,
              country_of_birth: this.dataImport[i].CountryOfBirth,
              id_religion: this.dataImport[i].Religion,
              date_of_birth: this.dataImport[i].DateOfBirth,
              id_marital: this.dataImport[i].MaritalStatus,
              mother_maiden_name: this.dataImport[i].MotherMaidenName,
              id_educational: this.dataImport[i].EducationalBackground,
              id_investment_object: this.dataImport[i].InvestmentObjective,
              id_occupation: this.dataImport[i].Occupation,
              id_residence_status: this.dataImport[i].ResidenceStatus,
              id_income_level: this.dataImport[i].IncomeLevel,
              next_risk_date: this.dataImport[i].NextRiskAssessmentDate,
              beneficiary_name: this.dataImport[i].BeneficiaryName,
              id_beneficiary: this.dataImport[i].BeneficiaryIDType,
              beneficiary_id_number: this.dataImport[i].BeneficiaryIDNumber,
              id_branch: this.dataImport[i].BranchName,
              id_sales: this.dataImport[i].BranchSales,
              branch_waperd: this.dataImport[i].BranchWaperd,
              waperd: this.dataImport[i].Waperd,
              registration_date: this.dataImport[i].RegistrationDate,
              data_last_update: this.dataImport[i].DateLastUpdate,
              id_lob: this.dataImport[i].LobCode,
              id_customer_group: this.dataImport[i].CustomerGroup,
              tax_id: this.dataImport[i].TaxIdNumber,
              tin_number: this.dataImport[i].TinForeignTin,
              id_issuance_country: this.dataImport[i].IssuanceCountry,
              // id_status: this.dataImport[i].Status,
              fullname:
                this.dataImport[i].FirstName +
                ' ' +
                this.dataImport[i].LastName,
              created_date: this.now,
              created_by: this.userdata.name
              // gcif_number: this.globalCifNumber
              // spouse_name: this.dataImport[i].SpouseName,
              // id_spouse: this.dataImport[i].SpouseID.id_dropdownlist_detail,
              // spouse_id_number: this.dataImport[i].SpouseIDNumber
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.resultSubmit.push(response)
          if (i === 0 && this.resultSubmit.length !== 0) {
            setTimeout(() => {
              this.$q.notify({
                color: 'accent',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'The Data Has Been Uploaded'
              })
            }, 3000)
          }
          // this.auditTrailImport()
        })
        .catch(err => {
          if (i === 0 && this.resultSubmit.length === 0) {
            setTimeout(() => {
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: `Submit Error: ${this.emessage}`
              })
            }, 3000)
          }
          this.submitting = false
          this.emessage = err
        })
      setTimeout(() => {
        this.submitting = false
        this.loading = false
        this.$q.loading.hide()
        this.tloading = true
        // this.onRefreshIndividual()
      }, 1000)
    },
    //= =======================================================================
    //= auditrail
    //= =======================================================================
    auditTrailExport() {
      let object = {}
      this.query = InsertAuditTrail
      if (this.panel === 'individual') {
        object = {
          action_button: 'Export',
          date_auditrail: this.now,
          menu: 'Customer Registration',
          fullname: this.userdata.name,
          username: this.userdata.preferred_username,
          submenu: 'Customer Individual',
          created_date: this.now,
          created_by: this.userdata.name
        }
      } else {
        object = {
          action_button: 'Export',
          date_auditrail: this.now,
          menu: 'Customer Registration',
          fullname: this.userdata.name,
          username: this.userdata.preferred_username,
          submenu: 'Customer Corporate',
          created_date: this.now,
          created_by: this.userdata.name
        }
      }
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: object
        }
      })
    },
    auditTrailIndi() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Delete',
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
    auditTrailCorp() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Delete',
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
    //= =======================================================================
    //= format and convert
    //= =======================================================================
    getTime(file) {
      return date.formatDate(file, 'YYYY-MM-DD HH:mm:ss')
    },
    //= =======================================================================
    //= method action button
    //= =======================================================================
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    onAddIndividual() {
      this.$log.info('info call at function onAddIndiVidual')
      this.$router.push({ path: '/customer/individualcustomer' })
    },
    onAddCorporate() {
      this.$log.info('info call at function onAddCorporate')
      this.$router.push({ path: '/customer/corporatecustomer' })
    },
    onDeleteIndividual() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DelCustomerIndividual,
          variables: {
            code: this.selectedIndividual[0].id_customer_individual
          }
        })
        this.$apollo.mutate({
          mutation: DelMainBankInfo,
          variables: {
            code: this.selectedIndividual[0].gcif_number
          }
        })
        this.$apollo.mutate({
          mutation: DelMainDocument,
          variables: {
            code: this.selectedIndividual[0].gcif_number
          }
        })
        this.$apollo.mutate({
          mutation: DelMainContactInfo,
          variables: {
            code: this.selectedIndividual[0].gcif_number
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onRefreshIndividual()
        this.auditTrailIndi()
        this.selectedIndividual = []
      })
    },
    onDeleteCorporate() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DelCustomerCorporate,
          variables: {
            code: this.selectedCorporate[0].id_customer_corporate
          }
        })
        this.$apollo.mutate({
          mutation: DelMainCorpoBankInfo,
          variables: {
            code: this.selectedCorporate[0].gcif_number
          }
        })
        this.$apollo.mutate({
          mutation: DelMainCorpoDocument,
          variables: {
            code: this.selectedCorporate[0].gcif_number
          }
        })
        this.$apollo.mutate({
          mutation: DelMainAuthorizedInfo,
          variables: {
            code: this.selectedCorporate[0].gcif_number
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onRefreshCorporate()
        this.auditTrailCorp()
        this.selectedCorporate = []
      })
    },
    onProsesGetDataContact() {
      for (let i = 0; i < this.loadDataCustIndividual.length; i++) {
        this.onLoadDataContact(i)
      }
    },
    onProsesGetDataBank() {
      for (let i = 0; i < this.loadDataCustIndividual.length; i++) {
        this.onLoadDataBank(i)
      }
    },
    onLoadDataContact(i) {
      let GCIF = this.loadDataCustIndividual[i].gcif_number
      this.$apollo
        .query({
          query: GetDataContact,
          update: data => data.wms_customer_individual_contact_person,
          variables: {
            code: GCIF
          }
        })
        .then(response => {
          this.dataContactIndi =
            response.data.wms_customer_individual_contact_person
          let AddressIndividual = ''
          let PostalCode = ''
          let Cityinfo = ''
          let Country = ''
          let Region = ''
          let Subdistrict = ''
          let District = ''
          let EmailAddress = ''
          let MobilePhone = ''
          let HomePhone = ''
          let FaxNumber = ''

          for (let i = 0; i < this.dataContactIndi.length; i++) {
            if (this.dataContactIndi[i].gcif_number === GCIF) {
              AddressIndividual = this.dataContactIndi[i].domicile_address
              PostalCode = this.dataContactIndi[i].postal_code.postal_code
              Cityinfo = this.dataContactIndi[i].postal_code.city.city_name
              Country = this.dataContactIndi[i].country.country_name
              Region = this.dataContactIndi[i].postal_code.city.region
                .region_name
              Subdistrict = this.dataContactIndi[i].postal_code.subdisct_name
              District = this.dataContactIndi[i].postal_code.village_name
              EmailAddress = this.dataContactIndi[i].email_address
              MobilePhone = this.dataContactIndi[i].mobile_phone
              HomePhone = this.dataContactIndi[i].home_phone
              FaxNumber = this.dataContactIndi[i].fax_number
            }
          }
          this.loadDataCustIndividual[i]['AddressContact'] = ''
          this.loadDataCustIndividual[i]['AddressContact'] = AddressIndividual
          this.loadDataCustIndividual[i]['PostalCodes'] = ''
          this.loadDataCustIndividual[i]['PostalCodes'] = PostalCode
          this.loadDataCustIndividual[i]['CityInfos'] = ''
          this.loadDataCustIndividual[i]['CityInfos'] = Cityinfo
          this.loadDataCustIndividual[i]['CountryContact'] = ''
          this.loadDataCustIndividual[i]['CountryContact'] = Country
          this.loadDataCustIndividual[i]['RegionContact'] = ''
          this.loadDataCustIndividual[i]['RegionContact'] = Region
          this.loadDataCustIndividual[i]['SubdistrictContact'] = ''
          this.loadDataCustIndividual[i]['SubdistrictContact'] = Subdistrict
          this.loadDataCustIndividual[i]['DistrictContact'] = ''
          this.loadDataCustIndividual[i]['DistrictContact'] = District
          this.loadDataCustIndividual[i]['EmailAddressContact'] = ''
          this.loadDataCustIndividual[i]['EmailAddressContact'] = EmailAddress
          this.loadDataCustIndividual[i]['MobilePhoneContact'] = ''
          this.loadDataCustIndividual[i]['MobilePhoneContact'] = MobilePhone
          this.loadDataCustIndividual[i]['HomePhoneContact'] = ''
          this.loadDataCustIndividual[i]['HomePhoneContact'] = HomePhone
          this.loadDataCustIndividual[i]['FaxNumberContact'] = ''
          this.loadDataCustIndividual[i]['FaxNumberContact'] = FaxNumber
        })
    },
    onLoadDataBank(i) {
      let GCIF = this.loadDataCustIndividual[i].gcif_number
      this.$apollo
        .query({
          query: GetBank,
          update: data => data.wms_customer_individual_bank_info,
          variables: {
            code: GCIF
          }
        })
        .then(response => {
          this.dataBankIndi = response.data.wms_customer_individual_bank_info
          let AcNO = ''
          let Bank = ''
          let AcType = ''
          let Currency = ''
          let Status = ''
          let Default = ''

          for (let i = 0; i < this.dataBankIndi.length; i++) {
            if (this.dataBankIndi[i].gcif_number === GCIF) {
              AcNO = this.dataBankIndi[i].account_number
              Bank = this.dataBankIndi[i].bank.dropdown_details_desc
              AcType = this.dataBankIndi[i].account_type.dropdown_details_desc
              Currency = this.dataBankIndi[i].currency.currencies_code
              Status = this.dataBankIndi[i].status.dropdown_details_desc
              Default = this.dataBankIndi[i].default
            }
          }
          this.loadDataCustIndividual[i]['AccountNoBank'] = ''
          this.loadDataCustIndividual[i]['AccountNoBank'] = AcNO
          this.loadDataCustIndividual[i]['Bank'] = ''
          this.loadDataCustIndividual[i]['Bank'] = Bank
          this.loadDataCustIndividual[i]['AcTypeBank'] = ''
          this.loadDataCustIndividual[i]['AcTypeBank'] = AcType
          this.loadDataCustIndividual[i]['CurrencyBank'] = ''
          this.loadDataCustIndividual[i]['CurrencyBank'] = Currency
          this.loadDataCustIndividual[i]['StatusBank'] = ''
          this.loadDataCustIndividual[i]['StatusBank'] = Status
          this.loadDataCustIndividual[i]['DefaultBank'] = ''
          this.loadDataCustIndividual[i]['DefaultBank'] = Default
        })
    },
    actionDetailImport() {
      this.$log.info('info call at function actionDetailImport')
      if (this.panel === 'individual') {
        this.importIndividual = true
      } else {
        this.importCorporate = true
      }
    },
    deleteDialogIndividual() {
      this.$log.info('info call at function deleteDialogIndividual')
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
          this.onDeleteIndividual()
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    deleteDialogCorporate() {
      this.$log.info('info call at function deleteDialogCorporate')
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
          this.onDeleteCorporate()
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    onRiskProfileIndivual() {
      this.$log.info('info call at function onRiskProfileIndivual')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedIndividual)
      )
      this.$router.push({
        path: '/customer/riskprofileindividual/add'
      })
    },
    onRiskProfileCorporate() {
      this.$log.info('info call at function onRiskProfileCorporate')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedCorporate)
      )
      this.$router.push({
        path: '/customer/riskprofilecorporate/add'
      })
    },
    onUpdateindividual() {
      this.$log.info('info call at function onUpdateindividual')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedIndividual)
      )
      this.$router.push({
        path: '/customer/editindividualcustomer'
      })
    },
    onUpdateCorporate() {
      this.$log.info('info call at function onUpdateindividual')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedCorporate)
      )
      this.$router.push({
        path: '/customer/editcorporatecustomer'
      })
    },
    onViewIndividual() {
      this.$log.info('info call at function onViewIndividual')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedIndividual[0])
      )
      this.$router.push({ path: '/customer/viewindividual' })
    },
    onViewCorporate() {
      this.$log.info('info call at function onViewCorporate')
      localStorage.setItem(
        'selectedData',
        JSON.stringify(this.selectedCorporate[0])
      )
      this.$router.push({ path: '/customer/ViewCorporate' })
    },
    onViewclickIndividual(dataclick) {
      this.$log.info(dataclick, 'info call at function onViewclickIndividual')
      localStorage.setItem('selectedData', JSON.stringify(dataclick))
      this.$router.push({ path: '/customer/viewindividual' })
    },
    onViewclickCorporate(dataclick) {
      this.$log.info(dataclick, 'info call at function onViewclickCorporate')
      localStorage.setItem('selectedData', JSON.stringify(dataclick))
      this.$router.push({ path: '/customer/viewcorporate' })
    }
    //= =======================================================================
    //= import file csv
    //= =======================================================================
    // onLoadCifIndividual() {
    //   this.submitting = true
    //   setTimeout(() => {
    //     this.$apollo.queries.loadGenerateCifIndividual
    //       .refetch()
    //       .then(response => {
    //         this.globalCifNumberMaster = response.data.wms_customer_individual
    //         console.log(this.globalCifNumberMaster, '=======>>>>GCIF')
    //         // this.generateCifNumber(i)
    //       })
    //   }, 2000)
    // },
    // generateCifNumber(i) {
    //   this.$log.info('info call at function generateCifNumber')
    //   this.globalCifNumberMaster.forEach(dataCIF => {
    //     this.globalCifNumberNext.push(dataCIF.gcif_number)
    //   })
    //   if (this.globalCifNumberNext[0] !== undefined) {
    //     this.globalCifNumberNext[0] = this.globalCifNumberNext[0].split('-')
    //     console.log(this.globalCifNumberNext[0], '>>>>>>>numb')
    //     let x = +this.globalCifNumberNext[0][1] + 1
    //     let y =
    //       x > 9
    //         ? x > 99
    //           ? x > 999
    //             ? x > 9999
    //               ? x > 99999
    //                 ? x > 999999
    //                   ? x
    //                   : '0' + x
    //                 : '00' + x
    //               : '000' + x
    //             : '0000' + x
    //           : '00000' + x
    //         : '000000' + x
    //     this.globalCifNumber = 'INDI-' + y
    //     console.log(this.globalCifNumber, '=======>>> apakah ini adaaaa')
    //     this.submitDataIndi(i)
    //     return this.globalCifNumber
    //   } else {
    //     this.globalCifNumber = 'INDI-' + '0000001'
    //     console.log(this.globalCifNumber, '=======>>> apakah ini adaaaa')
    //     this.submitDataIndi(i)
    //     return this.globalCifNumber
    //   }
    // }
    //= ====================
    // onRefreshCorporate() {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.$apollo.queries.loadDataCustCorporate.refetch().then(response => {
    //       this.loadDataCustCorporate = []
    //       // this.loadDataCustCorporate = response.data.wms_customer_corporate
    //       console.log(this.loadDataCustCorporate, '=======>>> Data Corporate')
    //       this.$q.loading.hide()
    //       this.tloading = true
    //     })
    //     this.loading = false
    //   }, 1000)
    // },
    // onRefreshindividual() {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.$apollo.queries.loadDataCustIndividual.refetch().then(response => {
    //       this.loadDataCustIndividual = []
    //       // this.loadDataCustIndividual = response.data.wms_customer_corporate
    //       console.log(this.loadDataCustIndividual, '=======>>> Data Corporate')
    //       this.$q.loading.hide()
    //       this.tloading = true
    //     })
    //     this.loading = false
    //   }, 1000)
    // },
    // ImportData() {
    //   for (let i in this.dataImport) {
    //     this.submitDataIndi(i)
    //     this.importIndividual = false
    //     console.log(this.dataImport, 'isidatanya')
    //     if (this.dataImport.length - 1 === +i) {
    //       setTimeout(() => {
    //         this.$q.notify({
    //           color: 'accent',
    //           textColor: 'white',
    //           icon: 'fas fa-check-circle',
    //           message: 'Submit Successful'
    //         })
    //       }, 3000)
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

<style lang="stylus">
.table-label-color {
  thead tr:first-child th {
    position: sticky;
    opacity: 1;
  }
}
</style>
