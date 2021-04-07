import gql from 'graphql-tag'

// get all field from individual
export const InsertBank = gql`
  mutation insert_wms_customer_bank(
    $objects: [wms_customer_bank_insert_input!]!
  ) {
    insert_wms_customer_bank(objects: $objects) {
      affected_rows
    }
  }
`

export const getBankCustomer = gql`
  query wms_customer_bank ($code: String) {
    wms_customer_bank(where: {gcif_number: {_eq: $code}}) {
      account_number
      created_by
      created_date
      gcif_number
      id
      id_account_type
      id_bank_info
      id_currency
      id_status
      modified_by
      modified_date
      account_type {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      bank {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      currency {
        currencies_desc
        currencies_code
        id
      }
      status {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
    }
  }
`
// delete
export const DeleteBank = gql`
  mutation delete_wms_customer_bank($code: Int!) {
    delete_wms_customer_bank(where: { id: { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const EditBank = gql`
  mutation update_wms_customer_bank(
    $code: Int!
    $changes: wms_customer_bank_set_input
  ) {
    update_wms_customer_bank(
      where: { id: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`


export const FilterBank = gql`
  query  wms_customer_bank ($code: String, $code1: String,) {
     wms_customer_bank(where: {gcif_number: {_eq: $code}, _and: {bank: {dropdown_details_desc: {_eq:  $code1}}}}) {
      account_number
      created_by
      created_date
      gcif_number
      id
      id_account_type
      id_bank_info
      id_currency
      id_status
      modified_by
      modified_date
      account_type {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      bank {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      currency {
        currencies_desc
        currencies_code
        id
      }
      status {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
    }
  }
`