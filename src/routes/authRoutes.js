export const hello = 'jello';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import confirmYourEmail from '../modules/confirmYourEmail';
import {GetStarted1} from '../modules/auth/getStarted1';
import {GetStarted2} from '../modules/auth/getStarted2';
import {Login} from '../modules/auth/login';
import { Register } from '../modules/auth/register';
import { TermsOfService } from '../modules/p3m8/tos';
import { PrivacyPolicy } from '../modules/auth/privacyPolicy';
import ForgotPassword from '../modules/auth/forgotPassword';


const Stack = createNativeStackNavigator();
function AuthRoute() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'getStarted1'}>
      <Stack.Screen
        name="getStarted1"
        component={GetStarted1}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="getStarted2"
        component={GetStarted2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirmYourEmail"
        component={confirmYourEmail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsOfService}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false
        }}
      />
      
    </Stack.Navigator>
  );
}

export default AuthRoute;
