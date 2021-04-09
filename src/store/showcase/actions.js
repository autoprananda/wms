/*
export function someAction (context) {
}
*/
import {
  apolloClient
} from 'src/boot/apollo'

import {
  viewArea,
  deleteArea
} from 'src/graphql/Area'

import { getDataCustomer, DeleteCustomer } from 'src/graphql/Customer/Customer'
import { GetAllBranch, DelBranch } from 'src/graphql/MasterBranch'
import { GetAllMasterCities, DelMasterCities } from 'src/graphql/Cities'
import { GetAllCountries, DelMasterCountries } from 'src/graphql/Countries'
import { GetAllMasterCurrency, DelMasterCurrency } from 'src/graphql/Currency'
import { GetAllMasterMenu, DelMasterMenu } from 'src/graphql/MasterMenu'

import {
  ViewDropDownList,
  DeleteDropDownList
} from 'src/graphql/MasterDropDownList'

import {
  GetAllMasterProdCode,
  DelMasterProdCode
} from 'src/graphql/MasterProductCode'

import {
  GetAllMasterSubMenu,
  DelMasterSubMenu
} from 'src/graphql/MasterSubMenu'

import { ViewNav, DeleteNav } from 'src/graphql/NavUpload'
import { ViewRegion, DeleteRegion } from 'src/graphql/Region'
// =======================================
// AREA
// =======================================
export async function fetchDataArea(context) {
  let response = await apolloClient.query({
    query: viewArea
  })
  let data = response.data.wms_area
  context.commit('setDataArea', data)
  return data
}

export async function deleteDataArea(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: deleteArea,
    variables: variables
  })
  let data = response.data.delete_wms_area
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataArea')
  }
}

// =======================================
// Branch
// =======================================
export async function fetchDataBranch(context) {
  let response = await apolloClient.query({
    query: GetAllBranch
  })
  let data = response.data.wms_branches
  context.commit('setDataBranch', data)
  return data
}

export async function deleteDataBranch(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelBranch,
    variables: variables
  })
  let data = response.data.delete_wms_branches
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataBranch')
  }
}
// =======================================
// City
// =======================================
export async function fetchDataCity(context) {
  let response = await apolloClient.query({
    query: GetAllMasterCities
  })
  let data = response.data.wms_cities
  context.commit('setDataCity', data)
  return data
}

export async function deleteDataCity(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterCities,
    variables: variables
  })
  let data = response.data.delete_wms_cities
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataCity')
  }
}
// =======================================
// Countries
// =======================================
export async function fetchDataCountry(context) {
  let response = await apolloClient.query({
    query: GetAllCountries
  })
  let data = response.data.wms_countries
  context.commit('setDataCountry', data)
  return data
}

export async function deleteDataCountry(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterCountries,
    variables: variables
  })
  let data = response.data.delete_wms_countries
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataCountry')
  }
}

// =======================================
// Currency
// =======================================
export async function fetchDataCurrency(context) {
  let response = await apolloClient.query({
    query: GetAllMasterCurrency
  })
  let data = response.data.wms_currencies
  context.commit('setDataCurrency', data)
  return data
}

export async function deleteDataCurrency(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterCurrency,
    variables: variables
  })
  let data = response.data.delete_wms_currencies
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataCurrency')
  }
}
// =======================================
// Customer
// =======================================
export async function fetchDataCustomer(context) {
  let response = await apolloClient.query({
    query: getDataCustomer
  })
  let data = response.data.wms_customer
  context.commit('setDataCustomer', data)
  return data
}

export async function deleteDataCustomer(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DeleteCustomer,
    variables: variables
  })
  let data = response.data.delete_wms_customer
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataCustomer')
  }
}
// =======================================
// DropDown
// =======================================
export async function fetchDataDropDown(context) {
  let response = await apolloClient.query({
    query: ViewDropDownList
  })
  let data = response.data.wms_dropdown_lists
  context.commit('setDataDropDown', data)
  return data
}

export async function deleteDataDropDown(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DeleteDropDownList,
    variables: variables
  })
  let data = response.data.delete_wms_dropdown_lists
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataDropDown')
  }
}
// =======================================
// Menu
// =======================================
export async function fetchDataMenu(context) {
  let response = await apolloClient.query({
    query: GetAllMasterMenu
  })
  let data = response.data.wms_menu
  context.commit('setDataMenu', data)
  return data
}

export async function deleteDataMenu(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterMenu,
    variables: variables
  })
  let data = response.data.delete_wms_menu
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataMenu')
  }
}
// =======================================
// Product
// =======================================
export async function fetchDataProduct(context) {
  let response = await apolloClient.query({
    query: GetAllMasterProdCode
  })
  let data = response.data.wms_products
  context.commit('setDataProduct', data)
  return data
}

export async function deleteDataProduct(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterProdCode,
    variables: variables
  })
  let data = response.data.delete_wms_products
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataProduct')
  }
}

// =======================================
// SubMenu
// =======================================
export async function fetchDataSubMenu(context) {
  let response = await apolloClient.query({
    query: GetAllMasterSubMenu
  })
  let data = response.data.wms_submenu
  context.commit('setDataSubMenu', data)
  return data
}

export async function deleteDataSubMenu(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DelMasterSubMenu,
    variables: variables
  })
  let data = response.data.delete_wms_submenu
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataSubMenu')
  }
}
// =======================================
// NavUpload
// =======================================
export async function fetchDataNavUpload(context) {
  let response = await apolloClient.query({
    query: ViewNav
  })
  let data = response.data.wms_nav
  context.commit('setDataNavUpload', data)
  return data
}

export async function deleteDataNavUpload(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DeleteNav,
    variables: variables
  })
  let data = response.data.delete_wms_nav
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataNavUpload')
  }
}
// =======================================
// Region
// =======================================
export async function fetchDataRegion(context) {
  let response = await apolloClient.query({
    query: ViewRegion
  })
  let data = response.data.wms_region
  context.commit('setDataRegion', data)
  return data
}

export async function deleteDataRegion(context, payload) {
  let variables = {
    code: payload
  }
  let response = await apolloClient.mutate({
    mutation: DeleteRegion,
    variables: variables
  })
  let data = response.data.delete_wms_region
  if (data.affected_rows === 1) {
    return context.dispatch('fetchDataRegion')
  }
}