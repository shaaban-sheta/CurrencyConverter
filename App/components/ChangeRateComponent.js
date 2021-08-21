import React, { Component } from 'react';
import {StyleSheet, Platform, Text} from 'react-native';
const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        flexDirection: "column",
        alignSelf:'baseline',
        alignItems: "center",
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});

export class ChangeRateComponent extends Component {
    render() {
        return (
            <Text>

            </Text>
        );
    }
}