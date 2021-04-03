import gql from 'graphql-tag'

// get all field from WMS_Product_Code
export const GetMasterProductForChart = gql`
  query wms_products {
    wms_products(order_by: { id_product: desc }) {
      id_product
      prod_desc
      product_code
      created_by
      created_date
    }
  }
`
// get all field from WMS_Product_Code
export const GetAllMasterProdCode = gql`
  query wms_products {
    wms_products(order_by: { id_product: desc }) {
      account_name
      account_number
      bank_account_no
      beneficiary_name
      created_by
      created_date
      id_account_type
      id_branch
      id_charac_mutual_fund
      id_classification
      id_currency
      id_custody_bank
      id_customer_segment
      id_distribution_of_sales
      id_dividend_reinvested
      id_fund_manager
      id_method_of_sales
      id_pricing_list
      id_prod_cat
      id_prod_type
      id_product
      id_settlement_periode
      modified_by
      modified_date
      prod_desc
      product_code
      remark
      auto_subscription
      account_type {
        id_dropdownlist_detail
        dropdown_details_desc
        dropdown_details_code
      }
      branch {
        id_branch
        branch_manager_name
        branch_name
      }
      classification {
        profile_name_desc
        max_score
        min_score
        id_risk_profiles_rules
      }
      currencies {
        id
        currencies_desc
        currencies_code
      }
      customer_segment {
        id_dropdownlist_detail
        dropdown_details_desc
        dropdown_details_code
      }
      distribution_of_sales {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      dividend_reinvested {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
      fund_manager {
        id_fund_managers
        fund_managers_code
        fund_managers_name
      }
      method_of_sales {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
      mutual_fund {
        dropdown_details_code
        dropdown_details_desc
        id_dropdownlist_detail
      }
      pricing_lists {
        id_price
        price_name
        balance_of_unit_after_redempt
        created_by
        employee_min_subs
        created_date
        initial_nav
        management_fee
        max_redempt_fee
        max_redempt_percent
        max_subs_amount
        max_subs_fee
        max_subs_topup
        max_unit
        max_unit_percent
        min_redempt_fee
        min_subs_amount
        min_subs_fee
        min_subs_topup
        modified_by
        modified_date
        price_code
        quota_amount
        quota_unit
        redempt_amount
        redempt_fee
        redempt_unit
        subs_fee
        switching_unit
        switching_amount
        tax
        tax_rate
      }
      product_category {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
      product_type {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
      settlement_periode {
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
      reference_cust_bank {
        id_reference_custodian_bank
        reference_custodian_bank_code
        reference_custodian_bank_name
      }
    }
  }
`

export const GetMasterProdCode = gql`
  query wms_products {
    wms_products(order_by: { id_product: desc }) {
      account_name
      account_number
      bank_account_no
      beneficiary_name
      created_by
      created_date
      id_account_type
      id_branch
      id_charac_mutual_fund
      id_classification
      id_currency
      id_custody_bank
      id_customer_segment
      id_distribution_of_sales
      id_dividend_reinvested
      id_fund_manager
      id_method_of_sales
      id_pricing_list
      id_prod_cat
      id_prod_type
      id_product
      id_settlement_periode
      prod_desc
      product_code
      remark
      auto_subscription
    }
  }
`

// delete WMS_Product_Code
export const DelMasterProdCode = gql`
  mutation delete_wms_products($code: Int!) {
    delete_wms_products(where: { id_product: { _eq: $code } }) {
      affected_rows
    }
  }
`
// insert WMS_Product_Code
export const InsMasterProdCode = gql`
  mutation insert_wms_products($objects: [wms_products_insert_input!]!) {
    insert_wms_products(objects: $objects) {
      affected_rows
    }
  }
`

// edit WMS_Product_Code
export const EditMasterProdCode = gql`
  mutation update_wms_products(
    $code: String
    $changes: wms_products_set_input
  ) {
    update_wms_products(
      where: { product_code: { _eq: $code } }
      _set: $changes
    ) {
      affected_rows
    }
  }
`
export const GetPrdouct = gql`
  query wms_products {
    wms_products {
      id_product
      id_account_type
      prod_desc
      product_code
      auto_subscription
      classification {
        profile_name_desc
        max_score
        min_score
        id_risk_profiles_rules
      }
      account_type {
        id_dropdownlist_detail
        dropdown_details_desc
        dropdown_details_code
      }
    }
  }
`
export const ActionsInsMasterProdCode = gql`
  mutation MyMutation($objects: [InsertWmsProductsWmsProductsInsertInput!]!) {
    action_insert_wms_products(objects: $objects) {
      affected_rows
    }
  }
`
