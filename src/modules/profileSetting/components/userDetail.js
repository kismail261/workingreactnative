import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS, ICONS, ImageUrl, Url} from '../../../constant';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {setLoader} from '../../../redux/loader/loader.action';
import {getUserDetail} from '../../../redux/user/user.action';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

const userDetail = ({navigation}) => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const userDetail = useSelector(state => state.user.userDetail);

  useEffect(() => {
    dispatch(getUserDetail(currentUser._id));
    return () => {};
  }, []);

  const chooseImage = async () => {
    let options = {
      title: 'Upload Prescription',
      takePhotoButtonTitle: 'Take a Photo',
      chooseFromLibraryButtonTitle: 'Select From Gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        showMessage(response.customButton);
      } else {
        let file = null;
        if (Platform.OS !== 'android') {
          if (response && response.assets[0].uri) {
            response.assets[0].uri.replace('file://', '');
            file = {
              path: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
            };
          }
        } else {
          file = {
            path: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          };
        }
        dispatch(setLoader(true));
        getSignedUrl(file, token);
      }
    });
  };
  const getSignedUrl = async (data, token) => {
    let {type, name} = data;
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
        return response.key;
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
        console.log('percentComplete: ', percentComplete);
      }
    });

    xhr.onload = () => {
      if (xhr.status != 200) {
        showMessage('error is here');
      }
      updateDB(key);
    };
    xhr.send({uri: file.path, type: file.type, name: file.name});
  };

  const updateDB = async key => {
    try {
      const body = {
        avatar: key,
      };
      const response = await fetch(
        `https://api2.sporforya.com/api/users/profile-pic`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );
      const data = await response.json();
      if (response.status == 201) {
        showMessage('Picture updated');
        dispatch(getUserDetail(currentUser._d));
      }
      dispatch(setLoader(false));
    } catch (error) {
      const err = error;
      if (err.response) {
        showMessage(err.response.data.message);
      }
      dispatch(getUserDetail(currentUser._id));
      dispatch(setLoader(false));
    }
  };

  return (
    <View style={styles.container}>
      {userDetail != null && userDetail.isOrganization ? (
        <View style={styles.userContainer}>
          {loader ? (
            <View
              style={{
                width: wp('16'),
                height: wp('16'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'small'} color={'#000000'} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={chooseImage}
              style={{borderRadius: wp('16')}}>
              <Image
                source={
                  userDetail?.providerInfo?.avatar != undefined
                    ? {uri: ImageUrl + userDetail?.providerInfo?.avatar}
                    : ICONS.userIcon
                }
                style={{
                  width: wp('16'),
                  height: wp('16'),
                  borderRadius: wp('8'),
                }}
              />
              <Image
                source={ICONS.editIcon}
                style={{
                  width: 13,
                  height: 13,
                  position: 'absolute',
                  zIndex: 40,
                  bottom: 5,
                  right: 4,
                }}
              />
            </TouchableOpacity>
          )}

          <View style={{width: '79%'}}>
            <Text style={styles.titleStyle}>
              {userDetail?.organizationInfo?.orgName != undefined
                ? userDetail?.organizationInfo?.orgName
                : 'n/a'}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('editOrganizationIinfo')}>
              <Text style={styles.emailStyle}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.userContainer}>
          {loader ? (
            <View
              style={{
                width: wp('16'),
                height: wp('16'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'small'} color={'#000000'} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={chooseImage}
              style={{borderRadius: wp('16')}}>
              <Image
                source={
                  userDetail.providerInfo.avatar != undefined
                    ? {uri: ImageUrl + userDetail.providerInfo.avatar}
                    : ICONS.userIcon
                }
                style={{
                  width: wp('16'),
                  height: wp('16'),
                  borderRadius: wp('8'),
                }}
              />
              <Image
                source={ICONS.editIcon}
                style={{
                  width: 13,
                  height: 13,
                  position: 'absolute',
                  zIndex: 40,
                  bottom: 2,
                  right: 1,
                }}
              />
            </TouchableOpacity>
          )}
          <View style={{width: '79%'}}>
            <Text style={styles.titleStyle}>
              {userDetail.firstName != undefined ? userDetail.firstName : 'n/a'}{' '}
              {userDetail != null && userDetail.firstName != undefined
                ? userDetail.lastName
                : 'n/a'}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('editContactInfo')}>
              <Text style={styles.emailStyle}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default userDetail;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderRadius: 4,
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    color: '#000000',
    fontSize: wp('8'),
    fontFamily: FONTS.SFBold,
    textTransform: 'capitalize',
  },
  emailStyle: {
    color: '#288DB6',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFMedium,
    marginTop: 3,
    textDecorationLine: 'underline',
  },
});
