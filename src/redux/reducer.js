import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
} from './types';

const initialState = {
  productsData: [],
  categoryData: [],
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

    default: {
      return state;
    }
  }
};

export default reducer;
