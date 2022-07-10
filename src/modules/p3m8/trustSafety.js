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


export const TrustSafety = (props) => {

  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label={"Trust & Safety"} />
      {/* <ScrollView style={{ width: '100%',flex:1 }}> */}
        <View style={{ width: '100%'}}>
          <View style={{ width: '90%', marginTop: 20 }}>
            <Text style={[styles.title]}>Trust & Safety</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '90%', marginTop: 7 }}>
            <Text style={[styles.field]}>Your safety is our priority, and your trust in us is paramount, which is why we designed and built Sporforya with trust and safety at our core.</Text>
            <Text style={[styles.toc, { marginTop: 11 }]}>
              Find & book with confidence
            </Text>
            <Text style={[styles.field, { marginTop: 11 }]}>
              Make it easy to find what you’re looking for by using our search filters, such as the category and type of sport, the schedule, who the sports activity is most suited to, and the facilities. Read the Providers profile, listing description, and checkout the facilities, any specific requirements, and the cancellation policy.
            </Text>
            <Text style={[styles.toc, { marginTop: 11 }]}>
              Keep communication & booking onboard
            </Text>
            <Text style={[styles.field, { marginTop: 11 }]}>
              Protect yourself, your payments, and your personal info by staying on our secure platform throughout the entire process, from booking, communication, payment and throughout the sports activity. We are always working hard to ensure its a safer and more valuable experience for everyone to stay inside the Sporforya community.
            </Text>
            <Text style={[styles.toc, { marginTop: 11 }]}>
              Highlight expectations & requirements
            </Text>
            <Text style={[styles.field, { marginTop: 11 }]}>
              When listing your services, events and facilities, it’s very useful to let potential Users know about any expectations or special requirements you may have. Expectations could be related to previous experience, or ability levels, and special requirements could be related to certifications, equipment needs, or facility utilization. Adding this detail helps Users make a more informed decision, and ensures everyone has a safe and enjoyable.
            </Text>
          </ScrollView>
          <View style={{ height: 50 }} />
        </View>

      {/* </ScrollView> */}

      <View style={styles.bottom}>
        <ButtonRegular onClick={() => props.navigation.goBack()} title="OK" blue buttonStyle={{ marginBottom: 10 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'space-between'
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
    // alignSelf:'center'
  },
});
