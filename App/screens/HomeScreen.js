import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Platform} from 'react-native';
import { TextInputComponent } from '../components/TextInputComponent';
import { connect } from 'react-redux';
import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE, TO_VALUE_CHANGE, TO_CODE_CHANGE} from '../constants/index';
import { bindActionCreators } from 'redux';

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    flexDirection: "column",
    alignSelf:'baseline',
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
});

export class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { FromCode, ToCode } = this.props.route.params;

    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <TextInputComponent title = "From" currencyCode={FromCode} disabled={false}
                            onPress={() => this.props.navigation.navigate('CurrencyCodes',
                                {codeType: "FromCode"})}  />
        <TextInputComponent title = "To    " currencyCode={ToCode} disabled={true}
                            onPress={() => this.props.navigation.navigate('CurrencyCodes',
                                {codeType: "ToCode"})}  />
      </SafeAreaView>
    );
  }
}