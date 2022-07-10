import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import eventComplete from '../eventComplete'
import reviewProvider from '../reviewProvider'
import thankyou from '../thankyou'


const Stack = createNativeStackNavigator();
function index(props) {
    return (
        <Stack.Navigator headerMode={"none"} initialRouteName={"eventComplete"}>
            <Stack.Screen
                name="eventCompleteUser"
                component={eventComplete}
                options={{
                    headerShown: false
                }}
                initialParams={{ listDetail: props.route.params.listDetail }}
            />
            <Stack.Screen
                name="reviewProviderUser"
                component={reviewProvider}
                options={{
                    headerShown: false
                }}
                initialParams={{ listDetail: props.route.params.listDetail }}
            />
            <Stack.Screen
                name="thankyouUser"
                component={thankyou}
                options={{
                    headerShown: false
                }}
                initialParams={{ listDetail: props.route.params.listDetail }}
            />
        </Stack.Navigator>
    );
}

export default index;