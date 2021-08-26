import React, {Component} from "react";
import {SafeAreaView, FlatList} from 'react-native';
import {changeFromCode, changeToCode, changeConversionRate} from '../actions/index';
import {connect} from 'react-redux';
import {CurrencyCodeRowItem} from '../components/CurrencyCodeRowItem';

/**
 * this is the screen that will display the currencies codes list.
 * handle the selection of any currency code.
 */
class CurrencyCodesScreen extends Component {

  constructor(props) {
    super(props);
    this.onPressAction = this.onPressAction.bind(this);
  }

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
        <FlatList
            data={this.props.state.currencyConverter.CurrencyCodes}
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