import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS } from '../../../constant';
import { ReviewCard } from './components/reviewCard';
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { getReview } from '../../../redux/profile/profile.action';



export const Review = (props) => {

  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const reviewsList = useSelector(state => state.profile.reviewsList)

  useEffect(() => {
    dispatch(setLoader(false))
    dispatch(getReview(currentUser != null ? currentUser._id : ''))
    return () => {
    }
  }, [])


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.main}>
        <View style={{ width: '90%', marginTop: 10 }}>
          <Text style={styles.labelStyle} >Reviews ({reviewsList.length})</Text>
          {
            reviewsList.map((item, index) => {
              return (
                <ReviewCard key={index} data={item} />
              )
            })
          }
        </View>
      </View>
      {
        loader
          ?
          <TNIndicator />
          :
          null
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  labelStyle: {
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    marginTop: 10
  },
});
