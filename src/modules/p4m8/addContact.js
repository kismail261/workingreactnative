import React from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonRegular from '../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBLC';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


export const AddContact = (props) => {

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={`Add Your Contacts`} />
      <View style={{ flex: 0.75, width: '100%', alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ width: '80%', }}>
          <Image source={ICONS.addContact} style={styles.img} resizeMode='contain' />
        </View>
        <View style={{ width: '75%', marginTop: -40 }}>
          <Text style={styles.head}>No Contacts Added</Text>
        </View>
        <View style={{ width: '75%', marginTop: 11, alignItems: 'center' }}>
          <Text style={styles.desc}>
            You have not added any contact. Please add contacts to share activity with your contacts.
          </Text>
        </View>
      </View>
      <View style={[styles.bottom]}>
        <ButtonRegular onClick={() => showMessage("Comming soon in version 2")} bgColor='#2C99C6' label="Add Contacts" />
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
    width: '85%',
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  img: {
    height: 290,
    width: '100%',
  },
  bottom: {
    width: '80%',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 50 : 30,
  },
});
