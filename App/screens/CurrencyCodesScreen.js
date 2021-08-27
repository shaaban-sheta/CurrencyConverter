import React, {Component} from "react";
import {SafeAreaView, FlatList} from 'react-native';
import {changeFromCode, changeToCode, changeConversionRate} from '../actions/index';
import {connect} from 'react-redux';
import {CurrencyCodeRowItem} from '../components/CurrencyCodeRowItem';
import {CurrencyCodesListSearch} from '../components/CurrencyCodesListSearch'

/**
 * this is the screen that will display the currencies codes list.
 * handle the selection of any currency code.
 */
class CurrencyCodesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.state.currencyConverter.CurrencyCodes
    };
    this.onPressAction = this.onPressAction.bind(this);
    this.searchFilterFunction = this.searchFilterFunction.bind(this);
  }

  /**
   * This function used to filter the currencies code based on the user input.
   * @param text the value entered in the search bar
   */
  searchFilterFunction(userInput) {
    if (userInput) {
      const filteredCurrencyCodes = this.props.state.currencyConverter.CurrencyCodes.filter(
          function (currencyObj) {
            const key = Object.keys(currencyObj)[0];
            const currencyId = currencyObj[key].currencyId.toUpperCase();
            const userInputUCase = userInput.toUpperCase();
            return currencyId.indexOf(userInputUCase) > -1;
          }
      );
      this.setState({data: filteredCurrencyCodes});
    } else {
      this.setState({data: this.props.state.currencyConverter.CurrencyCodes});
    }
  };

  /**
   * the function that will handle the currency code selection.
   * it will dispatch an action change the currency code To/From
   * in the application state.
   * then return to the Home screen.
   * @param item the currency Id
   */
  onPressAction = (item) => {
    const {codeType} = this.props.route.params;
    if(codeType === "FromCode")
      this.props.changeFromCode(item);
    else if(codeType === "ToCode")
      this.props.changeToCode(item);
    this.props.changeConversionRate(0);
    this.props.navigation.navigate('Home');
  }

  /**
   *
   * @param item the country currency information object
   * {
   *    "BJ": {
			"currencyId": "XOF",
			"currencyName": "West African CFA franc"
		}
   * }
   * @returns {JSX.Element} that will display the row for the currencies code list.
   */
  renderItem = ({item}) => {
    const key = Object.keys(item)[0];
    return <CurrencyCodeRowItem currencyId={item[key].currencyId}
                                currencyName={item[key].currencyName}
                                onPressAction={this.onPressAction}/>
  }

  /**
   *
   * @param item the country currency information object
   * @returns {string} unique id for each row in the list
   */
  myKeyExtractor = (item) => {
    return Object.keys(item)[0];
  }

  render() {
    return (
      <SafeAreaView>
        <CurrencyCodesListSearch searchFilterFunction={this.searchFilterFunction}/>
        <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={this.myKeyExtractor}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = {
  changeFromCode,
  changeToCode,
  changeConversionRate
};

export default connect(mapStateToProps,mapDispatchToProps)(CurrencyCodesScreen)