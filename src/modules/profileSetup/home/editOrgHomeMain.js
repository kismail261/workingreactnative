import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { FONTS, ICONS, ImageUrl } from '../../../constant';
import { MyTextinputMultiline } from '../../../common/textinputMultiline';
import { ButtonRegular } from '../../../common/btnRegular';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../components/header'
import { provider } from './components/data/providerTypes';
import { typesProvider } from './components/data/typesProvider';
import { Url } from '../../../constant/baseURL';
import ProviderTypeDropdown from './components/providerTypeDropdown';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


var photos = []
const orgHomeMain = (props) => {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const userDetail = useSelector(state => state.user.userDetail);
  const [progress, setProgress] = useState(0.5)
  const [selectProvider, setSelectedProvider] = useState([])
  const [bio, setBio] = useState(userDetail.organizationInfo.bio)
  const [description, setDescription] = useState(userDetail.organizationInfo.description)
  const [personalizedUrl, setPersonalizedUrl] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarLocal, setAvatarLocal] = useState(userDetail.organizationInfo.avatar)
  const [photosLocal, setPhotosLocal] = useState(userDetail.organizationInfo.image)


  useEffect(() => {
    getSelectedProviderList()
    setTimeout(() => {
      setProgress(0.7)
    }, 100);
    return () => {

    }
  }, [])

  const getSelectedProviderList = () => {
    const tempProvider = typesProvider.filter((item) => userDetail.providerInfo?.providerType.includes(item.title))
    setSelectedProvider(tempProvider)
  }

  const getBio = value => {
    setBio(value)
  };

  const getDescription = value => {
    setDescription(value)
  };

  const getUrl = value => {
    setPersonalizedUrl(value)
  };

  const getProvider = selectedItems => {
    setSelectedProvider(selectedItems)

  };

  const updateData = async () => {
    try {
      if (selectProvider.length == 0) {
        showMessage("Please select provider type");
      } else if (bio == '') {
        showMessage("Bio field should not be blank");
      } else if (description == '') {
        showMessage("Description field should not be blank");
      }
      else if (personalizedUrl != '') {
        showMessage("Personalized provider URL field should not be blank");
      }
      else {
        let tempProvider = [];
        selectProvider.forEach(element => {
          tempProvider.push(element.title)
        });
        dispatch(setLoader(true))
        const body = {
          "avatar": avatar,
          "image": photos,
          "providerType": tempProvider,
          "bio": bio,
          "description": description,
          "personalProviderUrl": 'string'
        };

        const response = await fetch(
          `https://api2.sporforya.com/api/users/propviderinfo-org`,
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
          props.navigation.navigate('editOrganizationContactInfo');
        }
        dispatch(setLoader(false))
      }
    } catch (error) {
      console.error(error);
      dispatch(setLoader(false))
    }
  };

  const chooseImage = async (type) => {
    let options = {
      title: 'Upload Prescription',
      takePhotoButtonTitle: 'Take a Photo',
      chooseFromLibraryButtonTitle: 'Select From Gallery',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        showMessage(response.customButton);
      } else {
        // if (Platform.OS !== 'android') {
        //     if (imageObject && imageObject.uri) {
        //         imageObject.uri.replace('file://', '');
        //     }
        // }
        const file = {
          path: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        };

        dispatch(setLoader(true))
        getSignedUrl(file, token, type)
      }
    });
  };

  const chooseMultipleImages = async () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: 6,
    }).then(images => {
      if (images.length > 6) {
        showMessage("Please select max 6 photos")
      } else {
        setPhotosLocal(images)
        photos = []
        images.forEach(async (element) => {
          let tempName = new Date().getTime()
          dispatch(setLoader(true))
          const file = {
            path: element.path,
            name: tempName,
            type: element.mime,
          };
          let key = await getSignedUrl(file, token, "photos")
        });
      }
    }).catch((error) => {

    })
  };

  const getSignedUrl = async (data, token, tempType) => {
    let { type, name, path } = data
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    await axios.get(`${Url}api/file-upload/presigned-url?type=${type}&name=${name}`,
      { headers: headers }
    ).then(resp => {
      let response = resp.data
      imageUpload(response.signedUrl, data, response.key, tempType)
    }).catch(error => {
      const err = error
      if (err.response) {
        showMessage(err.response.data.message)
      }
    });
  }

  const imageUpload = (signedUrl, file, key, type) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        let percentComplete = event.loaded / event.total;

      } else { }
    });
    xhr.onload = () => {
      if (xhr.status != 200) {
        showMessage("error is here")
      }
      dispatch(setLoader(false))
      if (type == 'avatar') {
        setAvatarLocal(key)
      } else {
        photos.push(key)
        setPhotosLocal(photos)
      }
    }
    xhr.send({ uri: file.path, type: file.type, name: file.name });

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <View style={styles.main}>
        <Header navigation={props.navigation} label="Profile information" progressCount={progress} />
        <ScrollView style={{ width: '100%' }}>
          <View style={{ width: '80%', alignSelf: 'center' }}>
            <View style={{ marginTop: Platform.OS == "android" ? 20 : 35 }}>
              <Text style={styles.h1}>Provider Information</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={styles.p}>
                Tell us a little about your organization and what you are providing.
              </Text>
            </View>
            <View style={styles.addDp}>
              <TouchableOpacity
                onPress={() => chooseImage("avatar")}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  width: '28%',
                  //borderWidth: 1,
                }}>
                <Image source={avatarLocal == '' ? ICONS.orgIcon : { uri: ImageUrl + avatarLocal }} style={{ height: wp('23'), width: wp('23'), borderRadius: wp('12') }} />
                <Image
                  source={ICONS.plusIcon}
                  style={{ height: 20, width: 20, marginLeft: -20 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: '65%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text style={[styles.h2, { width: wp('40'), marginBottom: 4 }]}>Add your Organization Logo</Text>
                <Text style={[styles.p, { width: wp('40') }]}>JPEG or PNG, no larger than 10MB</Text>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.h3}>
                Add some photos of the sports or activities your organization provides
              </Text>
            </View>
            {photosLocal.length == 0
              ?
              <TouchableOpacity onPress={() => chooseMultipleImages()} style={styles.addPhotos}>
                <Image
                  source={ICONS.plusLightIcon}
                  style={{ height: 24, width: 26, marginRight: 10 }}
                  resizeMode={'contain'}
                />
                <Text style={styles.p}>Add up to 6 photos.</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => chooseMultipleImages()} style={styles.addPhotos}>
                {
                  photosLocal.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        source={{ uri: ImageUrl + item }}
                        style={{ height: '100%', width: '15%', margin: '1%' }}
                      />
                    )
                  })
                }

              </TouchableOpacity>
            }
            <ProviderTypeDropdown item={provider} value={selectProvider} label="Provider Type" subLabel="Select a Provider Type which best describes you" placeHolder="Select" getValue={getProvider.bind(this)} />
            <View>
              <Text style={[styles.h3, { marginTop: 10 }]}>Information / Bio</Text>
              <MyTextinputMultiline
                styles={{ height: 92, marginTop: 3 }}
                placeholderTextColor={styles.placeholderStyle}
                placeholder="Describe your Organization, expertise, and experience, along with any affiliations and associations"
                value={bio}
                onChangeText={getBio.bind(this)}
              />
            </View>
            <View>
              <Text style={[styles.h3, { marginTop: 10 }]}>
                Provider Description
              </Text>
              <MyTextinputMultiline
                styles={{ height: 92, marginTop: 3 }}
                placeholderTextColor={styles.placeholderStyle}
                placeholder="Describe the services or events you offer, when, where and for who."
                value={description}
                onChangeText={getDescription.bind(this)}
              />
            </View>

            {/* <View>
            <Text style={[styles.h3, { marginTop: 10 }]}>
              Personalized Provider URL
            </Text>
            <Text style={[styles.p, { marginTop: 10, color: '#707070' }]}>
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
              <View style={{ width: '80%' }}>
                <MyTextinput
                  styles={{ height: 92, marginTop: 3 }}
                  placeholderTextColor={styles.placeholderStyle}
                  value={personalizedUrl}
                  onChangeText={getUrl.bind(this)}
                />
              </View>
            </View>
          </View>
           */}
            <View style={{ marginVertical: 20 }}>

              <ButtonRegular onClick={() => updateData()} blue title="Next" />
            </View>
          </View>
        </ScrollView>
        {
          loader
            ?
            <TNIndicator />
            :
            null
        }
      </View>
    </KeyboardAvoidingView>
  );
};
export default orgHomeMain;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  h1: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('6'),
    color: '#000000'
  },
  h2: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('4'),
    color: '#000000'
  },
  h3: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#000000'
  },
  p: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#3D3D3D'
  },
  p1: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#707070'
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
