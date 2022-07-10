import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View, Text, TextInput,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import { ButtonRegular } from '../../../../common/buttonRegular';
import Header from '../../../../common/headerBL';
import TNIndicator from '../../../../common/TNIndicator';
import { FONTS } from '../../../../constant';
import { showMessage } from '../../../../helpers/replaceDigitsWithAesteriks';


export const InsuranceDocument = (props) => {
  const apiData = props.route.params.apiData
  const token = useSelector(state => state.user.token);
  const [url, setURL] = useState('');
  const [loader, setLoader] = useState(false);


  useEffect(() => {
  }, []);

  const submitForm = async () => {
    setLoader(true)
    const body = {
      listingId: apiData.listingId,
      scheduleId: apiData.scheduleId,
      totalPrice: apiData.totalPrice,
      userId: apiData.userId,
      childIds: apiData.childIds,
      start: apiData.start,
      end: apiData.end,
      insuranceDocument: [url],
      stripeToken: "tok_1KABngAgX112kHhbsarHZ4z8"
    };

    await fetch(`https://api2.sporforya.com/api/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(res => {
        const data = res;
        setLoader(false)
        props.navigation.navigate("Bookings")
      })
      .catch(error => {
        const err = error
        if (err.response) {
          showMessage(err.response.data.message)
        }
        setLoader(false)
      });

  };

  return (
    <View style={styles.main}>
      <Header label={"Insurance"} navigation={props.navigation} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: '100%', alignItems: 'center' }}  >
        <View style={{ width: '90%', marginTop: 20, alignSelf: 'center', marginBottom: 25 }}>
          <Text style={[styles.head, { marginBottom: 8 }]}>Insurance Document</Text>
          <Text style={[styles.desc, { marginBottom: 10 }]}>
            Please upload an insurance document or add a URL link for the web page
            or document.
          </Text>
          <Text style={[styles.desc, { marginBottom: 26 }]}>
            The insurance document should have your name, and the amount insured
            should be $500.
          </Text>
          <Text style={[styles.subhead, { marginBottom: 10 }]}>
            URL of insurance document
          </Text>
          <TextInput
            style={styles.ti}
            onChangeText={e => {
              setURL(e);
            }}
          />
          <View
            style={{
              marginVertical: 26,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.greytxt]}>OR</Text>
          </View>
          <View style={[styles.box]}>
            <Text style={styles.uploadText}>Upload File</Text>
          </View>
          <Text style={[styles.desc, { color: 'black', marginTop: 5 }]}>
            Accepted file formats:PDF, JPEG, PNG
          </Text>
          <ButtonRegular
            buttonStyle={{ backgroundColor: '#2C99C6', marginTop: '30%' }}
            title="Continue"
            onClick={() => {
              if (url.length < 1) {
                showMessage('Missing URL');
                return;
              }

              submitForm();
            }}
          />
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

  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 26,
    color: '#000000',
  },
  subhead: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 14,
    color: '#000000',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    fontSize: 14,
  },
  greytxt: {
    fontFamily: FONTS.SFBold,
    color: '#707070',
    fontSize: 14,
  },
  ti: {
    borderWidth: 1,
    borderColor: '#70707026',
    height: 46,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  box: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#B4D9ECB3',
    borderWidth: 2,
    backgroundColor: '#B4D9EC1A',
    borderRadius: 4,
  },
  uploadText: {
    fontFamily: FONTS.SFRegular,
    color: 'black',
    fontSize: 14,
  },
});
