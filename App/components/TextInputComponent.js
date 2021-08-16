import React, { Component } from "react";
import { Button, StyleSheet, Text, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-paper';

import colors from '../constants/colors';

const styles = StyleSheet.create({
    androidSafeArea: {
        flexWrap: "wrap",
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        alignSelf:'baseline',
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        flexWrap: "wrap",
    },
    input: {
        margin: 12,
        flex: 1,
        padding: 5,
    },
});

export class TextInputComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={styles.androidSafeArea}>
                
                <TextInput
                    label={this.props.title}
                    style={styles.input}
                    placeholder="0.0"
                    keyboardType="numeric"
                    disabled={this.props.disabled}
                    mode="outlined"
                />
                <Button title={this.props.currencyCode} onPress={this.props.onPress}/>
            </SafeAreaView>
        );
    }
}