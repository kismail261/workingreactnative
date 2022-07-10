import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text,
  Image, View, Platform, KeyboardAvoidingView, ScrollView
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonRegular } from '../../../common/btnRegular';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import { FONTS, ICONS, Url } from '../../../constant';
import { CustomSlider } from '../../review/component/Slider';
import { SliderCounter } from '../../review/component/sliderCounter';
import Header from '../../../common/headerBLC'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import { uploadProviderReview } from '../../../redux/user/user.action'
import TNIndicator from '../../../common/TNIndicator'
import { EventCard } from "./components/eventCard";
import axios from 'axios';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


const ReviewProvider = ({ navigation, route }) => {
  const listDetail = route.params.listDetail
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)

  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [providerId, setProviderId] = useState(null);

  var head = 'Review your Provider';
  var headDesc =
    'Share your experience with the Sporforya Community by giving a Review. Your feedback will be valuable to other users.';
  var s1 = 'Rate your experience with the Provider';
  var s2 =
    'Share your experience with the Provider, your feedback will be valuable to other Users.';
  var option1 = 'Couldve been better';
  var option2 = 'Wonderful';

  useEffect(() => {
    getListingDetail()
    return () => {
    }
  }, [])

  const getListingDetail = () => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios.get(`${Url}api/listing/by/${listDetail.listingId}`, { headers: headers })
      .then(resp => {
        let response = resp.data
        // console.log("getListingDetail: ", response.userId)
        setProviderId(response.userId)
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
      });
  };


  function ratingHandler(r) {
    setRating(r);
  }

  const onSendReview = () => {
    if (comments == '') {
      showMessage("Comment field should not be blank");
    } else {
      dispatch(setLoader(true))
      let tempData = {
        "receiverIds": [providerId],
        "listingId": listDetail.listingId,
        "comments": comments,
        "ratingScore": rating
      }
      dispatch(uploadProviderReview(tempData, token, navigation))
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <SafeAreaView style={styles.main}>
        <Header navigation={navigation} label="Review Provider" />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            width: wp('100'),
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          <View style={{ width: '80%', marginTop: 18 }}>
            <Text style={styles.head}>{head}</Text>
          </View>
          <View style={{ width: '80%', marginTop: 8 }}>
            <Text style={styles.headDesc}>{headDesc}</Text>
          </View>
          <View style={{ width: '82%' }} >
            <View style={{ height: 25 }} />
            <EventCard detail={listDetail.listing} />
          </View>
          <View style={{ width: '80%', marginTop: 24 }}>
            <Text style={styles.statement}>{s1}</Text>
          </View>
          <View
            style={{
              width: '80%',
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.options}>{option1}</Text>
            <Text style={styles.options}>{option2}</Text>
          </View>
          <View style={{ width: '80%', marginTop: 3 }}>
            <CustomSlider onValueChange={ratingHandler} value={rating} />
            <SliderCounter current={parseInt(rating * 10)} />
          </View>
          <View style={{ width: '80%', marginTop: 24 }}>
            <Text style={styles.statement}>{s2}</Text>
          </View>
          <View style={{ width: '80%', marginTop: 24 }}>
            <MyTextinputMultiline
              styles={{ height: 157 }}
              onChangeText={setComments}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginTop: 24,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.options}>{comments.length}/1000</Text>
          </View>
          <View style={styles.bottonBtn}/>
          <ButtonRegular blue title="Send Review" onClick={onSendReview} />
        </ScrollView>
        {
          loader
            ?
            <TNIndicator />
            :
            null
        }
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ReviewProvider;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
  },
  headDesc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
    color: '#707070',
  },
  statement: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 12,
    color: '#808080',
  },
  options: {
    fontFamily: FONTS.SFRegular,
    fontSize: 10,
    color: '#808080',
  },
  bottonBtn: {
   height: heightPercentageToDP('6')
  },
});
