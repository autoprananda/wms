import gql from 'graphql-tag'

// get all field from Countries
export const GetAllCountries = gql`
  query wms_countries {
    wms_countries (order_by: {created_date: desc}) {
      id_country
      country_code
      country_name
      created_date
      created_by
      modified_by
      modified_date 
    }
  }
`
// get only date n name field from Countries
export const GetMasterCountries = gql`
  query wms_countries {
    wms_countries {
      id_country
      country_code
      country_name
    }
  }
`
// delete Countries
export const DelMasterCountries = gql`
  mutation delete_wms_countries($code: Int!) {
    delete_wms_countries(where: { id_country: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert into Countries
export const InsMasterCountries = gql`
mutation insert_wms_countries(
    $objects: [wms_countries_insert_input!]!
  ) {
    insert_wms_countries(objects: $objects) {
      affected_rows
    }
  }
`

// edit
export const EditMasterCountries = gql`
  mutation update_wms_countries(
    $code: String
    $changes: wms_countries_set_input
  ) {
    update_wms_countries(
      where: { country_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
