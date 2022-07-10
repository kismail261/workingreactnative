import React, { useState, useRef, createRef } from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import { FONTS } from '../../../constant';
import { SnapButton } from './component/snapButton';
import Header from '../components/header';
import LargeBtn from '../../../common/largeBtnSP';

export const ProviderFrontVerification = ({ navigation }) => {
  const camera = createRef()
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: false };
      const data = await camera.current.takePictureAsync(options);
      navigation.navigate('govtIdNeeded', { imgData: data })
    }
  };


  return (
    <View style={styles.main}>
      <View style={styles.headerstyle}>
        <Header
          navigation={navigation}
          label="Verified Provider"
          progressCount={0}
        />
      </View>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        notAuthorizedView={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ marginVertical: 25 }}>Camera not authorized</Text>
            <LargeBtn label={'Open Settings'} onClick={() => Linking.openSettings()} bgColor="#2C99C6" />
          </View>
        }
        androidCameraPermissionOptions={{
          title: 'Sporforya would Like to Access the Camera',
          message: 'Enable access so that you can take photos of your listings, government ID, and more, directly from the Sporforya app.',
          buttonPositive: 'Allow',
          buttonNegative: 'Dont Allow',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Sporforya would Like to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Allow',
          buttonNegative: 'Dont Allow',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <View  >
        <View style={{ width: '80%', marginTop: 22 }}>
          <Text style={[styles.title, { fontSize: wp('4.2') }]}>
            Take your First Photo :
          </Text>
        </View>
        <View style={{ width: '80%', marginTop: 10 }}>
          <Text style={[styles.title, { fontSize: wp('7.6') }]}>Front of your ID</Text>
        </View>
        <View style={{ width: '80%', marginTop: 10 }}>
          <Text style={[styles.descx]}>
            Make sure there's good lighting and adjust until the front of your ID fits within the frame then tap the camera icon
          </Text>
        </View>
      </View>
      <View
        style={{ position: 'absolute', justifyContent: 'center', bottom: 20 }}>
        <SnapButton
          onPress={() => takePicture()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  cam: {
    height: hp('35'),
    // borderWidth: 1,
    width: '100%',
  },
  preview: {
    height: hp('35'),
    width: '100%',
    overflow: 'hidden'
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  descx: {
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    fontSize: wp('3.6'),
  },
  headerstyle: {
    marginBottom: '-2%'

  }
});
