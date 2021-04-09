import gql from 'graphql-tag'

// untuk insert table
export const insertArea = gql`
  mutation insert_wms_area(
    $objects: [wms_area_insert_input!]!
  ) {
    insert_wms_area(objects: $objects) {
      affected_rows
    }
  }
`

// View:  get all field from master_client
export const viewArea = gql`
  query wms_area {
    wms_area (order_by: {created_date: desc}) {
      id_area
      area_code
      area_name
      created_by
      created_date
      modified_by
      modified_date
    }
  }
`

// delete
export const deleteArea = gql`
  mutation delete_wms_area($code: Int!) {
    delete_wms_area(where: { id_area: { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const editArea = gql`
  mutation update_wms_area(
    $code: Int!
    $changes: wms_area_set_input
  ) {
    update_wms_area(
      where: { id_area: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
