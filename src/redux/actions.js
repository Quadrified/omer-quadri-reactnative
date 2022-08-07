import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_INDIVIDUAL_PRODUCT,
  FETCH_INDIVIDUAL_PRODUCT_ERROR,
  POST_NEW_PRODUCT,
  POST_NEW_PRODUCT_ERROR,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_INDIVIDUAL_CATEGORY,
  FETCH_INDIVIDUAL_CATEGORY_ERROR,
  FETCH_SEARCH_RESULT,
  CLEAR_SEARCH_RESULT,
} from './types';
import {
  getAllProductsController,
  getIndividualProductController,
  getAllCategoriesController,
  getIndividualCategoryController,
} from './controller';

export const fetchProductsData = data => ({
  type: FETCH_PRODUCTS,
  payload: data,
});

export const productsDataError = error => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error,
});

export const fetchCategoryData = data => ({
  type: FETCH_CATEGORIES,
  payload: data,
});

export const categoryDataError = error => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: error,
});

// export const fetchUserData = data => ({
//   type: FETCH_INDIVIDUAL_PRODUCT,
//   payload: data,
// });

// export const userDataError = error => ({
//   type: FETCH_INDIVIDUAL_PRODUCT_ERROR,
//   payload: error,
// });

// export const clearSearchResult = () => ({
//   type: CLEAR_SEARCH_RESULT,
//   payload: [],
// });

// export const fetchResultData = data => ({
//   type: FETCH_CATEGORIES,
//   payload: data,
// });

// export const resultDataError = error => ({
//   type: FETCH_CATEGORIES_ERROR,
//   payload: error,
// });

export const getAllProducts = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const response = await getAllProductsController();
      if (response.ok) {
        dispatch(fetchProductsData(response.data));
        resolve(response);
      } else {
        dispatch(productsDataError(response.originalError.message));
        reject(response.originalError.message);
      }
    });
  };
};

export const getAllCategories = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const response = await getAllCategoriesController();
      if (response.ok) {
        dispatch(fetchCategoryData(response.data));
        resolve(response);
      } else {
        dispatch(categoryDataError(response.originalError.message));
        reject(response.originalError.message);
      }
    });
  };
};

// export const fetchSearchData = searchQuery => {
//   return dispatch => {
//     return new Promise(async (resolve, reject) => {
//       const response = await getSearchDataController(searchQuery);
//       if (response.ok) {
//         dispatch(fetchResultData(response.data));
//         resolve(response);
//       } else {
//         dispatch(resultDataError(response.originalError.message));
//         reject(response.originalError.message);
//       }
//     });
//   };
// };
