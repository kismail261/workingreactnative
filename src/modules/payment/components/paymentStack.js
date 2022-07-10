import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import individualContactDetails from './individualContactDetails';
import confirmYourPhone from './confirmYourPhone';
import individualProviderDetails from './individualProviderDetails';
import individualProviderDetailsService from './individualProviderDetailsService';
import individualProviderDetailsDOB from './individualProviderDetailsDOB';
import payoutDetails from './payoutDetails';
import verificationSummaryDebit from './verificationSummaryDebit';
import verificationSummaryBank from './verificationSummaryBank';

//org
import organizationProviderDetails from './organizationProviderDetails';
import organizationProviderDetailsEIN from './organizationProviderDetailsEIN';



const Stack = createNativeStackNavigator();
function App() {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={"individualContactDetails"}>
            <Stack.Screen
                name="organizationProviderDetailsEIN"
                component={organizationProviderDetailsEIN}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="organizationProviderDetails"
                component={organizationProviderDetails}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="payoutDetails"
                component={payoutDetails}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="individualContactDetails"
                component={individualContactDetails}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="confirmYourPhone"
                component={confirmYourPhone}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="individualProviderDetails"
                component={individualProviderDetails}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="individualProviderDetailsService"
                component={individualProviderDetailsService}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="individualProviderDetailsDOB"
                component={individualProviderDetailsDOB}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="verificationSummaryDebit"
                component={verificationSummaryDebit}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="verificationSummaryBank"
                component={verificationSummaryBank}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}

export default App;
