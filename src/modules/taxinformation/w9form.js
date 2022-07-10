import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MyTextinput} from '../../common/textinput';
import {COLORS, FONTS, ICONS} from '../../constant';
import RadioForm from 'react-native-simple-radio-button';
import {CheckBox} from './components/checkbox';

import HeaderBL from '../../common/headerBL';
import CustomTitleDropdown from '../../common/customTitleDropdownUpdate';
import {taxClassification} from '../../common/data/dropdownListData';
import {addTaxDetail} from '../../redux/tax/tax.action';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {MyNumberTextinput} from '../../common/textinputNumber';
import CountryPicker from 'react-native-country-picker-modal'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const W9form = ({navigation}) => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);

  const [isUSPerson, setUSPerson] = useState(false);
  const [bussinessName, setBussinessName] = useState('');
  const [taxClass, setTaxClass] = useState([]);
  const [identificationNo, setIdentificationNo] = useState('SSN-098776');
  const [ssn, setSsn] = useState('');
  const [certify, setCertify] = useState(false);
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  var title = 'W-9 Form';
  var info = 'To collect the right information, confirm you are a U.S. person:';
  var radio_props = [
    {label: 'Social Security Number (SSN)', value: 'SSN-098776'},
    {label: 'Employer Identification Number (EIN)', value: 'E87643'},
  ];

  useEffect(() => {
    // dispatch(setLoader(false))
    return () => {};
  }, []);

  function onSavePress() {
    navigation.navigate('informationPreview');
  }

  const getBussinessName = value => {
    setBussinessName(value);
  };

  const getSsn = value => {
    setSsn(value);
  };

  const getTaxClass = value => {
    setTaxClass(value);
  };
  const getCertify = value => {
    setCertify(prev => !prev);
  };
  const getAddress = value => {
    setAddress(value);
  };
  const getApartment = value => {
    setApartment(value);
  };
  const getCity = value => {
    setCity(value);
  };
  const getCountry = value => {
    setCountry(value);
  };
  const getPostalCode = value => {
    setPostalCode(value);
  };

  const saveTax = () => {
    if (bussinessName == '') {
      showMessage('Name of business field should not be blank');
    } else if (taxClass.length == 0) {
      showMessage('Please select tax classification');
    } else if (ssn == '') {
      showMessage('SSN/EIN # should not be blank');
    } else if (address == '') {
      showMessage('Address field should not be blank');
    } else if (apartment == '') {
      showMessage('Apartment field should not be blank');
    } else if (city == '') {
      showMessage('City field should not be blank');
    } else if (country == '') {
      showMessage('Country field should not be blank');
    } else if (postalCode == '') {
      showMessage('Postal code field should not be blank');
    } else if (!certify) {
      showMessage('Please certify the added tax certificate by clicking the button.');
    } else {
      let tempProvider = [];
      taxClass.forEach(element => {
        tempProvider.push(element.title);
      });
      dispatch(setLoader(true));
      let data = {
        isUSPerson: isUSPerson,
        businessName: bussinessName,
        taxClassification: tempProvider,
        taxIdentificationNumber: identificationNo,
        SSN_EIN: ssn,
        address: address,
        apartment: apartment,
        city: city,
        state: 'string',
        country: country,
        postCode: postalCode,
      };
      dispatch(addTaxDetail(token, data, navigation));
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.main}>
        <HeaderBL navigation={navigation} label="Tax Information" />
        <ScrollView style={{width: '100%'}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{marginTop: 10, width: '80%'}}>
              <Image source={ICONS.docBlue} style={styles.docIcon} />
            </View>
            <View style={{marginTop: 17, width: '80%'}}>
              <Text style={styles.head}>{title}</Text>
            </View>
            <View style={{marginTop: 13, width: '80%'}}>
              <Text style={styles.info}>{info}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setUSPerson(!isUSPerson)}
              style={styles.itview}>
              {isUSPerson ? (
                <Image source={ICONS.selected} style={styles.selIcon} />
              ) : (
                <View
                  style={[
                    styles.selIcon,
                    {borderColor: '#707070', borderWidth: 1, borderRadius: 15},
                  ]}
                />
              )}

              <Text style={styles.info}>I am a U.S. person</Text>
            </TouchableOpacity>
            <View style={{marginTop: 19, width: '80%'}}>
              <Text style={styles.greyMed}>
                Before withdrawing funds, all U.S. persons must provide their
                W-9 tax information.
              </Text>
            </View>
            <View style={{marginTop: 20, width: '80%'}}>
              <Text style={styles.fieldName}>Legal Name of Business</Text>
              <MyTextinput
                style={styles.ti}
                placeholder="Princeton Soccer Association"
                onChangeText={getBussinessName.bind(this)}
                value={bussinessName}
              />
            </View>
            <View style={{marginTop: 8, width: '80%'}}>
              <Text style={styles.greyReg}>
                Provide the same name as shown on your tax return.
              </Text>
            </View>
            <CustomTitleDropdown
              item={taxClassification}
              value={taxClass}
              label="Federal Tax Classification"
              placeHolder="Please Select"
              getValue={getTaxClass.bind(this)}
            />
            <View style={{marginTop: 20, width: '80%'}}>
              <Text style={styles.fieldName}>
                Tax Payer Identification Number
              </Text>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={value => {
                    setIdentificationNo(value);
                  }}
                  buttonColor={'#15488F26'}
                  selectedButtonColor={COLORS.primaryLight}
                  buttonSize={10}
                  labelStyle={[styles.greyReg, {marginTop: -3}]}
                />
              </View>
            </View>
            <View style={{marginTop: 23, width: '80%'}}>
              <Text style={styles.fieldName}>SSN/EIN #</Text>
              <MyNumberTextinput
                style={styles.ti}
                placeholder="London"
                onChangeText={getSsn.bind(this)}
                value={ssn}
                maxLength={9}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 19,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}
              onPress={() => setCertify(prev => !prev)}>
              <View style={{width: '5%', marginTop: 3}}>
                <CheckBox value={certify} getValue={getCertify.bind(this)} />
              </View>
              <View style={{width: '93%'}}>
                <Text style={styles.greyReg}>
                  I certify, under penalties of perjury, that the
                  representations in this Tax Certificate are true and correct.
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 25, width: '80%'}}>
              <Text style={styles.fieldName}>Address</Text>
              <MyTextinput
                style={[styles.ti, {marginTop: 5}]}
                placeholder="120 Park Avenue"
                onChangeText={getAddress.bind(this)}
                value={address}
              />
            </View>
            <View style={{marginTop: 25, width: '80%'}}>
              <Text style={styles.fieldName}>Apartment / Building</Text>
              <MyTextinput
                style={[styles.ti, {marginTop: 5}]}
                placeholder="Address Apt, Street, Building, Unit, Floor"
                onChangeText={getApartment.bind(this)}
                value={apartment}
              />
            </View>
            <View style={{marginTop: 25, width: '80%'}}>
              <Text style={styles.fieldName}>City</Text>
              <MyTextinput
                style={[styles.ti, {marginTop: 5}]}
                placeholder="New york"
                onChangeText={getCity.bind(this)}
                value={city}
              />
            </View>
            <View style={{marginTop: 25, width: '80%'}}>
              <Text style={styles.fieldName}>Country</Text>
              <MyTextinput
                style={[styles.ti, {marginTop: 5}]}
                placeholder="Unites State"
                onChangeText={getCountry.bind(this)}
                value={country}
              />
            </View>
            <View style={{marginTop: 25, width: '80%'}}>
              <Text style={styles.fieldName}>Postal code</Text>
              <MyNumberTextinput
                style={[styles.ti, {marginTop: 5}]}
                placeholder="44090"
                onChangeText={getPostalCode.bind(this)}
                value={postalCode}
              />
            </View>
            <View style={{marginTop: 40}} />
            <TouchableOpacity
              onPress={saveTax}
              style={{
                width: '80%',
                height: 46,
                backgroundColor: '#2C99C6',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: widthPercentageToDP(3.5),
                  fontFamily: FONTS.SFMedium,
                }}>
                Save
              </Text>
            </TouchableOpacity>
            <View style={{marginTop: 20}} />
            <TouchableOpacity
              onPress={() => navigation.navigate('Tax Info')}
              style={{
                width: '80%',
                height: 46,
                borderWidth: 1,
                borderColor: '#2C99C6',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#2C99C6',
                  fontSize: widthPercentageToDP(3.5),
                  fontFamily: FONTS.SFMedium,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View style={{height: 40}} />
          </View>
        </ScrollView>
        {loader ? <TNIndicator /> : null}
      </View>
    </KeyboardAvoidingView>
  );
};
export default W9form;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F8FAFF',
    height:'100%'
  },
  docIcon: {
    height: 38.9,
    width: 28.5,
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
  },
  info: {
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontSize: 14,
  },
  greyMed: {
    fontFamily: FONTS.SFMedium,
    fontSize: 14,
    color: '#707070',
  },
  fieldName: {
    color: '#000000',
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
    marginBottom: Platform.OS == 'ios' ? 10 : 5,
  },
  greyReg: {
    color: '#707070',
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
  },
  selIcon: {
    height: 20,
    width: 20,
    marginRight: 9,
  },
  itview: {
    marginTop: 24,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ti: {
    borderWidth: 1,
    borderColor: '#70707026',
    marginTop: 4,
    fontFamily: FONTS.SFRegular,
    color: '#707070',
  },
});
