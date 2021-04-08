<template>
  <div>
    <div>
      <q-page padding>
        <div v-show="Tloading">
          <q-card bordered>
            <q-card-section>
              <q-breadcrumbs>
                <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
                <q-breadcrumbs-el
                  label="Redemption"
                  icon="fas fa-hand-holding-usd"
                  to="/redemption"
                />
                <q-breadcrumbs-el label="View Redemptions" icon="far fa-eye" />
              </q-breadcrumbs>
            </q-card-section>

            <q-separator inset />
            <q-card-section>
              <div class="q-mt-sm q-mb-sm q-ml-md">
                <q-btn @click="onBack" label="Back" color="negative" style="width: 80px"></q-btn>
              </div>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-field outlined label="GCIF" stack-label>
                      <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ Gcif }}</div>
                      </template>
                    </q-field>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-field outlined label="Full Name" stack-label>
                      <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ FullName }}</div>
                      </template>
                    </q-field>
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <q-table
                  class="table-label-color"
                  title="Redemption List"
                  :grid="$q.screen.xs"
                  :data="dataRedemption"
                  :columns="columns"
                  row-key="id_redemption"
                  selection="single"
                  :selected.sync="selectedview"
                  separator="cell"
                  :loading="loading"
                  :filter="filter"
                  color="primary"
                  wrap-cells
                >
                  <template v-slot:top-right>
                    <div class="col-xs-12 col-sm-3 col-md-4">
                      <q-btn-group class="q-ma-sm">
                        <q-btn
                          style="width: 80px"
                          @click="onView"
                          color="cyan-7"
                          :disable="selectedview.length === 0"
                          icon="far fa-eye"
                          v-ripple
                        >
                          <q-tooltip>View</q-tooltip>
                        </q-btn>
                      </q-btn-group>
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-checkbox dense v-model="props.selected"></q-checkbox>
                      </q-td>
                      <q-td
                        key="transaction_no"
                        :props="props"
                        class="cursor-pointer"
                        @click.native="onViewclick(props.row)"
                      >{{ props.row.transaction_no }}</q-td>
                      <q-td key="product" :props="props">
                          {{
                        props.row.product
                        }}
                        </q-td>
                      <q-td key="redemption_unit" :props="props">
                        {{
                        props.row.redemption_unit
                        }}
                      </q-td>
                      <q-td key="total_payment_amount" :props="props">
                        {{
                        formatCurrency2(props.row.total_payment_amount)
                        }}
                      </q-td>
                      <q-td key="WMS_Info" style="width: 1px">
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
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </div>
  </div>
</template>

<script>
let init = ''
import {
getDataRedemption
} from 'src/graphql/Redemption'
import { date } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'ViewListSubscription',
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      filter: null,
      loading: false,
      dataRedemption: [],
      
      selected: JSON.parse(localStorage.selectedData),
      selectedview: [],
      Gcif: null,
      FullName: null,
      columns: [

        {
          name: 'transaction_no',
          label: 'Transacton No',
          field: 'transaction_no',
          align: 'Left',
          sortable: true
        },
        {
          name: 'product',
          label: 'Product',
          field: 'product',
          align: 'Left',
          sortable: true
        },
        {
          name: 'redemption_unit',
          label: 'Redemption Unit',
          field: 'redemption_unit',
          align: 'center',
          sortable: true
        },
        {
          name: 'total_payment_amount',
          label: 'Total Payment Amount',
          field: 'total_payment_amount',
          align: 'center',
          sortable: true
        },
        {
          name: 'WMS_Info',
          field: 'WMS_Info',
          align: 'Left'
        }
      ],
      pagination: {
        rowsPerPage: 5
      },
      Tloading: false
    }
  },
  apollo: {
    loadDataRedemption: {
      query: getDataRedemption,
      update: data => data.wms_redemption,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    this.$q.loading.show()
    this.Gcif = this.selected.gcif_number
    this.FullName = this.selected.fullname
    localStorage.removeItem('selectedDataSubs')
    this.onLoadDataRedemption()
  },
  watch: {
    selected(newselected) {
      localStorage.selectedView = newselected
    }
  },
  methods: {
    getTime(file) {
      if (file !== undefined && file !== null) {
        let date = file.split('T')
        date = date.join(' ')
        return date
      }
    },
    onLoadDataRedemption() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loadDataRedemption
          .refetch({
            code: this.Gcif
          })
          .then(response => {
            this.dataRedemption = response.data.wms_redemption
            console.log(this.dataRedemption, '=======>>> Data Redem')
            this.$q.loading.hide()
            this.Tloading = true
          })
        this.loading = false
      }, 1500)
    },
    formatCurrency2(num) {
      if (num !== null) {
        num = +num
        return num.toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
      }
    },
    onView() {
      localStorage.setItem('selectedDataSubs', JSON.stringify(this.selectedview[0]))
      this.$router.push({ path: '/redemption/view' })
    },
    onViewclick(dataclick) {
      localStorage.setItem('selectedDataSubs', JSON.stringify(dataclick))
      this.$router.push({ path: '/redemption/view' })
    },
    onBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
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
