/*
export function someAction (context) {
}
*/
import {
    apolloClient
  } from 'src/boot/apollo'
  
import { getDataCustomer } from 'src/graphql/Customer/Customer'
import { ViewArea } from 'src/graphql/Area'

export async function loadDataCustomer(context) {
    let response = await apolloClient.query({
      query: getDataCustomer
    })
    let data = response.data.wms_customer
    context.commit('setDataCustomer', data)
    return data
  }

  export async function loadDataArea(context) {
    let response = await apolloClient.query({
      query: ViewArea
    })
    let data = response.data.wms_area
    context.commit('setDataArea', data)
    return data
  }

  