import gql from 'graphql-tag'

// get all field from WMS_Product_Code
export const GetAllMasterProdCode = gql`
  query wms_products {
    wms_products(order_by: { id_product: desc }) {
      fund_manager 
      account_name
      account_number
      bank_account_no
      beneficiary_name
      created_by
      created_date
      id_account_type
      id_branch
      id_charac_mutual_fund
      id_currency
      id_custody_bank
      id_distribution_of_sales
      id_dividend_reinvested
      id_method_of_sales
      id_prod_cat
      id_prod_type
      id_product
      id_settlement_periode
      modified_by
      modified_date
      prod_desc
      product_code
      remark
      account_type {
        id_dropdownlist_detail
        dropdown_details_desc
        dropdown_details_code
      }
      classification {
        id_dropdownlist_detail
        dropdown_details_desc
        dropdown_details_code
      }
      branch {
        id_branch
        branch_manager_name
        branch_name
      }
      currencies {
        id
        currencies_desc
        currencies_code
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
        dropdown_details_desc
        dropdown_details_code
        id_dropdownlist_detail
      }
    }
  }
`

export const DelMasterProdCode = gql`
  mutation delete_wms_products($code: Int!) {
    delete_wms_products(where: { id_product: { _eq: $code } }) {
      affected_rows
    }
  }
`

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

export const InsertProduct = gql`
  mutation insert_wms_products(
    $objects: [wms_products_insert_input!]!
  ) {
    insert_wms_products(objects: $objects) {
      affected_rows
    }
  }
`