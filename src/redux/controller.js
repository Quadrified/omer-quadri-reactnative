import { api as API } from '../services/Api';
import Paths from '../services/Paths';

export const getAllProductsController = () => {
  return new Promise((resolve, reject) => {
    let path = Paths.getAllProducts;
    API.get(path)
      .then(response => {
        if (response.ok) {
          resolve(response);
        }
      })
      .catch(error => {
        console.log('>>>error in getAllProductsController<<<', error);
        reject(error);
      });
  });
};

export const getAllCategoriesController = () => {
  return new Promise((resolve, reject) => {
    let path = Paths.getAllCategories;
    API.get(path)
      .then(response => {
        if (response.ok) {
          resolve(response);
        }
      })
      .catch(error => {
        console.log('>>>error in getAllCategoriesController<<<', error);
        reject(error);
      });
  });
};

export const getIndividualProductController = productID => {
  return new Promise((resolve, reject) => {
    let path = Paths.getIndividualProduct;
    path = path.replace(':id', productID);
    API.get(path)
      .then(response => {
        if (response.ok) {
          resolve(response);
        }
      })
      .catch(error => {
        console.log('>>>error in getIndividualProductController<<<', error);
        reject(error);
      });
  });
};

export const getIndividualCategoryController = categoryID => {
  return new Promise((resolve, reject) => {
    let path = Paths.getIndividualCategory;
    path = path.replace(':id', categoryID);
    API.get(path)
      .then(response => {
        if (response.ok) {
          resolve(response);
        }
      })
      .catch(error => {
        console.log('>>>error in getIndividualCategoryController<<<', error);
        reject(error);
      });
  });
};
