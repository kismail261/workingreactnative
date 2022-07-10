import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import verifyBadge from '../verifyBadge';
import support from '../support';
import uploadingBadgeFront from '../uploadingBadgeFront';
import govtIDBadge from '../govtIDNeeded';
import { VerifyImg } from '../verifyImg';
import uploadingImageFront from '../uploadingFront';
import BackVerification from '../back';
import uploadingBack from '../uploadingBack';
import reviewInformation from '../reviewInformation';
import reviewAgain from '../reviewAgain';


const Stack = createNativeStackNavigator();
function VerifyBadgeStack() {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'verifyBadge'}>

            <Stack.Screen
                name="verifyBadge"
                component={verifyBadge}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="supportBadge"
                component={support}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="uploadingBadgeFront"
                component={uploadingBadgeFront}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="govtIDBadge"
                component={govtIDBadge}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="verifyUser"
                component={VerifyImg}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="uploadingImageFront"
                component={uploadingImageFront}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="BackVerification"
                component={BackVerification}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="uploadBack"
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

export default VerifyBadgeStack;
