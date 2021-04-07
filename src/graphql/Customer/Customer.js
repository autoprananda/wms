import gql from 'graphql-tag'

// get all field from individual
export const InsertCustomer = gql`
  mutation insert_wms_customer(
    $objects: [wms_customer_insert_input!]!
  ) {
    insert_wms_customer(objects: $objects) {
      affected_rows
    }
  }
`
export const getDataCustomer = gql`
  query wms_customer {
    wms_customer (order_by: {created_date: desc}) {
    country_of_birth
    created_by
    created_date
    data_last_update
    date_of_birth
    first_name
    fullname
    gcif_number
    id
    id_branch
    id_country
    id_customer_group
    id_educational
    id_expiration_date
    id_gender
    id_income_level
    id_investment_object
    id_issuance_country
    id_lob
    id_marital
    id_nationality
    id_number
    id_registration_date
    id_religion
    id_salutation
    id_status
    id_type
    last_name
    middle_name
    mother_maiden_name
    place_of_birth
    registration_date
    sales_name
    tax_id
    tin_number
    modified_date
    modified_by
      nationality {
        id_dropdownlist_detail
        dropdown_details_desc
      }
      country {
        country_code
        country_name
        id_country
      }
      status {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      type_id {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      salutation {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      gender {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      religion {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      marital {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      educational {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      investment_object {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      income_level {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      branch {
        branch_name
        id_branch
      }
      customer_group {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      lob {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      issuance_country {
        country_name
        country_code
        id_country
      }
    }
  }
`

export const GetGenerateCIF = gql`
  query wms_customer {
    wms_customer(limit: 1, order_by: {created_date: desc}) {
      gcif_number
    }
  }
`
export const DeleteCustomer = gql`
  mutation delete_wms_customer($code: String) {
    delete_wms_customer(where: { gcif_number: { _eq: $code } }) {
      affected_rows
    }
  }
`

export const EditCustomer = gql`
  mutation update_wms_customer(
    $code: String
    $changes: wms_customer_set_input
  ) {
    update_wms_customer(
      where: { gcif_number: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
