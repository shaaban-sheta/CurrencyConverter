import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    currencyListRowStyle: {
        flex: 1,
        flexDirection: "row",
        alignSelf:'baseline',
        backgroundColor: '#2287da',
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },

    currencyIdStyle: {
        flex: 1,
        flexDirection: "row",
        alignContent:'flex-start',
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"

    },

    currencyNameStyle: {
        flex: 1,
        flexDirection: "row",
        alignContent:'flex-end',
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"
    },
});

/**
 * This component used to customize the row item for the
 * currencies codes list.
 */
export class CurrencyCodeRowItem extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {onPressAction} = this.props;
        return (<TouchableOpacity style={styles.currencyListRowStyle} onPress={() => onPressAction(this.props.currencyId)}>
            <Text style={styles.currencyIdStyle}>{this.props.currencyId}</Text>
            <Text style={styles.currencyNameStyle}>{this.props.currencyName}</Text>
        </TouchableOpacity>
        );
    }
}