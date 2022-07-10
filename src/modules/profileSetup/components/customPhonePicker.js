import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CountryPicker from 'react-native-country-picker-modal';
import { countries, FONTS } from '../../../constant';

const customPhonePicker = ({
  label,
  value,
  getValue,
  getCountryCode,
  placeholder,
}) => {
  const [cca2, setCca2] = useState('US');

  const selectCountry = country => {
    setCca2(country.cca2);
    getCountryCode(country.callingCode[0]);
  };

  const getPhone = value => {
    let removeSpace = value.replace(/ /g, '');
    getValue(removeSpace);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.inputRow}>
        <View style={styles.countryPickerContainer}>
          <CountryPicker
            subregion=''
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
          onChangeText={value => getPhone(value)}
          value={value}
          keyboardType="phone-pad"
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={'rgba(112, 112, 112, 0.5)'}
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
    marginTop: 14,
  },
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 6,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '75%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#000000',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    paddingLeft: 8,
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
