import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONTS} from '../../../constant';


export const ExpandableOption = props => {
  return (
    <View style={styles.main}>
      <View style={styles.divider}/>
      <TouchableOpacity onPress={props.onPress} style={styles.row}>
        <Text  style={styles.name}>
          {props.name}
        </Text>
        {props.comingsoon && (
          <View style={styles.cmngsoom}>
            <Text style={styles.cmngsoontxt}>Coming Soon</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
  divider: {
    backgroundColor: '#707070',
    height: 0.8,
    opacity: 0.3,
    width: '100%',
  },
  name: {
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFMedium,
    marginVertical: 13.5,
  },
  cmngsoom: {
    borderColor: '#3AAEDF',
    backgroundColor: '#7CC7E7',
    borderRadius: 4,
    height: 23,
    width: 97,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  cmngsoontxt: {
    fontSize: 10,
    color: 'white',
    fontFamily: FONTS.SFRegular,
  },
  row: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
