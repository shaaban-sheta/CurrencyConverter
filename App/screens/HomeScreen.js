import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Platform, ToastAndroid} from 'react-native';
import TextInputComponent from '../components/TextInputComponent';
import { connect } from 'react-redux';
import {
    changeConversionRate,
    changeFromCode,
    changeFromValue,
    changeToCode,
    changeToValue,
    loadCurrencyCodes
} from "../actions";
import {CHANGE_RATE_URL, CURRENCY_CODES_URL} from "../constants/index";
import { ConversionRateComponent } from "../components/ConversionRateComponent"
import {convertJsonToArray} from "../utils/utils";

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    flexDirection: "column",
    alignSelf:'baseline',
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? 25 : 0
},
});

/**
 * this is the first that we be display to the user
 * contains two inputTexts for the source and the target values
 * two buttons for the source and the target currency code.
 * footer to display the conversion rate
 */
class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

    /**
     * this function used to navigate to the currency codes list to
     * select another currency code.
     * @param codeType this parameter used to identify which
     * currency code button invoked the function(Source or Target).
     */
  navigateToCurrencyCodes(codeType) {
    /*const {currencyConverter} = this.props.state
    if (currencyConverter.CurrencyCodes.length === 0)
      this.loadCurrencyCodes();*/
    this.props.navigation.navigate('CurrencyCodes', {codeType: codeType});
  }

    /**
     * this function used to get the currency codes that supported by the API.
     * @returns {Promise<T>} update currency codes value for the application state.
     */
  loadCurrencyCodes = () => {
    return fetch(CURRENCY_CODES_URL)
        .then((response) => response.json())
        .then((json) => {
          if (json.status == 400)
            ToastAndroid.show(json.error, ToastAndroid.SHORT);
          else {
            let resultJsonObject = json.results;
            let currencyCodesArr = convertJsonToArray(resultJsonObject);
            this.props.loadCurrencyCodes(currencyCodesArr);
          }
        })
        .catch((error) => {
          console.error(error);
          ToastAndroid.show("Loading Currency Codes Failed!", ToastAndroid.SHORT);
        });
  }

    /**
     * this function used to get the conversion rate for the current currency codes.
     */
  getConversionRate() {
    const {currencyConverter} = this.props.state;
    let conversionRateKey = currencyConverter.FromCode.concat('_', currencyConverter.ToCode);
    let apiUrl = CHANGE_RATE_URL.concat(conversionRateKey);
    fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          let conversionRateValue = json[conversionRateKey];
          this.props.changeConversionRate(conversionRateValue);
        })
        .catch((error) => {
          console.error(error);
          ToastAndroid.show("Loading Currency Conversion Rate Failed!", ToastAndroid.SHORT);
        });
  }

  render() {
    const {currencyConverter} = this.props.state
    if (currencyConverter.ConversionRate == 0)
      this.getConversionRate();
    if (currencyConverter.CurrencyCodes.length === 0)
      this.loadCurrencyCodes();

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

        <ConversionRateComponent FromCode={currencyConverter.FromCode}
                                 ToCode={currencyConverter.ToCode}
                                 ConversionRate={currencyConverter.ConversionRate}/>
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
  loadCurrencyCodes,
  changeConversionRate
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)