import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, AnimatedFAB } from 'react-native-paper';
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
  const [isExtended, setIsExtended] = useState(true);

  const dispatch = useDispatch();
  const allProductsData = useSelector(state => getHomeProductData(state));
  const categoryData = useSelector(state => getHomeCategoryData(state));

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  useFocusEffect(
    useCallback(() => {
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
    }, [dispatch]),
  );

  // useEffect(() => {
  //   dispatch(getAllProducts())
  //     .then(data => {
  //       if (data.ok) {
  //         dispatch(getAllCategories())
  //           .then(() => {
  //             setProductData(data?.data?.products);
  //             setIsLoading(false);
  //           })
  //           .catch(error => {
  //             console.log('Caught in home -> getAllCategories', error);
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       setIsLoading(false);
  //       console.log('Caught in home -> getAllProducts', error);
  //     });
  // }, [dispatch]);

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
    navigation.navigate('ProductDetails', { productID });
  };

  // const onCreateNewProduct = authorID => {
  //   navigation.navigate('AddProduct');
  // };

  return (
    <>
      <AppHeader title="Home" />
      {isLoading ? (
        <ActivityIndicator animating size={50} style={styles.loader} />
      ) : (
        <>
          <ScrollView
            style={styles.container}
            onScroll={onScroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[AppColors.primary]}
                {...REFRESH_PROPS}
              />
            }>
            <CategoryFilter
              categoryData={categoryData}
              onSelectCategory={onSelectCategory}
            />
            <FlatList
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
          </ScrollView>
          <AnimatedFAB
            extended={isExtended}
            color={AppColors.white}
            iconMode="dynamic"
            icon="plus"
            animateFrom="right"
            label="  Add Product"
            style={styles.fab}
            onPress={() => navigation.navigate('AddProduct')}
          />
        </>
      )}
    </>
  );
};

export default Home;
