import gql from 'graphql-tag'

// untuk insert table
export const insertRedemption = gql`
  mutation insert_wms_redemption(
    $objects: [wms_redemption_insert_input!]!
  ) {
    insert_wms_redemption(objects: $objects) {
      affected_rows
    }
  }
`
export const GetGenerateRedemNo = gql`
  query wms_redemption {
    wms_redemption(limit: 1, order_by: {transaction_no: desc}) {
      transaction_no
    }
  }
`
export const getDataRedemption = gql`
  query wms_redemption ($code: String) {
    wms_redemption(order_by: {created_date: desc}, where: {gcif_number: {_eq: $code}}) {
    available_balance
    bank
    bank_account_no
    bank_account_type
    bank_branch
    bank_currency
    bank_remark
    created_by
    created_date
    currency
    customer
    customer_group
    distribution_of_sales
    gcif_number
    id_product
    id_redemption
    last_nav_amount
    last_nav_date
    method_of_sales
    mutual_fund
    net_fee_amount
    opening_date
    outstanding_unit
    posting_date
    product
    redempt_all
    redemption_unit
    reference_no
    remark
    sales_name
    subscription_no
    tax_fee_amount
    total_fee_amount
    total_payment_amount
    transaction_no
    trc_branch
    trc_date
    value_amount
      products {
        id_product
        tax_rate
        subs_fee
        redempt_fee
        prod_desc
      }
    }
  }
`
export const ValidationRedemption = gql`
query MyQuery ($code: String) {
  wms_subscription(where: {gcif_number: {_eq: $code}}) {
    subscription_no
  }
}
`
