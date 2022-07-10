
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FONTS, ICONS, ImageUrl } from '../../../../../constant';


export const BookingForCardSimple = props => {
  const { avatar, firstName, lastName } = props.data
  useEffect(() => {
    return () => {
    }
  }, [])

  return (
    <View style={[styles.row]}>
      <View style={styles.innerRow}>
        <Image source={avatar != undefined ? { uri: ImageUrl + avatar } : ICONS.userIcon}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
          }} />
        <View
          style={{
            marginLeft: 11,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={[styles.name, { marginBottom: 3 }]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.type]}>{'Child'}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  innerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
    color: 'black',
  },

  type: {
    fontFamily: FONTS.SFRegular,
    fontSize: 13,
    color: '#707070',
  },
});