import gql from 'graphql-tag'

// untuk insert table
export const InsertNav = gql`
  mutation insert_wms_nav(
    $objects: [wms_nav_insert_input!]!
  ) {
    insert_wms_nav(objects: $objects) {
      affected_rows
    }
  }
`
 
// View:  get all field from master_client
export const ViewNav = gql`
  query wms_nav {
    wms_nav {
      id
      id_custodian_bank
      fund_manager
      product_code
      product_name
      nav_amount
      nav_date
      created_by
      created_date
      modified_by
      modified_date 
      bank {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      product {
        id_product
        prod_desc
        product_code
      }
    }
  }
`

// delete
export const DeleteNav = gql`
  mutation delete_wms_nav($code: Int!) {
    delete_wms_nav(where: { id: { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const EditNav = gql`
  mutation update_wms_nav(
    $code: Int!
    $changes: wms_nav_set_input
  ) {
    update_wms_nav(
      where: { id: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
