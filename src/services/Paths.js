/** --------------------------
    All API endpoint URLs/paths
 --------------------------**/
const API_PATHS = {
  getAllProducts: '/products',
  getIndividualProduct: '/products/:id',
  postNewProduct: '/products',
  getAllCategories: '/categories',
  getIndividualCategory: '/categories/:id',
};

export default {
  ...API_PATHS,
};
