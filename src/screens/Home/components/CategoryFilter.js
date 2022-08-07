import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppColors from '../../../themes/AppColors';
import AppFonts from '../../../themes/AppFonts';

const CategoryFilter = ({ categoryData, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const onCategorySelect = category => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}>
        <View
          style={
            selectedCategory === 'All'
              ? styles.selectedCategory
              : styles.filterContainer
          }>
          <TouchableOpacity onPress={() => onCategorySelect('All')}>
            <Text
              style={
                selectedCategory === 'All'
                  ? styles.selectedCategoryTitle
                  : styles.categoryTitle
              }>
              All
            </Text>
          </TouchableOpacity>
        </View>
        {categoryData?.map(({ name: categoryName, _id }) => (
          <View
            style={
              selectedCategory === categoryName
                ? styles.selectedCategory
                : styles.filterContainer
            }
            key={_id}>
            <TouchableOpacity onPress={() => onCategorySelect(categoryName)}>
              <Text
                style={
                  selectedCategory === categoryName
                    ? styles.selectedCategoryTitle
                    : styles.categoryTitle
                }>
                {categoryName}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  filterContainer: {
    borderWidth: 0.5,
    borderColor: AppColors.primary,
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  selectedCategory: {
    marginHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: AppColors.primary,
  },
  categoryTitle: {
    fontFamily: AppFonts.Bold,
    fontSize: 14,
    color: AppColors.dark,
  },
  selectedCategoryTitle: {
    fontFamily: AppFonts.ExtraBold,
    fontSize: 14,
    color: AppColors.white,
  },
});

export default CategoryFilter;
