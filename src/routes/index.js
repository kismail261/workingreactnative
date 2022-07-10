import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import preAuthRoute from './preAuthRoute';
import AuthRoute from './authRoutes';
import mainRoutes from './mainRoutes';
import createListingRoute from './createListingRoute';
import userAppRoutes from './userAppRoutes';
import {useSelector} from 'react-redux';
import notificationsList from '../modules/notifications';

const Stack = createNativeStackNavigator();
function App() {
  const onboarding = useSelector(state => state.user.onboarding);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={
        onboarding == null
          ? 'preAuthRoute'
          : token == null
          ? 'authRoute'
          : 'mainRoutes'
      }
    >
      <Stack.Screen
        name="preAuthRoute"
        component={preAuthRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="authRoute"
        component={AuthRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mainRoutes"
        component={mainRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Create New Listing"
        component={createListingRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="userAppRoutes"
        component={userAppRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationsList"
        component={notificationsList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
