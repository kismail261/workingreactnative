import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonRegular } from '../../../common/buttonRegular';
import Header from '../../../common/headerBL';
import { FONTS } from '../../../constant';
import { DateCard } from '../p4m1/components/dateCard';
import { Dropdown } from '../../../common/dropDown';
import CustomPhonePicker from '../../profileSetup/components/customPhonePicker';
import { Avatar } from './components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Url } from '../../../constant/baseURL';
import { setLoader } from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import SearchablePickerMulti from '../../../common/searchablePickerMulti';
import { MedicalCondition } from '../../../common/data/data';
import { updateChild } from '../../../redux/profile/profile.action';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


var avatar = '';
export const UpdateChlid = props => {
  const childDetail = props.route.params.data
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);

  const [firstName, setFirstName] = useState(childDetail.firstName);
  const [lastName, setLastName] = useState(childDetail.lastName);
  const [gender, setGender] = useState(childDetail.gender);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [medicalCondition, setMedicalCondition] = useState(childDetail.medical);

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
    if (firstName == '') {
      showMessage('First name field should not be blank');
    } else if (firstName == '') {
      showMessage('Last name field should not be blank');
    } else if (gender == 'Select') {
      showMessage('Please choose gender');
    } else if (name == '') {
      showMessage('Emergency contact name field should not be blank');
    } else if (phone.length != 10) {
      showMessage('Emergency contact Phone number should be 10 digit');
    } else if (email == '') {
      showMessage('Emergency contact Email field should not be blank');
    } else if (medicalCondition.length == 0) {
      showMessage('Please select medical condition');
    } else {
      await AsyncStorage.setItem('childName', firstName + ' ' + lastName);
      let data = {
        parentId: currentUser._id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dob: '2021-12-15T09:22:32.678Z',
        name: name,
        phone: '+' + code + phone,
        email: email,
        medical: medicalCondition,
        avatar: avatar,
      };
      dispatch(setLoader(true));
      dispatch(updateChild(token, data, childDetail._id, props.navigation));
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label="Update Child" />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%', marginTop: 26 }}>
            <Text style={styles.head}>Update a Child</Text>
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
              onChangeText={value => {
                setFirstName(value);
              }}
              value={firstName}
            />
            <TextInput
              style={[styles.ti]}
              placeholder="Last name"
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
              data={['Male', 'Female',"Other",]}
              getValue={getGender.bind(this)}
            />
          </View>
          <View style={{ width: '80%', marginTop: 30 }}>
            <Text style={[styles.field, { marginBottom: 6 }]}>Date of Birth</Text>
            <DateCard />
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
            <SearchablePickerMulti
              item={MedicalCondition}
              value={medicalCondition}
              label="Medical Condition"
              subLabel="Select medical condition if there is any for your child"
              placeHolder="Select"
              getValue={getMedicalCondition.bind(this)}
            />
          </View>
          <View style={{ width: '80%', marginTop: 30 }}>
            <ButtonRegular
              title="Update"
              buttonStyle={{ backgroundColor: '#2C99C6' }}
              onClick={addClick}
            />
          </View>
        </View>
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: '#000000'
  },
  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
    color: '#000000'
  },
  subHead: {
    color: '#3D3D3D',
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.5'),
  },
  profileText: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4'),
    color: 'black',
  },
  profileSubText: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
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
    fontSize: wp('4'),
    color: '#000000'
  },
});
