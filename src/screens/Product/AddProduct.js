import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getHomeCategoryData } from '../../redux/selectors';
import AppHeader from '../../components/AppHeader';
import AppColors from '../../themes/AppColors';
import AppFonts from '../../themes/AppFonts';
import { postNewProduct } from '../../redux/actions';

const AddProduct = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productAuthor] = useState('omerquadri01@gmail.com');

  const categoryData = useSelector(state => getHomeCategoryData(state));

  const dispatch = useDispatch();

  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const onCategorySelect = category => {
    setProductCategory(category);
  };

  const onAddProduct = () => {
    setIsLoading(true);
    if (
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productImage
    ) {
      Toast.show('Please fill the entire form', Toast.LONG);
      return;
    }
    const productData = {
      name: productName.trim(),
      price: Number(productPrice.trim()),
      category: productCategory.trim(),
      description: productDescription.trim(),
      avatar: productImage.trim(),
      developerEmail: productAuthor.trim(),
    };

    dispatch(postNewProduct(productData))
      .then(response => {
        if (response.message === 'Success') {
          Toast.show('Product added successfully!', Toast.LONG);
          setIsLoading(false);
          navigation.goBack();
        }
      })
      .catch(error => {
        Toast.show('Something went wrong. Try again later', Toast.SHORT);
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <AppHeader title="Add Product" />
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={styles.formTitle}>Add a new product</Text>
          <Text style={styles.formSubTitle}>
            Add your product to the evergrowing uPayment Store
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              theme={{ roundness: 5 }}
              mode="outlined"
              label="Product Name"
              placeholder="Awesome bedside lamp"
              style={styles.input}
              maxLength={50}
              returnKeyType="next"
              onSubmitEditing={() => priceRef.current.focus()}
              left={
                <TextInput.Icon
                  name="shopping"
                  size={16}
                  color={AppColors.black}
                />
              }
              onChangeText={name => setProductName(name)}
            />
            <TextInput
              ref={priceRef}
              theme={{ roundness: 5 }}
              mode="outlined"
              label="Price ($)"
              placeholder="$ 15.20"
              keyboardType="phone-pad"
              maxLength={5}
              style={styles.priceInput}
              onChangeText={price => setProductPrice(price)}
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current.focus()}
              left={
                <TextInput.Icon
                  name="cash-multiple"
                  size={16}
                  color={AppColors.black}
                />
              }
            />

            <Text style={styles.formSubTitle}>
              Select a category for your product:
            </Text>
            <View style={styles.categoryContainer}>
              {categoryData?.map(({ name: categoryName, _id }) => (
                <View
                  style={
                    productCategory === categoryName
                      ? styles.selectedCategory
                      : styles.filterContainer
                  }
                  key={_id}>
                  <TouchableOpacity
                    onPress={() => onCategorySelect(categoryName)}>
                    <Text
                      style={
                        productCategory === categoryName
                          ? styles.selectedCategoryTitle
                          : styles.categoryTitle
                      }>
                      {categoryName}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TextInput
              ref={descriptionRef}
              theme={{ roundness: 5 }}
              multiline
              mode="outlined"
              label="Description"
              placeholder="Describe your awesome product..."
              style={styles.descriptionInput}
              maxLength={250}
              onChangeText={desc => setProductDescription(desc)}
            />

            <TextInput
              ref={imageRef}
              theme={{ roundness: 5 }}
              mode="outlined"
              label="Product Image"
              placeholder="Add a URL to your product's image"
              style={styles.input}
              returnKeyType="go"
              onSubmitEditing={onAddProduct}
              left={
                <TextInput.Icon
                  name="image-size-select-actual"
                  size={16}
                  color={AppColors.black}
                />
              }
              onChangeText={url => setProductImage(url)}
            />
            <Button
              theme={{ roundness: 5 }}
              loading={isLoading}
              disabled={isLoading}
              mode="contained"
              labelStyle={styles.button}
              style={styles.buttonContainer}
              onPress={onAddProduct}>
              Add Product
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: AppColors.background,
  },
  formTitle: {
    fontFamily: AppFonts.ExtraBold,
    fontSize: 24,
    color: AppColors.dark,
  },
  formSubTitle: {
    fontFamily: AppFonts.Medium,
    fontSize: 14,
    color: AppColors.dark,
    opacity: 0.5,
    paddingVertical: 10,
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    width: '100%',
    marginVertical: 5,
  },
  priceInput: {
    width: 150,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    borderWidth: 0.5,
    borderColor: AppColors.primary,
    margin: 5,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  selectedCategory: {
    margin: 5,
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
  descriptionInput: {
    width: '100%',
    marginVertical: 5,
    height: 120,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    padding: 7,
  },
});

export default AddProduct;
