import { Platform } from 'react-native';
import AppColors from '../themes/AppColors';

export const BACK_HEADER_SCREENS = ['Product Details', 'Add Product', 'Search'];
export const REFRESH_PROPS = Platform.select({
  android: {
    progressBackgroundColor: AppColors.white,
  },
  ios: {
    tintColor: AppColors.primary,
  },
});
