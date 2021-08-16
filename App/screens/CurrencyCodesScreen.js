import React, {Component} from "react";
import {TouchableOpacity, SafeAreaView, FlatList, Text} from 'react-native';

export class CurrencyCodesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  onPressAction = (itemName) => {
    const { codeType } = this.props.route.params;
    this.props.navigation.navigate('Home',
        {[codeType]: itemName});
  }

  renderItem = ({item}) => {
    return <TouchableOpacity onPress={() => this.onPressAction(item)}><Text>{item}</Text></TouchableOpacity>
  }

  myKeyExtractor = (item) => {
    return item
  }

  loadCurrencyCodes = () => {
    fetch('https://v6.exchangerate-api.com/v6/b34fc30d44002778bd7c9d66/codes')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.supported_codes });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getCol = (matrix, col) => {
    let column = [];
    for(let i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
  }

  render() {
   /* this.loadCurrencyCodes();
    const { data } = this.state;
    let currencyCodes = this.getCol(data,0);*/
    let currencyCodes = ["AED","AFN","AMD","ANG","AOA","AWG","BBD","SAR","EGP"];

    return (
      <SafeAreaView>
        <FlatList
            data={currencyCodes}
            renderItem={this.renderItem}
            keyExtractor={this.myKeyExtractor}/>
      </SafeAreaView>
    );
  }
}