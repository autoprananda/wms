import gql from 'graphql-tag'

// get all field from WMS_Master_Menu
export const GetAllMasterMenu = gql`
query wms_menu {
  wms_menu (order_by: {order_key: asc}) {
    created_by
    created_date
    id_menu
    menu_code
    menu_desc
    icon 
    order_key
    modified_by
    modified_date
  }
}
`
export const GetMenu = gql`
  query wms_menu {
    wms_menu {
    menu_desc
    menu_code
    id_menu
    icon
    order_key
      submenu {
        path
        order_key
        submenu_desc
        submenu_code
      }
    }
  }
`
// get half field from WMS_Master_Menu
export const GetMasterMenu = gql`
query wms_menu {
  wms_menu {
    id_menu
    menu_code
    menu_desc
  }
}
`
// delete WMS_Master_Menu
export const DelMasterMenu = gql`
  mutation delete_wms_menu($code: String) {
    delete_wms_menu(where: { menu_code: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert WMS_Master_Menu
export const InsMasterMenu = gql`
mutation insert_wms_menu(
    $objects: [wms_menu_insert_input!]!
  ) {
    insert_wms_menu(objects: $objects) {
      affected_rows
    }
  }
`

// edit WMS_Master_Menu
export const EditMasterMenu = gql`
  mutation update_wms_menu(
    $code: String
    $changes: wms_menu_set_input
  ) {
    update_wms_menu(
      where: { menu_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
