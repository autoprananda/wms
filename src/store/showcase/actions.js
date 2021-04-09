/*
export function someAction (context) {
}
*/
import {
  apolloClient
} from 'src/boot/apollo'

import {
  getDataCustomer
} from 'src/graphql/Customer/Customer'
import {
  viewArea,
  deleteArea
} from 'src/graphql/Area'

export async function loadDataCustomer(context) {
  let response = await apolloClient.query({
    query: getDataCustomer
  })
  let data = response.data.wms_customer
  context.commit('setDataCustomer', data)
  return data
}

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