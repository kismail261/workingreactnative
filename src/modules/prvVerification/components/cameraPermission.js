/**
 * @format
 */
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FONTS } from '../../../constant';

const cameraPermission = props => {
  const multiSelect = useRef(null);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingStyle}>
          Sporforya would Like to Access the Camera
        </Text>
        <View style={{ paddingVertical: 10 }}></View>
        <Text style={styles.subHeading}>
          Enable access so that you can take photos of your listings, government
          ID, and more, directly from the Sporforya app.
        </Text>
      </View>
      <View style={{ paddingVertical: 25 }}></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.whiteButton}>
          <Text style={styles.whiteButtonText}>Don't Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => {
            props.nextStep();
          }}>
          <Text style={styles.blueButtonText}>Allow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    alignContent: 'center',
    width: wp('40'),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headingStyle: {
    width: wp('45'),
    color: '#000000',
    fontSize: wp('5.4'),
    fontFamily: FONTS.SFBold,
    marginTop: Platform.OS == 'android' ? 18 : 28,
    textAlign: 'center',
    alignSelf: 'center',
  },
  subHeading: {
    width: wp('50'),
    textAlign: 'center',
    color: '#707070',
    fontSize: wp('4.3'),
    fontFamily: FONTS.SFRegular,
    marginTop: 8,
    alignSelf: 'center',
    marginBottom: Platform.OS == 'android' ? 8 : 8,
  },
  buttonsContainer: {
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'space-evenly',
    width: 350,
    alignSelf: 'center',
  },
  whiteButton: {
    padding: 15,
    flex: 0.5,
  },
  blueButton: {
    padding: 15,
    backgroundColor: '#2C99C6',
    flex: 0.5,
  },
  blueButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: FONTS.SFRegular,
    marginLeft: -15,
  },
  whiteButtonText: {
    textAlign: 'center',
    fontFamily: FONTS.SFRegular,
    marginRight: -15,
  },
});

export default cameraPermission;
