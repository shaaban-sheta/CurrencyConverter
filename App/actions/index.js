/**
 * this file contains the functions that generates the redux
 * actions.
 */

import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE,
        TO_VALUE_CHANGE, TO_CODE_CHANGE,
        CONVERSION_RATE_CHANGE, CURRENCY_CODES_LOAD} from '../constants/index';

/**
 * the application state
 * State = {
    FromCode: "SAR",
    ToCode: "EGP",
    FromValue: 0.0,
    ToValue: 0.0,
    ConversionRate: 0,
    CurrencyCodes: []
}
 */


/**
 * this function used to return the object(action) to change
 * the FromValue of the application state.
 * @param fromValue the value that is to be converted.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function changeFromValue(fromValue) {
    return {
        type: FROM_VALUE_CHANGE,
        payload: typeof fromValue == "number" ? fromValue.toFixed(2) : fromValue
    }
}

/**
 * this function used to return the object(action) to change
 * the FromCode of the application state.
 * @param fromCode the country currency code of the value
 * that is to be converted.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function changeFromCode(fromCode) {
    return {
        type: FROM_CODE_CHANGE,
        payload: fromCode
    }
}

/**
 * this function used to return the object(action) to change
 * the ToValue of the application state.
 * @param toValue the result of the conversion method.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function changeToValue(toValue) {
    return {
        type: TO_VALUE_CHANGE,
        payload: typeof toValue == "number" ? toValue.toFixed(2) : toValue
    }
}

/**
 * this function used to return the object(action) to change
 * the ToCode of the application state.
 * @param toCode the target country currency code.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function changeToCode(toCode) {
    return {
        type: TO_CODE_CHANGE,
        payload: toCode
    }
}

/**
 * this function used to return the object(action) to change
 * the changeRate of the application state.
 * @param conversionRateValue The conversion rate used that we get from that API.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function changeConversionRate(conversionRateValue) {
    return {
        type: CONVERSION_RATE_CHANGE,
        payload: conversionRateValue.toFixed(3)
    }
}

/**
 * this function used to return the object(action) to change
 * the currencyCodes of the application state.
 * @param currencyCodes the array of the currencies codes that supported by the API.
 * @returns {{payload, type: string}} the action that will passed to the
 * reducers to change the application state.
 */
export function loadCurrencyCodes(currencyCodes) {
    return {
        type: CURRENCY_CODES_LOAD,
        payload: currencyCodes
    }
}