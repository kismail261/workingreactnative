import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ButtonRegular } from '../../../common/btnRegular';
import { FONTS, ICONS } from '../../../constant';
import Header from '../components/header';

export const VerifyImg = ({ navigation, route }) => {
  const imgDetail = route.params.imgData
  useEffect(() => {
    console.log(imgDetail.uri)
  }, []);
  return (
    <ScrollView style={{backgroundColor:'#F8FAFF'}}>
      <View style={styles.main}>
        <Header
          navigation={navigation}
          label="Verified Provider"
          progressCount={0}
        />
        <Image source={{ uri: imgDetail.uri }} style={styles.cam} />
        <View style={{ width: '80%', marginTop: 27 }}>
          <Text style={[styles.title, { fontSize: wp('7.5') }]}>
            Is the {route.params.type} of your ID clear?
          </Text>
        </View>
        <View style={{ width: '80%', marginTop: 10 }}>
          <Text style={[styles.descx]}>
            The photo should clearly show the  of your ID - nothing blurry or
            cut off and no glare.
          </Text>
        </View>
        <View style={{ width: '80%', marginTop: 14 }}>
          <ButtonRegular
            title="Looks Good"
            blue
            onClick={() => navigation.navigate(route.params.type == "back" ? "uploadingBack" : 'uploadingFront', { imgData: imgDetail })}
          />
        </View>
        <View style={{ width: '80%', marginTop: 12 }}>
          <ButtonRegular
            title="Try again"
            transparent
            onClick={() => navigation.navigate(route.params.type == "back" ? "back" : "front")}
          />
        </View>
      </View>
    </ScrollView>
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
