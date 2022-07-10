import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonRegular } from '../../../common/buttonRegular';
import Header from '../../../common/headerBL';
import { FONTS } from '../../../constant';
import CustomLargeDatePicker from './components/customLargeDatePicker';
import { Dropdown } from '../../../common/dropDown';
import CustomPhonePicker from '../../profileSetup/components/customPhonePicker';
import { Avatar } from './components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Url } from '../../../constant/baseURL';
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import SearchablePickerMulti from '../../../common/searchablePickerMulti';
import CustomTitleDropdown from '../../../common/customTitleDropdown';
import { MedicalCondition } from '../../../common/data/data';
import { addChild } from '../../../redux/profile/profile.action';
import moment from 'moment';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


var avatar = '';
export const AddChild = props => {
  const typeFlow = props.route.params.type
  const apiData = props.route.params.apiData
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const [fromDate, setFromDate] = useState(new Date())
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Select');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('+1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [medicalCondition, setMedicalCondition] = useState([]);

  useEffect(() => {
    return () => { };
  }, []);

  const getGender = async value => {
    setGender(value);
  };
  const getPhone = value => {
    setPhone(value);
  };
  const getCode = value => {
    setCode(value);
  };
  const getFromDate = (value) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const preDate = new Date(value);
    preDate.setHours(0, 0, 0, 0);

    if (preDate >= today) {
      showMessage('invalid date')
      return
    }
    setFromDate(value)
  }

  const getMedicalCondition = selectedItems => {
    setMedicalCondition(selectedItems);
  };

  const chooseImage = async file => {
    dispatch(setLoader(true));
    getSignedUrl(file, token);
  };

  const getSignedUrl = async (data, token) => {
    let { type, name, path } = data;
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios
      .get(`${Url}api/file-upload/presigned-url?type=${type}&name=${name}`, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        imageUpload(response.signedUrl, data, response.key);
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
      });
  };

  const imageUpload = (signedUrl, file, key) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) {
        let percentComplete = event.loaded / event.total;
      } else {
      }
    });
    xhr.onload = () => {
      if (xhr.status != 200) {
        showMessage('error is here');
      }
      dispatch(setLoader(false));
      avatar = key;
      // showMessage('Profile photo uploaded successfully');
    };
    xhr.send({ uri: file.path, type: file.type, name: file.name });
  };

  const addClick = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (firstName == '') {
      showMessage('First name field should not be blank');
    } else if (firstName == '') {
      showMessage('Last name field should not be blank');
    } else if (gender == 'Select') {
      showMessage('Please choose gender');
    } else if (name == '') {
      showMessage('Name field should not be blank');
    } else if (phone == '') {
      showMessage("Phone number field should not be blank");
    } else if (phone.length != 10) {
      showMessage('Phone number should be 10 digit');
    } else if (email == '') {
      showMessage('Email field should not be blank');
    } else if (reg.test(email) === false) {
      showMessage('Enter valid email');
    } else {
      await AsyncStorage.setItem('childName', firstName + ' ' + lastName);
      let data = {
        parentId: currentUser._id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: moment(fromDate).format(''),
        name: name,
        phone: '+' + code + phone,
        email: email,
        medical: medicalCondition,
        avatar: avatar,
      };
      dispatch(setLoader(true));
      dispatch(addChild(token, data, props.navigation, typeFlow, apiData));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.main}>
        <Header navigation={props.navigation} label="Add a Child" />
        <ScrollView style={{ width: '100%' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '80%', marginTop: 26 }}>
              <Text style={styles.head}>Add a Child</Text>
              <Text style={[styles.subHead, { marginTop: 8 }]}>
                Tell us few details about your child
              </Text>
            </View>
            <View
              style={{
                width: '80%',
                marginTop: 26,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Avatar
                mainContainerStyles={{ marginRight: 29 }}
                onClick={chooseImage}
              />
              <View style={{ width: '50%' }}>
                <Text style={[styles.profileText]}>Add a Profile Photo</Text>
                <Text style={[styles.profileSubText, { marginTop: 5 }]}>
                  JPEG or PNG, no larger than 10MB
                </Text>
              </View>
            </View>
            <View style={{ width: '80%', marginTop: 42 }}>
              <Text style={[styles.field, { marginBottom: 6 }]}>Child Name</Text>
              <TextInput
                style={[styles.ti, { marginBottom: 12 }]}
                placeholder="First name"
                maxLength={20}
                onChangeText={value => {
                  setFirstName(value);
                }}
                value={firstName}
              />
              <TextInput
                style={[styles.ti]}
                placeholder="Last name"
                maxLength={20}
                onChangeText={value => {
                  setLastName(value);
                }}
                value={lastName}
              />
            </View>
            <View style={{ width: '80%', marginTop: 30 }}>
              <Text style={[styles.field, { marginBottom: 6 }]}>Gender</Text>
              <Dropdown
                name={gender}
                data={['Male', 'Female', 'Others', 'All']}
                getValue={getGender.bind(this)}
              />
            </View>
            <View style={{ width: '80%', marginTop: 30 }}>
              <Text style={[styles.field, { marginBottom: 6 }]}>Date of Birth</Text>
              <CustomLargeDatePicker label={""} value={fromDate} getValue={getFromDate.bind(this)} />
            </View>
            <View style={{ width: '80%', marginTop: 30 }}>
              <Text style={[styles.field, { marginBottom: 6 }]}>
                Emergency Contact
              </Text>
              <Text style={[styles.profileSubText]}>
                In case of any emergency situation we'll contact here
              </Text>
              <TextInput
                style={[styles.ti]}
                placeholder="Name"
                onChangeText={value => {
                  setName(value);
                }}
                value={name}
              />
              <View style={{ marginTop: -25 }} />
              <CustomPhonePicker
                label=""
                value={phone}
                getValue={getPhone.bind(this)}
                getCountryCode={getCode.bind(this)}
              />
              <View style={{ marginTop: 15 }} />

              <TextInput
                style={[styles.ti]}
                placeholder="Email Address"
                onChangeText={value => {
                  setEmail(value);
                }}
                value={email}
              />
            </View>
            <View style={{ width: '80%', marginTop: 30 }}>
              {/* <Text style={[styles.field, { marginBottom: 6 }]}>
              Medical Condition
            </Text>
            <Text style={[styles.profileSubText, { marginBottom: 5 }]}>
              Select medical condition if there is any for your child{' '}
            </Text> */}
              <CustomTitleDropdown
                item={MedicalCondition}
                value={medicalCondition}
                label="Medical Condition"
                placeHolder="select"
                getValue={getMedicalCondition.bind(this)}
              />

            </View>
            <View style={{ width: '80%', marginTop: 30 }}>
              <ButtonRegular
                title="Add Child"
                buttonStyle={{ backgroundColor: '#2C99C6' }}
                // onClick={() => props.navigation.navigate("ChildAdded", { type: type })}
                onClick={addClick}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ height: 30 }} />
        {loader ? <TNIndicator /> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
  },
  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
  },
  subHead: {
    color: '#3D3D3D',
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
  },
  profileText: {
    fontFamily: FONTS.SFMedium,
    fontSize: 16,
    color: 'black',
  },
  profileSubText: {
    fontFamily: FONTS.SFRegular,
    fontSize: 12,
    color: '#707070',
  },
  ti: {
    height: 46,
    borderWidth: 1,
    borderColor: '#70707026',
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
    padding: 10,
  },
});
