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
            <q-breadcrumbs-el label="Add" icon="note_add" />
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
                        label="Submit"
                        color="accent"
                        :disable="
                          DropDownListCode === '' || DropDownListName === ''
                        "
                        style="width: 80px"
                      ></q-btn>
                      <q-btn
                        @click="ClearButton"
                        label="Clear"
                        :disable="
                          DropDownListCode === '' && DropDownListName === ''
                        "
                        color="cyan-7"
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
                        <q-input
                          outlined
                          v-model="DropDownListCode"
                          label="Drop Down List Code"
                          stack-label
                        />
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
                            :loading="LoadDetail"
                            :disable="
                              DropDownListCode === '' ||
                                DropDownListName === ''
                            "
                            style="width: 80px"
                            @click="ActionDetail(), ClearAdd()"
                            color="primary"
                            icon="ion-add"
                            v-ripple
                          >
                            <q-tooltip>Add</q-tooltip>
                          </q-btn>
                          <q-btn
                            @click="DeleteDialog"
                            style="width: 80px"
                            :disable="selected.length === 0"
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
                      :data="listData"
                      :columns="columns"
                      row-key="order_key"
                      selection="single"
                      :selected.sync="selected"
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
            <form @submit.prevent="AddButton">
              <q-card-section>
                <div class="q-mb-sm q-gutter-sm">
                  <q-btn
                    :loading="adding"
                    @click="AddButton"
                    :disable="CodeItem === '' || ItemDescription === ''"
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
    </q-page>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'
import { InsertDropDownList } from 'src/graphql/MasterDropDownList'
export default {
  name: 'AddDropDownList',
  props: ['Muser'],
  data() {
    return {
      draggingFab: false,
      fabPos: [18, 18],
      userdata: this.Muser,
      submitting: false,
      emessage: '',
      DropDownListName: '',
      DropDownListCode: '',
      // Add Detail
      loading: false,
      LoadDetail: false,
      adding: false,
      CodeItem: '',
      ItemDescription: '',
      selected: [],
      listData: [],
      AddDetail: false,
      sortorder: 0,
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
  methods: {
    ActionDetail() {
      this.AddDetail = true
    },
    AddButton() {
      this.adding = true
      setTimeout(() => {
        this.adding = true
        this.sortorder += 1
        this.listData.push({
          order_key: this.sortorder,
          dropdown_details_code: this.CodeItem,
          dropdown_details_desc: this.ItemDescription,
          created_date: this.now,
          created_by: 'auto_prananda'
        })
        this.adding = false
        this.ClearAdd()
        this.$q.notify({
          color: 'accent',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Code Item ' + this.CodeItem + ' ' + 'Has Been Added'
        })
      }, 3000)
    },
    ClearAdd() {
      this.ItemDescription = ''
      this.CodeItem = ''
    },
    ClearButtonDetail() {
      this.ItemDescription = ''
      this.CodeItem = ''

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
          this.DeleteButton()
        })

        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    },
    delOrderKey() {
      this.listData.forEach(key => {
        Object.keys(key).forEach(val => {
          if (val === 'order_key') {
            delete key[`${val}`]
          }
        })
        console.log(this.listData, '===data')
      })
    },
    DeleteButton() {
      for (let i = 0; i < this.listData.length; i++) {
        if (this.listData[i].order_key === this.selected[0].order_key) {
          this.listData.splice(i, 1)
        }
      }
    },
    SubmitButton() {
      this.submitting = true
      this.delOrderKey()
      this.$apollo
        .mutate({
          mutation: InsertDropDownList,
          variables: {
            objects: {
              dropdown_desc: this.DropDownListName,
              dropdown_code: this.DropDownListCode,
              created_date: this.now,
              created_by: 'auto_prananda',
              dropdown_list: { data: this.listData }
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
              'Has Been Submitted'
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
    ClearButton() {
      this.DropDownListName = ''
      this.DropDownListCode = ''

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
    ...mapState('showcase', {
      baseUrl: 'baseUrl',
      LONG_DATE_ID: 'LONG_DATE_ID'
    }),
    now: () => date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
  }
}
</script>
