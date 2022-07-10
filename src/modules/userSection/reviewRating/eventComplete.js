import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonRegular } from '../../../common/btnRegular';
import Header from '../../../common/headerLogoBI';
import { FONTS, ICONS } from '../../../constant';

const EventComplete = ({ navigation, route }) => {
  const listDetail = route.params.listDetail;
  var midText = 'Thank you! Your Event is complete';
  var bigText = 'Review your Provider';
  var smallText =
    'Share your experience with the Sporforya Community by giving a Review. Your feedback will be valuable to other users.';

  function onReviewUsers() {
    navigation.navigate('reviewProviderUser', { listDetail: listDetail });
  }

  return (
    <View style={styles.main}>
      <Header navigation={navigation} />
      <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }} >
        <Image
          source={ICONS.smiley_triple}
          style={{ height: wp('25'), width: wp('45') }}
          resizeMode="contain"
        />
        <View style={{ marginTop: 25 }}>
          <Text style={styles.midText}>{midText}</Text>
        </View>
        <View style={{ marginTop: 1 }}>
          <Text style={styles.largeText}>{bigText}</Text>
        </View>
        <View style={{ marginTop: 4, justifyContent: 'center', width: '80%' }}>
          <Text style={styles.smallText}>{smallText}</Text>
        </View>
      </View>

      <View style={styles.bottomBtn}>
        <ButtonRegular blue title="Review Provider" onClick={onReviewUsers} />
      </View>
    </View>
  );
};
export default EventComplete;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  midText: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('3'),
  },
  largeText: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('5'),
  },
  smallText: {
    width: wp('60%'),
    fontFamily: FONTS.SFMedium,
    color: '#4D4D4D',
    fontSize: wp('2.7'),
    textAlign: 'center',
  },
  bottomBtn: {
    flex: 1,
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // width: '80%',
  },
});
