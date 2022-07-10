import React from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import { ButtonRegular } from '../../../common/btnRegular';
import { FONTS, ICONS } from '../../../constant';
import Header from '../../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux'


export const ConfirmClose = (props) => {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <SafeAreaView style={styles.main}>
      <Header label={"Close Account"} navigation={props.navigation} />
      <View style={[styles.view, { marginTop: 20 }]}>
        <Text style={styles.title}>Close Account?</Text>
      </View>
      <View style={[styles.view, { marginTop: 20 }]}>
        <Text style={styles.grey}>{currentUser?.email}</Text>
      </View>
      <View style={[styles.view, { marginTop: 20 }, styles.border]}>
        <Text style={styles.desc}>
          Your profile, services, facilities, events and bookings associated
          with the account will be deleted forever
        </Text>
      </View>
      <View style={[styles.view, { marginTop: 20 }, styles.border]}>
        <Text style={styles.desc}>
          You won’t be able to access this account listings, services,
          facilities, events and bookings.
        </Text>
      </View>
      <View style={[styles.view, { marginTop: 20 }, styles.border]}>
        <Text style={styles.desc}>You can not undo this action. </Text>
      </View>
      <View style={[styles.bottom]}>
        <ButtonRegular blue title="Confirm & Close Account" onClick={() => props.navigation.navigate("CloseSuccess")} />
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
    fontSize: wp('4.2'),
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
    bottom: 20,
  },
});
