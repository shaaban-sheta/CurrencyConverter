import React, { Component } from "react";
import {Button, StyleSheet, SafeAreaView, Platform} from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import {changeFromValue, changeToValue} from "../actions";

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

/**
 * this component used to display and handle user interaction
 * to change the source/target currency code and value.
 */
class TextInputComponent extends Component {
    constructor(props) {
        super(props);
    }

    onChangeText = (value) => {
        if(this.props.title == "From")
            this.props.changeFromValue(value)
        else if(this.props.title == "To")
            this.props.changeToValue(value)
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
                    value={this.props.value}
                    onChangeText={text => this.onChangeText(text)}
                />
                <Button title={this.props.currencyCode} onPress={this.props.onPress}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = {
    changeFromValue,
    changeToValue
};

export default connect(mapStateToProps,mapDispatchToProps)(TextInputComponent)