
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') },
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'area',
        component: () => import('pages/Area/Main.vue')
      },
      {
        path: 'area/add',
        component: () => import('pages/Area/Add.vue')
      },
      {
        path: 'area/edit',
        component: () => import('pages/Area/Edit.vue')
      },
      {
        path: 'area/view',
        component: () => import('pages/Area/View.vue')
      },
      {
        path: 'countries',
        component: () => import('pages/Countries/Main.vue')
      },
      {
        path: 'countries/add',
        component: () => import('pages/Countries/Add.vue')
      },
      {
        path: 'countries/Edit',
        component: () => import('pages/Countries/Edit.vue')
      },
      {
        path: 'countries/view',
        component: () => import('pages/Countries/View.vue')
      },
      {
        path: 'region',
        component: () => import('pages/Region/Main.vue')
      },
      {
        path: 'region/add',
        component: () => import('pages/Region/Add.vue')
      },
      {
        path: 'region/edit',
        component: () => import('pages/Region/Edit.vue')
      },
      {
        path: 'region/view',
        component: () => import('pages/Region/View.vue')
      },
      {
        path: 'cities',
        component: () => import('pages/Cities/Main.vue')
      },
      {
        path: 'cities/add',
        component: () => import('pages/Cities/Add.vue')
      },
      {
        path: 'cities/edit',
        component: () => import('pages/Cities/Edit.vue')
      },
      {
        path: 'cities/view',
        component: () => import('pages/Cities/View.vue')
      },
      {
        path: 'branch',
        component: () => import('pages/Branch/Main.vue')
      },
      {
        path: 'branch/add',
        component: () => import('pages/Branch/Add.vue')
      },
      {
        path: 'branch/edit',
        component: () => import('pages/Branch/Edit.vue')
      },
      {
        path: 'branch/view',
        component: () => import('pages/Branch/View.vue')
      },
      {
        path: 'currencies',
        component: () => import('pages/Currencies/Main.vue')
      },
      {
        path: 'currencies/add',
        component: () => import('pages/Currencies/Add.vue')
      },
      {
        path: 'currencies/edit',
        component: () => import('pages/Currencies/Edit.vue')
      },
      {
        path: 'currencies/view',
        component: () => import('pages/Currencies/View.vue')
      },
      {
        path: 'masterdropdownList',
        component: () => import('pages/MasterDropDownList/Main.vue')
      },
      {
        path: 'masterdropdownList/add',
        component: () => import('pages/MasterDropDownList/Add.vue')
      },
      {
        path: 'masterdropdownList/edit',
        component: () => import('pages/MasterDropDownList/Edit.vue')
      },
      {
        path: 'masterdropdownList/view',
        component: () => import('pages/MasterDropDownList/View.vue')
      },
      {
        path: 'menu',
        component: () => import('pages/MasterMenuList/Main.vue')
      },
      {
        path: 'menu/add',
        component: () => import('pages/MasterMenuList/Add.vue')
      },
      {
        path: 'menu/edit',
        component: () => import('pages/MasterMenuList/Edit.vue')
      },
      {
        path: 'menu/view',
        component: () => import('pages/MasterMenuList/View.vue')
      },
      {
        path: 'submenu',
        component: () => import('pages/MasterSubMenuList/Main.vue')
      },
      {
        path: 'submenu/add',
        component: () => import('pages/MasterSubMenuList/Add.vue')
      },
      {
        path: 'submenu/edit',
        component: () => import('pages/MasterSubMenuList/Edit.vue')
      },
      {
        path: 'submenu/view',
        component: () => import('pages/MasterSubMenuList/View.vue')
      },
      {
        path: 'masterproduct',
        component: () => import('pages/MasterProduct/Main.vue')
      },
      {
        path: 'masterproduct/add',
        component: () => import('pages/MasterProduct/Add.vue')
      },
      {
        path: 'masterproduct/edit',
        component: () => import('pages/MasterProduct/Edit.vue')
      },
      {
        path: 'masterproduct/view',
        component: () => import('pages/MasterProduct/View.vue')
      },
      {
        path: 'customer',
        component: () => import('pages/Customer/Main.vue')
      },
      {
        path: 'customer/add',
        component: () => import('pages/Customer/Add.vue')
      },
      {
        path: 'customer/edit',
        component: () => import('pages/Customer/Edit.vue')
      },
      {
        path: 'customer/view',
        component: () => import('pages/Customer/View.vue')
      },
      {
        path: 'navupload',
        component: () => import('pages/NavUpload/Main.vue')
      },
      {
        path: 'navupload/add',
        component: () => import('pages/NavUpload/Add.vue')
      },
      {
        path: 'navupload/edit',
        component: () => import('pages/NavUpload/Edit.vue')
      },
      {
        path: 'navupload/view',
        component: () => import('pages/NavUpload/View.vue')
      },
      {
        path: 'subscription',
        component: () => import('pages/Subscription/Main.vue')
      },
      {
        path: 'subscription/add',
        component: () => import('pages/Subscription/Add.vue')
      },
      {
        path: 'subscription/viewlist',
        component: () => import('pages/Subscription/ViewList.vue')
      },
      {
        path: 'subscription/view',
        component: () => import('pages/Subscription/View.vue')
      },
      {
        path: 'redemption',
        component: () => import('pages/Redemption/Main.vue')
      },
      {
        path: 'redemption/add',
        component: () => import('pages/Redemption/Add.vue')
      },
      {
        path: 'redemption/viewlist',
        component: () => import('pages/Redemption/ViewList.vue')
      },
      {
        path: 'redemption/view',
        component: () => import('pages/Redemption/View.vue')
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
