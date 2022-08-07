import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
} from './types';
import {
  getAllProductsController,
  getAllCategoriesController,
  postNewProductController,
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

export const postNewProduct = productData => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      const response = await postNewProductController(productData);
      if (response.ok) {
        resolve(response.data);
      } else {
        reject(response.originalError.message);
      }
    });
  };
};
