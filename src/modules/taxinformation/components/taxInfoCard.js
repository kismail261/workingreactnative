import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ButtonRegular from '../../../common/meduimBtnSP';
import { FONTS, ICONS } from '../../../constant';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';


export const TaxInfoCard = props => {
  const taxList = useSelector(state => state.tax.taxList)
  const { navigation } = props;
  // var companyName = {item.businessName};

  useEffect(() => {
    return () => {

    }
  }, [])

  return (
    <View style={styles.main}>
       <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Image source={ICONS.taxPercent} style={styles.icon} />
                <Text numberOfLines={1} style={styles.headText}>Taxpayer Information</Text>
                {/* <Text numberOfLines={1} style={styles.headText}>{item.businessName}</Text> */}
              </View>
      {
        taxList.map((item, index) => {
          return (
            <View key={index} style={{ alignItems: 'center', width: '100%' }} >
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Image source={ICONS.taxPercent} style={styles.icon} />
                <Text numberOfLines={1} style={styles.headText}>Texpayer Information</Text>
                <Text numberOfLines={1} style={styles.headText}>{item.businessName}</Text>
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 26,
                  width: '100%',
                }}>
                <Text style={styles.companyName}>{item.businessName}</Text>
                <Text onPress={() => { navigation.navigate("w9formUpdate", { detail: item}) }} style={styles.edit}>
                  Edit
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: 7,
                  width: '100%',
                  marginBottom: 20,
                }}>
                <Text style={styles.info}>Taxpayer ID: {item.SSN_EIN}</Text>
                <Text style={styles.info}>
                  Updated on: {moment(item.updatedAt).format('DD-MMM-YYYY')}
                </Text>
              </View>
            </View>
          )
        })
      }


      <View style={{ width: '100%' }}>
        <ButtonRegular
          label="Complete a new Taxpayer form"
          onClick={() => navigation.navigate("w9form")}
          bgColor={"#2C99C6"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: '#15488F26',
    borderRadius: 4,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  headText: {
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontWeight:'700'
  },
  companyName: {
    fontSize: 15,
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  info: {
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
    color: '#707070',
  },
  edit: {
    fontSize: 14,
    fontFamily: FONTS.SFRegular,
    color: '#2C99C6',
  },
  icon: {
    width: 34.04,
    height: 39.21,
    marginRight: 14.96,
  },
});
