import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { ButtonRegular } from '../../../../common/btnRegular';
import { FONTS } from '../../../../constant';
import { ICONS } from '../../../../constant/icons';

export const ChildAdded = props => {
  const type = props.route.params.type 
  const apiData = props.route.params.apiData
  const [childName, setChildName] = useState('');

  const getChildName = async () => {
    const name = await AsyncStorage.getItem('childName');
    setChildName(name);
  };

  useEffect(() => {
    getChildName();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Image source={ICONS.confirmedIcon} style={styles.img} />
      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Child Added!</Text>
      </View>
      <View style={{ marginTop: 22, width: '60%', }}>
        <Text style={styles.desc}>
          {childName} added to your profile successfully.
        </Text>
      </View>
      <View style={{ marginTop: 95, width: '90%',marginLeft:"10%" }}>
        <ButtonRegular
          title="Continue Booking"
          buttonStyle={styles.buttonStyle}
          onClick={() => props.navigation.navigate(type == 1 ? "childStack" : 'bookineFor', { apiData: apiData})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
  },
  img: {
    height: 124,
    width: 124,
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#2C99C6',
  },
});
