import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {FONTS} from '../../constant';
import {CheckBox} from '../taxinformation/components/checkbox';
import Header from '../../common/headerBLC';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';

const Option = props => {
  const boxClick = () => {
    if (props.name == 'English') {
    } else {
      showMessage('Comming soon in version 2');
    }
  };

  return (
    <View style={styles.langRow}>
      <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
        <Text
          style={[
            styles.lang,
            {color: props.name == 'English' ? '#000000' : 'grey'},
          ]}>
          {props.name}
        </Text>
        {props.country && (
          <Text style={[styles.country, {marginTop: 4}]}>{props.country}</Text>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CheckBox value={props.value} getValue={boxClick} />
      </View>
    </View>
  );
};

export const Language = props => {
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={'Change Language'} />
      <View style={{width: '80%', marginTop: 20}}>
        <Text style={[styles.title, {marginBottom: 10}]}>Language</Text>
        <Text style={[styles.desc, {marginBottom: 26}]}>
          Select the language preference for your application
        </Text>
      </View>
      <View style={{width: '80%', marginTop: 20}}>
        <Option name="English" country="America" value={true} />
        <Option name="German" value={false} />
        <Option name="Hindi" value={false} />
        <Option name="Dutch" value={false} />
        <Option name="Turkish" value={false} />
        <Option name="Arabic" value={false} />
        <Option name="Urdu" value={false} />
      </View>
      <View style={styles.bottom}>
        <ButtonRegular
          title="Done"
          blue
          onClick={() => props.navigation.goBack()}
        />
      </View>
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
  lang: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4'),
  },
  country: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3'),
    color: '#000000',
    opacity: 0.7,
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
    bottom: 20,
  },
});
