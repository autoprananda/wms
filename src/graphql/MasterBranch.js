import gql from 'graphql-tag'

// get all field from WMS_User_Registration
export const GetAllBranch = gql`
query wms_branches {
  wms_branches {
    id_branch
    branch_code
    branch_manager_name
    branch_name
    id_region
    id_status
    modified_by
    modified_date
    created_by
    created_date
    region {
      region_name
      id_region
    }
    status {
      dropdown_details_desc
      id_dropdownlist_detail
    }
    area {
      area_code
      id_area
      area_name
    }
  }
}
`
export const GetBranch = gql`
query wms_branches {
  wms_branches {
    branch_name
    id_branch
  }
}
`

export const GetBranchbyUser = gql`
query wms_branches ($code: String) {
  wms_branches (where: { branch_name: { _eq: $code }}) {
    id_branch
    branch_code
    branch_manager_name
    branch_name
  }
}
`

// delete WMS_User_Registration
export const DelBranch = gql`
  mutation delete_wms_branches($code: Int!) {
    delete_wms_branches(where: { id_branch: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert WMS_User_Registration
export const InsBranch = gql`
mutation insert_wms_branches(
    $objects: [wms_branches_insert_input!]!
  ) {
    insert_wms_branches(objects: $objects) {
      affected_rows
    }
  }
`

// edit WMS_User_Registration
export const EditBranch = gql`
  mutation update_wms_branches(
    $code: Int!
    $changes: wms_branches_set_input
  ) {
    update_wms_branches(
      where: { id_branch: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
