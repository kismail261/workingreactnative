import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {MyTextinput} from '../../../common/textinput';
import {FONTS} from '../../../constant';

const customInputField = props => {
  const {label, value, getValue, subLabel, placeholder, edit, maxLength} = props;
  useEffect(() => {
    console.log(placeholder, 'Placeholder');
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      {subLabel == undefined ? null : (
        <Text style={styles.sublabelStyle}>{subLabel}</Text>
      )}
      <TextInput
      // keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
      keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
        editable={edit == undefined}
        style={styles.inputStyle}
        onChangeText={value => getValue(value)}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="rgba(112, 112, 112, 0.5)"
        maxLength={maxLength}
      />
    </View>
  );
};

export default customInputField;

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
    color: '#707070',
    padding: 10,
    fontSize: wp('3.4'),
    fontFamily:FONTS.SFRegular,
    opacity:0.8,
    textTransform:'capitalize'
  },
});
