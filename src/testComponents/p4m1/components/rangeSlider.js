import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RangeSlider from 'rn-range-slider';

export const CustomRangeSlider = ({ getValue, min, max, low, high }) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = (low, high) => {
    getValue(low, high)
  };

  const Thumb = () => {
    return <View style={styles.thumb} />;
  };
  const Rail = () => {
    return <View style={styles.rail} />;
  };
  const RailSelected = () => {
    return <View style={styles.railSelected} />;
  };
  const Label = props => {
    return <View />;
  };
  const Notch = () => {
    return <View />;
  };

  return (
    <RangeSlider
      style={styles.slider}
      min={min}
      max={max}
      low={low}
      high={high}
      step={1}
      floatingLabel
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      onValueChanged={handleValueChange}
    />
  );
};

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: '#40D142',
    width: 16,
    height: 16,
    borderRadius: 16,
  },
  rail: {
    //borderWidth: 1,
    width: '100%',
    backgroundColor: '#DAE4FFCE',
    borderRadius: 10,
    height: 6,
  },
  railSelected: {
    //borderWidth: 1,
    //width: '100%',
    backgroundColor: '#33E279',
    borderRadius: 10,
    height: 6,
  },
});
