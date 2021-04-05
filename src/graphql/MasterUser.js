import gql from 'graphql-tag'

// untuk insert table
export const Register = gql`
  mutation insert_wms_m_user(
    $objects: [wms_m_user_insert_input!]!
  ) {
    insert_wms_m_user(objects: $objects) {
      affected_rows
    }
  }
`
export const GetUser = gql`
  query wms_m_user ($code: String){
    wms_m_user(where: {username: {_eq: $code}}) {
      password
      username
      fullname
      id
    }
  }
`