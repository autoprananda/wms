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
              to="/MasterDropDownList"
            />
            <q-breadcrumbs-el label="Edit" icon="edit" />
          </q-breadcrumbs>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline style="background-color:white;">
              <q-card-section>
                <form @submit.prevent="SubmitButton">
                  <q-card-section>
                    <div class="q-mb-sm q-gutter-sm">
                      <q-btn
                        :loading="submitting"
                        @click="SubmitDialog"
                        :disable="DropDownListName === ''"
                        label="Submit"
                        color="accent"
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        @click="CancelDialog"
                        label="Cancel"
                        color="negative"
                        style="width: 80px"
                      ></q-btn>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Drop Down List Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ DropDownListCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          v-model="DropDownListName"
                          label="Drop Down List Name"
                          stack-label
                        />
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col-xs-12 col-sm-6 col-md-5">
                        <div class="q-gutter-md">
                          <q-btn
                            :disable="DropDownListName === ''"
                            :loading="LoadDetail"
                            style="width: 80px"
                            @click="ActionDetail(), ClearAdd()"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="OnUpdateDeatil"
                            style="width: 80px"
                            color="accent"
                            :disable="selectedEdit.length === 0"
                            icon="fas fa-pencil-alt"
                            v-ripple
                          >
                            <q-tooltip>Edit</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="DeleteDialog"
                            style="width: 80px"
                            :disable="selectedEdit.length === 0"
                            color="negative"
                            icon="eva-trash-2"
                            v-ripple
                          >
                            <q-tooltip>Delete</q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-table
                      title="Dropdown Item List"
                      class="q-ml-sm q-mr-sm table-label-color"
                      :grid="$q.screen.xs"
                      :data="loaddata"
                      :columns="columns"
                      row-key="id_dropdownlist_detail"
                      selection="single"
                      :selected.sync="selectedEdit"
                      separator="cell"
                      :loading="loading"
                      color="primary"
                      wrap-cells
                    ></q-table>
                  </q-card-section>
                </form>
              </q-card-section>
            </q-card>
          </transition>
        </q-card-section>
      </q-card>
      <q-dialog v-model="AddDetail">
        <q-card style="width:100%">
          <q-card-section>
            <form @submit.prevent="SubmitButtonDetail">
              <q-card-section>
                <div class="q-mb-sm q-gutter-sm">
                  <q-btn
                    :loading="submittingAdd"
                    :disable="CodeItem === '' || ItemDescription === ''"
                    @click="SubmitButtonDetail"
                    label="Add"
                    color="accent"
                    style="width: 80px"
                  ></q-btn>
                  <q-btn
                    @click="ClearButtonDetail"
                    :disable="CodeItem === '' && ItemDescription === ''"
                    label="Clear"
                    color="cyan-7"
                    style="width: 80px"
                  ></q-btn>
                  <q-btn label="Close" color="negative" v-close-popup style="width: 80px"></q-btn>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="q-gutter-y-md">
                  <q-input outlined v-model="CodeItem" label="Code Item" stack-label />
                  <q-input
                    outlined
                    v-model="ItemDescription"
                    label="Item Description"
                    stack-label
                  />
                </div>
              </q-card-section>
            </form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="detailEdit">
        <q-card style="width:100%">
          <q-card-section>
            <form @submit.prevent="SubmitButtonEdit">
              <q-card-section>
                <div class="q-mb-sm q-gutter-sm">
                  <q-btn
                    :loading="submitting"
                    :disable="
                      CodeItemEdit === '' || ItemDescriptionEdit === ''
                    "
                    @click="SubmitDialogEdit"
                    label="Edit"
                    color="accent"
                    style="width: 80px"
                  ></q-btn>
                  <q-btn label="Close" color="negative" v-close-popup style="width: 80px"></q-btn>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="q-gutter-y-md">
                  <q-field outlined label="Code Item" stack-label>
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >{{ CodeItemEdit }}</div>
                    </template>
                  </q-field>

                  <q-input
                    outlined
                    v-model="ItemDescriptionEdit"
                    label="Item Description"
                    stack-label
                  />
                </div>
              </q-card-section>
            </form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>
