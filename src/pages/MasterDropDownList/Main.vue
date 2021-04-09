<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Dropdown" icon="settings" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />

        <transition appear enter-active-class="animated zoomIn">
          <q-card-section>
            <form>
              <div class="row">
                <div class="q-ml-md q-mb-sm q-mr-md q-gutter-sm">
                  <q-btn
                    style="width: 80px"
                    @click="onRefresh"
                    color="grey-9"
                    icon="ion-refresh"
                    v-ripple
                  >
                    <q-tooltip>Refresh</q-tooltip>
                  </q-btn>
                  <q-btn
                    style="width: 80px"
                    @click="onAdd"
                    color="primary"
                    icon="ion-add"
                    v-ripple
                  >
                    <q-tooltip>Add</q-tooltip>
                  </q-btn>
                  <q-btn
                    style="width: 80px"
                    @click="onView"
                    :disable="selected.length === 0"
                    color="cyan-7"
                    icon="far fa-eye"
                    v-ripple
                  >
                    <q-tooltip>View</q-tooltip>
                  </q-btn>
                  <q-btn
                    style="width: 80px"
                    @click="onUpdate"
                    :disable="selected.length === 0"
                    color="accent"
                    icon="fas fa-pencil-alt"
                    v-ripple
                  >
                    <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                  <q-btn
                    style="width: 80px"
                    color="negative"
                    @click="deleteDialog"
                    :disable="selected.length === 0"
                    icon="eva-trash-2"
                    v-ripple
                  >
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </div>
              </div>
              <q-card-section>
                <q-table
                  class="q-ml-sm q-mr-sm table-label-color"
                  title="Dropdown List"
                  :grid="$q.screen.xs"
                  :data="dataDropDown"
                  :columns="columns"
                  row-key="id_dropdown"
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
                        key="dropdown_code"
                        :props="props"
                        class="cursor-pointer"
                        @click.native="onViewclick(props.row)"
                      >{{ props.row.dropdown_code }}</q-td>
                      <q-td key="dropdown_desc" :props="props">{{ props.row.dropdown_desc }}</q-td>
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

import { mapState, mapActions } from 'vuex'
export default {
  name: 'MainDropdown',
  data() {
    return {
      loaddata: [],
      selected: [],
      loading: false,
      filter: null,
      pagination: {
        rowsPerPage: 5
      },
      columns: [
        {
          name: 'dropdown_code',
          label: 'List Code',
          field: row => row.dropdown_code,
          format: val => `${val}`,
          align: 'Left',
          sortable: true
        },
        {
          name: 'dropdown_desc',
          label: 'List Name',
          field: row => row.dropdown_desc,
          format: val => `${val}`,
          align: 'Left',
          sortable: true
        }
      ]
    }
  },
     computed: {
    ...mapState('showcase', ['dataDropDown']),
  },
  mounted() {
    localStorage.removeItem('selectedData')
    this.fetchDataDropDown()
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
    ...mapActions('showcase', ['fetchDataDropDown', 'deleteDataDropDown']),
    loadingShow() {
        if (this.dataDropDown.length === 0) {
          this.$q.loading.show()
          this.loading = true
          setTimeout(() => {
            if (this.dataDropDown.length !== 0) {
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
        this.fetchDataDropDown()
        this.loadingShow()
        this.loading = false
      }, 1000)
    },
    onDelete() {
      this.$q.loading.show()
      this.loading = true
      this.deleteDataDropDown(this.selected[0].id_dropdown)
      setTimeout(() => {
        this.$q.loading.hide()
        this.loading = false
        this.$q.notify({
          timeout: 300,
          color: 'negative',
          textColor: 'white',
          icon: 'fas fa-exclamation-circle',
          message: 'The Data Has Been Removed'
        })
      }, 2000)
    },
    onAdd() {
      this.$router.push({ path: '/masterdropdownlist/add' })
    },
    onUpdate() {
      localStorage.setItem('selectedData', JSON.stringify(this.selected))
      this.$router.push({ path: '/masterdropdownlist/edit' })
    },
    onViewclick(dataclick) {
      localStorage.setItem('selectedData', JSON.stringify(dataclick))
      this.$router.push({ path: '/masterdropdownlist/view' })
    },
    onView() {
      localStorage.setItem('selectedData', JSON.stringify(this.selected[0]))
      this.$router.push({ path: '/masterdropdownlist/view' })
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
