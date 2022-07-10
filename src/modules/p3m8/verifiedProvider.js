import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBLC';

export const VerifiedProvider = (props) => {
  function onOkPress() { }

  var desc =
    'Your profile has been verified, and your listings have our Verified Badge';
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label="Verified Provider" />
      <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center', width:'80%' }} >
        <Image
          source={ICONS.verifiedProvider}
          style={{ height: 177.73, width: 156.2, marginBottom: 37 }}
        />
        <Text style={styles.text}>Profile Verified</Text>
        <Text style={styles.text1}>{desc}</Text>

      </View>
      <TouchableOpacity onPress={onOkPress} style={styles.btn}>
        <Text style={styles.btnTxt}>OK</Text>
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
  text: {
    fontFamily: FONTS.SFBold,
    fontSize: 32,
    color: 'black',
    marginBottom: 18,
  },
  text1: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: 'black',
    width: '85%',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#2C99C6',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: 25,
    width: '85%',
  },
  btnTxt: {
    fontFamily: FONTS.SFMedium,
    color: 'white',
  },
});
