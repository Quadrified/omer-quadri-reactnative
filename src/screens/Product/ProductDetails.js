import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../../components/AppHeader';
import { getHomeProductData } from '../../redux/selectors';
import AppColors from '../../themes/AppColors';
import AppFonts from '../../themes/AppFonts';

const ProductDetails = ({ route }) => {
  const allProductsData = useSelector(state => getHomeProductData(state));

  return (
    <>
      <AppHeader title="Product Details" />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {allProductsData
            .filter(product => product._id === route.params?.productID)
            .map(
              ({
                _id,
                avatar: productImage,
                name,
                price,
                category,
                developerEmail: productAuthor,
                updatedAt,
                description,
              }) => (
                <View key={_id}>
                  <Image
                    source={{ uri: productImage }}
                    style={styles.postCoverImage}
                  />
                  <View style={styles.productDetailsContainer}>
                    <Text style={styles.productTitle}>{name}</Text>
                    <Text style={styles.productPrice}>${price}</Text>
                    <View style={styles.details}>
                      <MaterialIcons
                        name="category"
                        size={18}
                        color={AppColors.secondary}
                      />
                      <Text style={styles.category}>{category}</Text>
                    </View>
                    <View style={styles.details}>
                      <MaterialIcons
                        name="person"
                        size={18}
                        color={AppColors.secondary}
                      />
                      <Text style={styles.author} numberOfLines={0}>
                        {productAuthor}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <MaterialIcons
                        name="watch-later"
                        size={18}
                        color={AppColors.secondary}
                      />
                      <Text style={styles.category} numberOfLines={0}>
                        {moment(updatedAt).format('MMMM Do, YYYY')}
                      </Text>
                    </View>
                    <View style={styles.itemSeparator} />
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.emptyView} />
                  </View>
                </View>
              ),
            )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  postCoverImage: {
    alignSelf: 'center',
    width: 300,
    height: 400,
    aspectRatio: 1,
  },
  productDetailsContainer: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productTitle: {
    fontFamily: AppFonts.Medium,
    fontSize: 18,
    color: AppColors.dark,
  },
  productPrice: {
    fontFamily: AppFonts.Bold,
    fontSize: 25,
    color: AppColors.dark,
    marginVertical: 10,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontFamily: AppFonts.Medium,
    fontSize: 16,
    color: AppColors.dark,
    margin: 7,
  },
  author: {
    fontFamily: AppFonts.Medium,
    fontSize: 16,
    color: AppColors.primary,
    margin: 7,
  },
  itemSeparator: {
    height: 5,
    backgroundColor: AppColors.dark,
    opacity: 0.1,
    marginHorizontal: -20,
  },
  description: {
    fontFamily: AppFonts.Medium,
    fontSize: 15,
    color: AppColors.dark,
    padding: 5,
    marginVertical: 10,
  },
  emptyView: {
    height: 50,
  },
});

export default ProductDetails;
