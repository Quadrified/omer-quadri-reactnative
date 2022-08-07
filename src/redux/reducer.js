import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_INDIVIDUAL_PRODUCT,
  FETCH_INDIVIDUAL_PRODUCT_ERROR,
  POST_NEW_PRODUCT,
  POST_NEW_PRODUCT_ERROR,
  FETCH_INDIVIDUAL_CATEGORY,
  FETCH_INDIVIDUAL_CATEGORY_ERROR,
  FETCH_SEARCH_RESULT,
  CLEAR_SEARCH_RESULT,
} from './types';

const initialState = {
  productsData: [],
  categoryData: [],
  searchData: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        productsData: action.payload,
      };
    }
    case FETCH_PRODUCTS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FETCH_CATEGORIES: {
      return {
        ...state,
        categoryData: action.payload,
      };
    }
    case FETCH_CATEGORIES_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    // case FETCH_INDIVIDUAL_PRODUCT: {
    //   return {
    //     ...state,
    //     userData: action.payload,
    //   };
    // }
    // case FETCH_INDIVIDUAL_PRODUCT_ERROR: {
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // }
    // case CLEAR_SEARCH_RESULT: {
    //   return {
    //     ...state,
    //     searchData: action.payload,
    //   };
    // }

    default: {
      return state;
    }
  }
};

export default reducer;
