import {ButtonRegular} from '../../common/buttonRegular';
import {GetStartedTemplate} from './getStartedTemplate';
import React from 'react';

export const GetStarted2 = ({navigation}) => {
  function onPress() {
    navigation.navigate('register');
  }
  return (
    <GetStartedTemplate
      navigation={navigation}
      buttonToPut={
        <ButtonRegular title="Continue with Email" onClick={onPress} />
      }
    />
  );
};
