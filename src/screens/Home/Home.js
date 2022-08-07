import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, getAllCategories } from '../../redux/actions';
import { getHomeCategoryData, getHomeProductData } from '../../redux/selectors';
import styles from './styles';
import AppColors from '../../themes/AppColors';
import AppHeader from '../../components/AppHeader';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import { REFRESH_PROPS } from '../../utils/constants';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productData, setProductData] = useState(null);

  const dispatch = useDispatch();
  const allProductsData = useSelector(state => getHomeProductData(state));
  const categoryData = useSelector(state => getHomeCategoryData(state));

  // console.log('>>>allProductsData<<<', allProductsData);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(data => {
        if (data.ok) {
          dispatch(getAllCategories())
            .then(() => {
              setProductData(data?.data?.products);
              setIsLoading(false);
            })
            .catch(error => {
              console.log('Caught in home -> getAllCategories', error);
            });
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('Caught in home -> getAllProducts', error);
      });
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    dispatch(getAllProducts())
      .then(data => {
        if (data) {
          dispatch(getAllCategories())
            .then(() => {
              setProductData(allProductsData);
              setSelectedCategory('All');
              setRefreshing(false);
              setIsLoading(false);
            })
            .catch(error => {
              console.log('Caught in home -> getAllCategories', error);
            });
        }
      })
      .catch(error => {
        setRefreshing(false);
        setIsLoading(false);
        console.log('Caught in home -> onRefreshCallback', error);
      });
  }, [allProductsData, dispatch]);

  const onSelectCategory = category => {
    // setIsLoading(true);
    setSelectedCategory(category);
    filterSelectedCategoryProducts(category);
  };

  const filterSelectedCategoryProducts = category => {
    if (category === 'All') {
      console.log('>>>all<<<', allProductsData);
      setProductData(allProductsData);
      return;
    }
    const filteredData = allProductsData.filter(
      data => data.category === category,
    );
    console.log('>>>filteredData<<<', filteredData);
    setProductData(filteredData);
    // setIsLoading(false);
  };

  const onSelectProduct = productID => {
    console.log('>>>productID<<<', productID);
    // navigation.navigate('Post', { productID });
  };

  // const onCreateNewProduct = authorID => {
  //   navigation.navigate('Add Product');
  // };

  return (
    <>
      <AppHeader title="Home" />
      {isLoading ? (
        <ActivityIndicator animating size={50} style={styles.loader} />
      ) : (
        <View style={styles.container}>
          <CategoryFilter
            categoryData={categoryData}
            onSelectCategory={onSelectCategory}
          />
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[AppColors.primary]}
                {...REFRESH_PROPS}
              />
            }
            numColumns={2}
            data={productData}
            keyExtractor={data => data._id}
            renderItem={({
              item: {
                _id,
                avatar: productImage,
                name,
                category,
                price,
                developerEmail: productAuthor,
              },
            }) => (
              <ProductCard
                productID={_id}
                productImage={productImage}
                productTitle={name}
                productCategory={category}
                productPrice={price}
                productAuthor={productAuthor}
                onSelectProduct={onSelectProduct}
                selectedCategory={selectedCategory}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default Home;
