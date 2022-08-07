import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';
import ProductDetails from '../screens/Product/ProductDetails';
import AddProduct from '../screens/Product/AddProduct';

const AppStack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="ProductDetails" component={ProductDetails} />
      <AppStack.Screen name="AddProduct" component={AddProduct} />
      <AppStack.Screen name="Search" component={Search} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
