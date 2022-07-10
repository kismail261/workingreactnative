import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import {FloatingModal} from './floatingModal';

const Social = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image source={props.source} style={{height: 67, width: 67}} />
    </TouchableOpacity>
  );
};
const Contact = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 18,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={ICONS.userIcon} style={{height: 49, width: 49}} />
        <Text style={[styles.name, {marginLeft: 9}]}>
          {props.name ?? 'John Doe'}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onShare} style={styles.shareBtn}>
        <Text style={styles.shareTxt}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ShareWithContactsModal = () => {
  return (
    <FloatingModal visible onClosePress={() => {}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          alignSelf: 'center',
          marginBottom: 24,
        }}>
        <Text style={styles.head}>Share with Contacts</Text>
      </View>

      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.grey, {marginBottom: 9}]}>All Contacts</Text>
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </View>
      <TouchableOpacity
        style={[
          {marginTop: 10, width: '70%', alignSelf: 'center'},
          styles.card,
          styles.btnCont,
        ]}>
        <Text style={styles.btn}>Share</Text>
      </TouchableOpacity>
    </FloatingModal>
  );
};

const styles = StyleSheet.create({
  head: {
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
    fontSize: 18,
  },
  name: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 16,
  },
  shareTxt: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 10,
  },
  btn: {
    fontFamily: FONTS.SFMedium,
    color: 'white',
    fontSize: 14,
  },
  grey: {
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    fontSize: 12,
  },
  card: {
    minHeight: 46,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#70707026',
    backgroundColor: 'white',
  },
  btnCont: {
    backgroundColor: '#2C99C6',
  },
  shareBtn: {
    height: 22,
    width: 55,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BEBEBE',
    borderWidth: 1,
    borderColor: '#70707026',
  },
});
