<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el
              label="Dropdowns"
              icon="settings"
              to="/masterdropdownlist"
            />
            <q-breadcrumbs-el label="View" icon="far fa-eye" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline>
              <form>
                <q-card-section>
                  <div class="q-ma-xs q-gutter-sm">
                    <q-btn label="Back" @click="onBack" color="negative" style="width: 80px"></q-btn>
                  </div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6 q-ma-sm">
                      <q-field outlined label="Drop Down List Name" stack-label>
                        <template v-slot:control>
                          <div
                            class="self-center full-width no-outline"
                            tabindex="0"
                          >{{ DropDownListName }}</div>
                        </template>
                      </q-field>
                    </div>
                  </div>
                </q-card-section>

                <q-separator inset />
                <q-card-section>
                  <q-table
                    title="Dropdown Item List"
                    class="q-ml-sm q-mr-sm table-label-color"
                    :data="loaddata"
                    :columns="columns"
                    row-key="id_dropdownlist_detail"
                    separator="cell"
                    :loading="loading"
                    wrap-cells
                  ></q-table>
                </q-card-section>
              </form>
            </q-card>
          </transition>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
let init = ''
import { ViewDropDownListDetail } from 'src/graphql/MasterDropDownListDetail'
export default {
  name: 'ViewDropDownList',
  props: ['Muser'],
  data() {
    return {
      loaddata: [],
      userdata: this.Muser,
      ItemSequence: '',
      DropDownListName: '',
      DropDownListCode: '',
      loading: false,
      columns: [
        {
          name: 'dropdown_details_code',
          label: 'Code',
          field: 'dropdown_details_code',
          align: 'Left'
        },
        {
          name: 'dropdown_details_desc',
          label: 'Items',
          field: 'dropdown_details_desc',
          align: 'Left'
        }
      ],
      selecteddetail: [],
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  created: {},
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  apollo: {
    loaddata: {
      query: ViewDropDownListDetail,
      update: data => data.wms_dropdownlist_details,
      variables: {
        code: init
      }
    }
  },
  mounted() {
    this.OnBindData()
    this.onRefresh()
  },
  methods: {
    onRefresh() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddata.refetch({
          code: this.DropDownListCode
        })
        this.loading = false
      }, 1000)
    },
    OnBindData() {
      this.DropDownListName = this.selected.dropdown_desc
      this.DropDownListCode = this.selected.id_dropdown
    },
    onBack() {
      this.$router.push({ path: '/masterdropdownlist' })
    }
  }
}
</script>
<style></style>
