import {FROM_VALUE_CHANGE, FROM_CODE_CHANGE, TO_VALUE_CHANGE, TO_CODE_CHANGE, RATE_CHANGE} from '../constants/index';

export function changeFromValue(fromValue) {
    return {
        type: FROM_VALUE_CHANGE,
        payload: fromValue
    }
}

export function changeFromCode(fromCode) {
    return {
        type: FROM_CODE_CHANGE,
        payload: fromCode
    }
}

export function changeToValue(toValue) {
    return {
        type: TO_VALUE_CHANGE,
        payload: toValue
    }
}

export function changeToCode(toCode) {
    return {
        type: TO_CODE_CHANGE,
        payload: toCode
    }
}

export function changeRate(changeRateValue) {
    return {
        type: RATE_CHANGE,
        payload: changeRateValue
    }
}