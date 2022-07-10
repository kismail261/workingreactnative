import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setLoader} from '../../../redux/loader/loader.action';
import TNIndicator from '../../../common/TNIndicator';
import {FONTS, ICONS} from '../../../constant';
import {MyTextinputMultiline} from '../../../common/textinputMultiline';
import {ButtonRegular} from '../../../common/btnRegular';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Header from '../components/header';
import {provider} from '../home/components/data/providerTypes';
import {Url} from '../../../constant/baseURL';
import ProviderTypeDropdown from '../home/components/providerTypeDropdown';
import {MyTextinput} from '../../../common/textinput';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';

var photos = [];
const editProviderInfo = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const [selectProvider, setSelectedProvider] = useState(['1']);
  const [bio, setBio] = useState('');
  const [description, setDescription] = useState('');
  const [personalizedUrl, setPersonalizedUrl] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarLocal, setAvatarLocal] = useState('');
  const [photosLocal, setPhotosLocal] = useState([]);

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setBio(data.providerInfo.bio);
      setSelectedProvider(data.providerInfo.providerType);
      setAvatarLocal(data.providerInfo.avatar);
      setPhotosLocal(data.providerInfo.image);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      const body = {
        avatar: avatarLocal,
        image: photosLocal,
        providerType: selectProvider,
        bio: bio,
        description: description,
        personalProviderUrl: personalizedUrl,
      };

      const response = await fetch(
        `https://api2.sporforya.com/api/users/providerinfo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (response.status == 201) {
        props.navigation.navigate('providerHome');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getBio = value => {
    setBio(value);
  };

  const getDescription = value => {
    setDescription(value);
  };

  const getUrl = value => {
    setPersonalizedUrl(value);
  };

  const getProvider = selectedItems => {
    setSelectedProvider(selectedItems);
  };

  const saveProvider = () => {
    updateData();
  };

  const chooseImage = async type => {
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

        if (type == 'avatar') {
          setAvatarLocal(response.assets[0].uri);
        } else {
          setPhotosLocal(response.assets[0].uri);
        }
        dispatch(setLoader(true));
        getSignedUrl(file, token, type);
      }
    });
  };
  const chooseMultipleImages = async () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 6,
    })
      .then(images => {
        if (images.length > 6) {
          showMessage('Please select max 6 photos');
        } else {
          setPhotosLocal(images);
          photos = [];
          images.forEach(async element => {
            let tempName = new Date().getTime();
            dispatch(setLoader(true));
            const file = {
              path: element.path,
              name: tempName,
              type: element.mime,
            };
            let key = await getSignedUrl(file, token, 'photos');
          });
        }
      })
      .catch(error => {});
  };

  const getSignedUrl = async (data, token, tempType) => {
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
        imageUpload(response.signedUrl, data, response.key, tempType);
        return response.key;
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
      });
  };

  const imageUpload = (signedUrl, file, key, type) => {
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
      dispatch(setLoader(false));
      if (type == 'avatar') {
        setAvatar(key);
        // showMessage('Profile photo uploaded successfully');
      } else {
        photos.push(key);
      }
    };
    xhr.send({uri: file.path, type: file.type, name: file.name});
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label="Edit Provider Information" />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onResponderMove={() => {
          console.log('outer responding');
        }}>
        <View style={{width: wp('80%'), alignSelf: 'center'}}>
          <View style={{marginTop: Platform.OS == 'android' ? 20 : 35}}>
            <Text style={styles.h1}>Provider Information</Text>
          </View>
          <View style={{marginTop: 8}}>
            <Text style={styles.p}>
              Tell us a little bit about you and what you are providing.
            </Text>
          </View>
          <View style={styles.addDp}>
            <TouchableOpacity
              onPress={() => chooseImage('avatar')}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: '28%',
              }}>
              <Image
                source={avatarLocal == '' ? ICONS.userIcon : {uri: avatarLocal}}
                style={{
                  height: wp('23'),
                  width: wp('23'),
                  borderRadius: wp('12'),
                }}
              />
              <Image
                source={ICONS.plusIcon}
                style={{height: 20, width: 20, marginLeft: -20}}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '65%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={styles.h2}>Add a Profile Photo</Text>
              <Text style={[styles.p, {width: wp('40')}]}>
                JPEG or PNG, no larger than 10MB
              </Text>
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <Text style={styles.h3}>
              Add some photos of the sports or activities you provide
            </Text>
          </View>
          {photosLocal.length == 0 ? (
            <TouchableOpacity
              onPress={() => chooseMultipleImages()}
              style={styles.addPhotos}>
              <Image
                source={ICONS.plusLightIcon}
                style={{height: 24, width: 26, marginRight: 10}}
                resizeMode={'contain'}
              />
              <Text style={styles.p}>Add up to 6 photos.</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => chooseMultipleImages()}
              style={styles.addPhotos}>
              {photosLocal.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{uri: item.path}}
                    style={{height: '100%', width: '15%', margin: '1%'}}
                  />
                );
              })}
            </TouchableOpacity>
          )}
          <ProviderTypeDropdown
            item={provider}
            value={selectProvider}
            label="Provider Type"
            subLabel="Select a Provider Type which best describes you"
            placeHolder="Select"
            getValue={getProvider.bind(this)}
          />
          <View>
            <Text style={[styles.h3, {marginTop: 10}]}>Information / Bio</Text>
            <MyTextinputMultiline
              styles={{height: 92, marginTop: 3}}
              placeholderTextColor={styles.placeholderStyle}
              placeholder="Describe who you are, your expertise, experience, and any affiliations / qualifications."
              value={bio}
              onChangeText={getBio.bind(this)}
            />
          </View>
          <View>
            <Text style={[styles.h3, {marginTop: 10}]}>
              Provider Description
            </Text>
            <MyTextinputMultiline
              styles={{height: 92, marginTop: 3}}
              placeholderTextColor={styles.placeholderStyle}
              placeholder="Describe the services or events you offer, when, where and for who."
              value={description}
              onChangeText={getDescription.bind(this)}
            />
          </View>

          <View>
            <Text style={[styles.h3, {marginTop: 10}]}>
              Personalized Provider URL
            </Text>
            <Text style={[styles.p, {marginTop: 10, color: '#707070'}]}>
              Create your own Personalized Provider URL for (name of
              organization/Individual). A personalized Provider URL allows your
              Users to easily access your upcoming listings{' '}
            </Text>
            <View style={styles.ppu}>
              <View style={styles.pputxtCont}>
                <Text
                  style={{
                    color: '#707070',
                    fontSize: 14,
                    fontFamily: FONTS.SFRegular,
                  }}>
                  http://
                </Text>
              </View>
              <View style={{width: '80%'}}>
                <MyTextinput
                  styles={{height: 92, marginTop: 3}}
                  placeholderTextColor={styles.placeholderStyle}
                  value={personalizedUrl}
                  onChangeText={getUrl.bind(this)}
                />
              </View>
            </View>
          </View>

          <View style={{marginVertical: 20}}>
            <ButtonRegular onClick={() => saveProvider()} blue title="Next" />
          </View>
        </View>
      </ScrollView>

      {loader ? <TNIndicator /> : null}
    </SafeAreaView>
  );
};
export default editProviderInfo;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
  },
  h1: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: '#000000',
  },
  h2: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4'),
    color: '#000000',
  },
  h3: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#000000',
  },
  p: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#3D3D3D',
  },
  p1: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#707070',
  },
  addDp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginTop: 26,
  },
  addPhotos: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B4D9ECB3',
    backgroundColor: '#B4D9EC1A',
    marginTop: 10,
  },
  dropdown: {
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 11,
  },
  placeholderStyle: {
    color: '#707070',
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
  },
  ppu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pputxtCont: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    width: '20%',
    //borderWidth: 1,

    borderRadius: 5,
  },
});
