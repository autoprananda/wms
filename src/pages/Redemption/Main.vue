<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Redemption" icon="fas fa-hand-holding-usd" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />

        <transition appear enter-active-class="animated zoomIn">
          <q-card-section>
            <form>
              <q-card-section>
                <div class="q-gutter-md">
                  <q-btn color="primary" label="Redemption" @click="onRedemption"
                    :disable="selected.length === 0" />
                  <q-btn color="accent" label="View Redemption" @click="onView"
                    :disable="selected.length === 0" />
                </div>
              </q-card-section>
              <q-card-section>
                <q-table
                  class="q-ml-sm q-mr-sm table-label-color"
                  title="Customer List"
                  :grid="$q.screen.xs"
                  :data="dataCustomer"
                  :columns="columns"
                  row-key="gcif_number"
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
                        key="gcif_number"
                        :props="props"
                        class="cursor-pointer"
                        @click.native="onViewclick(props.row)"
                      >{{ props.row.gcif_number }}</q-td>
                      <q-td key="fullname" :props="props">{{ props.row.fullname }}</q-td>
                       <q-td key="sales_name" :props="props">{{ props.row.sales_name }}</q-td>
                        <q-td key="branch.branch_name" :props="props">{{ props.row.branch.branch_name }}</q-td>
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
            </form>
          </q-card-section>
        </transition>
      </q-card>
    </q-page>
  </div>
</template>

<script>
let init = ''
import { ValidationRedemption } from 'src/graphql/Redemption'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MainCustomer',
  data() {
    return {
      loaddata: [],
      dataSubscripiton: [],
      selected: [],
      loading: false,
      filter: null,
      pagination: {
        rowsPerPage: 5
      },
      columns: [
        {
          name: 'gcif_number',
          label: 'GCIF Number',
          field: row => row.gcif_number,
          format: val => `${val}`,
          align: 'Left',
          sortable: true
        },
        {
          name: 'fullname',
          label: 'Full Name',
          align: 'Left',
          field: row => row.fullname
        },
        {
          name: 'sales_name',
          label: 'Sales Name',
          align: 'Left',
          field: row => row.sales_name
        },
        {
          name: 'branch.branch_name',
          label: 'Branch Name',
          align: 'Left',
          field: row => row.branch.branch_name
        },
        {
          name: 'WMS_Info',
          field: 'WMS_Info',
          align: 'Left'
        }
      ],
    }
  },
  apollo: {
    dataSubscripiton: {
      query: ValidationRedemption,
      update: data => data.wms_subscription,
      variables: {
        code: init
      }
    }
  },
    computed: {
    ...mapState('showcase', ['dataCustomer']),
  },
  mounted() {
    localStorage.removeItem('selectedData')
    this.fetchDataCustomer()
    this.loadingShow()
  },

  methods: {
    getTime(file) {
      if (file !== undefined && file !== null) {
        let date = file.split('T')
        date = date.join(' ')
        return date
      }
    },
    ...mapActions('showcase', ['fetchDataCustomer']),
    loadingShow() {
        if (this.dataCustomer.length === 0) {
          this.$q.loading.show()
          this.loading = true
          setTimeout(() => {
            if (this.dataCustomer.length !== 0) {
              this.$q.loading.hide()
              this.loading = false
            } else {
              this.$q.loading.hide()
              this.loading = false
              this.$q.notify({
                timeout: 300,
                color: 'negative',
                textColor: 'white',
                icon: 'fas fa-exclamation-circle',
                message: 'The Data Empty'
              })
            }
          }, 2000)
        }
    },
    onRefresh() {
      this.loading = true
      setTimeout(() => {
        this.fetchDataCustomer()
        this.loadingShow()
        this.loading = false
      }, 1000)
    },
    onRedemption() {
      this.$apollo.queries.dataSubscripiton.refetch({
        code: this.selected[0].gcif_number
      })
        .then(response => {
          this.dataSubscripiton = response.data.wms_subscription
          if (this.dataSubscripiton.length === 0) {
            this.$q.dialog({
              title: "Can't Redemption",
              message: 'Must be Subscription First',
              color: 'red',
              ok: true
            })
          } else {
            localStorage.setItem('selectedData', JSON.stringify(this.selected))
            this.$router.push({ path: '/redemption/add' })
          }
        })
    },
    onUpdate() {
      localStorage.setItem('selectedData', JSON.stringify(this.selected))
      this.$router.push({ path: '/redemption/edit' })
    },
    onView() {
      localStorage.setItem('selectedData', JSON.stringify(this.selected[0]))
      this.$router.push({ path: '/redemption/viewlist' })
    },
    onViewclick(dataclick) {
      localStorage.setItem('selectedData', JSON.stringify(dataclick))
      this.$router.push({ path: '/redemption/viewlist' })
    },
    deleteDialog() {
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
