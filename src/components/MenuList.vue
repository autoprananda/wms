<template>
  <div>
    <q-list>
      <q-item clickable v-ripple @click="redirect('/dashboard')" active-class="my-menu-link"
        :active="link === '/home'" class="drawer-item">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>Home</q-item-section>
      </q-item>
    </q-list>
    <div v-for="(menuItem, index) in loadMenu" :key="index">
      <q-expansion-item expand-separator group="Some" expand-icon="far fa-arrow-alt-circle-down"
        expanded-icon="far fa-arrow-alt-circle-up" :icon="menuItem.icon" :label="menuItem.menu_desc"
        header-class="text-primary">
        <q-list v-for="(subMenuItem, index) in menuItem.submenu" :key="index">
          <q-item active-class="my-menu-link" :active="link === subMenuItem.submenu_desc" class="drawer-item" clickable
            v-ripple @click="redirectMenu(subMenuItem, subMenuItem.submenu)" :inset-level="1.25" dense>
            <q-item-section>{{ subMenuItem.submenu_desc }}</q-item-section>
          </q-item>
          <q-separator inset />
        </q-list>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { GetMenu } from 'src/graphql/MasterMenu'
export default {
  name: 'Menulist',
  props: ['userLogin', 'ugAccessToken'],
  data() {
    return {
      loadMenu: [],
      loadSubMenuRole: [],
      link: null,
      user: this.userLogin,
      token: this.ugAccessToken
    }
  },
  apollo: {
    loadMenu: {
      query: GetMenu,
      update: data => data.wms_menu
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    redirectMenu(rights, data) {
      // localStorage.setItem('actionRights', JSON.stringify(rights))
      this.$router.push({ path: rights.path }).catch(err => {
        err = true
      })
    },
    redirect(link) {
      this.$router.push({ path: link }).catch(err => {
        err = true
      })
    },
    loadData() {
      this.$apollo.queries.loadMenu.refetch().then(response => {
      })
    }
  }
}
</script>

<style lang="stylus">

.drawer-item {
  line-height: 24px;
  border-radius: 0 15px 15px 0;
  margin-right: 12px;
}
.my-menu-link {
  color: #0055A5;
  background: #6bb8ff69;
}

</style>

<style lang="scss">
.app-menu .q-expansion-item__toggle-icon {
    color: #bdbdbd;
}

.app-menu .q-expansion-item--expanded>div>.q-item>.q-item__section--side .q-expansion-item__toggle-icon {
    color: #1976d2;
}
</style>
