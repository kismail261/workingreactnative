import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ButtonRegular from '../../common/meduimBtnSP';
import {MyTextinputMultiline} from '../../common/textinputMultiline';
import {FONTS, ICONS} from '../../constant';
import {CustomSlider} from './component/Slider';
import {SliderCounter} from './component/sliderCounter';
import Header from '../../common/headerBLC';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../redux/loader/loader.action';
import {uploadReview} from '../../redux/user/user.action';
import TNIndicator from '../../common/TNIndicator';
import {ReviewForCard} from './component/reviewForCard';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const ReviewProvider = ({navigation, route}) => {
  const data = route.params.data;
  const users = route.params.users;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState(data.reciverIds);

  var head = 'Review your Users';
  var headDesc =
    'Share your experience with your Users for the Sporforya Community by giving them a Review';
  var s1 = 'Rate your experience with the User';
  var s2 =
    'Share your experience with your Users to the Sporforya Community (optional)';
  var option1 = "Could've been better";
  var option2 = 'Wonderful';

  useEffect(() => {
    // dispatch(setLoader(false));
    return () => {};
  }, []);

  function ratingHandler(r) {
    setRating(r);
  }

  const onRemoveUser = id => {
    let tempUser = selectedUsers;
    let finalArray = tempUser.filter(item => item != id);
    setSelectedUsers(finalArray);
  };

  const onSendReview = () => {
    if (false) {
      showMessage('Comment field should not be blank');
    } else {
      dispatch(setLoader(true));
      let tempData = {
        receiverIds: selectedUsers,
        listingId: data.lisitngId,
        comments: comments,
        ratingScore: rating,
      };
      dispatch(uploadReview(tempData, token, navigation));
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={navigation} label="Review Users" />
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%', alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '90%'}}>
            <View style={{width: '90%', marginTop: 18, alignSelf: 'center'}}>
              <Text style={styles.head}>{head}</Text>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{width: '90%', marginTop: 8}}>
                <Text style={styles.headDesc}>{headDesc}</Text>
              </View>
              <View style={{width: '90%', marginVertical: 10}}>
                <Text
                  style={[
                    styles.statement,
                    {marginVertical: 10, fontFamily: FONTS.SFSemiBold},
                  ]}>
                  {'Add a review for'}
                </Text>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {users.map((item, index) => {
                    return (
                      <View key={index}>
                        {selectedUsers.includes(item.id) ? (
                          <ReviewForCard
                            item={item}
                            onClick={onRemoveUser.bind(this)}
                          />
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{width: '90%', marginTop: 24}}>
                <Text
                  style={[styles.statement, {fontFamily: FONTS.SFSemiBold}]}>
                  {s1}
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  marginTop: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.options}>{option1}</Text>
                <Text style={styles.options}>{option2}</Text>
              </View>
              <View style={{width: '90%', marginTop: 3}}>
                <CustomSlider onValueChange={ratingHandler} value={rating} />
                <SliderCounter current={parseInt(rating * 10)} />
              </View>
              <View style={{width: '90%', marginTop: 24}}>
                <Text
                  style={[styles.statement, {fontFamily: FONTS.SFSemiBold}]}>
                  {s2}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 24}}>
                <MyTextinputMultiline
                  style={{height: 157}}
                  onChangeText={setComments}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  marginTop: 24,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text style={styles.options}>
                  {comments.length}/1000 Characters
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 24}}>
                <Text style={styles.statement}>
                  This Review will be shared on your Users profile only after
                  they have left a review for you.
                </Text>
              </View>
            </View>
            <View style={styles.bottonBtn}>
              <ButtonRegular
                bgColor={'#2C99C6'}
                label="Send Review"
                onClick={onSendReview}
              />
            </View>
          </ScrollView>

          {loader ? <TNIndicator /> : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ReviewProvider;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: 'black',
  },
  headDesc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.5'),
    color: '#707070',
  },
  statement: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#808080',
  },
  options: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('2.5'),
    color: '#808080',
  },
  bottonBtn: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
