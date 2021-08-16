import { createStore, combineReducers } from 'redux';
import currencyConverterReducer from '../reducers/currencyConverterReducer';

const rootReducer = combineReducers(
    { currencyConverter: currencyConverterReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;