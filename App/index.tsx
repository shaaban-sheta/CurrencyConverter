import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import { CurrencyCodesScreen } from './screens/CurrencyCodesScreen';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const store = configureStore()

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
        <Provider store = { store }>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home"
                      component={HomeScreen}
                      initialParams={{FromCode: "SAR",
                                      ToCode: "EGP"}}/>
              <Stack.Screen name="CurrencyCodes"
                      component={CurrencyCodesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    );
  }
}
