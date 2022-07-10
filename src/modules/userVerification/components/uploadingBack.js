/**
 * @format
 */
import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import { Url } from '../../../constant/baseURL';
import TNIndicator from '../../../common/TNIndicator'
import { FONTS, ICONS } from '../../../constant';
import Header from '../../../common/headerBLC';
import { uploadPhotoVerifyID } from '../../../redux/profile/profile.action';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


const uploadingBack = props => {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const imgDetail = props.route.params.imgData

  useEffect(() => {
    // setTimeout(() => {
    //   props.navigation.navigate("reviewInformation")
    // }, 3000);
    dispatch(setLoader(true))
    getSignedUrl()
    return () => { };
  }, []);

  const getSignedUrl = () => {
    let name = new Date().getTime()
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    axios.get(`${Url}api/file-upload/presigned-url?type="jpeg"&name=${name}&path=${imgDetail.uri}`,
      { headers: headers }
    ).then(resp => {
      let response = resp.data
      imageUpload(response.signedUrl, imgDetail, response.key)
    }).catch(error => {
      const err = error
      if (err.response) {
        showMessage(err.response.data.message)
      }
    });
  }

  const imageUpload = (signedUrl, file, key,) => {
    console.log("file: ", file)
    let name = new Date().getTime()
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', "jpeg");
    xhr.send({ uri: file.uri, type: "jpeg", name: name + "" });
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        let percentComplete = event.loaded / event.total;
        console.log("percentComplete: ", percentComplete)
      } else {
      }
      console.log("progress: ", event)
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          saveVerifiedLink(key)
        } else {
          console.log('Error while sending the image to S3')
        }
      }
    }
  }

  const saveVerifiedLink = (key) => {
    let data = [key]
    dispatch(uploadPhotoVerifyID(token, data, props.navigation, 2))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        label="Verification Badge"
        progressCount={0}
      />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%' }}  >
        <View style={{ width: '100%', alignItems: 'center' }} >
          <Image source={ICONS.uploadingIcon} style={{ width: wp('45'), height: wp('45'), marginTop: wp('15'), alignSelf: 'center' }} resizeMode="contain" />
          <Text style={styles.headingStyle}>Just a moment -</Text>
          <Text style={styles.headingStyle}>
            We are uploading the back of your ID
          </Text>
        </View>
      </ScrollView>

      {/* {
        loader
          ?
          <TNIndicator />
          :
          null
      } */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('70'),
    color: '#000000',
    fontSize: wp('7'),
    fontFamily: FONTS.SFBold,
    textAlign: 'center',
    alignSelf: 'center',
  },
  innerHeading: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 12 : 19,
  },
  subHeading: {
    width: wp('85'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
    textAlign: 'center',
  },
  boldSubHeading: {
    width: wp('85'),
    color: '#707070',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  inputHeading: {
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 10 : 18,
  },
  inputSubHeading: {
    color: '#707070',
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
});

export default uploadingBack;




// /**
//  * @format
//  */
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import { FONTS, ICONS } from '../../../constant';
// import Header from './header';


// const uploadingBack = props => {
//   useEffect(() => {
//     setTimeout(() => {
//       props.navigation.navigate("reviewInformation")
//     }, 2000);
//     return () => { };
//   }, []);

//   return (
//     <ScrollView >
//       <Header
//         navigation={props.navigation}
//         label="Verified Provider"
//         progressCount={0}
//       />
//       <View style={styles.container} >
//         <Image source={ICONS.uploadingIcon} style={{ width: wp('45'), height: wp('45'), top: wp('10'), bottom: wp('10'), alignSelf: 'center' }} resizeMode="contain" />
//         <Text style={styles.headingStyle}>Just a moment -</Text>
//         <Text style={styles.headingStyle}>
//           We are uploading the back of your ID
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFF',
//     alignItems: 'center',
//   },
//   headingStyle: {
//     width: wp('70'),
//     color: '#000000',
//     fontSize: wp('7'),
//     fontFamily: FONTS.SFBold,
//     textAlign: 'center',
//     alignSelf: 'center',
//   },
// });

// export default uploadingBack;
