import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonRegular } from '../../../common/btnRegular';
import Header from '../../../common/headerBL';
import { FONTS, ICONS } from '../../../constant';

export const NoPaymentMethod = (props) => {
  return (
    <View style={styles.main}>
      <Header label={"Payment Methods"} navigation={props.navigation} />
      <View
        style={{
          width: '90%',
          alignItems: 'center',
        }}>
        <Image style={styles.img} source={ICONS.noPayment} resizeMode='center' />
      </View>
      <View style={{ width: '90%', marginTop: 5 }}>
        <Text style={styles.title}>No Payment Method</Text>
      </View>
      <View style={{ width: '90%', marginTop: 12 }}>
        <Text style={styles.desc}>
          We are taking payment using our secure payment system to easy and
          secure checkouts(Taking payment info on booking creation time). We will add payment method flow in version 2
        </Text>
      </View>

      {/* <View
        style={{  marginTop: 20, position: 'absolute', bottom: 35 }}>
        <ButtonRegular blue title="Add Payment Method" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {

    width: wp('80'),
    height: wp('80'),
    marginTop:30
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    width: '70%',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    textAlign:'center',
    alignSelf:'center'
  },
});
