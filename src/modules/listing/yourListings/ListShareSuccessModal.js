import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import React from 'react';
const ListShareSuccessModal = ({onPressBack}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#ffffff',
          marginLeft: 37,
          marginRight: 36,
          // paddingTop: 57,
        }}>
        <TouchableOpacity
          onPress={onPressBack}
          style={{paddingBottom: 38, paddingTop: 6, paddingRight: 6}}>
          <Image
            source={ICONS.crossRed}
            style={{height: 16, width: 16, alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
        <Image source={ICONS.confirmedIcon} style={styles.imageStyle} />
        <Text
          style={{
            paddingLeft: 42,
            paddingRight: 42,
            fontFamily: FONTS.SFRegular,
            color: '#000000',
            textAlign: 'center',
            fontSize: 24,
            paddingTop: 20,
            paddingBottom: 50,
          }}>
          Your post has been shared successfully !
        </Text>
      </View>
    </View>
  );
};

export default ListShareSuccessModal;

const styles = StyleSheet.create({
  imageStyle: {
    height: 88,
    width: 88,
    alignSelf: 'center',
    // paddingTop: 57,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    justifyContent: 'center',
  },

  //justifyContent: 'flex-end',
});
