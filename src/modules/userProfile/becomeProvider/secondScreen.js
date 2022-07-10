import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { ICONS, FONTS } from '../../../constant';
import LargeBtnSP from '../../../common/largeBtnSP';
import { setBecomeProviderFlag } from '../../../redux/user/user.action';


const BecomeProvider = props => {
  const dispatch = useDispatch();

  const setProviderFlag = () => {
    dispatch(setBecomeProviderFlag(1))
    props.navigation.navigate('bottomTab')
  }
  const crossClick = () => {
    dispatch(setBecomeProviderFlag(1))
    props.navigation.navigate('userAppRoutes')
  }

  const {
    container,
    bgStyle,
    headerBox,
    titleStyle,
    headingStyle,
    subHeadingStyle,
    boxStyle,
    crossBtn,
  } = styles;

  return (
    <View style={container}>
      <ImageBackground
        source={ICONS.becomeProvider}
        style={bgStyle}
        resizeMode={'cover'}>
        <View style={headerBox}>
          {/* <TouchableOpacity
            onPress={crossClick}
            style={crossBtn}>
            <Text style={{ color: '#65C51F', fontSize: 12 }}>X</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          <Text style={titleStyle}>Do you have</Text>
          <Text style={headingStyle}>Teams, Classes, or Camps?</Text>
          <Text style={subHeadingStyle}>Promote them here for Free!</Text>
          <View style={boxStyle} />
          <LargeBtnSP
            label="Become a Provider"
            onClick={setProviderFlag}
            bgColor="#50BD00"
          />
        </View>
        <View />

        <TouchableOpacity style={{ position: 'absolute', zIndex: 999, bottom: 60, width: '90%', height: 20, justifyContent: 'center', alignItems: 'center' }} onPress={crossClick}>
          <Text style={{ color: 'white', textDecorationLine: 'underline' }}>Continue as a User</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};
export default BecomeProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgStyle: {
    width: wp('100'),
    height: hp('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBox: {
    width: '100%',
    height: hp('20'),
    alignItems: 'flex-end',
    marginTop: 13,
    marginRight: 13,
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    width: wp('85'),
  },
  headingStyle: {
    color: '#FFFFFF',
    fontSize: wp('12'),
    fontFamily: FONTS.SFBold,
    width: wp('85'),
  },
  subHeadingStyle: {
    color: '#FFFFFF',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    width: wp('85'),
  },
  boxStyle: {
    height: 20,
  },
  crossBtn: {
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.OS == "ios" ? 30 : 0
  },
});
