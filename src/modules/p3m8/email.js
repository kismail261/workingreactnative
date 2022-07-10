import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, 
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { FONTS, Url } from '../../constant';
import Header from '../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SendMessage } from './components/sendMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import TNActivityIndicator from '../../common/TNIndicator';
import axios from 'axios';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

export const Email = (props) => {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)

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
    axios.post(`${Url}api/users/contact-us-email`, body, { headers: headers })
      .then(resp => {
        let response = resp.data
        dispatch(setLoader(false))
        showMessage("Email sent successfully")
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
        <Header navigation={props.navigation} label={"Email"} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
          <View style={{ width: '80%', marginTop: 22 }}>
            <Text style={[styles.title, { marginBottom: 10 }]}>Email</Text>
            <Text style={[styles.smallTxt, { marginBottom: 20 }]}>
              We're on standby to help
            </Text>
            <SendMessage message={sendMessage.bind(this)} />

          </View>
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
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: '#000000'
  },

  smallTxt: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#3D3D3D',
  },
  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: '#000000'
  },
  ti: {
    height: 132,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#70707026',
    padding: 10,
  },
  bottom: {
    width: '80%',
    marginTop: 20,
  },
});
