import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ButtonRegular } from '../../common/btnRegular';
import Header from '../../common/headerBLC';
import { FONTS } from '../../constant';
import { Url } from '../../constant/baseURL';
import TNIndicator from '../../common/TNIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loader/loader.action';
import { changePassword } from '../../redux/user/user.action';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';


export const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token)
  const loader = useSelector(state => state.loader.loader)

  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')


  useEffect(() => {

    return () => {

    }
  }, [])

  const confirmClick = () => {
    if (current == '') {
      showMessage("Current password field should not be blank")
    } else if (newPass == '') {
      showMessage("New Password field should not be blank")
    }else if (newPass.length<6) {
      showMessage("Password should be atleast 6 digits")
    }
     else if (confirmPass == '') {
      showMessage("Confirm Password field should not be blank")
    } else if (confirmPass != newPass) {
      showMessage("Password does not match")
    }
    else {
      let data = {
        "currentPassword": current,
        "newPassword": newPass
      }
      dispatch(setLoader(true))
      dispatch(changePassword(data, token))
      setCurrent('')
      setNewPass('')
      setConfirmPass('')
    }

  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.main}>
        <Header navigation={props.navigation} label={"Password"} />
        <View style={{ width: '80%', marginTop: 20 }}>
          <Text style={[styles.title]}>Change Password</Text>
        </View>
        <View style={{ width: '80%', marginTop: 20 }}>
          <Text style={[styles.field, { marginBottom: 10 }]}>Current Password</Text>
          <TextInput
            style={styles.ti}
            secureTextEntry
            onChangeText={(value) => setCurrent(value)}
            value={current}
          />
        </View>
        <View style={{ width: '80%', marginTop: 20 }}>
          <Text style={[styles.field, { marginBottom: 10 }]}>New Password</Text>
          <TextInput
            style={styles.ti}
            secureTextEntry
            onChangeText={(value) => setNewPass(value)}
            value={newPass}
          />
        </View>
        <View style={{ width: '80%', marginTop: 20 }}>
          <Text style={[styles.field, { marginBottom: 10 }]}>Confirm Password</Text>
          <TextInput
            style={styles.ti}
            secureTextEntry
            onChangeText={(value) => setConfirmPass(value)}
            value={confirmPass}
          />
        </View>
        <View style={styles.bottom}>
        </View>
        <ButtonRegular onClick={confirmClick} title="Confirm" blue buttonStyle={{ marginBottom: 10 }} />
        <ButtonRegular onClick={() => props.navigation.goBack()} txts title="Cancel" white/>
        {
          loader
            ?
            <TNIndicator />
            :
            null
        }
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('8'),
    color: '#000000'
  },

  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#000000'
  },
  ti: {
    height: 46,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#70707026',
    padding: 10,
  },
  bottom: {
    width: '90%',
    height: hp('20')
  },
});
