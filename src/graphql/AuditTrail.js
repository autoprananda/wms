import gql from 'graphql-tag'

// insert table
export const InsertAuditTrail = gql`
  mutation insert_wms_audit_trail(
    $objects: [wms_audit_trail_insert_input!]!
  ) {
    insert_wms_audit_trail(objects: $objects) {
      affected_rows
    }
  }
`

// View:  get all field from master_client
export const GetAuditTrail = gql`
  query wms_audit_trail {
    wms_audit_trail(order_by: {created_date: desc}) {
    id
    action_button
    apporval
    date_auditrail
    menu
    username 
    fullname
    submenu
    created_by
    created_date
    modified_by
    modified_date
    }
  }
`
// View:  get all field from master_client
export const GetAuditTrailAll = gql`
  query wms_audit_trail {
    wms_audit_trail(order_by: {created_date: desc}) {
    id
    action_button
    apporval
    date_auditrail
    menu
    username 
    fullname
    submenu
    created_by
    created_date
    modified_by
    modified_date
    }
  }
`
// View:  get all field from master_client
export const GetAuditTrailAllPerPage = gql`
  query wms_audit_trail($limit: Int, $offset: Int) {
    wms_audit_trail(order_by: {created_date: desc}, limit: $limit, offset: $offset) {
    id
    action_button
    apporval
    date_auditrail
    menu
    username 
    fullname
    submenu
    created_by
    created_date
    modified_by
    modified_date
    }
  }
`
export const GetAllSearchDataAuditTrailPerPage = gql`
query wms_audit_trail ($code: String, $code1: String, $code2: String, $limit: Int, $offset: Int) {
  wms_audit_trail(order_by: {created_date: desc}, limit: $limit, offset: $offset, where: {_and: {username: {_ilike: $code}, fullname: {_ilike: $code1}, action_button: {_eq: $code2}}}) {
    id
    action_button
    apporval
    created_by
    created_date
    date_auditrail
    fullname
    menu
    modified_by
    modified_date
    submenu
    username
  }
}
`
export const SearchDataAuditTrail = gql`
query wms_audit_trail ($code: String, $code1: String, $code2: String) {
  wms_audit_trail(order_by: {created_date: desc}, where: {_and: {username: {_ilike: $code}, fullname: {_ilike: $code1}, action_button: {_eq: $code2}}}) {
    id
    action_button
    apporval
    created_by
    created_date
    date_auditrail
    fullname
    menu
    modified_by
    modified_date
    submenu
    username
  }
}
`
