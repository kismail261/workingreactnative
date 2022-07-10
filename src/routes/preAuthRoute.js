import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import onBoarding from '../modules/onBoarding';


const Stack = createNativeStackNavigator();
function PreAuthRoute() {

    return (
        <Stack.Navigator headerMode={"none"} initialRouteName={"onBoarding"}>

            <Stack.Screen
                name="onBoarding"
                component={onBoarding}
                options={{
                    headerShown: false
                }}
            />  
        </Stack.Navigator>
    );
}

export default PreAuthRoute;