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
export const getDataSubcription = gql`
  query wms_subscription ($code: String) {
    wms_subscription(order_by: {created_date: desc}, where: {gcif_number: {_eq: $code}}) {
      created_date
      created_by
      modified_by
      modified_date
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
      subscription_amount
      net_fee_amount
      tax_fee_amount
      total_fee_amount
      total_subscription_amount
      total_payment_amount
      balance_amount
      product {
        id_product
        prod_desc
        product_code
        subs_fee
        tax_rate
        redempt_fee
      }
      bank {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      product_category {
        dropdown_details_desc
        id_dropdownlist_detail
      }
    }
  }
`
export const getSubscriptionNo = gql`
  query wms_subscription ($code: String) {
    wms_subscription(where: {gcif_number: {_eq: $code}}, order_by: {created_date: desc}) {
      subscription_no
      remark
      currency
      product {
        id_product
        prod_desc
        product_code
        subs_fee
        tax_rate
        redempt_fee
      }

      id_bank
      bank_account_no
      bank_currency
      bank_account_type
      bank_branch
      bank_remark
      bank {
        dropdown_details_desc
        id_dropdownlist_detail
      }
      trc_branch
      sales_name
      customer_group
      reference_no
      mutual_fund
      distribution_of_sales
      trc_date
      method_of_sales
      posting_date
      net_fee_amount
      tax_fee_amount
      total_fee_amount
      total_subscription_amount
      total_payment_amount
      balance_amount
    }
  }
`
export const UpdateBalanceAmount = gql`
  mutation update_wms_subscription(
    $code: String
    $changes: wms_subscription_set_input
  ) {
    update_wms_subscription(
      where: { subscription_no: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
