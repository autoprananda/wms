/* eslint template-tag-spacing: ["error", "always"] */
/* eslint template-tag-spacing: "error" */
/* eslint-env es6 */
import gql from 'graphql-tag'

// untuk insert table
export const InsertDropDownListDetail = gql`
  mutation insert_wms_dropdownlist_details(
    $objects: [wms_dropdownlist_details_insert_input!]!
  ) {
    insert_wms_dropdownlist_details(objects: $objects) {
      affected_rows
    }
  }
`

// View:  get all field from master_dropdownlist_header

export const ViewDropDownListDetail = gql`
  query wms_dropdownlist_details ($code: Int!){
    wms_dropdownlist_details(where: { id_dropdowns: { _eq: $code } }) {
      created_by
      created_date
      dropdown_details_code
      dropdown_details_desc
      id_dropdownlist_detail
      id_dropdowns
      modified_by
      modified_date
    }
  }
`
// delete
export const DeleteDropDownListDetail = gql`
  mutation delete_wms_dropdownlist_details($code: Int!) {
    delete_wms_dropdownlist_details(where: { id_dropdownlist_detail : { _eq: $code } }) {
      affected_rows
    }
  }
`
// edit
export const EditDropDownListDetail = gql`
  mutation update_wms_dropdownlist_details(
    $code: Int!
    $changes: wms_dropdownlist_details_set_input
  ) {
    update_wms_dropdownlist_details(
      where: { id_dropdownlist_detail: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
// get Detail
export const GetDropDown = gql`
query wms_dropdownlist_details($code: String){
  wms_dropdownlist_details(where: {dropdown_list: {dropdown_desc: {_eq: $code}}}) {
    dropdown_details_desc
    id_dropdownlist_detail
    dropdown_details_code
  }
}
`

// get Detail
export const GetDropDownPeriode = gql`
query wms_dropdownlist_details($code: String) {
  wms_dropdownlist_details(where: {dropdown_list: {dropdown_desc: {_eq: $code}}}, order_by: {dropdown_details_desc: desc}) {
    dropdown_details_desc
    id_dropdownlist_detail
    dropdown_details_code
  }
}
`
