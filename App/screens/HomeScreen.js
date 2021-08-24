import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Platform, ToastAndroid} from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import { connect } from 'react-redux';
import {changeFromCode, changeFromValue, changeToCode, changeToValue,loadCurrencyCodes} from "../actions";
import {CURRENCY_CODES_URL} from "../constants/index";

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

  navigateToCurrencyCodes(codeType) {
    const {currencyConverter} = this.props.state
    if (currencyConverter.currencyCodes.length == 0)
      this.loadCurrencyCodes();
    this.props.navigation.navigate('CurrencyCodes', {codeType: codeType});
  }

  loadCurrencyCodes = () => {
    console.log("here");
    return fetch(CURRENCY_CODES_URL)
        .then((response) => response.json())
        .then((json) => {
          if (json.status == 400)
            ToastAndroid.show(json.error, ToastAndroid.SHORT);
          else {
            let resultJsonObject = json.results;
            let currencyCodesArr = this.convertJsonToArray(resultJsonObject);
            this.props.loadCurrencyCodes(currencyCodesArr);
          }
        })
        .catch((error) => {
          console.error(error);
          ToastAndroid.show("Loading Currency Codes Failed!", ToastAndroid.SHORT);
        });
  }

  // @ts-ignore
  convertJsonToArray = (currencyCodesJsonObj) => {
    let currencyCodesArr = [];
    for (const key in currencyCodesJsonObj) {
      currencyCodesArr.push({[key]: {
          "currencyId": currencyCodesJsonObj[key].currencyId,
          "currencyName": currencyCodesJsonObj[key].currencyName
        }});
    }
    return currencyCodesArr;
  }
  render() {
    const {currencyConverter} = this.props.state
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <TextInputComponent title = "From"
                            value = {currencyConverter.FromValue + ""}
                            currencyCode={currencyConverter.FromCode}
                            disabled={false}
                            onPress={() => this.navigateToCurrencyCodes("FromCode")}  />
        <TextInputComponent title = "To"
                            value = {currencyConverter.ToValue + ""}
                            currencyCode={currencyConverter.ToCode}
                            disabled={false}
                            onPress={() => this.navigateToCurrencyCodes("ToCode")}  />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = {
  changeFromValue,
  changeToValue,
  changeFromCode,
  changeToCode,
  loadCurrencyCodes
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)