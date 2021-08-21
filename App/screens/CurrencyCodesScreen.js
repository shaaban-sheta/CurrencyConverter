import React, {Component} from "react";
import {TouchableOpacity, SafeAreaView, FlatList, Text, ToastAndroid} from 'react-native';
import {changeFromCode, changeToCode, changeRate} from '../actions/index';
import {CHANGE_RATE_URL, CURRENCY_CODES_URL} from '../constants/index'
import {connect} from 'react-redux';

class CurrencyCodesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  onPressAction = (itemName) => {
    const { codeType } = this.props.route.params;
    if(codeType == "FromCode")
      this.props.changeFromCode(itemName);
    else if(codeType == "ToCode")
      this.props.changeToCode(itemName);

    this.getChangeRate();

    this.props.navigation.navigate('Home',
        {[codeType]: itemName});
  }

  renderItem = ({item}) => {
    const key = Object.keys(item)[0];
    return <TouchableOpacity onPress={() => this.onPressAction(item)}>
      <Text>{item[key].currencyId}</Text>
      <Text>{item[key].currencyName}</Text>
    </TouchableOpacity>
  }

  myKeyExtractor = (item) => {
    return item
  }

  getChangeRate() {
    const {currencyConverter} = this.props.state;
    let changeRateKey = currencyConverter.FromCode.concat('_', currencyConverter.ToCode);
    let apiUrl = CHANGE_RATE_URL.concat(changeRateKey);
    fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          let changeRateValue = json[changeRateKey];
          console.log(changeRateValue);
          this.props.changeRate(changeRateValue);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.setState({isLoading: false});
        });
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
            data={this.props.state.currencyConverter.currencyCodes}
            renderItem={this.renderItem}
            keyExtractor={this.myKeyExtractor}/>
      </SafeAreaView>
    );
  }
}

// @ts-ignore
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = {
  changeFromCode,
  changeToCode,
  changeRate
};

export default connect(mapStateToProps,mapDispatchToProps)(CurrencyCodesScreen)