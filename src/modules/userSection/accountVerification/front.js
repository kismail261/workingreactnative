import React, { createRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import { FONTS } from '../../../constant';
import { SnapButton } from './component/snapButton';
import Header from '../../../common/headerBLC';

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
    <SafeAreaView style={styles.main}>
      <Header
        navigation={navigation}
        label="Verification Badge"
        progressCount={0}
      />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%' }}  >
        <View style={{ width: '100%', alignItems: 'center' }} >
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
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
                Make sure there's good lighting and adjust until the front of your ID fits within the frame hen tap the camera icon
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{ position: 'absolute', justifyContent: 'center', bottom: 25 }}>
        <SnapButton
          onPress={() => takePicture()}
        />
      </View>
    </SafeAreaView>
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
});
