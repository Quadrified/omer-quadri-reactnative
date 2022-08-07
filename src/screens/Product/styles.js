import { StyleSheet } from 'react-native';
import AppColors from '../../themes/AppColors';
import AppFonts from '../../themes/AppFonts';

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

export default styles;
