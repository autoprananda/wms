<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el label="Menu" icon="fas fa-bars" to="/menu" />
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
                            GrupIcon === '' ||
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
                    <!-- <div class="q-pa-md"> -->
                    <div class="row q-col-gutter-md">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-field outlined label="Menu Code" stack-label>
                          <template v-slot:control>
                            <div
                              class="self-center full-width no-outline"
                              tabindex="0"
                            >{{ MenuCode }}</div>
                          </template>
                        </q-field>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          outlined
                          v-model="MenuDescription"
                          label="Menu Description"
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          mask="####"
                          outlined
                          v-model="SortOrder"
                          label="Sort Order"
                          stack-label
                        />
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input outlined v-model="GrupIcon" label="Grup Icon" stack-label />
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
import { EditMasterMenu } from 'src/graphql/MasterMenu'
import { date } from 'quasar'
export default {
  name: 'EditMasterMenu',
  props: ['Muser'],
  data() {
    return {
      userdata: this.Muser,
      submitting: false,
      emessage: '',
      MenuCode: '',
      MenuDescription: '',
      GrupIcon: '',
      SortOrder: '',
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
  methods: {
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterMenu,
          variables: {
            code: this.oldcode,
            changes: {
              menu_code: this.MenuCode,
              menu_desc: this.MenuDescription,
              order_key: +this.SortOrder,
              icon: this.GrupIcon,
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
            message: 'Menu Code ' + this.MenuCode + ' ' + 'Has Been Updated'
          })
          this.$router.push({ path: '/menu' })
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
      this.MenuDescription = this.selected[0].menu_desc
      this.MenuCode = this.selected[0].menu_code
      this.GrupIcon = this.selected[0].icon
      this.SortOrder = this.selected[0].order_key
      this.oldcode = this.selected[0].menu_code
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
          this.$router.push({ path: '/menu' })
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
