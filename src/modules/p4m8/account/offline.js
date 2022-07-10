import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import ButtonRegular from '../../../common/meduimBtnSP';
import Button from '../../../common/meduimBtnBorder';
import Header from '../../../common/headerBL';
import { FONTS, ICONS } from '../../../constant';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const AccountOffline = (props) => {
  return (
    <View style={styles.main}>
      <Header label={"Account Offline"} navigation={props.navigation} />

      <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
        <Image source={ICONS.veiriedProvider} style={{ width: 140, height: 140 }} />
        <View style={styles.view}>
          <Text style={styles.title}>Account Offline</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.desc}>
            If you want to take a break from Sporforya, you can hibernate your
            account. If you want to permanently close your account, let us know.
          </Text>
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.view}>
          <ButtonRegular label="Hibernate Account" onClick={() => props.navigation.navigate("AccountHibernate", { close: false})} bgColor={"#2C99C6"} />
        </View>
        <View style={styles.view}>
          <Button label="Close Account" onClick={() => props.navigation.navigate("AccountHibernate", { close: true})} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  desc: {
    width: wp('80'),
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    textAlign: 'center',
    marginVertical: 10,
  },
  img: {
    width: 276,
    height: 290.59,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: 'black',
    textAlign: 'center',
  },
  title18: {
    fontFamily: FONTS.SFBold,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  points: {
    fontFamily: FONTS.SFBold,
    fontSize: 58,
    color: '#2C99C6',
    textAlign: 'center',
  },
  view: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
  },
});
