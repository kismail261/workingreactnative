import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONTS, ICONS} from '../constant';
const Card = ({data, navigation}) => {
  const {images, title, description, id} = data;
  const clickMethod = () => {
    if (id == 1) {
      //Create New Listing
      navigation.navigate('Create New Listing');
    } else if (id == 3) {
      navigation.navigate('verifiedProvider');
    } else {
      navigation.navigate('paymentStack');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftSectionStyle}>
        <View style={styles.iconRow}>
          {images.map((item, index) => {
            return (
              <Image
                key={index}
                source={item.icon}
                //style={{width: wp('8'), height: wp('8'), marginRight: 8}}
                style={[item.style, {marginRight: 8}]}
                resizeMode={'center'}
              />
            );
          })}
        </View>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.descStyle}>{description}</Text>
      </View>

      <TouchableOpacity
        onPress={() => clickMethod()}
        style={styles.rightSectionStyle}>
        <Image source={ICONS.play} style={{width: 9, height: 11}} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: wp('85%'),
    shadowColor: '#00000080',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: 'rgba(44, 153, 198, 0.5)',
    borderRadius: 4,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#70707026',
    borderWidth: 1,
  },
  leftSectionStyle: {
    elevation: 10,
    width: '80%',
    height: 150,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  rightSectionStyle: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp('32'),
  },
  iconRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    width: '90%',
    color: '#000000',
    fontSize: wp('4'),
    fontFamily: FONTS.SFBold,
    marginTop: 6,
  },
  descStyle: {
    width: '90%',
    color: '#707070',
    fontSize: wp('3'),
    fontFamily: FONTS.SFMedium,
    marginTop: 4,
  },
});
export default Card;
