/* eslint template-tag-spacing: ["error", "always"] */
/* eslint template-tag-spacing: "error" */
/* eslint-env es6 */
import gql from 'graphql-tag'

// untuk insert table
export const InsertDropDownList = gql`
  mutation insert_wms_dropdown_lists(
    $objects: [wms_dropdown_lists_insert_input!]!
  ) {
    insert_wms_dropdown_lists(objects: $objects) {
      affected_rows
    }
  }
`

// View:  get all field from master_dropdownlist_header

export const ViewDropDownList = gql`
  query wms_dropdown_lists {
    wms_dropdown_lists {
      created_by
      created_date
      dropdown_code
      dropdown_desc
      id_dropdown
      modified_by
      modified_date
    }
  }
`
// delete
export const DeleteDropDownList = gql`
  mutation delete_wms_dropdown_lists($code: Int!) {
    delete_wms_dropdownlist_details(where: {id_dropdowns: {_eq: $code}}) {
      affected_rows
    }
    delete_wms_dropdown_lists(where: { id_dropdown: { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const EditDropDownList = gql`
  mutation update_wms_dropdown_lists(
    $code: Int!
    $changes: wms_dropdown_lists_set_input
  ) {
    update_wms_dropdown_lists(
      where: { id_dropdown: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
