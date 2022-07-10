import React from 'react';
import {SafeAreaView, StyleSheet, Text, Image, View, Alert} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {FONTS, ICONS} from '../../constant';

const Thankyou = ({navigation}) => {
  var midTxt = 'Review Submitted Successfully';
  var bigTxt = 'Thank You';

  function onOk() {
   navigation.navigate("eventComplete")
  }

  return (
    <SafeAreaView style={styles.main}>
      <Image
        source={ICONS.confirmed_lightGreen}
        style={{height: 124, width: 124}}
      />
      <View style={{marginTop: 16}}>
        <Text style={styles.largeText}>{bigTxt}</Text>
      </View>
      <View style={{marginTop: 2}}>
        <Text style={styles.midText}>{midTxt}</Text>
      </View>

      <View style={styles.bottomBtn}>
        <ButtonRegular blue title="OK" onClick={onOk} />
      </View>
    </SafeAreaView>
  );
};
export default Thankyou;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
  },
  largeText: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 24,
  },
  midText: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: 14,
  },
  bottomBtn: {
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '80%',
  },
});
