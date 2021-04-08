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
                  label="Subscriptions"
                  icon="fas fa-hand-holding-usd"
                  to="/subscription"
                />
                <q-breadcrumbs-el label="View Subscriptions" icon="far fa-eye" />
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
                  title="Subscription List"
                  :grid="$q.screen.xs"
                  :data="dataSubscription"
                  :columns="columns"
                  row-key="id_subscription"
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
                        key="subscription_no"
                        :props="props"
                        class="cursor-pointer"
                        @click.native="onViewclick(props.row)"
                      >{{ props.row.subscription_no }}</q-td>
                      <q-td key="product.prod_desc" :props="props">
                          {{
                        props.row.product.prod_desc
                        }}
                        </q-td>
                      <q-td key="total_subscription_amount" :props="props">
                        {{
                        formatCurrency2(props.row.total_subscription_amount)
                        }}
                      </q-td>
                      <q-td key="total_payment_amount" :props="props">
                        {{
                        formatCurrency2(props.row.total_payment_amount)
                        }}
                      </q-td>
                      <q-td key="balance_amount" :props="props">
                        {{
                        formatCurrency2(props.row.balance_amount)
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
getDataSubcription
} from 'src/graphql/Subscription'
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
      dataSubscription: [],
      // selected: JSON.parse(localStorage.selectedView),
      
      selected: JSON.parse(localStorage.selectedData),
      selectedview: [],
      Gcif: null,
      FullName: null,
      columns: [

        {
          name: 'subscription_no',
          label: 'Subscription No',
          field: 'subscription_no',
          align: 'Left',
          sortable: true
        },
        {
          name: 'product.prod_desc',
          label: 'Product',
          field: 'product.prod_desc',
          align: 'Left',
          sortable: true
        },
        {
          name: 'total_subscription_amount',
          label: 'Subscription Amount',
          field: 'total_subscription_amount',
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
          name: 'balance_amount',
          label: 'Balance Amount',
          field: 'balance_amount',
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
    loaddatasubscription: {
      query: getDataSubcription,
      update: data => data.wms_subscription,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    localStorage.removeItem('selectedDataSubs')
    this.$q.loading.show()
    this.Gcif = this.selected.gcif_number
    this.FullName = this.selected.fullname
    this.onLoadDataSubs()
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
    onLoadDataSubs() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddatasubscription
          .refetch({
            code: this.Gcif
          })
          .then(response => {
            this.dataSubscription = response.data.wms_subscription
            console.log(this.dataSubscription, '=======>>> Data Subs')
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
      this.$router.push({ path: '/subscription/view' })
    },
    onViewclick(dataclick) {
      localStorage.setItem('selectedDataSubs', JSON.stringify(dataclick))
      this.$router.push({ path: '/subscription/view' })
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
