import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonRegular } from '../../../common/btnRegular';
import Header from '../../../common/headerBLC';
import {FONTS, ICONS} from '../../../constant';


export const ConfirmHibernate = (props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Header label={"Hibernate Account"} navigation={props.navigation} />
      <View style={[styles.view, {marginTop: 20}]}>
        <Text style={styles.title}>Hibernate Account?</Text>
      </View>
      <View style={[styles.view, {marginTop: 20}]}>
        <Text style={styles.grey}>kishan@designbabu.com</Text>
      </View>
      <View style={[styles.view, {marginTop: 20}, styles.border]}>
        <Text style={styles.desc}>
          Your profile, services, facilities, events and bookings associated
          with the account will disappear for the time your account stays
          hibernated
        </Text>
      </View>
      <View style={[styles.view, {marginTop: 20}, styles.border]}>
        <Text style={styles.desc}>
          To resume using Sporforya services, you will have to reactivate your
          account by logging in and verifying your login details
        </Text>
      </View>
      <View style={[styles.view, {marginTop: 20}, styles.border]}>
        <Text style={styles.desc}>
          All your details will be safe and will be resumed once you are back
        </Text>
      </View>
      <View style={[styles.bottom,]}>
        <ButtonRegular blue title="Confirm & Hibernate Account" onClick={() => props.navigation.navigate("HibernateSuccess")} />
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
  desc: {
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
  },

  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: 'black',
  },
  grey: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4.3'),
    color: '#6B6B6B',
  },
  view: {
    width: '80%',
    marginBottom: 5,
  },
  border: {
    paddingVertical: 10,
    borderBottomWidth: 0.18,
    borderBottomColor: 'black',
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
  },
});
