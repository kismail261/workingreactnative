import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {FONTS, ICONS} from '../../../constant';
import Slider from 'react-native-slider';

// interface Props {
//   image?: any;
//   name?: string;
//   email?: string;
//   stepsLeft?: number;
//   maximumSteps?: number;
// }

export const ProviderUserCard = props => {
  return (
    <View style={styles.main}>
      <View
        style={{
          marginTop: 18,
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 20.5,
        }}>
        <Image
          source={ICONS.verifyImg}
          style={[styles.dp, {marginRight: 19}]}
        />
        <View>
          <Text style={styles.name}>{props.name ?? 'John Doe'}</Text>
          <Text style={styles.email}>{props.email ?? 'JohnDoe@gmail.com'}</Text>
        </View>
      </View>

      <View style={styles.divider}></View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 12.5}}>
        <Text style={styles.steps}>
          {props.stepsLeft ?? '3'}
          {' steps left'}
        </Text>
        <Slider
          disabled
          minimumTrackTintColor="#50BD00"
          maximumTrackTintColor="#7B9CFE4D"
          thumbStyle={{width: 0, height: 0}}
          trackStyle={{height: 13, borderRadius: 17}}
          maximumValue={props.maximumSteps ?? 5}
          step={1}
          value={props.stepsLeft ?? 3}
        />
        <Text style={styles.complete}>
          {'Complete your profile in order to publish listing.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: '#15488F1A',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    minHeight: 183,
    width: '100%',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#707070',
    opacity: 0.08,
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.SFSemiBold,
    color: 'black',
  },
  email: {
    fontSize: 14,
    fontFamily: FONTS.SFMedium,
    color: '#707070',
  },
  steps: {
    fontSize: 14,
    fontFamily: FONTS.SFMedium,
    color: 'black',
  },
  complete: {
    fontSize: 12,
    fontFamily: FONTS.SFRegular,
    color: '#707070',
    marginBottom: 18,
  },
  dp: {
    height: 56,
    width: 56,
    borderRadius: 56,
  },
});
