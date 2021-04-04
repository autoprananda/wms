<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="SubMenu" icon="fas fa-bars" to="/submenu" />
            <q-breadcrumbs-el label="Edit" icon="edit" />
          </q-breadcrumbs>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <transition appear enter-active-class="animated zoomIn">
            <q-card class="my-card shadow-6 center" inline style="background-color:white;">
              <q-card-section>
                <form>
                  <q-card-section>
                    <div class="q-mb-sm q-gutter-sm">
                      <q-btn
                        @click="SubmitDialog"
                        :disable="
                          MenuDescription === '' ||
                            SubMenuDesc === '' ||
                            SubMenuCode === '' ||
                            Path === '' ||
                            SortOrder === ''
                        "
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
                        <q-select
                          outlined
                          v-model="MenuDescription"
                          :options="optMenuDesc"
                          :option-label="optMenuDesc => optMenuDesc.menu_desc"
                          :option-value="optMenuDesc => optMenuDesc"
                          emit-value
                          map-options
                          label="Menu Description"
                          stack-label
                        ></q-select>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-12 col-md-12">
                        <q-card class="q-mt-md shadow-3">
                          <q-card-section>
                            <div class="col text-weight-bolder text-subtitle1 q-mb-sm">Detail Menu</div>
                            <q-separator />
                            <div class="q-mb-md" />
                            <div class="row q-col-gutter-md">
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  outlined
                                  v-model="SortOrder"
                                  mask="####"
                                  label="SortOrder"
                                  stack-label
                                />
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-field outlined label="SubMenu Code" stack-label>
                                  <template v-slot:control>
                                    <div
                                      class="self-center full-width no-outline"
                                      tabindex="0"
                                    >{{ SubMenuCode }}</div>
                                  </template>
                                </q-field>
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input
                                  outlined
                                  v-model="SubMenuDesc"
                                  label="SubMenu Description"
                                  stack-label
                                />
                              </div>
                              <div class="col-xs-12 col-sm-6 col-md-6">
                                <q-input outlined v-model="Path" label="Path" stack-label />
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>
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
import { GetMasterMenu } from 'src/graphql/MasterMenu'
import { EditMasterSubMenu } from 'src/graphql/MasterSubMenu'
import { date } from 'quasar'
export default {
  name: 'EditMasterSubMenu',
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      submitting: false,
      emessage: '',
      MenuDescription: {},
      optMenuDesc: [],
      SubMenuDesc: '',
      SubMenuCode: '',
      SortOrder: '',
      Path: '',
      oldcode: '',
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  mounted() {
    this.OnBindData()
  },
  apollo: {
    optMenuDesc: {
      query: GetMasterMenu,
      update: data => data.wms_menu
    }
  },
  methods: {
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterSubMenu,
          variables: {
            code: this.oldcode,
            changes: {
              id_menu: this.MenuDescription.id_menu,
              submenu_code: this.SubMenuCode,
              submenu_desc: this.SubMenuDesc,
              order_key: +this.SortOrder,
              path: this.Path,
              modified_date: this.now,
              modified_by: 'auto_prananda'
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
              'Menu Description ' +
              this.MenuDescription.menu_desc +
              ' ' +
              'Has Been Updated'
          })
          this.$router.push({ path: '/submenu' })
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
    OnBindData() {
      this.MenuDescription.menu_desc = this.selected[0].menu.menu_desc
      this.SubMenuCode = this.selected[0].submenu_code
      this.SubMenuDesc = this.selected[0].submenu_desc
      this.SortOrder = this.selected[0].order_key
      this.Path = this.selected[0].path
      this.oldcode = this.selected[0].submenu_code
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
          this.$router.push({ path: '/submenu' })
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
