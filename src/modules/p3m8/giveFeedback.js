import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { FONTS, ICONS, Url } from '../../constant';
import Header from '../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SendMessage } from './components/sendMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import TNActivityIndicator from '../../common/TNIndicator';
import axios from 'axios';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


export const GiveFeedback = (props) => {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const [sendMsgActive, setSendMsgActive] = useState(false)

  useEffect(() => {
    return () => {
    }
  }, [])

  const changeState = () => {
    setSendMsgActive(!sendMsgActive)
  }

  const sendMessage = (data) => {
    dispatch(setLoader(true))
    let headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    let body = {
      "userId": currentUser._id,
      "usedAs": data.usingAs,
      "feedbackFor": data.messageAbout,
      "description": data.message
    }
    axios.post(`${Url}api/users/feedback`, body, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        showMessage("Message sent successfully")
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        dispatch(setLoader(false))
        console.log("err resendCode: ", err.response.data.message)
      });
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <SafeAreaView style={styles.main}>
        <Header label="Give Us Feedback" navigation={props.navigation} />
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
          <View style={{ width: '80%', marginTop: 20 }}>
            <Text style={[styles.head, { width: '70%' }]}>How are we doing?</Text>
          </View>
          <View style={{ width: '80%', marginTop: 21 }}>
            <Text style={styles.desc}>
              We're always working to improve the Sporforya Experience, so we would
              love to hear what is working and how we can do it better.
            </Text>
          </View>
          <TouchableOpacity onPress={changeState} style={[{ width: '80%', marginTop: 20 }, styles.btn]}>
            <View style={styles.insideBtn}>
              <Image source={ICONS.sendmsg} style={styles.msgIcon} />
              <Text style={styles.btnName}>Send Message</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showMessage("Will be active when apps are live")} style={[{ width: '80%' }, styles.btn]}>
            <View style={styles.insideBtn}>
              <Image source={ICONS.rate} style={styles.rateIcon} />
              <Text style={styles.btnName}>Rate in App / Play Store</Text>
            </View>
          </TouchableOpacity>
          {
            sendMsgActive
              ?
              <SendMessage message={sendMessage.bind(this)} />
              :
              null
          }

        </ScrollView>
        {
          loader
            ?
            <TNActivityIndicator />
            :
            null
        }
      </SafeAreaView>
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
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: 'black',
    textAlign: 'left',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#3D3D3D',
  },
  btnName: {
    color: '#000000',
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
  },
  msgIcon: {
    height: 28.94,
    width: 32.59,
    marginRight: 14,
  },
  rateIcon: {
    height: 19.74,
    width: 38.88,
    marginRight: 12,
  },
  btn: {
    height: 75,
    alignItems: 'center',
    borderColor: '#15488F26',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    //width: '100%',
    justifyContent: 'center',
    marginBottom: 13,
  },
  insideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
});
