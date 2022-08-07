export const getHomeProductData = state => {
  return state.MainReducer.productsData.products;
};

export const getHomeCategoryData = state => {
  return state.MainReducer.categoryData.categories;
};

// export const getCompleteAuthorData = state => {
//   return state.MainReducer?.userData[0];
// };

// export const getFilteredAuthorName = (state, authorID) => {
//   const authorName = state.MainReducer?.userData?.filter(
//     user => user.id === authorID,
//   )[0]?.username;
//   return authorName;
// };

// export const getSearchData = state => {
//   return state.MainReducer.searchData;
// };
