import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Image, View, Alert } from 'react-native';
import { ButtonRegular } from '../../../common/btnRegular';
import { FONTS, ICONS } from '../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Thankyou = ({ navigation }) => {
  const [next, setNext] = useState(null);
  var midTxt = 'Review Submitted Successfully';
  var bigTxt = 'Thank You';

  useEffect(() => {
    getData()
    return () => {

    };
  }, []);


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@ratingNext')
      if (value !== null) {
        setNext(value)
      }
    } catch (e) {
    }
  }

  function onOk() {
    if (next == 1) {
      navigation.navigate("rateandGiveReview")
    } else {
      navigation.navigate("BookingsList")
    }

  }

  return (
    <SafeAreaView style={styles.main}>
      <Image
        source={ICONS.confirmed_lightGreen}
        style={{ height: 124, width: 124 }}
      />
      <View style={{ marginTop: 16 }}>
        <Text style={styles.largeText}>{bigTxt}</Text>
      </View>
      <View style={{ marginTop: 2 }}>
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
