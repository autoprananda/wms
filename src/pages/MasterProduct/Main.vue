<template>
  <div>
    <div v-if="$q.platform.is.desktop">
      <q-page padding>
        <div v-show="Tloading">
          <q-card bordered>
            <q-card-section>
              <q-breadcrumbs>
                <q-breadcrumbs-el data-vv-name="Home" label="Home" icon="home" to="/dashboard" />
                <q-breadcrumbs-el label="Products" icon="settings" />
              </q-breadcrumbs>
            </q-card-section>

            <q-separator inset />

            <div v-if="loaddata.length">
              <batm-action-button
              :selectDatas="selected"
              :statusRights="actionRights"
              :standard="statusButton"
              :callMethodRefresh="onRefresh"
              :callMethodAdd="onAdd"
              :callMethodView="onView"
              :callMethodUpdate="onUpdate"
              :callMethodDelete="deleteDialog">
              </batm-action-button>

              <q-card-section>
                <q-table
                  class="q-ml-sm q-mr-sm table-label-color"
                  title="Products List"
                  :grid="$q.screen.xs"
                  :data="loaddata"
                  :columns="columns"
                  row-key="id_product"
                  selection="single"
                  :selected.sync="selected"
                  separator="cell"
                  :loading="loading"
                  :filter="filter"
                  :pagination.sync="pagination"
                  color="primary"
                  wrap-cells
                >
                  <template v-slot:top-right>
                    <q-input
                      square
                      filled
                      dense
                      debounce="300"
                      v-model="filter"
                      data-vv-name="Search"
                      placeholder="Search"
                      :disable="loading"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-checkbox data-vv-name="Selected" dense v-model="props.selected"></q-checkbox>
                      </q-td>
                      <q-td
                        key="product_code"
                        :props="props"
                        class="cursor-pointer"
                        @click.native="onViewclick(props.row)"
                        >{{ props.row.product_code }}</q-td
                      >
                      <q-td key="prod_desc" :props="props">
                        {{ props.row.prod_desc }}
                      </q-td>

                      <q-td
                        key="product_type.dropdown_details_desc"
                        :props="props"
                        >{{
                          props.row.product_type.dropdown_details_desc
                        }}</q-td
                      >
                      <q-td
                        key="classification.profile_name_desc"
                        :props="props"
                      >
                        {{ props.row.classification.profile_name_desc }}
                      </q-td>
                      <q-td
                        key="reference_cust_bank.reference_custodian_bank_name"
                        :props="props"
                      >
                        {{
                          props.row.reference_cust_bank
                            .reference_custodian_bank_name
                        }}
                      </q-td>
                      <q-td
                        key="auto_subscription"
                        :props="props"
                      >
                      <div class="center">
                        <q-icon
                          v-if="props.row.auto_subscription === true"
                          color="accent"
                          name="fas fa-check"
                          size="25px"
                        >
                        </q-icon>
                        <q-icon
                         v-else
                          color="negative"
                          name="fas fa-times"
                          size="25px"
                        ></q-icon>
                      </div>
                      </q-td>
                      <q-td key="WMS_Info" style="width: 1px">
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
              <div class="row">
                <div
                  class="q-ml-md q-mt-md q-mb-sm q-mr-md q-gutter-sm invisible"
                >
                  <q-btn
                    style="width: 80px"
                    @click="onRefresh"
                    color="grey-9"
                    icon="ion-refresh"
                    v-ripple
                  >
                    <q-tooltip>Refresh</q-tooltip>
                  </q-btn>
                </div>
              </div>

              <q-page-scroller
                position="bottom-right"
                :scroll-offset="150"
                :offset="[30, 25]"
              >
                <q-btn push fab icon="keyboard_arrow_up" color="negative" />
              </q-page-scroller>
            </div>
            <div v-else class="column items-center">
              <q-card-section>
               <Batm-NothingData></Batm-NothingData>
                <div class="col-xs-12 col-sm-6 col-md-6 flex flex-center">
                  <transition appear enter-active-class="animated pulse">
                    <q-btn
                      icon="add"
                      type="submit"
                      label="Add New Data"
                      class="q-mt-md"
                      data-vv-name="Add New Data"
                      color="accent"
                      @click="onAdd"
                    />
                  </transition>
                </div>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </q-page>
    </div>
    <div v-if="$q.platform.is.mobile">
      <q-page>
        <div v-show="Tloading">
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Products" icon="settings" />
            </q-breadcrumbs>
          </q-card-section>

          <q-separator inset />

          <div v-if="loaddata.length">
            <q-card-section>
              <q-table
                class="q-ml-sm q-mr-sm table-label-color"
                title="Products List"
                :grid="$q.screen.xs"
                :data="loaddata"
                :columns="columns"
                row-key="id_product"
                selection="single"
                :selected.sync="selected"
                separator="cell"
                :loading="loading"
                :filter="filter"
                :pagination.sync="pagination"
                color="primary"
                wrap-cells
              >
                <template v-slot:top-right>
                  <q-input
                    square
                    filled
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                    :disable="loading"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-checkbox dense v-model="props.selected"></q-checkbox>
                    </q-td>
                    <q-td
                      key="product_code"
                      :props="props"
                      class="cursor-pointer"
                      @click.native="onViewclick(props.row)"
                      >{{ props.row.product_code }}</q-td
                    >
                    <q-td key="prod_desc" :props="props">
                      {{ props.row.prod_desc }}
                    </q-td>

                    <q-td
                      key="product_type.dropdown_details_desc"
                      :props="props"
                      >{{ props.row.product_type.dropdown_details_desc }}</q-td
                    >
                    <q-td key="classification.profile_name_desc" :props="props">
                      {{ props.row.classification.profile_name_desc }}
                    </q-td>
                    <q-td
                      key="reference_cust_bank.reference_custodian_bank_name"
                      :props="props"
                    >
                      {{
                        props.row.reference_cust_bank
                          .reference_custodian_bank_name
                      }}
                    </q-td>
                     <q-td
                        key="auto_subscription"
                      >
                      <div class="center">
                        <q-icon
                          color="grey"
                          name="fas fa-info-circle"
                          size="25px"
                        >
                        </q-icon>
                      </div>
                      </q-td>
                    <q-td key="WMS_Info" style="width: 1px">
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
                                  <td class="text-weight-bolder text-subtitle1">
                                    Created Date
                                  </td>
                                  <td>:</td>
                                  <td>{{ getTime(props.row.created_date) }}</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="text-weight-bolder text-subtitle1">
                                    Created By
                                  </td>
                                  <td>:</td>
                                  <td>{{ props.row.created_by }}</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="text-weight-bolder text-subtitle1">
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
                                  <td class="text-weight-bolder text-subtitle1">
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
            <div class="row">
              <div
                class="q-ml-md q-mt-md q-mb-sm q-mr-md q-gutter-sm invisible"
              >
                <q-btn
                  style="width: 80px"
                  @click="onRefresh"
                  color="grey-9"
                  icon="ion-refresh"
                  v-ripple
                >
                  <q-tooltip>Refresh</q-tooltip>
                </q-btn>
              </div>
            </div>

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
                @click="onRefresh"
                color="grey-9"
                icon="refresh"
                label="Refresh"
                push
                label-position="left"
                external-label
                :disable="draggingFab"
              />
              <q-fab-action
                 @click="onAdd"
                color="primary"
                icon="add"
                push
                :disable="actionRights.add === false || draggingFab"
                label="Add"
                label-position="left"
                external-label
              />
              <q-fab-action
                @click="onView"
                color="cyan-7"
                :disable="selected.length === 0 || actionRights.view === false || draggingFab"
                icon="details"
                push
                label="View"
                label-position="left"
                external-label
              />
              <q-fab-action
                @click="onUpdate"
                color="accent"
                :disable="selected.length === 0 || actionRights.edit === false || draggingFab"
                icon="edit"
                push
                label="Edit"
                label-position="left"
                external-label
              />
              <q-fab-action
                @click="deleteDialog"
                :disable="selected.length === 0 || actionRights.delete === false || draggingFab"
                color="negative"
                icon="delete"
                push
                label="Delete"
                label-position="left"
                external-label
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
                @click="onRefresh"
                color="grey-9"
                icon="refresh"
                push
                label="Refresh"
                square
                label-position="bottom"
                padding="4px"
                :disable="draggingFab"
              />
              <q-fab-action
                 @click="onAdd"
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
                @click="onView"
                color="cyan-7"
                :disable="selected.length === 0 || actionRights.view === false || draggingFab"
                icon="details"
                push
                label="View"
                square
                label-position="bottom"
                padding="4px"
              />
              <q-fab-action
                @click="onUpdate"
                color="accent"
                :disable="selected.length === 0 || actionRights.edit === false || draggingFab"
                icon="edit"
                push
                label="Edit"
                square
                label-position="bottom"
                padding="4px"
              />
              <q-fab-action
                @click="deleteDialog"
                :disable="selected.length === 0 || actionRights.delete === false || draggingFab"
                color="negative"
                icon="delete"
                push
                label="Delete"
                square
                label-position="bottom"
                padding="4px"
              />
            </q-fab>
          </q-page-sticky>
        </div>
          </div>
          <div v-else class="column items-center">
            <q-card-section>
              <Batm-NothingData></Batm-NothingData>
              <div class="col-xs-12 col-sm-6 col-md-6 flex flex-center">
                <transition appear enter-active-class="animated pulse">
                  <q-btn
                    icon="add"
                    type="submit"
                    label="Add New Data"
                    class="q-mt-md"
                    color="accent"
                    @click="onAdd"
                  />
                </transition>
              </div>
            </q-card-section>
          </div>
        </div>
      </q-page>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
