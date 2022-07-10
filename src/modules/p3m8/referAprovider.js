import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import ButtonRegular from '../../common/meduimBtnSP';
import TNActivityIndicator from '../../common/TNIndicator';
import { FONTS, ICONS, Url } from '../../constant';
import Header from './components/headerBL';
import Clipboard from '@react-native-clipboard/clipboard';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

export const ReferAProvider = (props) => {
  const token = useSelector(state => state.user.token)
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)

  var link = 'https://www.sporforya.com/c/javeriar18';

  const sendInvite = async () => {
    let validate = await validateEmail()
    if (email == "") {
      showMessage("Email field should not be blank")
    } else if (!validate) {
      showMessage("Wrong email format")
    } else {
      setLoader(true)
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      let data = {
        "email": email
      }
      axios.post(`${Url}api/refer/send-code`, data, { headers: headers })
        .then(resp => {
          let response = resp.data
          props.navigation.navigate("InvitationSent", { role: "Provider" })
          setLoader(false)
          setEmail('')
        })
        .catch(error => {
          const err = error
          if (err.response) {
            showMessage(err.response.data.message)
          }
          setLoader(false)
        });
    };
  };

  const validateEmail = async () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const getEmail = (value) => {
    let removeSpace = value.replace(/ /g, '')
    setEmail(removeSpace)
  }

  const copyLinkToClipboard = () => {
    Clipboard.setString(link)
    showMessage('Link copied to clipboard', 'success')
  }

  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label='Refer a Provider' />

      <View style={{ width: '80%', marginTop: 25 }}>
        <Text style={styles.head}>More Providers bring more customers</Text>
      </View>
      <View style={{ width: '80%', marginTop: 11 }}>
        <Text style={styles.desc}>
          Tell other Providers about Sporforya, and earn 1000 sporty points when
          they join our community. More Providers = more choice = more customers
          for everyone. Terms apply.
        </Text>
      </View>
      <View style={{ width: '80%', marginTop: 11 }}>
        <TextInput
          style={styles.ti}
          placeholder="Enter Email"
          placeholderTextColor={"#707070"}
          onChangeText={(value) => getEmail(value)}
          value={email}
        />
      </View>
      <View style={{ marginTop: 7 }}>
        <ButtonRegular label="Send Invite" bgColor={"#75CB36"} onClick={sendInvite} />
      </View>
      <View style={{ width: '80%', marginTop: 19 }}>
        <Text style={styles.link}>Share your invite link</Text>
      </View>
      <TouchableOpacity
        onPress={copyLinkToClipboard}
        style={[
          {
            width: '80%',
            marginTop: 11,
            justifyContent: 'center',
            alignItems: 'center',
          },
          styles.ti,
        ]}>
        <Text style={styles.linkTxt}>{link}</Text>
      </TouchableOpacity>
      <View style={styles.imgCont}>
        <Image source={ICONS.refer} style={styles.img} resizeMode='contain' />
      </View>

      {
        loader
          ?
          <TNActivityIndicator />
          :
          null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21D17F',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: '#FFFFFF',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#FFFFFF',
  },
  link: {
    fontFamily: FONTS.SFBold,
    color: 'white',
    fontSize: wp('4'),
  },
  ti: {
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 4,
    height: 46,
    padding: 10,
    backgroundColor: 'white',
    fontSize: wp('3.5'),
    color: '#000000',
    fontFamily: FONTS.SFRegular
  },
  linkTxt: {
    color: '#707070',
    opacity: 0.5,
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
  },
  imgCont: {
    bottom: 0,
    width: '100%',
    marginTop: hp('3')

  },
  img: {
    height: wp('50'),
    width: wp('100'),
  },
});
