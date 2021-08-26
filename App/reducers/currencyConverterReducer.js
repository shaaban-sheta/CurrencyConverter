import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE, TO_VALUE_CHANGE, TO_CODE_CHANGE, CONVERSION_RATE_CHANGE, CURRENCY_CODES_LOAD} from '../constants/index';

/**
 * the application state structure
 * The initial state for the application
 * @type {{ConversionRate: number, FromCode: string, ToValue: number, CurrencyCodes: *[], ToCode: string, FromValue: number}}
 */
const initialState = {
    FromCode: "SAR",
    ToCode: "EGP",
    FromValue: 0.0,
    ToValue: 0.0,
    ConversionRate: 0,
    CurrencyCodes: []
};

/**
 * this is the reducer that will handle all currency conversion
 * action that will be dispatched
 * @param state the current state for the application
 * @param action The action that dispatched
 * @returns {{ConversionRate: number, FromCode: string, ToValue: number, CurrencyCodes, ToCode: string, FromValue: number}|{ConversionRate: number, FromCode: string, ToValue, CurrencyCodes: *[], ToCode: string, FromValue: number}|{ConversionRate: number, FromCode: string, ToValue: number, CurrencyCodes: *[], ToCode: string, FromValue: number}|{ConversionRate, FromCode: string, ToValue: number, CurrencyCodes: *[], ToCode: string, FromValue: number}|{ConversionRate: number, FromCode: string, ToValue: number, CurrencyCodes: *[], ToCode: string, FromValue}|{ConversionRate: number, FromCode, ToValue: number, CurrencyCodes: *[], ToCode: string, FromValue: number}|{ConversionRate: number, FromCode: string, ToValue: number, CurrencyCodes: *[], ToCode, FromValue: number}}
 *          returns the new state
 */
const currencyConverterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FROM_VALUE_CHANGE:
            return {
                ...state,
                FromValue: action.payload,
                ToValue: action.payload * state.ConversionRate
            };
        case FROM_CODE_CHANGE:
            return {
                ...state,
                FromCode: action.payload
            };
        case TO_VALUE_CHANGE:
            return {
                ...state,
                FromValue: action.payload / state.ConversionRate,
                ToValue: action.payload
            };
        case TO_CODE_CHANGE:
            return {
                ...state,
                ToCode: action.payload
            };
        case CONVERSION_RATE_CHANGE:
            return {
                ...state,
                ConversionRate: action.payload,
                ToValue: action.payload * state.FromValue
            };
        case CURRENCY_CODES_LOAD:
            return {
                ...state,
                CurrencyCodes: action.payload
            };
        default:
            return state;
    }
}
export default currencyConverterReducer;