import nothingData from 'components/nothingData.vue'
import { InsertAuditTrail } from 'src/graphql/AuditTrail'
import {
  GetAllMasterProdCode,
  DelMasterProdCode
} from 'src/graphql/MasterProductCode'
import actionButtons from 'components/ActionButtons/ActionButtons.vue'
export default {
  name: 'MainProductCodeMaintenance',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      WKF_Name: 'Products',
      userdata: this.Muser,
      ActionButton: [],
      loading: false,
      statusButton: true,
      filter: null,
      //
      LoadAdd: null,
      loaddata: [],
      slide: 1,
      data: [],
      selected: [],
      actionRights: JSON.parse(localStorage.actionRights),
      tester: null,
      pagination: {
        rowsPerPage: 5
      },
      columns: [
        {
          name: 'product_code',
          label: 'Poduct Code',
          field: row => row.product_code,
          format: val => `${val}`,
          align: 'Left',
          sortable: true
        },
        {
          name: 'prod_desc',
          label: 'Description',
          field: 'prod_desc',
          align: 'Left',
          sortable: true
        },
        {
          name: 'product_type.dropdown_details_desc',
          label: 'Product Type',
          field: 'product_type.dropdown_details_desc',
          align: 'Left',
          sortable: true
        },
        {
          name: 'classification.profile_name_desc',
          label: 'Classification',
          field: 'classification.profile_name_desc',
          align: 'Left',
          sortable: true
        },
        {
          name: 'reference_cust_bank.reference_custodian_bank_name',
          label: 'Bank Custodian',
          field: 'reference_cust_bank.reference_custodian_bank_name',
          align: 'Left',
          sortable: true
        },
        {
          name: 'auto_subscription',
          label: 'Auto Subscription',
          field: 'auto_subscription',
          align: 'Left',
          sortable: true
        },
        {
          name: 'WMS_Info',
          field: 'WMS_Info',
          align: 'Left'
        }
      ],
      Tloading: false
    }
  },
  components: {
    BatmNothingData: nothingData,
    BatmActionButton: actionButtons
  },
  apollo: {
    loaddata: {
      query: GetAllMasterProdCode,
      update: data => data.wms_products
    }
  },
  mounted() {
    this.$q.loading.show()
    this.onRefresh()
    localStorage.removeItem('selectedData')
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  },
  watch: {
    actionRights(newactionRights) {
      localStorage.actionRights = newactionRights
    }
  },
  methods: {
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y]
    },
    getTime(file) {
      return date.formatDate(file, 'YYYY-MM-DD HH:mm:ss')
    },
    AuditTrail() {
      this.$apollo.mutate({
        mutation: InsertAuditTrail,
        variables: {
          objects: {
            action_button: 'Delete',
            date_auditrail: this.now,
            menu: 'Product Management Setting',
            fullname: this.userdata.name,
            username: this.userdata.preferred_username,
            submenu: 'Products',
            created_date: this.now,
            created_by: this.userdata.name
          }
        }
      })
    },
    //= =======================================================================
    //= function action buttons
    //= =======================================================================
    onAdd() {
      this.$log.info('info call at function onAdd')
      this.$router.push({ path: '/masterproduct/add' })
    },
    onRefresh() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddata.refetch().then(response => {
          this.loaddata = response.data.wms_products
          console.log(this.loaddata, '-====>')
          this.$q.loading.hide()
          this.Tloading = true
          this.loading = false
        })
      }, 2000)
    },
    onUpdate() {
      this.$log.info('info call at function onUpdate')
      localStorage.setItem('selectedData', JSON.stringify(this.selected))
      this.$router.push({ path: '/masterproduct/edit' })
    },
    onView() {
      this.$log.info('info call at function onView')
      localStorage.setItem('selectedData', JSON.stringify(this.selected[0]))
      this.$router.push({ path: '/masterproduct/view' })
    },
    onViewclick(dataclick) {
      this.$log.info(dataclick, 'info call at function onView')
      localStorage.setItem('selectedData', JSON.stringify(dataclick))
      this.$router.push({ path: '/masterproduct/view' })
    },
    onDelete() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DelMasterProdCode,
          variables: {
            code: this.selected[0].id_product
          }
        })
        this.submitting = false
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
        this.onRefresh()
        this.AuditTrail()
      })
    },
    deleteDialog() {
      this.$log.info('info call at function deleteDialog')
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
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>

<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
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
