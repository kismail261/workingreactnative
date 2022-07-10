import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import {FloatingModal} from './floatingModal';

export const ShareSuccessModal = () => {
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
        <Image source={ICONS.confirmedIcon} style={{height: 88, width: 88}} />
        <Text style={[styles.head, {marginTop: 19}]}>
          Your post has been shared successfully!
        </Text>
      </View>

      <TouchableOpacity
        style={[
          {marginTop: 29, width: '70%', alignSelf: 'center'},
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
    fontSize: 24,
    textAlign: 'center',
  },

  btn: {
    fontFamily: FONTS.SFMedium,
    color: 'white',
    fontSize: 14,
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
});
