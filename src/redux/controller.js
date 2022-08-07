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

export const postNewProductController = productData => {
  return new Promise((resolve, reject) => {
    let path = Paths.postNewProduct;
    API.post(path, productData)
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
