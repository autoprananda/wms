import gql from 'graphql-tag'

// get all field from WMS_Master_SubMenu
export const GetAllMasterSubMenu = gql`
query wms_submenu {
  wms_submenu (order_by: {order_key: asc}){
    id_submenu 
    submenu_desc
    submenu_code
    path 
    order_key 
    modified_date
    modified_by
    created_by
    created_date
    menu {
      id_menu
      menu_code
      menu_desc
    }
  }
}
`

// delete WMS_Master_SubMenu
export const DelMasterSubMenu = gql`
  mutation delete_wms_submenu($code: Int!) {
    delete_wms_submenu(where: { id_submenu: { _eq: $code } }) {
      affected_rows
    }
  }
`

// delete RoleConfiguration
export const DelMasterRoleConfiguration = gql`
  mutation delete_wms_configuration($code: Int!) {
    delete_wms_configuration(where: { id_submenu: { _eq: $code } }) {
      affected_rows
    }
  }
`

// insert WMS_Master_SubMenu
export const InsMasterSubMenu = gql`
mutation insert_wms_submenu(
    $objects: [wms_submenu_insert_input!]!
  ) {
    insert_wms_submenu(objects: $objects) {
      affected_rows
    }
  }
`

// edit WMS_Master_SubMenu
export const EditMasterSubMenu = gql`
  mutation update_wms_submenu(
    $code: String
    $changes: wms_submenu_set_input
  ) {
    update_wms_submenu(
      where: { submenu_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
