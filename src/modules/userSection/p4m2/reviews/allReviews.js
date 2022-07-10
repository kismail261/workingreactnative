import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FONTS, ICONS } from '../../../../constant';
import Header from '../../../../common/headerBL';
import { ReviewCard } from '../../../listing/providerProfile/components/reviewCard';
import { getReview } from '../../../../redux/profile/profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../../redux/loader/loader.action'


export const AllReviews = ({ navigation, route }) => {
  const userId = route.params.userId
  const dispatch = useDispatch();
  const reviewsList = useSelector(state => state.profile.reviewsList)

  useEffect(() => {
    dispatch(setLoader(false))
    dispatch(getReview(userId))
    return () => {
    }
  }, [])


  return (
    <View style={styles.main}>
      <Header navigation={navigation} label="Reviews" />
      <View style={{ width: '85%', marginTop: 20 }}>
        <View style={styles.row}>
          <Image
            source={ICONS.starBlue}
            style={[styles.star, { marginRight: 6 }]}
          />
          <Text style={styles.totalReviews}>{reviewsList.length > 0 ? 6.7 : 3.5}</Text>
          <Text style={[styles.smallReviews, { marginRight: 11 }]}>/10</Text>
          <Text style={styles.totalReviews}>({reviewsList.length} Reviews)</Text>
        </View>
      </View>
      <View style={{ width: '90%' }}>
        {
          reviewsList.map((item, index) => {
            return (
              <ReviewCard key={index} data={item} />
            )
          })
        }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  star: {
    width: 16.46,
    height: 15.77,
  },
  totalReviews: {
    fontSize: 21,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  smallReviews: {
    fontSize: 12,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
});
