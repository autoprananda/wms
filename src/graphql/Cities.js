import gql from 'graphql-tag'

// get all field from WMS_Corporate_Message
export const GetAllMasterCities = gql`
  query wms_cities {
    wms_cities (order_by: {created_date: desc}) {
      city_name
      created_by
      created_date
      id_city
      id_region
      modified_by
      modified_date
      region {
        id_region
        region_name
      }
    }
  }
`
// get only date n name field from WMS_Corporate_Message
export const GetMasterCities = gql`
  query wms_cities {
    wms_cities {
      id_city
      city_name
    }
  }
`
// delete WMS_Corporate_Message
export const DelMasterCities = gql`
  mutation delete_wms_cities($code: Int!) {
    delete_wms_cities(where: { id_city: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert InsMasterContentNews
export const InsMasterCities = gql`
mutation insert_wms_cities(
    $objects: [wms_cities_insert_input!]!
  ) {
    insert_wms_cities(objects: $objects) {
      affected_rows
    }
  }
`

// edit
export const EditMasterCities = gql`
  mutation update_wms_cities(
    $code: String
    $changes: wms_cities_set_input
  ) {
    update_wms_cities(
      where: { city_name: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
