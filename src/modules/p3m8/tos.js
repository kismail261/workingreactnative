import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ButtonRegular } from '../../common/btnRegular';
import { FONTS } from '../../constant';
import Header from '../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const TermsOfService = (props) => {
  var tos1 =
    'Please read these Terms of Service (“Terms”) carefully as they contain important information about your legal rights, remedies and obligations. By accessing or using the Sporforya Platform, you agree to comply with and be bound by these Terms. Please note: These Terms contain an arbitration clause and class action waiver that applies to all Sporforya Customers. If your country of residence is the United States, this provision applies to all disputes with Sporforya. If your country of residence is outside of the United States, this provision applies to any action you bring against Sporforya in the United States. It affects how disputes with Sporforya are resolved. By accepting these Terms, you agree to be bound by this arbitration clause and class action waiver. Please read it carefully.';
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={"Terms of Service"} />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%', marginTop: 20 }}>
            <Text style={[styles.title]}>Terms of Service</Text>
          </View>
          <View style={{ width: '80%', marginTop: 7 }}>
            <Text style={[styles.field]}>{tos1}</Text>
            <Text style={[styles.toc, { marginTop: 11 }]}>
              Thank you for using Sporforya!
            </Text>
            <Text style={[styles.field, { marginTop: 11 }]}>
              These Terms constitute a legally binding agreement ("Agreement")
              between you and Sporforya (as defined below) governing your access
              to and use of the Sporforya website, including any subdomains
              thereof, and any other websites through which Sporforya makes its
              services available (collectively, "Site"), our mobile, tablet and
              other smart device applications, and application program
              interfaces (collectively, "Application") and all associated
              services (collectively, "Sporforya Services"). The Site,
              Application and Sporforya Services together are hereinafter
              collectively referred to as the “Sporforya Platform”. When these
              Terms mention “Sporforya,” “we,” “us,” or “our,” it refers to the
              Sporforya company you are contracting with. Your contracting
              entity will generally be determined based on your country of
              residence or establishment. If your country of residence or
              establishment is the United States, you are contracting with
              Sporforya, Inc., 1245 Champa St, Denver, CO 80204, United States.
              Our collection and use of personal information in connection with
              your access to and use of the Sporforya Platform is described in
              our Privacy Policy. Any and all payment processing services
              through or in connection with your use of the Sporforya Platform
              ("Payment Services") are provided to you by one or more Sporforya
              Payments entities (individually and collectively, as appropriate,
              "Sporforya Payments") as set out in the Payments Terms of Service
              ("Payments Terms"). Providers alone are responsible for
              identifying, understanding, and complying with all laws, rules and
              regulations that apply to their Listings and Provider Services. If
              you have questions about how local laws apply to your Listing(s)
              and Provider Service(s) on Sporforya, you should always seek legal
              guidance.
            </Text>
            <Text style={[styles.toc, { marginVertical: 19 }]}>
              Table of Contents
            </Text>
            <View style={styles.box}>
              <Text style={styles.tocVal}>1. Scope of Sporforya Services</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.tocVal}>
                2. Eligibility, Using the Sporforya Platform, Customer
                Verification
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.tocVal}>3. Modification of these Terms</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.tocVal}>4. Account Registration</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.tocVal}>5. Content</Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
        </View>

      </ScrollView>

      <View style={styles.bottom}>
        <ButtonRegular onClick={() => props.navigation.goBack()} title="Back" blue buttonStyle={{ marginBottom: 10 }} />
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
    color: '#000000'
  },

  field: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('3.6'),
    color: '#3D3D3D',
  },
  head: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('4.2'),
    color: '#000000'
  },
  toc: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('5'),
    color: '#000000'
  },
  tocVal: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('3.5'),
    color: '#000000'
  },
  box: {
    minHeight: 55,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#70707026',
    padding: 10,
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bottom: {
    width: '80%',
  },
});
