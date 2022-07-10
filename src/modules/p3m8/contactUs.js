import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {FONTS, ICONS} from '../../constant';
import Header from '../../common/headerBLC';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/Feather';

export const ContactUs = props => {
  const openWayFB = () => {
    //https://www.facebook.com/profile.php?id=100003707741636
    Linking.openURL('https://web.facebook.com/sporforya/?_rdc=1&_rdr');
  };
  const openWayTwitter = () => {
    Linking.openURL('https://twitter.com/sporforya');
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={'Contact Us'} />
      <View style={{width: '80%', marginTop: 20}}>
        <Text style={[styles.head, {width: '60%'}]}>Contact Us</Text>
      </View>
      <View style={{width: '80%', marginTop: 21}}>
        <Text style={styles.desc}>We're on standby to help</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('chatWithSfy')}
        style={[{width: '80%', marginTop: 20}, styles.btn]}>
        <View style={styles.insideBtn}>
          {/* <Image
            source={ICONS.sendmsg}
            style={styles.msgIcon}
            resizeMode="contain"
          /> */}
          <Icon name="chatbox-outline" size={30} color="#2C99C6" />
          <Text style={styles.btnName}>Message us Here</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openWayTwitter}
        style={[{width: '80%'}, styles.btn]}>
        <View style={styles.insideBtn}>
          {/* <Image
            source={require('../../assets/images/twitterLogo.png')}
            style={styles.rateIcon}
            resizeMode="contain"
          /> */}
          <Icon name="ios-logo-twitter" size={30} color="#2C99C6" />
          <Text style={styles.btnName}>Contact us in Twitter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openWayFB}
        style={[{width: '80%'}, styles.btn]}>
        <View style={styles.insideBtn}>
          {/* <Image
            source={require('../../assets/images/facebookLogo.png')}
            style={styles.facebookIcon}
            resizeMode="contain"
          /> */}
          <Icons name="facebook" size={30} color="#2C99C6" />
          <Text style={styles.btnName}>Contact us in Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('EmailContact')}
        style={[{width: '80%'}, styles.btn]}>
        <View style={styles.insideBtn}>
          {/* <Image
            source={require('../../assets/images/emailLogo.png')}
            style={styles.rateIcon}
            resizeMode="contain"
          /> */}
          <Icon name="ios-mail-outline" size={30} color="#2C99C6" />
          <Text style={styles.btnName}>Email</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: 'black',
    textAlign: 'left',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#3D3D3D',
  },
  btnName: {
    color: '#000000',
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
    marginLeft:20
  },
  msgIcon: {
    height: 28.94,
    width: 32.59,
    marginRight: 14,
  },
  rateIcon: {
    height: 19.74,
    width: 38.88,
    marginRight: 12,
  },
  facebookIcon: {
    height: 27,
    width: 32.59,
    marginRight: 12,
  },
  btn: {
    height: 75,
    alignItems: 'center',
    borderColor: '#15488F26',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 13,
  },
  insideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
});
