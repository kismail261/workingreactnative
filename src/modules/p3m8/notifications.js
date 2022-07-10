import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../constant';
import Header from '../../common/headerBLC';
import {CustomSwitch} from './components/customSwitch';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Option = props => {
  return (
    <View style={styles.langRow}>
      <Text style={[styles.field, props.disabled && {opacity: 0.48}]}>
        {props.name}
      </Text>
      <CustomSwitch
        isOn={props.value}
        onToggle={() => props.getValue()}
        green
      />
    </View>
  );
};

export const Notifications = props => {
  const [mEmail, setmEmail] = useState(mEmail);
  const [mPush, setmPush] = useState(mPush);
  const [mText, setmText] = useState(mText);

  const [rEmail, setrEmail] = useState(true);
  const [rPush, setrPush] = useState(false);
  const [rText, setrText] = useState(false);
  const [rsupport, setrsupport] = useState(false);

  const [pEmail, setpEmail] = useState(false);
  const [pPush, setpPush] = useState(false);
  const [pText, setpText] = useState(false);

  const [aEmail, setaEmail] = useState(false);
  const [aPush, setaPush] = useState(false);
  const [aText, setaText] = useState(false);
  const [aPhone, setaPhone] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={'Notifications'} />
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '80%', marginTop: 20}}>
            <Text style={[styles.title, {marginBottom: 10}]}>Messages</Text>
            <Text style={[styles.desc, {marginBottom: 26}]}>
              Receive messages from users including booking requests
            </Text>
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Option
              name="Messages"
              value={mEmail}
              getValue={() => setmEmail(!mEmail)}
            />
            <Option
              name="Push Notifications"
              value={mPush}
              getValue={() => setmPush(!mPush)}
            />
            <Option
              name="Text Messages"
              value={mText}
              getValue={() => setmText(!mText)}
            />
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Text style={[styles.title, {marginBottom: 10}]}>Reminders</Text>
            <Text style={[styles.desc, {marginBottom: 26}]}>
              Receive booking reminders, requests to write a review and other
              reminders related to your activities on Sporforya
            </Text>
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Option
              name="Email"
              value={rEmail}
              getValue={() => setrEmail(!rEmail)}
            />
            <Option
              name="Push Notifications"
              value={rPush}
              getValue={() => setrPush(!rPush)}
            />
            <Option
              name="Text Messages"
              value={rText}
              getValue={() => setrText(!rText)}
            />
            <Option
              name="Account Support"
              value={rsupport}
              getValue={() => setrsupport(!rsupport)}
            />
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Text style={[styles.title, {marginBottom: 10}]}>
              Promotions and Tips
            </Text>
            <Text style={[styles.desc, {marginBottom: 26}]}>
              Receive coupons, promotions, surveys, product updates, and
              inspirations from Sporforya and Sporforya's Partners.
            </Text>
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Option
              name="Email"
              value={pEmail}
              getValue={() => setpEmail(!pEmail)}
            />
            <Option
              name="Push Notifications"
              value={pPush}
              getValue={() => setpPush(!pPush)}
            />
            <Option
              name="Text Messages"
              value={pText}
              getValue={() => setpText(!pText)}
            />
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Text style={[styles.title, {marginBottom: 10}]}>
              Account Support
            </Text>
            <Text style={[styles.desc, {marginBottom: 26}]}>
              Receive updates about your account, legal notifications, security
              and privacy matters and customer support requests. For your
              security, you can not disable email notifications
            </Text>
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <Option
              name="Email"
              value={aEmail}
              getValue={() => setaEmail(!aEmail)}
            />
            <Option
              name="Push Notifications"
              value={aPush}
              getValue={() => setaPush(!aPush)}
            />
            <Option
              name="Text Messages"
              value={aText}
              getValue={() => setaText(!aText)}
            />
            <Option
              name="Phone Calls"
              value={aPhone}
              getValue={() => setaPhone(!aPhone)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    color: '#000000',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#3D3D3D',
  },
  field: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
    color: '#000000',
  },
  country: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#000000',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  bottom: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
  },
});
