import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, View, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MeduimBtnSP from '../../../common/meduimBtnSP';
import MeduimBtnBorder from '../../../common/meduimBtnBorder';
import { FONTS } from '../../../constant';
import Header from '../../../common/headerBLC';

export const VerifyImg = ({ navigation, route }) => {
  const imgDetail = route.params.imgData
  useEffect(() => {
  }, []);
  return (

    <SafeAreaView style={styles.main}>
      <Header
        navigation={navigation}
        label="Verified User"
      />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%' }}  >
        <View style={{ width: '100%', alignItems: 'center' }} >
          <Image source={{ uri: imgDetail.uri }} style={styles.cam} />
          <View style={{ width: '80%', marginTop: 27 }}>
            <Text style={[styles.title, { fontSize: wp('7.5') }]}>
              Is the {route.params.type} of your ID clear?
            </Text>
          </View>
          <View style={{ width: '80%', marginTop: 10 }}>
            <Text style={[styles.descx]}>
              The photo should clearly show the front of your ID - nothing blurry or
              cut off and no glare.
            </Text>
          </View>
          <View style={{ height: hp('13') }} />
          <View style={{}}>
            <MeduimBtnSP
              label={"Looks Good"}
              bgColor={"#2C99C6"}
              onClick={() => navigation.navigate(route.params.type == "back" ? "uploadingBack" : 'uploadingFront', { imgData: imgDetail })}
            />
          </View>
          <View style={{ width: '80%', marginTop: 5 }}>
            <MeduimBtnBorder
              label={"Try again"}
              onClick={() => navigation.navigate(route.params.type == "back" ? "back" : "front")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  cam: {
    height: hp('35'),
    width: '100%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
