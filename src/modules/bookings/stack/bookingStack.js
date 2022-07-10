import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import bookings from '../bookings';
import bookingsDetail from '../bookingsDetail';
import cancellationDetail from '../cancellationDetail';
import selectCancelBookingUsers from '../selectCancelBookingUsers';
import reason from '../reason';
import amountPayable from '../amountPayable';
import thankYouNote from '../thankYouNote';
import approveCancel from '../approveCancel';
import amountPayableUsers from '../amountPayableUsers';
import reasonMultiple from '../reasonMultiple';


const Stack = createNativeStackNavigator();
function bookingStack(props) {
  // console.log(props.route.params.listId)
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName={'listBookings'}>
      <Stack.Screen
        name="listBookings"
        component={bookings}
        options={{
          headerShown: false,
        }}
        initialParams={{ listingId: props.route.params.listId }}
        
      /> 
      <Stack.Screen
        name="bookingsDetail"
        component={bookingsDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reason"
        component={reason}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="amountPayable"
        component={amountPayable}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="thankYouNote"
        component={thankYouNote}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cancellationDetail"
        component={cancellationDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="approveCancel"
        component={approveCancel}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="selectCancelBookingUsers"
        component={selectCancelBookingUsers}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="reasonMultiple"
        component={reasonMultiple}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="amountPayableUsers"
        component={amountPayableUsers}
        options={{
          headerShown: false,
        }}
      />
      
    </Stack.Navigator>
  );
}

export default bookingStack;
