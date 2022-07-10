import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProviderFrontVerification } from '../front';
import { ProviderBackVerification } from '../back';
import { VerifyImg } from '../verifyImg';
import verifiedProvider from '../../../prvVerification/components/verifiedProvider';
import support from '../../../prvVerification/components/support';
import govtIdNeeded from '../../../prvVerification/components/govtIDNeeded';
import uploadingFront from '../../../prvVerification/components/uploadingFront';
import uploadingBack from '../../../prvVerification/components/uploadingBack';
import reviewInformation from '../../../prvVerification/components/reviewInformation';
import reviewAgain from '../../../prvVerification/components/reviewAgain';


const Stack = createNativeStackNavigator();
function VerifiedProviderStack() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'VerifiedProvider'}>

      <Stack.Screen
        name="VerifiedProvider"
        component={verifiedProvider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="support"
        component={support}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="front"
        component={ProviderFrontVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="govtIdNeeded"
        component={govtIdNeeded}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verify"
        component={VerifyImg}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="uploadingFront"
        component={uploadingFront}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="back"
        component={ProviderBackVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="uploadingBack"
        component={uploadingBack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reviewInformation"
        component={reviewInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reviewAgain"
        component={reviewAgain}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

export default VerifiedProviderStack;
