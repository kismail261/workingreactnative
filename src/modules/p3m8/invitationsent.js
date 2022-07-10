import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ButtonRegular from '../../common/meduimBtnSP';
import {FONTS, ICONS} from '../../constant';
import Header from '../../common/headerBLC';

export const InvitationSent = props => {
  const role = props.route.params.role;

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={`Refer a ${role}`} />
      <View style={{width: '80%', marginTop: 50}}>
        <Image source={ICONS.invitationsent} style={styles.img} />
      </View>
      <View style={{width: '80%', marginTop: 25}}>
        <Text style={styles.head}>Invitation Sent!</Text>
      </View>
      <View style={{width: '80%', marginTop: 11}}>
        <Text style={styles.desc}>
          When your {role} completes their first booking, you will both get 1000
          sporty points to spend on sporforya!
        </Text>
      </View>
      <View style={[styles.bottom]}>
        <ButtonRegular
          onClick={() => props.navigation.goBack()}
          bgColor="#2C99C6"
          label="OK"
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
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  img: {
    //height: 215.3,
    height: 270,
    width: '100%',
  },
  bottom: {
    width: '80%',
    position: 'absolute',
    bottom: 30,
  },
});
