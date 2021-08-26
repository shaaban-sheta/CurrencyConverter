import React, { Component } from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        margin: 25,
        alignContent: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
});

/**
 * This component used to display the conversion rate
 * Example: 1 SAR = 4.15 EGP
 */
export class ConversionRateComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let text = "1 ";
        text = text.concat(this.props.FromCode, " = ", this.props.ConversionRate, " ", this.props.ToCode);
        return (
                <Text style={styles.containerStyle}>{text}</Text>
        );
    }
}