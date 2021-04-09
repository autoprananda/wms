<template>
  <div>
      <q-page padding>
        <q-card bordered>
          <q-card-section>
            <q-breadcrumbs>
              <q-breadcrumbs-el label="Home" icon="home" to="/dashboard" />
              <q-breadcrumbs-el label="Area" icon="fas fa-map-marked-alt" to="/area" />
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
                          :disable="AreaCode === '' || AreaName === ''"
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
                          <q-field outlined label="Area Code" stack-label>
                            <template v-slot:control>
                              <div
                                class="self-center full-width no-outline"
                                tabindex="0"
                              >{{ AreaCode }}</div>
                            </template>
                          </q-field>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6" />
                        <div class="col-xs-12 col-sm-6 col-md-6">
                          <q-input outlined v-model="AreaName" label="Area Name" />
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
import { editArea } from 'src/graphql/Area'
import { date } from 'quasar'
export default {
  name: 'EditArea',
  data() {
    return {
      AreaName: '',
      AreaCode: '',
      Country: '',
      submitting: false,
      OldCode: '',
      user: this.$q.sessionStorage.getItem('username'),
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
      this.AreaCode = this.selected[0].area_code
      this.AreaName = this.selected[0].area_name
      this.OldCode = this.selected[0].id_area
    },
    SubmitButton() {
      this.submitting = true
      this.$apollo
        .mutate({
          mutation: editArea,
          variables: {
            code: this.OldCode,
            changes: {
              area_code: this.AreaCode,
              area_name: this.AreaName,
              modified_date: this.now,
              modified_by: this.user
            }
          }
        })
        .then(response => {
          this.submitting = false
          // this.saveLogger('Edit', response.data.entities)
          this.$q.notify({
            color: 'accent',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Area Code ' + this.AreaCode + ' ' + 'Has Been Updated'
          })
          this.$router.push({ path: '/area' })
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
          this.$router.push({ path: '/area' })
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
