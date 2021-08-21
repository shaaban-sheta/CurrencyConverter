import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE, TO_VALUE_CHANGE, TO_CODE_CHANGE, RATE_CHANGE, CURRENCY_CODES_LOAD} from '../constants/index';

const initialState = {
    FromCode: "SAR",
    ToCode: "EGP",
    FromValue: 0.0,
    ToValue: 0.0,
    changeRate: 1,
    currencyCodes: []
};

const currencyConverterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FROM_VALUE_CHANGE:
            return {
                ...state,
                FromValue: action.payload,
                ToValue: action.payload * state.changeRate
            };
        case FROM_CODE_CHANGE:
            return {
                ...state,
                FromCode: action.payload
            };
        case TO_VALUE_CHANGE:
            return {
                ...state,
                FromValue: action.payload / state.changeRate,
                ToValue: action.payload
            };
        case TO_CODE_CHANGE:
            return {
                ...state,
                ToCode: action.payload
            };
        case RATE_CHANGE:
            return {
                ...state,
                changeRate: action.payload,
                ToValue: action.payload * state.FromValue
            };
        case CURRENCY_CODES_LOAD:
            return {
                ...state,
                currencyCodes: action.payload
            };
        default:
            return state;
    }
}
export default currencyConverterReducer;