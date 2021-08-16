import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from '../constants/colors';

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.white,
    },
    title: {
        color: colors.text,
        fontSize: 16,
    },
    separator: {
        backgroundColor: colors.border,
        height: StyleSheet.hairlineWidth,
        marginLeft: 20,
    },
});

export class RowItem extends Component {
    constructor(props) {
        super(props);
    }

    handlePress = () => {
        alert(this.props.title);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress} style={styles.row}>
                <Text style={styles.title}>{this.props.title}</Text>
                {this.props.rightIcon}
            </TouchableOpacity>
        );
    }
}

export class RowSeparator extends Component {
    render() {
        return (<View style={styles.separator}></View>);
    }
}

