import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';

export class CurrencyCodeRowItem extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <TouchableOpacity
                onPress={this.props.onPressItem}>
                this.props.itemName
            </TouchableOpacity>
        );
    }
}