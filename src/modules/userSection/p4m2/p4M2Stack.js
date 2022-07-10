import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddChild} from './addAChlid';

const Stack = createNativeStackNavigator();
function p4M2Stack() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'addAChild'}>
      <Stack.Screen
        name="addAChild"
        component={AddChild}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default p4M2Stack;
