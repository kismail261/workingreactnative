import React from 'react';
import {View} from 'react-native';
import Slider from 'react-native-slider';
import {SliderCounter} from './sliderCounter';

// interface Props {
//   value?: number;
//   step?: number;
//   minimumValue?: number;
//   maximumValue?: number;
//   onValueChange?(): void;
// }

export const CustomSlider = props => {
  const COLORS = {
    white: '#FFFFFF',
    green: '#50BD00',
    max: '#DAE4FFCE',
  };
  return (
    <View>
      <Slider
        value={props.value}
        maximumValue={1}
        thumbTintColor={COLORS.white}
        minimumTrackTintColor={COLORS.green}
        trackStyle={{height: 12, borderRadius: 10}}
        maximumTrackTintColor={COLORS.max}
        onValueChange={props.onValueChange}
      />
      {/* <SliderCounter current={6} /> */}
    </View>
  );
};
