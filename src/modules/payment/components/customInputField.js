import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../../constant';

const customInputField = ({
  label,
  value,
  getValue,
  subLabel,
  edit,
  maxLength,
  placeholder,
}) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      {subLabel == undefined ? null : (
        <Text style={styles.sublabelStyle}>{subLabel}</Text>
      )}
      <TextInput
        editable={edit == undefined}
        style={styles.inputStyle}
        onChangeText={value => getValue(value)}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor="rgba(112, 112, 112, 0.5)"
      />
    </View>
  );
};

export default customInputField;

const styles = StyleSheet.create({
  container: {
    width: wp('80'),
    alignItems: 'center',
    marginTop: -hp(3),
  },
  labelStyle: {
    width: '100%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFSemiBold,
    marginBottom: 6,
  },
  sublabelStyle: {
    width: '100%',
    color: '#707070',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    marginBottom: 6,
  },

  inputStyle: {
    width: '100%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#70707026',
    borderRadius: 4,
    color: '#000000',
    paddingLeft: 13,
    marginBottom: 15,
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular
  },
});
