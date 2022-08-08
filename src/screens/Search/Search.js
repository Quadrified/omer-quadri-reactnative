import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import _ from 'lodash';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import AppColors from '../../themes/AppColors';
import { useSelector } from 'react-redux';
import { getHomeProductData } from '../../redux/selectors';
import AppHeader from '../../components/AppHeader';
import ProductCard from '../Home/components/ProductCard';

const Search = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResultData, setSearchResultData] = useState(null);

  const searchRef = useRef(null);

  const allProductsData = useSelector(state => getHomeProductData(state));

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const searchProduct = query => {
    if (!query.length) {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      const filteredData = allProductsData.filter(product =>
        product.name.includes(query),
      );
      setSearchResultData(filteredData);
      Keyboard.dismiss();
      setIsLoading(false);
    }, 300);
  };

  const debouncedSearch = _.debounce(searchProduct, 3000);

  const onChangeSearch = query => {
    setIsLoading(true);
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const onPressResult = productID => {
    navigation.navigate('ProductDetails', { productID });
  };

  return (
    <>
      <AppHeader title="Search" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar
            ref={searchRef}
            placeholder="Search for a product"
            onChangeText={onChangeSearch}
            value={searchQuery}
            theme={{ roundness: 10 }}
            clearButtonMode="while-editing"
            clearIcon={() => (
              <Icon name="clear" size={18} color={AppColors.text} />
            )}
          />
        </View>
        <View
          style={styles.searchResultContainer}
          onTouchStart={() => Keyboard.dismiss()}>
          <View>
            {isLoading ? (
              <ActivityIndicator animating size={40} style={styles.loader} />
            ) : (
              <FlatList
                numColumns={2}
                data={searchResultData}
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
                    onSelectProduct={onPressResult}
                  />
                )}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default Search;
