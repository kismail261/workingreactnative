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

export const ShareListingModal = () => {
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
        <Text style={styles.head}>Share the Listing</Text>
        <Text style={[styles.subhead, {marginTop: 13, textAlign: 'center'}]}>
          Share your listings to get more bookings and make more $
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '70%',
          alignSelf: 'center',
          marginBottom: 7,
        }}>
        <Social source={ICONS.facebook} />
        <Social source={ICONS.twitter} />
        <Social source={ICONS.insta} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '70%',
          alignSelf: 'center',
        }}>
        <Social source={ICONS.linkedin} />
        <Social source={ICONS.contacts} />
        <Social source={ICONS.pinterest} />
      </View>
      <View style={{marginTop: 75, width: '70%', alignSelf: 'center'}}>
        <Text style={styles.share}>Share your invite link</Text>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.grey}>www.sporforya.com/c/javeriar18</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          {marginTop: 75, width: '70%', alignSelf: 'center'},
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
  subhead: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 12,
  },
  share: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: 13,
  },
  btn: {
    fontFamily: FONTS.SFMedium,
    color: 'white',
    fontSize: 14,
  },
  grey: {
    fontFamily: FONTS.SFRegular,
    color: '#707070',
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
