export const getHomeProductData = state => {
  return state.MainReducer.productsData.products;
};

export const getHomeCategoryData = state => {
  return state.MainReducer.categoryData.categories;
};
