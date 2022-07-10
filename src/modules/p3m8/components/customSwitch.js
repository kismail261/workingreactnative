import React from 'react';
import {StyleSheet, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

export const CustomSwitch = props => {
  return (
    <ToggleSwitch
      isOn={props.isOn}
      trackOnStyle={styles.switchTrackOn}
      trackOffStyle={styles.switchTrackOff}
      onColor="white"
      offColor={'white'}
      size="small"
      onToggle={props.onToggle}
      icon={
        <View
          style={{
            height: 9,
            width: 9,
            borderRadius: 9,
            backgroundColor: 'white',
          }}></View>
      }
    />
  );
};

const styles = StyleSheet.create({
  switchTrackOn: {
    backgroundColor: '#65C51F',
  },
  switchTrackOff: {
    backgroundColor: '#FF7D7D',
  },
});
