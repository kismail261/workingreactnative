import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import ButtonRegular from '../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../constant';
import Header from '../../common/headerBL';


export const AddChildNotifier = (props) => {

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label={`Add a Child`} />
      <View style={{ flex: 0.75, width: '100%', alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ width: '80%', }}>
          <Image source={ICONS.noChild} style={styles.img} resizeMode='contain' />
        </View>
        <View style={{ width: '75%', marginTop: -40 }}>
          <Text style={styles.head}>Add a Child</Text>
        </View>
        <View style={{ width: '62%', marginTop: 11, alignItems: 'center' }}>
          <Text style={styles.desc}>
            Add a child here in your profile in order to book a service, event or facility for them to participate in
          </Text>
        </View>
        <View style={{height:40}} />
        <ButtonRegular onClick={() => props.navigation.navigate("AddChild", { type: '1' })} bgColor='#2C99C6' label="Add Child" />
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
