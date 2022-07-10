import React from 'react';
import {View} from 'react-native';
import {PolicyCard} from './policyCard';

export const AllPolicies = () => {
  return (
    <View>
      <PolicyCard
        name="Frequently Asked Questions"
        desc="List of FAQs for lorem ipsum"
        onPress={() => {}}
      />
      <PolicyCard
        name="Cancellation Policy"
        desc="Users can cancel and receive a refund up to"
        onPress={() => {}}
      />
      <PolicyCard
        name="Waiver, Release of Liability"
        desc="Lorem ipsum dolor sit amet, consectetur"
        onPress={() => {}}
      />
    </View>
  );
};
