import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CurrencyCodesScreen from './screens/CurrencyCodesScreen';
import {CURRENCY_CODES_URL} from "./constants";
import {ToastAndroid} from "react-native";
import {connect} from "react-redux";
import {changeRate, loadCurrencyCodes} from "./actions";

const Stack = createStackNavigator();

export default class App extends Component {

    render() {
        return (
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
        );
    }
}