import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonRegular from '../../common/meduimBtnSP';
import Header from './components/headerBL';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Communications from 'react-native-communications';
import Clipboard from '@react-native-clipboard/clipboard';
import TNActivityIndicator from '../../common/TNIndicator';
import {FONTS, ICONS, Url} from '../../constant';
import axios from 'axios';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

export const ReferAFriend = props => {
  const token = useSelector(state => state.user.token);
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const sendInvite = async () => {
    let validate = await validateEmail();
    if (email == '') {
      showMessage('Email field should not be blank');
    } else if (!validate) {
      showMessage('Wrong email format');
    } else {
      setLoader(true);
      let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      let data = {
        email: email,
      };
      axios
        .post(`${Url}api/refer/send-code`, data, {headers: headers})
        .then(resp => {
          let response = resp.data;
          props.navigation.navigate('InvitationSent', {role: 'Friend'});
          setLoader(false);
          setEmail('');
        })
        .catch(error => {
          const err = error;
          if (err.response) {
            showMessage(err.response.data.message);
          }
          setLoader(false);
        });
    }
  };

  const validateEmail = async () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const getEmail = value => {
    let removeSpace = value.replace(/ /g, '');
    setEmail(removeSpace);
  };

  const sendInviteClick = () => {
    Communications.email(
      ['appmonster00@gmail.com'],
      null,
      null,
      'Invitation for Sporforya',
      'this is demo body with link',
    );
    //props.navigation.navigate("InvitationSent")
  };

  var link = 'https://www.sporforya.com/c/javeriar18';
  const copyToClipBoard = () => {
    Clipboard.setString(link);
    showMessage('Link copied to clipboard');
  };
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
      <View style={styles.main}>
        <Header navigation={props.navigation} label="Refer a Friend" />
        <View style={{width: '80%', marginTop: 25}}>
          <Text style={styles.head}>We Value Friendships!</Text>
        </View>
        <View style={{width: '80%', marginTop: 11}}>
          <Text style={styles.desc}>
            Invite friends to Sporforya, and earn 1000 sporty points to spend on
            Sporforya! Terms apply
          </Text>
        </View>
        <View style={{width: '80%', marginTop: 11}}>
          <TextInput
            style={styles.ti}
            placeholder="Enter Email"
            onChangeText={value => getEmail(value)}
            value={email}
          />
        </View>
        <View style={{width: '80%', marginTop: 7}}>
          <ButtonRegular
            label="Send Invite"
            bgColor={'#75CB36'}
            onClick={sendInvite}
          />
        </View>
        <View style={{width: '80%', marginTop: 19}}>
          <Text style={styles.link}>Share your invite link</Text>
        </View>
        <View
          style={[
            {
              width: '80%',
              marginTop: 11,
              justifyContent: 'center',
              alignItems: 'center',
            },
            styles.ti,
          ]}>
          <Text style={styles.linkTxt} onPress={copyToClipBoard}>
            {link}
          </Text>
        </View>

        <View style={styles.imgCont}>
          <Image
            source={ICONS.referafriend}
            style={styles.img}
            resizeMode="stretch"
          />
        </View>
        {loader ? <TNActivityIndicator /> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2C99C6',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: '#FFFFFF',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.9'),
    color: '#FFFFFF',
  },
  link: {
    fontFamily: FONTS.SFBold,
    color: 'white',
    fontSize: 16,
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
    fontFamily: FONTS.SFRegular,
  },
  linkTxt: {
    width: '97%',
    color: '#707070',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
  },
  imgCont: {
    width: '100%',
    height: hp('25'),
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 1,
  },
  img: {
    height: hp('28'),
    width: '100%',
  },
});
