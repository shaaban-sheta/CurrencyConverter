import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Platform} from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import { connect } from 'react-redux';
import {changeFromCode, changeFromValue, changeToCode, changeToValue} from "../actions";

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    flexDirection: "column",
    alignSelf:'baseline',
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
});

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.state)
    const {currencyConverter} = this.props.state

    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <TextInputComponent title = "From"
                            value = {currencyConverter.FromValue + ""}
                            currencyCode={currencyConverter.FromCode}
                            disabled={false}
                            onPress={() => this.props.navigation.navigate('CurrencyCodes',
                                {codeType: "FromCode"})}  />
        <TextInputComponent title = "To"
                            value = {currencyConverter.ToValue + ""}
                            currencyCode={currencyConverter.ToCode}
                            disabled={false}
                            onPress={() => this.props.navigation.navigate('CurrencyCodes',
                                {codeType: "ToCode"})}  />
      </SafeAreaView>
    );
  }
}

// @ts-ignore
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = {
  changeFromValue,
  changeToValue,
  changeFromCode,
  changeToCode
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)