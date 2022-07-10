import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyChildren } from '../myChildren';


const Stack = createNativeStackNavigator();
function App() {
    useEffect(() => {
        return () => { };
    }, []);

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'ChildList'}>
            <Stack.Screen
                name="ChildList"
                component={MyChildren}
                options={{
                    headerShown: false,
                }}
            />
           
            
        </Stack.Navigator>
    );
}

export default App;
