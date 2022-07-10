import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {FONTS, ICONS} from '../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import {RedeemSuccess} from './components/redeemSuccess';

export const RedeemPoints = () => {
  const [rewardModal, setRewardModal] = useState(false);
  function onBackPress() {}
  return (
    <View style={styles.main}>
      <ImageBackground
        source={ICONS.listingImage}
        style={{height: 284, alignItems: 'center', width: '100%'}}>
        <SafeAreaView style={{width: '90%'}}>
          <Icon
            onPress={onBackPress}
            name="chevron-back-outline"
            color="white"
            size={30}
          />
        </SafeAreaView>
      </ImageBackground>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={styles.title}>
          Get $15 in your Sporforya Wallet. It will cost you 750 Points
        </Text>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={styles.desc}>
          Redeeming 750 Points will add $15 to your Sporforya Wallet, for you to
          use on future bookings. Go on, you deserve it!{' '}
        </Text>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={[styles.title, {fontSize: 22}]}>Terms & Conditions</Text>
      </View>
      <View style={{width: '90%', marginTop: 20}}>
        <Text style={styles.desc}>
          Read our Terms and Conditions for more information
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomRow}>
          <View
            style={{
              width: '48%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.bottomGrey, {marginBottom: 5}]}>Redeem</Text>
            <Text style={[styles.bottomGreyBold]}>750 Points</Text>
          </View>
          <View
            style={{
              width: '48%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <ButtonRegular
              blue
              title="Redeem Now"
              onClick={() => setRewardModal(true)}
            />
          </View>
        </View>
      </View>
      <RedeemSuccess
        visible={rewardModal}
        onClosePress={() => setRewardModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  bottom: {
    position: 'absolute',
    height: 75,
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  bottomGrey: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    color: '#7E7E7E',
  },
  bottomGreyBold: {
    fontFamily: FONTS.SFBold,
    fontSize: 16,
    color: '#7E7E7E',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: '#3D3D3D',
  },
});
