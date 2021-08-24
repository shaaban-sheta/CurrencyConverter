import React, {Component} from "react";
import {TouchableOpacity, SafeAreaView, FlatList, Text, ToastAndroid, StyleSheet, Platform, View} from 'react-native';
import {changeFromCode, changeToCode, changeRate} from '../actions/index';
import {CHANGE_RATE_URL} from '../constants/index'
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  currencyListRowStyle: {
    flex: 1,
    flexDirection: "row",
    alignSelf:'baseline',
    backgroundColor: '#bbbbb5',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  currencyIdStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent:'flex-start'
  },

  currencyNameStyle: {
    flex: 1,
    flexDirection: "row",
    alignContent:'flex-end'
  },
});

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
    return <TouchableOpacity style={styles.currencyListRowStyle} onPress={() => this.onPressAction(item[key].currencyId)}>
      <Text style={styles.currencyIdStyle}>{item[key].currencyId}</Text>
      <Text style={styles.currencyNameStyle}>{item[key].currencyName}</Text>
    </TouchableOpacity>
  }

  myKeyExtractor = (item) => {
    return Object.keys(item)[0];
  }

  getChangeRate() {
    const {currencyConverter} = this.props.state;
    let changeRateKey = currencyConverter.FromCode.concat('_', currencyConverter.ToCode);
    let apiUrl = CHANGE_RATE_URL.concat(changeRateKey);
    fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          let changeRateValue = json[changeRateKey];
          this.props.changeRate(changeRateValue);
        })
        .catch((error) => {
          console.error(error);
          ToastAndroid.show("Loading Currency Change Rate Failed!", ToastAndroid.SHORT);
        });
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
            data={this.props.state.currencyConverter.currencyCodes}
            renderItem={this.renderItem}
            keyExtractor={this.myKeyExtractor}
            ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (<View style={styles.separator}/>))}
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
  changeRate
};

export default connect(mapStateToProps,mapDispatchToProps)(CurrencyCodesScreen)