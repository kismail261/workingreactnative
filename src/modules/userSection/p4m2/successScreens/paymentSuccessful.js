import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS } from '../../../../constant';
import { ICONS } from '../../../../constant/icons';


export const PaymentSuccessful = (props) => {
  const apiData = props.route.params.apiData
  const stripeToken = props.route.params.stripeToken

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("BookingSuccessful", { apiData: apiData, stripeToken: stripeToken })
    }, 1500)
    return () => {
    }
  }, [])

  return (
    <SafeAreaView style={styles.main}>
      <View style={{ flex:0.7, justifyContent:'center', alignItems:'center'}}>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Payment Successful!</Text>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    //justifyContent: 'center',
  },
  img: {
    height: wp('30'),
    width: wp('30'),
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: 'black',
  },
});
