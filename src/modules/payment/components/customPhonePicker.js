import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CountryPicker from 'react-native-country-picker-modal';
import { countries, FONTS } from '../../../constant';

const customPhonePicker = ({ label, value, getValue, getCountryCode }) => {
  const [cca2, setCca2] = useState('AF');

  const selectCountry = country => {
    setCca2(country.cca2);
    getCountryCode(country.callingCode[0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.inputRow}>
        <View style={styles.countryPickerContainer}>
          <CountryPicker
            countryCode={cca2}
            withCountryNameButton={true}
            withCallingCode={true}
            withFlag={true}
            withEmoji={true}
            withAlphaFilter={true}
            onSelect={value => selectCountry(value)}
            translation="eng"
            cca2={cca2}
            countryCodes={countries}
          />
        </View>

        <TextInput
          style={styles.inputStyle}
          onChangeText={value => getValue(value)}
          value={value}
        />
      </View>
    </View>
  );
};

export default customPhonePicker;

const styles = StyleSheet.create({
  container: {
    width: wp('80'),
    alignItems: 'center',
    marginTop: -hp(3),
    marginBottom: hp(1.5),
  },
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '74%',
    height: 46,
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#707070',
  },
  countryPickerContainer: {
    width: '22%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
  },
});
