import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PricingContainer from '../../../components/PricingContainer';
import AppColors from '../../../themes/AppColors';
import AppFonts from '../../../themes/AppFonts';

const ProductCard = ({
  productID,
  productImage,
  productTitle,
  productCategory,
  productPrice,
  productAuthor,
  onSelectProduct,
  selectedCategory,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectProduct(productID)}>
        <View>
          <Image
            source={{ uri: productImage }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <PricingContainer price={productPrice} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {productTitle}
          </Text>
        </View>
        <View style={styles.categoryContainer}>
          {selectedCategory === 'All' && (
            <View style={styles.details}>
              <MaterialIcons
                name="category"
                size={16}
                color={AppColors.secondary}
              />
              <Text style={styles.category}>{productCategory}</Text>
            </View>
          )}
          <View style={styles.details}>
            <MaterialIcons
              name="person"
              size={16}
              color={AppColors.secondary}
            />
            <Text style={styles.category} numberOfLines={0}>
              {productAuthor}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 320,
    margin: 5,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    overflow: 'hidden',
    elevation: 0.5,
  },
  productImage: {
    width: 180,
    height: 200,
  },
  productDetailsContainer: {
    padding: 5,
    height: 50,
  },
  categoryContainer: {
    marginTop: 10,
    padding: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: AppFonts.ExtraBold,
    fontSize: 15,
    color: AppColors.dark,
  },
  category: {
    fontFamily: AppFonts.MediumItalic,
    fontSize: 12,
    color: AppColors.dark,
    paddingLeft: 5,
  },
});

export default ProductCard;
