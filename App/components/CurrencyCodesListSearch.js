import React, {Component} from "react";
import {TextInput} from 'react-native-paper';
import {View, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    searchContainerStyle: {
        backgroundColor: '#FFFFFF',
    },

    searchInputTextStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        margin: 10,
        borderColor: '#2287da',
        backgroundColor: '#FFFFFF',
    }
});

/**
 * This component used to provide a search bar to filter the currencies codes list.
 */
export class CurrencyCodesListSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.searchContainerStyle}>
                <TextInput
                    style={styles.searchInputTextStyle}
                    onChangeText={(text) => this.props.searchFilterFunction(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />
            </View>
        );
    }
}