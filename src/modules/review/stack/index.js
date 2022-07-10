import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import eventComplete from '../eventComplete'
import selectReviewingUsers from '../selectReviewingUsers'
import reviewProvider from '../reviewProvider'
import thankyou from '../thankyou'

const Stack = createNativeStackNavigator();
function index() {
    return (
        <Stack.Navigator headerMode={"none"} initialRouteName={"eventComplete"}>
            <Stack.Screen
                name="eventComplete"
                component={eventComplete}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="selectReviewingUsers"
                component={selectReviewingUsers}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="reviewProvider"
                component={reviewProvider}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="thankyou"
                component={thankyou}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default index;