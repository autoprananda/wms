import gql from 'graphql-tag'

// get all field from WMS_Corporate_Message
export const GetAllMasterCurrency = gql`
  query wms_currencies {
    wms_currencies {
        created_by
        created_date
        currencies_code
        currencies_desc
        modified_by
        id
        modified_date
    }
  }
`
// get only date n name field from WMS_Corporate_Message
export const GetMasterCurrency = gql`
  query wms_currencies {
    wms_currencies {
      id
      currencies_code
      currencies_desc
    }
  }
`
// delete WMS_Corporate_Message
export const DelMasterCurrency = gql`
  mutation delete_wms_currencies($code: Int!) {
    delete_wms_currencies(where: { id: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert into WMS_Corporate_Message
export const InsMasterCurrency = gql`
mutation insert_wms_currencies(
    $objects: [wms_currencies_insert_input!]!
  ) {
    insert_wms_currencies(objects: $objects) {
      affected_rows
    }
  }
`

// edit
export const EditMasterCurrency = gql`
  mutation update_wms_currencies(
    $code: String
    $changes: wms_currencies_set_input
  ) {
    update_wms_currencies(
      where: { currencies_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
