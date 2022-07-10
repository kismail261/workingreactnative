import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import bookingList from '../bookingList'
import cancelBookingNotifier from '../cancelBookingNotifier'
import userBookingdetail from '../userBookingdetail'
import bookingDetail from '../bookingDetail'

const Stack = createNativeStackNavigator();

function MainRoute() {
    
    return (
        <Stack.Navigator headerMode={"none"} initialRouteName={"bookingList"}>
            <Stack.Screen
                name="bookingList"
                component={bookingList}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="cancelBookingNotifier"
                component={cancelBookingNotifier}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="userBookingdetail"
                component={userBookingdetail}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="bookingDetail"
                component={bookingDetail}
                options={{
                    headerShown: false
                }}
            />
 
        </Stack.Navigator>
    );
}

export default MainRoute;