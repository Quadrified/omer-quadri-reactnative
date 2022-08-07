import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppColors from '../themes/AppColors';
import Pricing from '../assets/svgs/price-tag.svg';
import AppFonts from '../themes/AppFonts';

const PricingContainer = ({ price }) => {
  return (
    <View style={styles.container}>
      <Pricing width={100} height={40} />
      <View style={styles.pricingContainer}>
        <Text style={styles.priceTextStyle}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
  },
  pricingContainer: {
    position: 'absolute',
    bottom: 7,
    left: 15,
  },
  priceTextStyle: {
    fontFamily: AppFonts.Bold,
    fontSize: 16,
    color: AppColors.white,
  },
});

export default PricingContainer;
