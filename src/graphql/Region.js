import gql from 'graphql-tag'

// untuk insert table
export const InsertRegion = gql`
  mutation insert_wms_region(
    $objects: [wms_region_insert_input!]!
  ) {
    insert_wms_region(objects: $objects) {
      affected_rows
    }
  }
`

// View:  get all field from master_client
export const ViewRegion = gql`
  query wms_region {
    wms_region {
    created_by
    created_date
    id_country
    id_region
    modified_by
    modified_date
    region_code
    region_name
    country {
      country_name
      id_country
    }
    }
  }
`
// delete
export const DeleteRegion = gql`
  mutation delete_wms_region($code: Int!) {
    delete_wms_region(where: { id_region: { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const EditRegion = gql`
  mutation update_wms_region(
    $code: String
    $changes: wms_region_set_input
  ) {
    update_wms_region(
      where: { region_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
export const GetRegion = gql`
  query wms_region {
    wms_region {
    id_country
    id_region
    region_code
    region_name
    country {
      country_name
      id_country
    }
    }
  }
`
