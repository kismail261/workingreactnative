import {AppRegistry, LogBox} from 'react-native';
import {persistor, store} from './src/redux/store';

import App from './src/routes';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
/**
 * @format 
 */
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
// import App from './src/testComponents/agenda';
// import { CloseSuccess as App } from './src/modules/p4m8/account/closeSucces';
import {name as appName} from './app.json';
import linking from './src/routes/linking';
import {NativeBaseProvider} from 'native-base';

const Main = () => {
  return (
    <NavigationContainer linking={linking}>
      <App />
    </NavigationContainer>
  );
};

const Root = () => {
  // LogBox.ignoreAllLogs()
  return (
    <NativeBaseProvider>
      <StripeProvider publishableKey="pk_test_l3zfS6QogXpJbCv2pNFyEh4F00zW84dE12">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Main />
          </PersistGate>
        </Provider>
      </StripeProvider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
