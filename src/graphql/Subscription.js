import gql from 'graphql-tag'

// untuk insert table
export const InsertSubscription = gql`
  mutation insert_wms_subscription(
    $objects: [wms_subscription_insert_input!]!
  ) {
    insert_wms_subscription(objects: $objects) {
      affected_rows
    }
  }
`
export const GetGenerateSubsNo = gql`
  query wms_subscription {
    wms_subscription(limit: 1, order_by: {subscription_no: desc}) {
      subscription_no
    }
  }
`

// View:  get all field from master_client
export const ViewSubscription = gql`
  query wms_subscription {
    wms_subscription {
      id_subscription
      gcif_number
      customer_name
      id_product_category
      id_product
      currency
      opening_date
      remark
      id_bank
      bank_account_no
      bank_currency
      bank_account_type
      bank_branch
      bank_remark
      trc_branch
      sales_name
      customer_group
      reference_no
      mutual_fund
      distribution_of_sales
      trc_date
      method_of_sales
      posting_date
      subscription_no
    }
  }
`
