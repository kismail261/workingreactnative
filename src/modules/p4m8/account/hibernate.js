import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonRegular } from '../../../common/btnRegular';
import { FONTS } from '../../../constant';
import { CheckBox } from '../../taxinformation/components/checkbox';
import Header from '../../../common/headerBL';
import { MyTextinput } from '../../../common/textinput';

export const AccountHibernate = props => {
  const {close } = props.route.params;
  const [noNeed, setNoNeed] = useState(true);
  const [privacyConcern, setPrivacyConcern] = useState(false);
  const [terms, setTerms] = useState(false);
  const [other, setOther] = useState(false);

  useEffect(() => {
    return () => {
      
    }
  }, [])
  

  const getNoNeed = () => {
    setNoNeed(!noNeed)
  }

  const getPrivacyConcern = () => {
    setPrivacyConcern(!privacyConcern)
  }
  const getTerms = () => {
    setTerms(!terms)
  }
  const getOther = () => {
    setOther(!other)
  }


  return (
    <View style={styles.main}>
      <Header label={close ? "Close Account" : "Hibernate Account"} navigation={props.navigation} />
      <View style={{ height: 15 }} />
      <View style={[styles.view, { marginBottom: 20 }]}>
        <Text style={styles.title}>
          What prompted you to {close ? 'close account' : 'Hibernate'} ?
        </Text>
      </View>
      <View style={[styles.row, styles.view]}>
        <Text style={styles.txt}>I do not need sports activities anymore</Text>
        <CheckBox value={noNeed} getValue={getNoNeed} />
      </View>
      <View style={[styles.row, styles.view]}>
        <Text style={styles.txt}>I have safety or privacy concerns.</Text>
        <CheckBox value={privacyConcern} getValue={getPrivacyConcern} />
      </View>
      <View style={[styles.row, styles.view]}>
        <Text style={styles.txt}>
          I can’t comply with Sporforya’s Terms of Service
        </Text>
        <CheckBox value={terms} getValue={getTerms} />
      </View>
      <View style={[styles.row, styles.view]}>
        <Text style={styles.txt}>Other</Text>
        <CheckBox value={other} getValue={getOther} />
      </View>
      {
        other 
        ?
          <View style={[styles.row, styles.view]}>
            <MyTextinput
              placeholder={"Why do you want to Hibernate?"}
              onChangeText={() => { }}
            />
          </View>
          :
          null
      }

      <View style={[styles.bottom, styles.view]}>
        <ButtonRegular blue title="Continue" onClick={() => props.navigation.navigate(close ? "ConfirmClose" : "ConfirmHibernate")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },

  title: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: 'black',
  },
  txt: {
    fontFamily: FONTS.SFRegular,
    fontSize: 16,
    color: 'black',
    width: '80%',
  },

  view: {
    width: '80%',

    marginBottom: 5,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.18,
    borderBottomColor: 'black',
    marginVertical: 15,
  },
});