<script>
let init = ''
import { date } from 'quasar'
import { EditDropDownList } from 'src/graphql/MasterDropDownList'
import {
  InsertDropDownListDetail,
  EditDropDownListDetail,
  DeleteDropDownListDetail,
  ViewDropDownListDetail
} from 'src/graphql/MasterDropDownListDetail'
export default {
  name: 'EditDropDownList',
  props: ['userLogin'],
  data() {
    return {
      user: this.userLogin,
      LoadDetail: false,
      loaddata: [],
      loading: false,
      submitting: false,
      submittingAdd: false,
      DropDownListName: '',
      emessage: '',
      DropDownListCode: '',
      CodeItem: '',
      ItemDescription: '',
      OldCode: '',
      selectedEdit: [],
      AddDetail: false,
      detailEdit: false,
      ItemDescriptionEdit: '',
      CodeItemEdit: '',
      selected: JSON.parse(localStorage.selectedData),
      columns: [
        {
          name: 'dropdown_details_desc',
          label: 'Items',
          field: 'dropdown_details_desc',
          align: 'Left'
        }
      ]
    }
  },
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
    ClearButtonDetail() {
      this.ItemDescription = ''
      this.CodeItem = ''

      setTimeout(() => {
        this.submitting = false
        this.$q.notify({
          color: 'cyan-7',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Clear Successful'
        })
      })
    },
    ActionDetail() {
      this.AddDetail = true
    },
    OnUpdateDeatil() {
      this.detailEdit = true
      this.CodeItemEdit = this.selectedEdit[0].dropdown_details_code
      this.ItemDescriptionEdit = this.selectedEdit[0].dropdown_details_desc
    },
    OnBindData() {
      this.DropDownListCode = this.selected[0].dropdown_code
      this.DropDownListName = this.selected[0].dropdown_desc
      this.OldCode = this.selected[0].id_dropdown
    },
    onRefresh() {
      this.loading = true
      setTimeout(() => {
        this.$apollo.queries.loaddata.refetch({
          code: this.OldCode
        })
        this.loading = false
      }, 1000)
    },
    SubmitButtonDetail() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: InsertDropDownListDetail,
          variables: {
            objects: {
              id_dropdowns: this.OldCode,
              dropdown_details_code: this.CodeItem,
              dropdown_details_desc: this.ItemDescription,
              created_date: this.now,
              created_by: this.user.fullname
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Code Item ' + this.CodeItem + ' ' + 'Has Been Added'
          })
          this.onRefresh()
          this.ClearAdd()
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
    ClearAdd() {
      this.ItemDescription = ''
      this.CodeItem = ''
    },
    SubmitDialogEdit() {
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
            label: 'No',
            textColor: 'accent',
            color: ''
          }
        })
        .onOk(() => {
          console.log('>>>> OK')
          this.SubmitButtonEdit()
          this.onRefresh()
          this.selectedEdit = []
          this.detailEdit = false
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    SubmitButtonEdit() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditDropDownListDetail,
          variables: {
            code: this.selectedEdit[0].id_dropdownlist_detail,
            changes: {
              dropdown_details_code: this.CodeItemEdit,
              dropdown_details_desc: this.ItemDescriptionEdit,
              modified_date: this.now,
              modified_by: this.user.fullname
            }
          }
        })
        .then(response => {
          this.submitting = false
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Submit Successful'
          })
        })
        .catch(err => {
          this.submitting = false
          this.emessage = err
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Submit Error'
          })
        })
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditDropDownList,
          variables: {
            code: this.OldCode,
            changes: {
              dropdown_desc: this.DropDownListName,
              modified_date: this.now,
              modified_by: this.user.fullname
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
              'Drop Down List Code ' +
              this.DropDownListCode +
              ' ' +
              'Has Been Updated'
          })
          this.$router.push({ path: '/masterdropdownlist' })
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
    SubmitDialog() {
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
            label: 'No',
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
    },
    onDelete() {
      setTimeout(() => {
        this.$apollo.mutate({
          mutation: DeleteDropDownListDetail,
          variables: {
            code: this.selectedEdit[0].id_dropdownlist_detail
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
      })
    },
    DeleteDialog() {
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
    CancelDialog() {
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
          this.$router.push({ path: '/masterdropdownlist' })
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
  },
  computed: {
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>
