<template>
  <div>
    <q-page padding>
      <q-card bordered>
        <q-card-section>
          <q-breadcrumbs>
            <q-breadcrumbs-el data-vv-name="Home" label="Home" icon="home" to="/dashboard" />
            <q-breadcrumbs-el data-vv-name="Currencies" label="Currencies " icon="fas fa-dollar-sign" to="/currencies" />
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
                    <div class="q-gutter-sm">
                      <q-btn
                        :loading="submitting"
                        @click="SubmitDialog"
                        :disable="CurrencyCode === '' || Description === ''"
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
                    <div class="row q-col-gutter-sm">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          disable
                          stack-label
                          outlined
                          v-model="CurrencyCode"
                          label="Currency Code *"
                        >
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-6" />
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <q-input
                          stack-label
                          outlined
                          v-model="Description"
                          label="Description *"
                        >
                        </q-input>
                        
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
import { date } from 'quasar'
import { EditMasterCurrency } from 'src/graphql/Currency'
export default {
  name: 'Edit',
  data() {
    return {
      user: this.$q.sessionStorage.getItem('username'),
      CurrencyCode: '',
      Description: '',
      OldCode: '',
      submitting: false,
      selected: JSON.parse(localStorage.selectedData)
    }
  },
  mounted() {
    this.onBindData()
  },
  watch: {
    selected(newSelected) {
      localStorage.selectedData = newSelected
    }
  },
  methods: {
    onBindData() {
      this.CurrencyCode = this.selected[0].currencies_code
      this.Description = this.selected[0].currencies_desc
      this.OldCode = this.selected[0].currencies_code
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: EditMasterCurrency,
          variables: {
            code: this.OldCode,
            changes: {
              currencies_code: this.CurrencyCode,
              currencies_desc: this.Description,
              modified_by: this.user,
              modified_date: this.now
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
              'Currency Code ' + this.CurrencyCode + ' ' + 'Has Been Updated'
          })
          this.$router.push({ path: '/currencies' })
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
          this.$router.push({ path: '/currencies' })
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

<style></style>
