import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import verifiedProvider from '../../../userVerification/components/verifiedProvider';
import support from '../../../userVerification/components/support';
import { ProviderFrontVerification } from '../front';
import govtIdNeeded from '../../../userVerification/components/govtIDNeeded';
import { VerifyImg } from '../verifyImg';
import uploadingFront from '../../../userVerification/components/uploadingFront';
import { ProviderBackVerification } from '../back';
import uploadingBack from '../../../userVerification/components/uploadingBack';
import reviewInformation from '../../../userVerification/components/reviewInformation';
import reviewAgain from '../../../userVerification/components/reviewAgain';


const Stack = createNativeStackNavigator();
function accountVerificationStack() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'VerifiedUser'}>

      <Stack.Screen
        name="VerifiedUser"
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

export default accountVerificationStack;
